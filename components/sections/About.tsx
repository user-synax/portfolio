'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { 
  Code, FileCode, Cpu, Zap, Database,
  Atom, Layers, Server, Box, Bolt,
  GitBranch, Container, Cloud, Rocket, PenTool,
  Palette, Layout, Play, Move3D, FileText,
  Terminal, Monitor, Package, Send, Globe, Image as ImageIcon
} from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'

// ============================================
// STATS CONFIGURATION - Edit values here
// ============================================
const STATS_CONFIG = {
  years: {
    initialValue: 0,
    targetValue: 0,
    suffix: ' years',
    label: 'Experience'
  },
  projects: {
    initialValue: 0,
    targetValue: 10,
    suffix: ' projects',
    label: 'Completed'
  },
  clients: {
    initialValue: 0,
    targetValue: 0,
    suffix: ' clients',
    label: 'Satisfied'
  }
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<{ years: number; projects: number; clients: number }>({
    years: STATS_CONFIG.years.initialValue,
    projects: STATS_CONFIG.projects.initialValue,
    clients: STATS_CONFIG.clients.initialValue,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid pattern
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: 20,
          y: 15,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      // Section heading clipPath reveal
      gsap.fromTo('.about-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 75%',
            scrub: false,
          }
        }
      )

      // Bio paragraphs stagger fade-up
      gsap.fromTo('.bio-paragraph',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bio-paragraph',
            start: 'top 75%',
            scrub: false,
          }
        }
      )

      // Skill items stagger fade-up
      gsap.fromTo('.skill-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skill-item',
            start: 'top 75%',
            scrub: false,
          }
        }
      )

      // Animated counters
      gsap.to(statsRef.current, {
        years: STATS_CONFIG.years.targetValue,
        projects: STATS_CONFIG.projects.targetValue,
        clients: STATS_CONFIG.clients.targetValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 75%',
          scrub: false,
        },
        onUpdate: () => {
          const yearsEl = document.getElementById('stat-years')
          const projectsEl = document.getElementById('stat-projects')
          const clientsEl = document.getElementById('stat-clients')
          if (yearsEl) yearsEl.textContent = `${Math.round(statsRef.current.years)}`
          if (projectsEl) projectsEl.textContent = `${Math.round(statsRef.current.projects)}`
          if (clientsEl) clientsEl.textContent = `${Math.round(statsRef.current.clients)}`
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ============================================
  // SKILLS CONFIGURATION - Edit values here
  // Top = Most important/hard skills (more items)
  // Bottom = Basic skills (fewer items)
  // ============================================
  const SKILLS_CONFIG = {
    tools: {
      label: 'Tools',
      items: [
        { name: 'Git', icon: 'GitBranch' },
        // { name: 'Docker', icon: 'Container' },
        // { name: 'AWS', icon: 'Cloud' },
        { name: 'Vercel', icon: 'Rocket' },
        { name: 'PostgreSQL', icon: 'Database' },
        { name: 'MongoDB', icon: 'Database' },
        { name: 'GitHub', icon: 'Globe' },
        { name: 'Linux', icon: 'Monitor' },
        // { name: 'Netlify', icon: 'Cloud' },
        { name: 'npm', icon: 'Package' },
        // { name: 'Postman', icon: 'Send' },
        { name: 'VSCode', icon: 'FileCode' },
      ]
    },
    languages: {
      label: 'Languages',
      items: [
        { name: 'TypeScript', icon: 'Code' },
        { name: 'JavaScript', icon: 'FileCode' },
        { name: 'Python', icon: 'Cpu' },
        { name: 'HTML5', icon: 'Code' },
        { name: 'CSS', icon: 'Layout' },
        { name: 'Bash', icon: 'Terminal' },
      ]
    },
    frameworks: {
      label: 'Frameworks',
      items: [
        { name: 'React', icon: 'Atom' },
        { name: 'Next.js', icon: 'Layers' },
        { name: 'Node.js', icon: 'Server' },
        { name: 'Express', icon: 'Box' },
        { name: 'Bootstrap', icon: 'Layout' },
      ]
    },
    design: {
      label: 'Design',
      items: [
        { name: 'TailwindCSS', icon: 'Palette' },
        { name: 'Figma', icon: 'PenTool' },
        { name: 'GSAP', icon: 'Play' },
        { name: 'Photoshop', icon: 'ImageIcon' },
      ]
    }
  }

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Code, FileCode, Cpu, Zap, Database,
    Atom, Layers, Server, Box, Bolt,
    GitBranch, Container, Cloud, Rocket, PenTool,
    Palette, Layout, Play, Move3D, FileText,
    Terminal, Monitor, Package, Send, Globe, ImageIcon
  }

  const SkillIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
    const Icon = iconMap[iconName]
    return Icon ? <Icon className={className} /> : null
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-12 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dot grid pattern background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-0.03"
          style={{
            backgroundImage: `radial-gradient(circle, #262626 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Left column - heading */}
          <div className="lg:col-span-5">
            <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-800 mb-4 block">
              <TextScramble text="002 / About" />
            </span>
            <h2 className="about-heading font-['var(--font-dm-serif)'] text-[clamp(40px,6vw,64px)] leading-[1.1] tracking-tight text-[#f0ede6]">
              Building digital experiences that matter
            </h2>
          </div>

          {/* Right column - bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="bio-paragraph font-['var(--font-dm-mono)'] text-base leading-relaxed text-neutral-400 mb-6">
              I'm a full-stack developer with a passion for creating elegant, user-centric digital products. My journey began with a curiosity about how things work on the web, which evolved into a career dedicated to crafting seamless experiences.
            </p>
            <p className="bio-paragraph font-['var(--font-dm-mono)'] text-base leading-relaxed text-neutral-400 mb-6">
              I specialize in modern web technologies, with expertise in React, Next.js, and TypeScript. I believe in writing clean, maintainable code and designing systems that scale.
            </p>
            <p className="bio-paragraph font-['var(--font-dm-mono)'] text-base leading-relaxed text-neutral-400">
              When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="stats-container grid grid-cols-1 sm:grid-cols-3 gap-8 mb-24">
          <div className="text-center">
            <div className="font-['var(--font-dm-serif)'] text-5xl text-[#f0ede6] mb-2">
              <span id="stat-years">{STATS_CONFIG.years.initialValue}</span>{STATS_CONFIG.years.suffix}
            </div>
            <div className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-neutral-600">
              {STATS_CONFIG.years.label}
            </div>
          </div>
          <div className="text-center">
            <div className="font-['var(--font-dm-serif)'] text-5xl text-[#f0ede6] mb-2">
              <span id="stat-projects">{STATS_CONFIG.projects.initialValue}</span>{STATS_CONFIG.projects.suffix}
            </div>
            <div className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-neutral-600">
              {STATS_CONFIG.projects.label}
            </div>
          </div>
          <div className="text-center">
            <div className="font-['var(--font-dm-serif)'] text-5xl text-[#f0ede6] mb-2">
              <span id="stat-clients">{STATS_CONFIG.clients.initialValue}</span>{STATS_CONFIG.clients.suffix}
            </div>
            <div className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-neutral-600">
              {STATS_CONFIG.clients.label}
            </div>
          </div>
        </div> */}

        {/* Skills pyramid */}
        <div className="flex flex-col items-center gap-8">
          <h3 className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-neutral-600 mb-4">
            Skills & Technologies
          </h3>
          
          {/* Pyramid structure */}
          <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
            {/* Level 1 - Tools (widest) */}
            <div className="skill-level flex flex-wrap justify-center gap-4 w-full">
              {SKILLS_CONFIG.tools.items.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item flex flex-col items-center justify-center gap-2 p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-[#10b981]/80 hover:bg-neutral-800/60 transition-all duration-300 w-24 h-24"
                >
                  <SkillIcon iconName={skill.icon} className="w-6 h-6 text-[#10b981]" />
                  <span className="font-['var(--font-dm-mono)'] text-[10px] text-neutral-400 text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Level 2 - Languages */}
            <div className="skill-level flex flex-wrap justify-center gap-4 w-full max-w-3xl">
              {SKILLS_CONFIG.languages.items.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item flex flex-col items-center justify-center gap-2 p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-[#c8a97e]/80 hover:bg-neutral-800/60 transition-all duration-300 w-24 h-24"
                >
                  <SkillIcon iconName={skill.icon} className="w-6 h-6 text-[#c8a97e]" />
                  <span className="font-['var(--font-dm-mono)'] text-[10px] text-neutral-400 text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Level 3 - Frameworks */}
            <div className="skill-level flex flex-wrap justify-center gap-4 w-full max-w-2xl">
              {SKILLS_CONFIG.frameworks.items.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item flex flex-col items-center justify-center gap-2 p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-[#8b5cf6]/80 hover:bg-neutral-800/60 transition-all duration-300 w-24 h-24"
                >
                  <SkillIcon iconName={skill.icon} className="w-6 h-6 text-[#8b5cf6]" />
                  <span className="font-['var(--font-dm-mono)'] text-[10px] text-neutral-400 text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Level 4 - Design (narrowest) */}
            <div className="skill-level flex flex-wrap justify-center gap-4 w-full max-w-xl">
              {SKILLS_CONFIG.design.items.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item flex flex-col items-center justify-center gap-2 p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-[#ec4899]/80 hover:bg-neutral-800/60 transition-all duration-300 w-24 h-24"
                >
                  <SkillIcon iconName={skill.icon} className="w-6 h-6 text-[#ec4899]" />
                  <span className="font-['var(--font-dm-mono)'] text-[10px] text-neutral-400 text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
