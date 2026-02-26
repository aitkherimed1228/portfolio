'use client'

import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  return (
    <>
      <CustomCursor />

      {/* Background elements */}
      <ParticleBackground />
      <div className="bg-dot-grid" />
      <div className="bg-scan" />
      <div className="bg-grain" />

      {/* Main content */}
      <Navigation />

      <main className="relative">
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
