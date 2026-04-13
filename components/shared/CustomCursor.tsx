'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const x = useRef(0)
  const y = useRef(0)
  const circleX = useRef({ x: 0 })
  const circleY = useRef({ y: 0 })

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    // Set up GSAP quickTo for smooth trailing
    const qCircleX = gsap.quickTo(circleX.current, 'x', { duration: 0.6, ease: 'power3' })
    const qCircleY = gsap.quickTo(circleY.current, 'y', { duration: 0.6, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      x.current = e.clientX
      y.current = e.clientY

      // Move dot instantly (no lag)
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: x.current, y: y.current })
      }

      // Move circle with smooth trailing
      qCircleX(x.current)
      qCircleY(y.current)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if hovering over link, button, or card
      const isInteractive = target.closest('a, button, [role="button"]')
      const isCard = target.closest('.project-card, [class*="card"]')
      
      if (isCard) {
        // Project card hover: hide dot, fill circle, show "View →"
        if (dotRef.current) {
          gsap.to(dotRef.current, { opacity: 0, duration: 0.2 })
        }
        if (circleRef.current) {
          gsap.to(circleRef.current, {
            scale: 2.2,
            backgroundColor: '#0a0a0a',
            borderColor: '#c8a97e',
            duration: 0.3,
            onComplete: () => {
              if (circleRef.current) {
                circleRef.current.innerHTML = '<span class="font-mono text-[8px] text-[#f0ede6]">View →</span>'
              }
            }
          })
        }
      } else if (isInteractive) {
        // Link/button hover: scale circle, change border color
        if (circleRef.current) {
          gsap.to(circleRef.current, {
            scale: 2.2,
            borderColor: '#c8a97e',
            duration: 0.3,
          })
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Reset on mouse out
      if (dotRef.current) {
        gsap.to(dotRef.current, { opacity: 1, duration: 0.2 })
      }
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(240, 237, 230, 0.3)',
          duration: 0.3,
          onComplete: () => {
            if (circleRef.current) {
              circleRef.current.innerHTML = ''
            }
          }
        })
      }
    }

    // Update circle position on every frame
    const updateCircle = () => {
      if (circleRef.current) {
        gsap.set(circleRef.current, {
          x: circleX.current.x,
          y: circleY.current.y,
        })
      }
      requestAnimationFrame(updateCircle)
    }
    updateCircle()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      {/* Small dot - follows mouse exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#f0ede6] rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Large circle - follows with smooth trailing */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-[#f0ede6]/30 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
