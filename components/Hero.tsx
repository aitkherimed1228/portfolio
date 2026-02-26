'use client'

import { motion } from 'framer-motion'
import DataVisualization from './DataVisualization'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="about" className="min-h-screen flex items-center pt-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column — text + photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile photo + name block */}
            <div className="flex items-center gap-5 mb-8">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--accent)]/30 ring-4 ring-[var(--accent)]/10">
                  <img
                    src="/images/Cv_profil.jpg"
                    alt="Mohamed AIT KHERI"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online dot */}
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-[var(--primary)]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-sm text-[var(--accent)] font-medium tracking-wide uppercase">Disponible</p>
                <p className="text-sm text-[var(--text-dim)]">Stage de fin d&apos;études</p>
              </motion.div>
            </div>

            <motion.h1
              className="font-serif text-5xl md:text-7xl font-black leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              Mohamed <span className="text-gradient">AIT KHERI</span>
            </motion.h1>

            <motion.p
              className="text-xl text-[var(--text-dim)] mb-2 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Data Scientist & AI Engineer
            </motion.p>

            <motion.p
              className="text-base text-[var(--text-dim)] mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              Ingénieur en devenir, je combine rigueur mathématique et créativité
              pour concevoir des systèmes d&apos;IA performants et éthiques.
              Au-delà des algorithmes, je m&apos;intéresse à la valeur
              concrète qu&apos;ils apportent.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="magnetic px-8 py-3 bg-gradient-to-r from-accent to-accent-warm text-primary font-bold uppercase tracking-wider text-sm relative overflow-hidden group rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Me contacter</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('projects')}
                className="magnetic px-8 py-3 border border-[var(--border)] text-[var(--text)] uppercase tracking-wider text-sm hover:border-accent hover:text-accent transition-all duration-300 hover-lift rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir mes projets
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right column — animation */}
          <motion.div
            className="h-[550px] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <DataVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
