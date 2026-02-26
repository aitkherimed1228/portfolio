'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 bg-secondary/20">
      <div className="container-custom flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[var(--text)] mb-2">
            &copy; 2025 Mohamed AIT KHERI. Tous droits réservés.
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            Data Scientist & AI Engineer • Casablanca, Maroc
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 text-[10px] text-[var(--text-dim)]/50 uppercase tracking-widest"
        >
          <span>Développé avec Next.js</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-dim)]/30" />
          <span>Tailwind CSS</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-dim)]/30" />
          <span>Framer Motion</span>
        </motion.div>
      </div>
    </footer>
  )
}
