'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface ProjectProps {
  year: string
  title: string
  description: string
  index: number
  link?: string
}


function ProjectCard({ year, title, description, index, link }: ProjectProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  const Component = link ? motion.a : motion.div

  return (
    <Component
      href={link}
      target={link ? '_blank' : undefined}
      rel={link ? 'noopener noreferrer' : undefined}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}

      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-secondary/50 border border-[var(--border)] p-8 overflow-hidden group hover:bg-secondary/80 hover:border-accent hover:-translate-y-2 transition-all duration-300 card-3d"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute top-0 right-0 w-0 h-full bg-gradient-to-l from-accent/10 to-transparent"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 217, 255, 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="relative z-10">
        <motion.p
          className="text-xs text-accent uppercase tracking-wider mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
        >
          {year}
        </motion.p>

        <motion.h3
          className="font-serif text-xl font-bold mb-4 group-hover:text-accent transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-sm text-[var(--text-dim)] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
        >
          {description}
        </motion.p>

        {/* Decorative corner */}
        <motion.div
          className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: 20, y: 20 }}
          animate={isHovered ? { x: 0, y: 0 } : { x: 20, y: 20 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Component>

  )
}

export default function Projects() {
  const projects = [
    {
      year: '2025',
      title: 'Moteur de recherche sémantique pour la littérature scientifique',
      description:
        "Développement d'un moteur de recherche sémantique permettant aux chercheurs de découvrir instantanément les publications les plus pertinentes. Utilisation de NLP avancé pour analyser le contexte au-delà des simples mots-clés.",
      link: 'https://github.com/aitkherimed1228/Information-search-in-scientific-literature',
    },
    {
      year: '2025',
      title: "Identification automatique d'utilisateurs par traces d'usage",
      description:
        "Création d'un système de sécurité comportementale capable d'authentifier les utilisateurs via leurs interactions logicielles uniques. Une approche non-intrusive pour renforcer la protection des données.",
      link: 'https://github.com/aitkherimed1228/who-uses-my-application',
    },

    {
      year: '2024',
      title: 'Analyse de données financières avec Spark',
      description:
        "Architecture et implémentation d'un pipeline Big Data robuste sous PySpark, traitant des millions de transactions financières pour garantir la qualité et la disponibilité des données critiques.",
    },
    {
      year: '2024',
      title: 'Rapport Power BI et classification supervisée',
      description:
        "Mise en place d'un outil d'aide à la décision intégrant des prédictions ML directement dans Power BI. Transformation de données complexes en insights visuels actionnables pour les métiers.",
    },
    {
      year: '2023',
      title: 'Prévision de séries chronologiques avec XGBoost',
      description:
        'Modélisation prédictive de séries temporelles haute performance. Optimisation fine via XGBoost pour anticiper les tendances avec précision et soutenir la planification stratégique.',
    },
  ]

  return (
    <section id="projects" className="py-24 bg-primary/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl font-black mb-4">Projets Académiques</h2>
          <p className="text-[var(--text-dim)]">Innovations et recherche appliquée</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
