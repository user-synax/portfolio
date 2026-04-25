'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { gsap } from '@/lib/gsap'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, Send } from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<SVGSVGElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading clip reveal
      gsap.fromTo('.contact-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Contact info fade-up
      gsap.fromTo('.contact-info',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Form fade-up
      gsap.fromTo('.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isSubmitting && spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      })
    } else if (spinnerRef.current) {
      gsap.killTweensOf(spinnerRef.current)
    }
  }, [isSubmitting])

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Animate form out
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSuccess(true)
          // Animate success message in
          gsap.fromTo(successRef.current,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            }
          )
        },
      })

      tl.to(formRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.out',
      })

      reset()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-12 bg-[#0a0a0a] flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section heading */}
        <div className="mb-16">
          <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-neutral-800 mb-4 block">
            <TextScramble text="004 / Contact" />
          </span>
          <h2 className="contact-heading font-['var(--font-dm-serif)'] text-[clamp(40px,6vw,64px)] leading-[1.1] tracking-tight text-[#f0ede6]">
            Let's work together
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column - Contact info */}
          <div className="contact-info lg:col-span-2 space-y-8">
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 hover:border-[#c8a97e]/30 transition-colors">
              <h3 className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#c8a97e] mb-4">
                Get in touch
              </h3>
              <p className="font-['var(--font-dm-mono)'] text-sm text-neutral-400 leading-relaxed mb-6">
                Have a project in mind? Let's create something amazing together.
              </p>
              <a
                href="mailto:user-synax@proton.me"
                aria-label="Send email to user-synax@proton.me"
                className="flex items-center gap-3 text-neutral-300 hover:text-[#c8a97e] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-['var(--font-dm-mono)'] text-sm">user-synax@proton.me</span>
              </a>
            </div>

            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 hover:border-[#c8a97e]/30 transition-colors">
              <h3 className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#c8a97e] mb-4">
                Social
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/user-synax"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                  className="flex items-center gap-2 text-neutral-400 hover:text-[#f0ede6] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-['var(--font-dm-mono)'] text-sm">GitHub</span>
                </a>
                <a
                  href="https://wa.me/918826343179"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  className="flex items-center gap-2 text-neutral-400 hover:text-[#25D366] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-['var(--font-dm-mono)'] text-sm">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="contact-form lg:col-span-3">
            {!isSuccess ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-500">
                      Name
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Your name"
                      className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 font-sans text-xl font-semibold focus:border-[#c8a97e] transition-colors h-16"
                    />
                    {errors.name && (
                      <p className="font-['var(--font-dm-mono)'] text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-500">
                      Email
                    </label>
                    <Input
                      {...register('email')}
                      placeholder="your@email.com"
                      type="email"
                      className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 font-sans text-xl font-semibold focus:border-[#c8a97e] transition-colors h-16"
                    />
                    {errors.email && (
                      <p className="font-['var(--font-dm-mono)'] text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-neutral-500">
                    Message
                  </label>
                  <Textarea
                    {...register('message')}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 font-sans text-xl font-semibold resize-none focus:border-[#c8a97e] transition-colors"
                  />
                  {errors.message && (
                    <p className="font-['var(--font-dm-mono)'] text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                {error && (
                  <p className="font-['var(--font-dm-mono)'] text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send contact form message"
                  className="w-full bg-[#f0ede6] text-[#0a0a0a] hover:bg-[#c8a97e] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider py-6 rounded-lg hover:shadow-lg hover:shadow-[#c8a97e]/20 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 ref={spinnerRef} className="mr-2 h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div
                ref={successRef}
                className="bg-gradient-to-br from-[#c8a97e]/10 to-[#f0ede6]/5 border border-[#c8a97e]/30 rounded-xl p-12 text-center"
              >
                <div className="w-16 h-16 bg-[#c8a97e]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-[#c8a97e]" />
                </div>
                <div className="font-['var(--font-dm-serif)'] text-3xl text-[#f0ede6] mb-4">
                  Message Sent!
                </div>
                <p className="font-['var(--font-dm-mono)'] text-neutral-400 mb-8">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    gsap.fromTo(formRef.current,
                      { opacity: 0, scale: 0.95 },
                      {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                      }
                    )
                  }}
                  aria-label="Send another message"
                  className="bg-[#f0ede6] text-[#0a0a0a] hover:bg-[#c8a97e] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-lg"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
