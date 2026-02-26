
'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChatbubblesOutline, IoClose, IoSend } from 'react-icons/io5'
import { RiRobot2Line } from 'react-icons/ri'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [chatError, setChatError] = useState<string | null>(null)
    const { messages, sendMessage, status } = useChat({
        onError: (err) => {
            console.error('Chat Error:', err)
            setChatError("Impossible de joindre l'assistant. Vérifiez qu'Ollama tourne en local.")
        }
    })
    const isLoading = status === 'streaming' || status === 'submitted'
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        setChatError(null)
        const text = input
        setInput('')
        try {
            await sendMessage({ text })
        } catch (err) {
            console.error('Send error:', err)
            setChatError("Erreur lors de l'envoi du message.")
        }
    }

    // Helper to extract text content from a message (v6 uses parts)
    const getMessageText = (m: any): string => {
        // Try parts first (v6 format)
        if (m.parts && Array.isArray(m.parts)) {
            return m.parts
                .filter((p: any) => p.type === 'text')
                .map((p: any) => p.text)
                .join('')
        }
        // Fallback to content (legacy)
        if (typeof m.content === 'string') return m.content
        return ''
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <RiRobot2Line />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white">Assistant Portfolio</h3>
                                    <p className="text-xs text-gray-400">Ask me anything about Mohamed</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-20 text-sm">
                                    <RiRobot2Line className="mx-auto text-3xl mb-2 opacity-50" />
                                    <p>Bonjour ! Je suis l&apos;assistant virtuel de Mohamed.</p>
                                    <p className="mt-1">Posez-moi des questions sur son parcours, ses compétences ou ses projets.</p>
                                </div>
                            )}
                            {chatError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                                    <p className="text-red-400 text-xs text-center">{chatError}</p>
                                </div>
                            )}
                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-accent text-primary rounded-tr-sm'
                                            : 'bg-white/10 text-gray-200 rounded-tl-sm'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{getMessageText(m)}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm min-w-[60px] flex items-center justify-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/5">
                            <div className="relative">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Posez votre question..."
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IoSend size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-accent text-primary shadow-lg shadow-accent/20 flex items-center justify-center hover:shadow-accent/40 transition-shadow"
            >
                <IoChatbubblesOutline size={24} />
            </motion.button>
        </div>
    )
}
