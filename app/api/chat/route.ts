
import { cvData } from '@/lib/cv-data';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const uiMessages = body.messages || [];

        // Rule-based handling for greetings to avoid LLM hallucinations
        const lastMessage = uiMessages[uiMessages.length - 1];
        let lastUserMessage = '';
        if (lastMessage && lastMessage.role === 'user') {
            if (lastMessage.parts && Array.isArray(lastMessage.parts)) {
                lastUserMessage = lastMessage.parts
                    .filter((p: any) => p.type === 'text')
                    .map((p: any) => p.text)
                    .join('');
            } else if (typeof lastMessage.content === 'string') {
                lastUserMessage = lastMessage.content;
            }
        }

        const lowerMsg = lastUserMessage.toLowerCase().trim();
        if (['hello', 'hi', 'bonjour', 'salut', 'hey'].some(g => lowerMsg.startsWith(g) && lowerMsg.length < 15)) {
            // Return a direct stream for greetings
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                start(controller) {
                    controller.enqueue(encoder.encode(`data: {"type":"start"}\n\n`));
                    controller.enqueue(encoder.encode(`data: {"type":"text-start","id":"greeting"}\n\n`));
                    controller.enqueue(encoder.encode(`data: {"type":"text-delta","id":"greeting","delta":"Bonjour ! Je suis l'assistant virtuel de Mohamed. Je peux répondre à vos questions sur son parcours, ses compétences ou ses projets."}\n\n`));
                    controller.enqueue(encoder.encode(`data: {"type":"text-end","id":"greeting"}\n\n`));
                    controller.enqueue(encoder.encode(`data: {"type":"finish","finishReason":"stop"}\n\n`));
                    controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                    controller.close();
                }
            });
            return new Response(stream, {
                headers: { 'Content-Type': 'text/event-stream' }
            });
        }

        // Convert UI messages to Ollama format
        const ollamaMessages = uiMessages.map((m: any) => {
            let content = '';
            if (m.parts && Array.isArray(m.parts)) {
                content = m.parts
                    .filter((p: any) => p.type === 'text')
                    .map((p: any) => p.text)
                    .join('');
            } else if (typeof m.content === 'string') {
                content = m.content;
            }
            return { role: m.role, content };
        });

        // Format CV data into readable text for small models (tinyllama)
        const experienceText = cvData.experience.map(e =>
            `- ${e.title} at ${e.company} (${e.period}): ${e.descriptions[0]}`
        ).join('\n');

        const skillsText = cvData.skills.categories.map(c =>
            `- ${c.title}: ${c.skills.join(', ')}`
        ).join('\n');

        const educationText = cvData.education.map(e =>
            `- ${e.title} (${e.institution}, ${e.year})`
        ).join('\n');

        const context = `
PROFILE: ${cvData.personalInfo.name}
Role: ${cvData.personalInfo.title}
Bio: ${cvData.personalInfo.bio}

EXPERIENCE:
${experienceText}

SKILLS:
${skillsText}

EDUCATION:
${educationText}
`;

        const systemPrompt = `You are a helpful assistant for Mohamed's portfolio.
Answer questions using ONLY the context below.
If you don't know, say "Je n'ai pas cette information."
Keep it short.

CONTEXT:
${context}
`;

        console.log('[CHAT API] System Prompt Length:', systemPrompt.length);

        // Call Ollama directly
        const ollamaResponse = await fetch('http://localhost:11434/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'tinyllama',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...ollamaMessages,
                ],
                stream: true,
                temperature: 0.3, // Lower temperature for more factual answers
            }),
        });

        if (!ollamaResponse.ok) {
            const errorText = await ollamaResponse.text();
            console.error('[CHAT API] Ollama error:', ollamaResponse.status, errorText);
            return new Response(
                JSON.stringify({ error: `Ollama error: ${errorText}` }),
                { status: 502, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Transform Ollama's SSE stream into the UI Message Stream protocol
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const reader = ollamaResponse.body!.getReader();

        const stream = new ReadableStream({
            async start(controller) {
                // Send start event
                controller.enqueue(encoder.encode(`data: {"type":"start"}\n\n`));
                controller.enqueue(encoder.encode(`data: {"type":"start-step"}\n\n`));

                let buffer = '';
                let textStartSent = false;
                const partId = 'text-' + Math.random().toString(36).substring(2, 9);

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || '';

                        for (const line of lines) {
                            if (!line.startsWith('data: ')) continue;
                            const data = line.slice(6).trim();
                            if (data === '[DONE]') continue;

                            try {
                                const parsed = JSON.parse(data);
                                const delta = parsed.choices?.[0]?.delta?.content;
                                if (delta) {
                                    if (!textStartSent) {
                                        controller.enqueue(
                                            encoder.encode(`data: {"type":"text-start","id":"${partId}"}\n\n`)
                                        );
                                        textStartSent = true;
                                    }
                                    const escapedDelta = JSON.stringify(delta);
                                    controller.enqueue(
                                        encoder.encode(`data: {"type":"text-delta","id":"${partId}","delta":${escapedDelta}}\n\n`)
                                    );
                                }
                            } catch {
                                // Skip unparseable lines
                            }
                        }
                    }

                    // Send end events
                    if (textStartSent) {
                        controller.enqueue(
                            encoder.encode(`data: {"type":"text-end","id":"${partId}"}\n\n`)
                        );
                    }
                    controller.enqueue(encoder.encode(`data: {"type":"finish-step"}\n\n`));
                    controller.enqueue(encoder.encode(`data: {"type":"finish","finishReason":"stop"}\n\n`));
                    controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                } catch (err: any) {
                    console.error('[CHAT API] Stream error:', err);
                    controller.enqueue(
                        encoder.encode(`data: {"type":"error","errorText":"${err.message}"}\n\n`)
                    );
                    controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('[CHAT API] ERROR:', error);
        return new Response(
            JSON.stringify({ error: `Erreur serveur: ${error.message}` }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
