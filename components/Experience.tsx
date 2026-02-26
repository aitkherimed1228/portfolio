'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cvData } from '@/lib/cv-data'

interface ExperienceProps {
  title: string
  company: string
  period: string
  location: string
  descriptions: string[]
  tags: string[]
  index: number
}

function ExperienceCard({ title, company, period, location, descriptions, tags, index }: ExperienceProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative bg-secondary/50 border border-[var(--border)] p-10 group hover:bg-secondary/80 hover:border-accent hover:translate-x-4 transition-all duration-300"
    >
      {/* Animated left border */}
      <motion.div
        className="absolute left-0 top-0 w-1 bg-gradient-to-b from-accent to-accent-warm h-0 group-hover:h-full transition-all duration-500"
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top right, rgba(0, 217, 255, 0.1), transparent 50%)',
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <motion.h3
              className="font-serif text-2xl font-bold text-accent mb-2"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {title}
            </motion.h3>
            <p className="text-lg text-[var(--text)] mb-1">{company}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--text-dim)]">{period}</p>
            <p className="text-sm text-[var(--text-dim)]">{location}</p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {descriptions.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
              className="pl-6 relative text-sm text-[var(--text-dim)] leading-relaxed"
            >
              <span className="absolute left-0 text-accent">▹</span>
              {desc}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent text-xs uppercase tracking-wide hover:bg-accent/20 hover:border-accent transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { experience: experiences } = cvData

  return (
    <section id="experience" className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl font-black mb-4">Expérience Professionnelle</h2>
          <p className="text-[var(--text-dim)]">Mon parcours en Data Science et IA</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
