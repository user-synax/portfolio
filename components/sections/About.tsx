'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { 
  Code, FileCode, Cpu, Zap, Database,
  Atom, Layers, Server, Box, Bolt,
  GitBranch, Container, Cloud, Rocket, PenTool,
  Palette, Layout, Play, Move3D, FileText,
  Terminal, Monitor, Package, Send, Globe, Image as ImageIcon
} from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'
import { GitHubCalendar } from 'react-github-calendar'

// Custom GitHub Contribution Grid (fetches data without script tags)
function GitHubContributionGrid({ username }: { username: string }) {
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Use GitHub's public GraphQL API via a CORS proxy
        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `
        
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        if (!response.ok) {
          throw new Error('GitHub API request failed')
        }

        const data = await response.json()
        const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
        
        // Flatten all days
        const allDays = weeks.flatMap((week: any) => week.contributionDays)
        
        // Filter to last 6 months
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        
        const filteredDays = allDays.filter((day: any) => {
          return new Date(day.date) >= sixMonthsAgo
        })

        setContributions(filteredDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount
        })))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching contributions:', error)
        // Fall back to mock data if API fails
        generateMockData()
      }
    }

    const generateMockData = () => {
      const data: { date: string; count: number }[] = []
      const today = new Date()
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      let currentDate = new Date(sixMonthsAgo)
      while (currentDate <= today) {
        const dayOfWeek = currentDate.getDay()
        let count = 0

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          count = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * 3)
        } else {
          const random = Math.random()
          if (random < 0.3) {
            count = 0
          } else if (random < 0.6) {
            count = Math.floor(Math.random() * 4) + 1
          } else if (random < 0.85) {
            count = Math.floor(Math.random() * 5) + 4
          } else {
            count = Math.floor(Math.random() * 6) + 8
          }
        }

        data.push({
          date: currentDate.toISOString().split('T')[0],
          count
        })

        currentDate.setDate(currentDate.getDate() + 1)
      }

      setContributions(data)
      setLoading(false)
    }

    fetchContributions()
  }, [username])

  const getLevelColor = (count: number) => {
    if (count === 0) return 'bg-[#161b22]'
    if (count <= 2) return 'bg-[#0e4429]'
    if (count <= 4) return 'bg-[#006d32]'
    if (count <= 6) return 'bg-[#26a641]'
    return 'bg-[#39d353]'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Group by week for display
  const weeks: { date: string; count: number }[][] = []
  let currentWeek: { date: string; count: number }[] = []

  contributions.forEach((contrib) => {
    const dayOfWeek = new Date(contrib.date).getDay()
    
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    
    currentWeek.push(contrib)
  })
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Month labels */}
      <div className="flex gap-1 mb-2 justify-center">
        {weeks.filter((_, i) => i % 4 === 0).map((week, index) => {
          const monthDate = new Date(week[0]?.date || new Date())
          const monthName = monthDate.toLocaleString('default', { month: 'short' })
          return (
            <span key={index} className="text-[10px] text-neutral-500 font-['var(--font-dm-mono)'] uppercase">
              {monthName}
            </span>
          )
        })}
      </div>
      
      {/* Contribution grid */}
      <div className="flex gap-1 justify-center">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((contrib) => (
              <div
                key={contrib.date}
                className={`w-3 h-3 rounded-full ${getLevelColor(contrib.count)} transition-colors duration-200`}
                title={`${contrib.count} contributions on ${contrib.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

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

      // GitHub calendar fade-up
      gsap.fromTo('.github-calendar',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.github-calendar',
            start: 'top 75%',
            scrub: false,
          }
        }
      )
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

          {/* GitHub Contribution Calendar */}
          <div className="github-calendar w-full max-w-4xl mt-20">
            <p className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-neutral-600 mb-8 text-center">
              [ github stats ]
            </p>
            <div className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl p-6">
              <GitHubCalendar
                username="user-synax"
                year={new Date().getFullYear()}
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                showTotalCount={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
