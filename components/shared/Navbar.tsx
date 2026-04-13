'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Menu, X } from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page load animation - fade in and slide down
      gsap.fromTo(navRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        }
      )

      // Add backdrop-blur and border on scroll
      gsap.fromTo(navRef.current,
        { backdropFilter: 'blur(0px)', borderColor: 'transparent' },
        {
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: navRef.current,
            start: 'top 10',
            end: 'top 50',
            toggleActions: 'play reverse play reverse',
            scrub: true,
          }
        }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      const ctx = gsap.context(() => {
        // Animate menu overlay in
        gsap.fromTo('.mobile-menu-overlay',
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )

        // Animate nav links with text fill effect
        gsap.fromTo('.mobile-nav-link',
          { opacity: 0, y: 50, backgroundPosition: '200% center' },
          {
            opacity: 1,
            y: 0,
            backgroundPosition: '0% center',
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          }
        )
      }, mobileMenuRef)
      return () => ctx.revert()
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-12 py-6 flex justify-between items-center relative">
          {/* Blur drop effect */}
          <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl blur-md rounded-xl -z-10" />
          
          <a
            href="#hero"
            onClick={(e) => {
              handleSmoothScroll(e, '#hero')
              // Trigger easter egg on logo tap (mobile)
              if ((window as any).handleLogoTap) {
                (window as any).handleLogoTap()
              }
            }}
            className="font-['var(--font-dm-serif)'] text-2xl text-[#f0ede6] hover:text-[#c8a97e] transition-colors relative z-10"
          >
            Ayush
          </a>
          
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center relative z-10">
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-400 hover:text-[#f0ede6] transition-colors"
            >
              <TextScramble text="About" />
            </a>
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-400 hover:text-[#f0ede6] transition-colors"
            >
              <TextScramble text="Work" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-400 hover:text-[#f0ede6] transition-colors"
            >
              <TextScramble text="Contact" />
            </a>
            <a
              href="https://github.com/user-synax"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#f0ede6] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-10 text-neutral-400 hover:text-[#f0ede6] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="mobile-menu-overlay fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center"
        >
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-12 text-neutral-400 hover:text-[#f0ede6] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col gap-12 text-center">
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="mobile-nav-link font-['var(--font-dm-serif)'] text-6xl md:text-7xl text-[#f0ede6] hover:text-[#c8a97e] transition-colors"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #f0ede6 50%, transparent 50%)',
                backgroundSize: '200% 100%',
              }}
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
              className="mobile-nav-link font-['var(--font-dm-serif)'] text-6xl md:text-7xl text-[#f0ede6] hover:text-[#c8a97e] transition-colors"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #f0ede6 50%, transparent 50%)',
                backgroundSize: '200% 100%',
              }}
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="mobile-nav-link font-['var(--font-dm-serif)'] text-6xl md:text-7xl text-[#f0ede6] hover:text-[#c8a97e] transition-colors"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #f0ede6 50%, transparent 50%)',
                backgroundSize: '200% 100%',
              }}
            >
              Contact
            </a>
            <a
              href="https://github.com/user-synax"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link flex items-center justify-center gap-4 font-['var(--font-dm-serif)'] text-6xl md:text-7xl text-[#f0ede6] hover:text-[#c8a97e] transition-colors"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #f0ede6 50%, transparent 50%)',
                backgroundSize: '200% 100%',
              }}
            >
              GitHub
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
