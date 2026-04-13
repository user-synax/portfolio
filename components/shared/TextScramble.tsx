'use client'
import { useRef, useEffect } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
}

export function TextScramble({ text, className }: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const originalText = useRef(text)

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const scramble = () => {
    if (!textRef.current) return

    let iterations = 0
    const maxIterations = 15

    intervalRef.current = setInterval(() => {
      if (!textRef.current) return
      
      textRef.current.innerText = textRef.current.innerText
        .split('')
        .map((letter, index) => {
          if (index < iterations) {
            return originalText.current[index] || ''
          }
          return getRandomChar()
        })
        .join('')

      iterations += 1 / 3

      if (iterations >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        textRef.current.innerText = originalText.current
      }
    }, 40)
  }

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    scramble()
  }

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (textRef.current) {
      textRef.current.innerText = originalText.current
    }
  }

  useEffect(() => {
    originalText.current = text
  }, [text])

  return (
    <span
      ref={textRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  )
}
