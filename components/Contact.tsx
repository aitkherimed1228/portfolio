'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null)

  const contactLinks = [
    { icon: '✉', label: 'Email', href: 'mailto:medaitkheri@gmail.com', text: 'medaitkheri@gmail.com' },
    { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-ait-kheri-75b1a1253/', text: 'LinkedIn' },
    { icon: '💻', label: 'GitHub', href: 'https://github.com/aitkherimed1228', text: 'GitHub' },
    { icon: '📞', label: 'Téléphone', href: 'tel:+33754886856', text: '+33 7 54 88 68 56' },
  ]

  return (
    <section id="contact" className="py-24 bg-primary/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            className="font-serif text-5xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Travaillons <span className="text-gradient">Ensemble</span>
          </motion.h2>

          <motion.p
            className="text-lg text-[var(--text-dim)] mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Je suis actuellement à la recherche d&apos;un stage de fin d&apos;études de 6 mois en Data Science.
            N&apos;hésitez pas à me contacter pour discuter d&apos;opportunités ou de collaboration.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {contactLinks.map((link, index) => {
              const isPhone = link.label === 'Téléphone'
              const Component = isPhone ? motion.div : motion.a

              return (
                <Component
                  key={link.label}
                  href={isPhone ? undefined : link.href}
                  target={!isPhone && link.href.startsWith('http') ? '_blank' : undefined}
                  rel={!isPhone && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onHoverStart={() => setHoveredLink(index)}
                  onHoverEnd={() => setHoveredLink(null)}
                  whileHover={!isPhone ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!isPhone ? { scale: 0.95 } : {}}
                  className={`relative p-6 bg-secondary/50 border border-[var(--border)] transition-all duration-300 overflow-hidden group ${isPhone ? 'cursor-default' : 'hover:bg-secondary/80 hover:border-accent cursor-pointer'
                    }`}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0"
                    initial={{ x: '-100%' }}
                    animate={hoveredLink === index && !isPhone ? { x: '100%' } : { x: '-100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      className="text-4xl"
                      animate={hoveredLink === index && !isPhone ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {link.icon}
                    </motion.div>

                    <div className="text-left">
                      <div className="text-xs text-accent uppercase tracking-wider mb-1">{link.label}</div>
                      <div className={`text-sm text-[var(--text)] font-mono transition-colors ${!isPhone ? 'group-hover:text-accent' : ''}`}>
                        {link.text}
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  {!isPhone && (
                    <motion.div
                      className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: 10, y: -10 }}
                      animate={hoveredLink === index ? { x: 0, y: 0 } : { x: 10, y: -10 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Component>
              )
            })}
          </motion.div>

          {/* Floating particles effect */}
          <div className="relative mt-16 h-32">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
