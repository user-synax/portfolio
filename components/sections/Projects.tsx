'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer'
import { ArrowUpRight } from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'

interface Project {
  id: string
  number: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  year: string
  link?: string
  sourceCode?: string
  image?: string
}

// ============================================
// PROJECTS CONFIGURATION - Edit values here
// ============================================
const PROJECTS_CONFIG: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'campusX - Social media for students',
    description: 'Full-stack social media with real-time feed',
    longDescription: `What is CampusX?
Every Indian college student lives across 5 different platforms — WhatsApp for updates, Instagram for photos, LinkedIn for fake achievements, Telegram for notes, and Google Forms for events. None of them are built for students.
CampusX is a student-only social network where you need a verified college email to join. Real identity. Real campus community. No recruiters, no ads, no noise — just your college, your people, and your content.`,
    tech: ['Next.js', 'MongoDB', 'React Router', 'ShadCN', 'TailwindCSS', 'Much more '],
    year: '2026',
    link: 'https://campus-x-rho.vercel.app',
    sourceCode: 'https://github.com/user-synax/campusX  ',
    image: '/projects/ecommerce.jpg',
  },
  {
    id: '2',
    number: '02',
    title: 'Scout Forge',
    description: 'ScoutForge — VC Intelligence Platform',
    longDescription: 'ScoutForge is a VC intelligence platform that helps investors and startups connect. It provides real-time market insights, funding trends, and investment opportunities.',
    tech: ['Next.js', 'typescript', 'tailwind css', 'google gemini 1.5 flash', 'localstorage'],
    year: '2026',
    link: 'https://scout-forge-six.vercel.app',
    sourceCode: 'https://github.com/user-synax/scout-forge',
    image: '/projects/ai-content.jpg',
  },
  {
    id: '3',
    number: '03',
    title: 'Tare Chat - web app',
    description: 'AI-powered chat application',
    longDescription: 'Tare Chat is a real time chat application that helps users with their daily tasks. It provides real-time chat, voice call and secure environment for communication.',
    tech: ['Next.js', 'javascript', 'tailwind css', 'mongoDB', 'socket.io'],
    year: '2026',
    link: 'https://tare-chat.vercel.app',
    sourceCode: 'https://github.com/user-synax/tare-chat',
    image: '/projects/analytics.jpg',
  },
  {
    id: '4',
    number: '04',
    title: 'Stock Ease - shop inventory web app',
    description: 'Smart Inventory & Stock Management Web App',
    longDescription: 'Stock Ease is a shop inventory web app that helps users with their daily tasks. It provides real-time inventory tracking, sales analytics, and customer management.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Localstorage', 'Gsap'],
    year: '2026',
    link: 'https://stock-ease.netlify.app',
    sourceCode: 'https://github.com/user-synax/Stock-Ease',
    image: '/projects/stock-ease.jpg',
  },
  {
    id: '5',
    number: '05',
    title: 'Life Os - Personal Dashboard',
    description: 'Personal Dashboard for managing daily tasks and activities',
    longDescription: 'Life Os is a personal dashboard that helps users manage their daily tasks and activities. It provides real-time task tracking, productivity analytics, and habit tracking.',
    tech: ['Next.js', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Socket.io', 'JWT'],
    year: '2026',
    link: 'https://life-os-rho.netlify.app/',
    sourceCode: 'https://github.com/user-synax/Life-OS',
    image: '/projects/life-os.jpg',
  },
]

// ============================================
// EXPERIENCE CONFIGURATION - Edit values here
// ============================================
const EXPERIENCE_CONFIG = [
  {
    company: 'FCIT',
    role: 'Full-Stack Developer Internship',
    period: '2026 (3 months)',
    description: 'Full-stack developer teacher internship at the institute, mentoring students and building practical projects.',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const projects = PROJECTS_CONFIG
  const experience = EXPERIENCE_CONFIG

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
      // Section heading clip reveal
      gsap.fromTo('.projects-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.projects-heading',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Project cards stagger fade-up
      gsap.fromTo('.project-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-card',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Timeline line draw
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.timeline-line',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Timeline entries stagger reveal
      gsap.fromTo('.timeline-entry',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-entry',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardRefs.current[index]
    const arrow = card?.querySelector('.project-arrow')

    if (isEntering) {
      gsap.to(card, {
        borderColor: 'rgba(200, 169, 126, 1)',
        duration: 0.3,
        ease: 'power2.out',
      })
      if (arrow) {
        gsap.to(arrow, {
          rotation: 45,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    } else {
      gsap.to(card, {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      })
      if (arrow) {
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-12 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient grid pattern background */}
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
        {/* Section heading */}
        <div className="mb-20">
          <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-800 mb-4 block">
            <TextScramble text="003 / Work" />
          </span>
          <h2 className="projects-heading font-['var(--font-dm-serif)'] text-[clamp(40px,6vw,64px)] leading-[1.1] tracking-tight text-[#f0ede6]">
            Selected Projects
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
          {projects.map((project, index) => (
            <Drawer key={project.id}>
              <DrawerTrigger asChild>
                <Card
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="project-card cursor-pointer border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-800/20 p-6 transition-all duration-300 hover:border-[#c8a97e] relative overflow-hidden group"
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c8a97e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <CardContent className="p-0 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-[#c8a97e]">
                        {project.number}
                      </span>
                      <span className="font-['var(--font-dm-mono)'] text-xs text-neutral-500">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="font-['var(--font-dm-serif)'] text-2xl text-[#f0ede6] mb-2 group-hover:text-[#c8a97e] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-['var(--font-dm-mono)'] text-sm text-neutral-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-['var(--font-dm-mono)'] text-xs bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-[#c8a97e]/50 hover:text-[#c8a97e] transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="font-['var(--font-dm-mono)'] text-xs bg-neutral-800/50 border-neutral-700 text-neutral-300"
                        >
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#c8a97e] group-hover:gap-3 transition-all duration-300">
                      <ArrowUpRight className="project-arrow w-4 h-4 transition-transform" />
                      <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider">
                        View details
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DrawerTrigger>
              <DrawerContent className="bg-[#0a0a0a] border-[#262626] max-h-[85vh] before:bg-[#171717] text-[#f0ede6]">
                <DrawerTitle className="sr-only">
                  {selectedProject?.title || 'Project Details'}
                </DrawerTitle>
                <div className="max-w-2xl mx-auto p-6 md:p-8 overflow-y-auto pb-24">
                  {selectedProject && (
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-600">
                          {selectedProject.number}
                        </span>
                        <span className="font-['var(--font-dm-mono)'] text-xs text-neutral-500">
                          {selectedProject.year}
                        </span>
                      </div>
                      <h3 className="font-['var(--font-dm-serif)'] text-2xl md:text-3xl text-[#f0ede6] mb-4">
                        {selectedProject.title}
                      </h3>
                      <p className="font-['var(--font-dm-mono)'] text-sm md:text-base text-neutral-400 mb-6 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="font-['var(--font-dm-mono)'] text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {selectedProject.link && (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live demo of ${selectedProject.title}`}
                            className="px-6 py-3 bg-[#f0ede6] text-[#0a0a0a] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-sm hover:bg-[#c8a97e] transition-colors text-center"
                          >
                            View Live
                          </a>
                        )}
                        {selectedProject.sourceCode && (
                          <a
                            href={selectedProject.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source code of ${selectedProject.title}`}
                            className="px-6 py-3 border border-neutral-700 text-neutral-400 font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-sm hover:border-neutral-500 hover:text-neutral-300 transition-colors text-center"
                          >
                            Source Code
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="relative">
          <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-800 mb-8 block">
            004 / Experience
          </span>
          <h2 className="font-['var(--font-dm-serif)'] text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-tight text-[#f0ede6] mb-16">
            Work History
          </h2>

          <div className="relative pl-8">
            {/* Vertical timeline line */}
            <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-neutral-800" />

            {/* Timeline entries */}
            <div className="space-y-12">
              {experience.map((item, index) => (
                <div key={index} className="timeline-entry relative">
                  <div className="absolute -left-[31px] top-2 w-3 h-3 bg-[#0a0a0a] border-2 border-[#c8a97e] rounded-full" />
                  <div className="mb-2">
                    <h3 className="font-['var(--font-dm-serif)'] text-xl text-[#f0ede6]">
                      {item.company}
                    </h3>
                    <p className="font-['var(--font-dm-mono)'] text-sm text-neutral-500 uppercase tracking-wider">
                      {item.role}
                    </p>
                  </div>
                  <p className="font-['var(--font-dm-mono)'] text-xs text-neutral-600 mb-3">
                    {item.period}
                  </p>
                  <p className="font-['var(--font-dm-mono)'] text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* More experience coming soon */}
            <div className="mt-16 text-center">
              <p className="font-['var(--font-dm-mono)'] text-sm text-neutral-500 mb-6">
                Getting into this field — more experience coming soon
              </p>

              {/* Hire me buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/918826343179"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hire me on WhatsApp"
                  className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-black font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Hire Me on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
