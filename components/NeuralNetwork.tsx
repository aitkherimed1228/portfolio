'use client'

import { motion } from 'framer-motion'

export default function NeuralNetwork() {
  const nodes = [
    // Layer 1
    { x: 50, y: 100, delay: 0 },
    { x: 50, y: 200, delay: 0.5 },
    { x: 50, y: 300, delay: 1 },
    // Layer 2
    { x: 150, y: 80, delay: 0.2 },
    { x: 150, y: 160, delay: 0.8 },
    { x: 150, y: 240, delay: 1.2 },
    { x: 150, y: 320, delay: 0.6 },
    // Layer 3
    { x: 250, y: 100, delay: 0.4 },
    { x: 250, y: 180, delay: 1.1 },
    { x: 250, y: 260, delay: 0.7 },
    // Layer 4
    { x: 350, y: 150, delay: 0.9 },
    { x: 350, y: 250, delay: 1.3 },
  ]

  const connections = [
    { x1: 50, y1: 100, x2: 150, y2: 80 },
    { x1: 50, y1: 100, x2: 150, y2: 160 },
    { x1: 50, y1: 200, x2: 150, y2: 160 },
    { x1: 50, y1: 200, x2: 150, y2: 240 },
    { x1: 50, y1: 300, x2: 150, y2: 240 },
    { x1: 50, y1: 300, x2: 150, y2: 320 },
    
    { x1: 150, y1: 80, x2: 250, y2: 100 },
    { x1: 150, y1: 160, x2: 250, y2: 100 },
    { x1: 150, y1: 160, x2: 250, y2: 180 },
    { x1: 150, y1: 240, x2: 250, y2: 180 },
    { x1: 150, y1: 240, x2: 250, y2: 260 },
    { x1: 150, y1: 320, x2: 250, y2: 260 },
    
    { x1: 250, y1: 100, x2: 350, y2: 150 },
    { x1: 250, y1: 180, x2: 350, y2: 150 },
    { x1: 250, y1: 180, x2: 350, y2: 250 },
    { x1: 250, y1: 260, x2: 350, y2: 250 },
  ]

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00d9ff', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ff6b35', stopOpacity: 0.8 }} />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      <g className="connections">
        {connections.map((conn, index) => (
          <motion.line
            key={`conn-${index}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="#00d9ff"
            strokeWidth="1"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
            transition={{
              duration: 3,
              delay: index * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </g>

      {/* Nodes */}
      <g className="nodes">
        {nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="8"
            fill="url(#grad1)"
            filter="url(#glow)"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + node.delay,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Data particles */}
      {[...Array(5)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          r="3"
          fill="#00d9ff"
          initial={{ cx: 50, cy: 100 + i * 50, opacity: 0 }}
          animate={{
            cx: [50, 150, 250, 350],
            cy: [100 + i * 50, 120 + i * 30, 180 + i * 20, 200],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  )
}
