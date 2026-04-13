'use client'
import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export function useMagnetic<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)
  const innerRef = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    const innerElement = innerRef.current

    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      // Move element with 0.4 strength
      gsap.to(element, {
        x: deltaX * 0.4,
        y: deltaY * 0.4,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Move inner text with 0.2 strength for parallax
      if (innerElement) {
        gsap.to(innerElement, {
          x: deltaX * 0.2,
          y: deltaY * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      // Reset element position with elastic easing
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })

      // Reset inner text position
      if (innerElement) {
        gsap.to(innerElement, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.4)',
        })
      }
    }

    element.addEventListener('mouseenter', () => {
      element.addEventListener('mousemove', handleMouseMove)
    })

    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mouseleave', () => {
      element.removeEventListener('mousemove', handleMouseMove)
    })

    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, innerRef }
}
