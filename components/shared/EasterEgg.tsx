'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function EasterEgg() {
  const [showToast, setShowToast] = useState(false)
  const toastRef = useRef<HTMLDivElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const sequenceRef = useRef<string[]>([])
  const logoTapRef = useRef<number>(0)
  const logoTapTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    // Find noise canvas
    noiseCanvasRef.current = document.querySelector('canvas') as HTMLCanvasElement

    // Keyboard listener
    const handleKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current.push(e.key)
      if (sequenceRef.current.length > KONAMI_CODE.length) {
        sequenceRef.current.shift()
      }

      if (sequenceRef.current.join('') === KONAMI_CODE.join('')) {
        triggerEasterEgg()
        sequenceRef.current = []
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerEasterEgg = () => {
    // Color cycle for section headings
    const headings = document.querySelectorAll('.about-heading, .projects-heading, .writing-heading, h1, h2')
    const accentColors = ['#c8a97e', '#8b5cf6', '#10b981', '#ec4899']

    let repeatCount = 0
    gsap.to(headings, {
      color: accentColors[0],
      duration: 0.3,
      repeat: 3,
      yoyo: true,
      onRepeat: function() {
        gsap.set(this.targets(), { color: accentColors[repeatCount % accentColors.length] })
        repeatCount++
      },
      onComplete: () => {
        gsap.set(headings, { color: '#f0ede6' })
      }
    })

    // Toast notification
    setShowToast(true)
    if (toastRef.current) {
      gsap.fromTo(toastRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
      
      gsap.to(toastRef.current, {
        opacity: 0,
        delay: 1.5,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setShowToast(false)
      })
    }

    // Noise canvas opacity jump
    if (noiseCanvasRef.current) {
      const originalOpacity = parseFloat(getComputedStyle(noiseCanvasRef.current).opacity) || 0.03
      gsap.to(noiseCanvasRef.current, {
        opacity: 0.15,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(noiseCanvasRef.current, { opacity: originalOpacity })
        }
      })
    }
  }

  const handleLogoTap = () => {
    logoTapRef.current++
    
    // Clear previous timeout
    if (logoTapTimeoutRef.current) {
      clearTimeout(logoTapTimeoutRef.current)
    }

    // Reset after 2 seconds if no more taps
    logoTapTimeoutRef.current = setTimeout(() => {
      logoTapRef.current = 0
    }, 2000)

    // Trigger on 5 taps
    if (logoTapRef.current === 5) {
      triggerEasterEgg()
      logoTapRef.current = 0
    }
  }

  // Expose logo tap handler to window for Navbar to use
  useEffect(() => {
    (window as any).handleLogoTap = handleLogoTap
    return () => {
      delete (window as any).handleLogoTap
    }
  }, [])

  return (
    <>
      {showToast && (
        <div
          ref={toastRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 bg-[#171717] border border-[#c8a97e] rounded-lg pointer-events-none"
        >
          <span className="font-['var(--font-dm-mono)'] text-sm text-[#f0ede6]">
            you found it :)
          </span>
        </div>
      )}
    </>
  )
}
