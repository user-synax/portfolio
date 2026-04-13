'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { TextHoverEffect } from '@/components/ui/hover-footer'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer text on scroll - only when in viewport
      gsap.set('.footer-text', { opacity: 0, y: 50 })
      gsap.to('.footer-text',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="py-12 px-12 bg-[#0a0a0a] border-t border-neutral-800 pb-0">
      <div ref={textRef} className="footer-text lg:flex hidden h-[30rem]">
        <TextHoverEffect text="Ayush" className="w-full" />
      </div>
      <div ref={textRef} className="footer-text lg:hidden py-8 text-center pb-0">
        <h1 className="font-['var(--font-dm-serif)'] text-4xl md:text-5xl text-[#f0ede6]">
          Ayush
        </h1>
      </div>
    </footer>
  )
}
