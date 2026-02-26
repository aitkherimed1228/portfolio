'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface StatProps {
  number: string
  label: string
  delay: number
}

function StatCard({ number, label, delay }: StatProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const finalNumber = parseInt(number.replace('+', ''))

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = finalNumber
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, finalNumber])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center p-8 bg-secondary/50 border border-[var(--border)] hover:bg-secondary/80 hover:border-accent hover:-translate-y-2 transition-all duration-300 hover-lift group"
    >
      <motion.div
        className="font-serif text-5xl font-black text-gradient mb-2"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.5, type: "spring" }}
      >
        {count}+
      </motion.div>
      <div className="text-sm text-[var(--text-dim)] uppercase tracking-wider group-hover:text-accent transition-colors">
        {label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const stats = [
    { number: '3+', label: "Années d'études" },
    { number: '6+', label: 'Projets Data' },
    { number: '5', label: 'Certifications' },
    { number: '3', label: 'Stages' },
  ]

  return (
    <section className="py-16 border-t border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
