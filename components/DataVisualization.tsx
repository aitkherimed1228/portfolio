'use client'

import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

/* ── Interactive Network Graph ──────────────────────── */
function NetworkGraph() {
    const [activeNode, setActiveNode] = useState<number | null>(null)

    const { nodes, edges } = useMemo(() => {
        const rand = (s: number) => {
            const x = Math.sin(s * 127.1 + 311.7) * 43758.5453
            return x - Math.floor(x)
        }

        const clusters = [
            { x: 100, y: 100, color: '#60a5fa', name: 'Data', id: 0 },
            { x: 300, y: 80, color: '#34d399', name: 'Model', id: 1 },
            { x: 80, y: 240, color: '#f472b6', name: 'Insights', id: 2 },
            { x: 280, y: 220, color: '#fbbf24', name: 'Deploy', id: 3 },
        ]

        const allNodes: any[] = []
        const allEdges: any[] = []
        let nodeId = 0

        // Create clusters
        clusters.forEach((cluster) => {
            // Hub
            allNodes.push({
                x: cluster.x,
                y: cluster.y,
                r: 16,
                color: cluster.color,
                id: nodeId++,
                isHub: true,
                clusterName: cluster.name
            })
            const hubId = nodeId - 1

            // Satellites
            const count = 8 + Math.floor(rand(cluster.x) * 4)
            for (let i = 0; i < count; i++) {
                const angle = rand(nodeId * 7) * Math.PI * 2
                const dist = 30 + rand(nodeId * 3) * 30
                allNodes.push({
                    x: cluster.x + Math.cos(angle) * dist,
                    y: cluster.y + Math.sin(angle) * dist,
                    r: 4 + rand(nodeId) * 3,
                    color: cluster.color,
                    id: nodeId++,
                    isHub: false,
                })
                // Edge to hub
                allEdges.push({ a: hubId, b: nodeId - 1, color: cluster.color, width: 1.5 })
                // Random connection to neighbor
                if (i > 0 && rand(nodeId) > 0.6) {
                    allEdges.push({ a: nodeId - 1, b: nodeId - 2, color: cluster.color, width: 0.5 })
                }
            }
        })

        // Connect Hubs
        const hubs = allNodes.filter(n => n.isHub)
        for (let i = 0; i < hubs.length; i++) {
            for (let j = i + 1; j < hubs.length; j++) {
                allEdges.push({ a: hubs[i].id, b: hubs[j].id, color: 'var(--border)', width: 1, isHubLink: true })
            }
        }

        return { nodes: allNodes, edges: allEdges }
    }, [])

    return (
        <svg viewBox="0 0 400 340" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Edges */}
            {edges.map((edge, i) => {
                const na = nodes.find(n => n.id === edge.a)
                const nb = nodes.find(n => n.id === edge.b)
                if (!na || !nb) return null

                // Check if edge should be active (propagation)
                const isRelatedToActive = activeNode !== null && (edge.a === activeNode || edge.b === activeNode || (na.isHub && nb.isHub))

                return (
                    <g key={`e-${i}`}>
                        <motion.line
                            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                            stroke={edge.color}
                            strokeWidth={edge.width}
                            strokeOpacity={0.2}
                            animate={{
                                strokeOpacity: isRelatedToActive ? 0.6 : 0.2,
                                strokeWidth: isRelatedToActive ? edge.width * 2 : edge.width
                            }}
                        />
                        {/* Propagating Particle */}
                        {(edge.isHubLink || isRelatedToActive) && (
                            <motion.circle
                                r={edge.isHubLink ? 3 : 2}
                                fill={edge.color === 'var(--border)' ? '#fff' : edge.color}
                                initial={{ opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: [0, 1, 0],
                                    cx: [na.x, nb.x],
                                    cy: [na.y, nb.y]
                                }}
                                transition={{
                                    duration: 1.5 + i % 2, // Randomize slightly
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 0.5
                                }}
                            />
                        )}
                    </g>
                )
            })}

            {/* Nodes (Interactive) */}
            {nodes.map((node, i) => (
                <motion.g
                    key={`n-${i}`}
                    onHoverStart={() => setActiveNode(node.id)}
                    onHoverEnd={() => setActiveNode(null)}
                    whileHover={{ scale: 1.2 }}
                    style={{ cursor: 'pointer' }}
                >
                    {node.isHub && (
                        <motion.circle
                            cx={node.x} cy={node.y} r={node.r * 2.5}
                            fill={node.color}
                            initial={{ opacity: 0.1 }}
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    )}
                    <circle
                        cx={node.x} cy={node.y} r={node.r}
                        fill={node.color}
                        fillOpacity={node.isHub ? 0.8 : 0.5}
                        stroke={node.color}
                        strokeWidth={node.isHub ? 2 : 0}
                    />
                    {node.isHub && (
                        <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fill="#000" fontWeight="bold" style={{ pointerEvents: 'none' }}>
                            {node.clusterName?.substring(0, 1)}
                        </text>
                    )}
                </motion.g>
            ))}

            {/* Floating Labels */}
            {nodes.filter(n => n.isHub).map((node, i) => (
                <text key={`l-${i}`} x={node.x} y={node.y - 25} textAnchor="middle" fill={node.color} fontSize="12" fontWeight="bold" style={{ opacity: 0.8 }}>
                    {node.clusterName}
                </text>
            ))}
        </svg>
    )
}

/* ── Full Terminal ──────────────────────────────────── */
function MacTerminal() {
    const [lines, setLines] = useState<any[]>([])

    // Full, explicit training log without cuts
    const fullLog = [
        { text: '$ python train_model.py --config production.yaml', color: '#e2e8f0' },
        { text: '>> TensorFlow 2.14.0 detected. GPU available.', color: '#60a5fa' },
        { text: '>> Loading dataset: financial_market_data.csv', color: '#94a3b8' },
        { text: '   [INFO] Cleaned 42,819 rows. 0 null values.', color: '#94a3b8' },
        { text: '>> Building Transformer architecture...', color: '#fbbf24' },
        { text: '   Layers: 12  |  Heads: 8  |  Embedding: 512', color: '#94a3b8' },
        { text: '>> Starting training sequence...', color: '#34d399' },
        { text: '   Epoch 1/5  loss: 0.8421  acc: 0.6510', color: '#94a3b8' },
        { text: '   Epoch 2/5  loss: 0.5218  acc: 0.7892', color: '#94a3b8' },
        { text: '   Epoch 3/5  loss: 0.3105  acc: 0.8654', color: '#94a3b8' },
        { text: '   Epoch 4/5  loss: 0.1420  acc: 0.9128', color: '#94a3b8' },
        { text: '   Epoch 5/5  loss: 0.0892  acc: 0.9473', color: '#34d399' },
        { text: '>> Validating model robustness...', color: '#fbbf24' },
        { text: '   Precision: 93.8% | Recall: 91.2% | F1: 92.9%', color: '#34d399' },
        { text: '>> Model saved to /deploy/models/v2', color: '#60a5fa' },
        { text: '$ _', color: '#e2e8f0', blink: true },
    ]

    useEffect(() => {
        let delay = 0
        // Reset lines on mount
        setLines([])

        fullLog.forEach((line, index) => {
            setTimeout(() => {
                setLines(prev => {
                    // Keep only last 10 lines to prevent overflow if overly long, 
                    // or allow valid scroll. User asked for "sans coupage", so let's show all but scroll if needed.
                    return [...prev, line]
                })
            }, delay)
            delay += 800 // consistent pace
        })
    }, [])

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-2xl bg-[#0f1115] border border-white/5 w-full">
            {/* Title Bar */}
            <div className="flex items-center px-4 py-3 bg-[#1a1b1e] border-b border-white/5 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="ml-4 text-[11px] text-gray-500 font-mono flex-1 truncate">
                    admin@portfolio ~ zsh
                </div>
            </div>

            {/* Terminal Content - scrollable, wrapping text */}
            <div className="flex-1 p-4 font-mono text-[12px] leading-relaxed overflow-y-auto custom-scrollbar">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="whitespace-pre-wrap break-words mb-1" // Ensure wrapping
                        style={{ color: line.color }}
                    >
                        {line.text}
                        {line.blink && (
                            <motion.span
                                className="inline-block w-2.5 h-4 bg-white/70 align-middle ml-1"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/* ── Main Layout ────────────────────────────────────── */
export default function DataVisualization() {
    return (
        <div className="relative w-full h-full flex flex-col gap-6 p-1">
            {/* Interactive Graph */}
            <motion.div
                className="flex-[1.5] border border-[var(--border)] rounded-2xl bg-[var(--surface)] backdrop-blur-md relative overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-semibold">Interactive Topology</span>
                </div>
                <NetworkGraph />
            </motion.div>

            {/* Terminal */}
            <motion.div
                className="flex-1 min-h-[240px] shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <MacTerminal />
            </motion.div>
        </div>
    )
}
