"use client"
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useMagnetic } from "@/hooks/useMagnetic"
import { TextScramble } from "@/components/shared/TextScramble"

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const magnetic = useMagnetic<HTMLAnchorElement>()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animate decorative orbs with smooth continuous movement
      gsap.to('.orb-1', {
        x: 100,
        y: -80,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.orb-2', {
        x: -80,
        y: 60,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.orb-3', {
        x: 60,
        y: 90,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Fade in orbs
      gsap.fromTo('.orb', { opacity: 0 }, { opacity: 0.6, duration: 2, stagger: 0.3 })

      // Clip-reveal each name line from below
      tl.to('.name-inner', {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
      })
        .to('.hero-fade', {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        }, '-=0.5')
        .to('.scroll-line', {
          scaleY: 1,
          duration: 0.9,
          ease: 'power2.inOut',
          transformOrigin: 'top',
        }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-center items-center px-12 py-20 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      
      {/* Decorative orbs */}
      <div className="orb orb-1 absolute top-20 left-20 w-64 h-64 bg-[#c8a97e]/10 rounded-full blur-[100px]" />
      <div className="orb orb-2 absolute bottom-32 right-32 w-96 h-96 bg-[#f0ede6]/5 rounded-full blur-[120px]" />
      <div className="orb orb-3 absolute top-1/2 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />

      {/* Glow effect behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c8a97e]/5 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Availability badge */}
        <div className="hero-fade mb-10 flex items-center justify-center gap-2 opacity-0 translate-y-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-['var(--font-dm-mono)'] text-[clamp(11px,1.5vw,14px)] uppercase tracking-widest text-neutral-500">
            Available for work
          </span>
        </div>

        {/* Name — each line clips upward */}
        <h1 className="mb-5 font-['var(--font-dm-serif)'] text-[clamp(48px,9vw,120px)] leading-[1.0] tracking-tight text-[#f0ede6] text-center relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#c8a97e]/20 via-transparent to-[#c8a97e]/20 blur-xl opacity-50" />
          {['Ayush','Developer'].map((word, i) => (
            <span key={i} className="block overflow-hidden relative">
              <span
                className="name-inner block translate-y-[110%] relative"
                style={{ fontStyle: i === 1 ? 'italic' : 'normal' }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Role */}
        <p className="hero-fade mb-10 font-['var(--font-dm-mono)'] text-[clamp(13px,1.8vw,18px)] uppercase tracking-[.1em] text-neutral-600 opacity-0 translate-y-2 text-center">
          Full-stack developer &amp; UI craftsperson
        </p>

        {/* Description */}
        <p className="hero-fade max-w-xl font-['var(--font-dm-mono)'] text-[clamp(15px,1.8vw,22px)] font-light leading-relaxed text-neutral-500 opacity-0 translate-y-2 text-center">
          Building thoughtful digital products at the intersection
          of engineering and design. Open to freelance and full-time roles.
        </p>

        {/* CTA */}
        <div className="hero-fade mt-12 flex items-center justify-center gap-6 opacity-0 translate-y-2">

          <a
            ref={magnetic.ref}
            href="#projects"
            className="group relative rounded-sm bg-[#f0ede6] px-6 py-3 font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#c8a97e] hover:shadow-lg hover:shadow-[#c8a97e]/20 hover:-translate-y-0.5"
          >
            <span ref={magnetic.innerRef} className="relative z-10">View work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8a97e] to-[#f0ede6] opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#contact"
            className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-500 transition-colors hover:text-[#f0ede6] hover:underline decoration-[#c8a97e] underline-offset-4"
          >
        Get in touch →
      </a>
        </div >
      </div>

    {/* Scroll line accent */ }
    < div className = "scroll-line absolute bottom-0 left-1/2 -translate-x-1/2 w-px scale-y-0 bg-gradient-to-b from-[#c8a97e] via-neutral-700 to-transparent h-20" />

      {/* Index label */}
      <span className="hero-fade absolute bottom-10 right-12 font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-800 opacity-0">
        <TextScramble text="001 / Hero" />
      </span>
    </section >
  )
}