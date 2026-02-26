'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cvData } from '@/lib/cv-data'
import {
  SiPython, SiC, SiCplusplus, SiR, SiApachespark, SiPandas, SiNumpy,
  SiPytorch, SiTensorflow, SiGit, SiDocker, SiKubernetes,
  SiGooglecloud, SiDatabricks, SiDataiku, SiApacheairflow,
  SiScikitlearn
} from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'
import { TbSql, TbChartDots, TbChartArea } from 'react-icons/tb'
import { LuBrain, LuMessageSquareCode, LuDatabaseBackup, LuNetwork } from 'react-icons/lu'
import { VscAzure } from 'react-icons/vsc'

// Mapping for skills to icons
const skillIcons: { [key: string]: any } = {
  'Python': SiPython,
  'Java': FaJava,
  'C': SiC,
  'C++': SiCplusplus,
  'SQL': TbSql,
  'R': SiR,
  'PySpark': SiApachespark,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'SQLAlchemy': FaDatabase,
  'Scikit-fuzzy': SiScikitlearn, // Using Scikit-learn as proxy or generic
  'PyCaret': LuBrain,
  'PyTorch': SiPytorch,
  'TensorFlow': SiTensorflow,
  'LLMs': LuMessageSquareCode,
  'RAG': LuDatabaseBackup,
  'MCP': LuNetwork,
  'Power BI': TbChartDots, // Generic chart icon
  'Matplotlib': TbChartDots,
  'Seaborn': TbChartArea,
  'Git': SiGit,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Azure': VscAzure,
  'GCP': SiGooglecloud,
  'Databricks': SiDatabricks,
  'Dataiku': SiDataiku,
  'Airflow': SiApacheairflow
}

interface SkillCategoryProps {
  title: string
  skills: string[]
  index: number
}

function SkillCategory({ title, skills, index }: SkillCategoryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-secondary/50 border border-[var(--border)] p-8 hover:bg-secondary/80 hover:border-accent transition-all duration-300 group"
    >
      <motion.h3
        className="font-serif text-xl mb-6 text-accent group-hover:text-accent-warm transition-colors"
        whileHover={{ x: 10 }}
      >
        {title}
      </motion.h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => {
          const Icon = skillIcons[skill] || LuBrain // Default icon if not found

          return (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-accent/5 border border-accent/20 text-sm text-[var(--text-dim)] hover:bg-accent/15 hover:text-accent hover:border-accent transition-all cursor-default flex items-center gap-2"
            >
              <Icon className="text-lg" />
              {skill}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}

function EducationCard({ year, title, institution, location, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="bg-secondary/50 border border-[var(--border)] p-10 grid md:grid-cols-[auto_1fr] gap-8 hover:bg-secondary/80 hover:border-accent transition-all duration-300 group"
    >
      <motion.div
        className="font-serif text-4xl font-black text-accent min-w-[120px]"
        whileHover={{ scale: 1.1, rotate: -5 }}
      >
        {year}
      </motion.div>

      <div>
        <h3 className="font-serif text-2xl mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-[var(--text-dim)] mb-1">{institution}</p>
        <p className="text-sm text-[var(--text-dim)]">{location}</p>
      </div>
    </motion.div>
  )
}

function CertificationItem({ text, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-secondary/50 border border-[var(--border)] p-6 flex items-center gap-4 hover:bg-secondary/80 hover:border-accent hover:translate-x-4 transition-all duration-300 group"
    >
      <motion.div
        className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent-warm flex items-center justify-center font-bold text-primary flex-shrink-0"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        ✓
      </motion.div>
      <p className="text-sm text-[var(--text-dim)] group-hover:text-accent transition-colors">{text}</p>
    </motion.div>
  )
}

export default function Skills() {
  const { skills: { categories: skillCategories }, education, certifications } = cvData

  return (
    <section id="skills" className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl font-black mb-4">Compétences Techniques</h2>
          <p className="text-[var(--text-dim)]">Technologies et outils maîtrisés</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} {...category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-serif text-4xl font-black mb-4">Formation</h3>
        </motion.div>

        <div className="space-y-8 mb-24">
          {education.map((edu, index) => (
            <EducationCard key={edu.title} {...edu} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-serif text-4xl font-black mb-4">Certifications</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationItem key={cert} text={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
