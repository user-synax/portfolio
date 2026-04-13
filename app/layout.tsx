import { DM_Serif_Display, DM_Mono } from 'next/font/google'
import NoiseCanvas from '@/components/shared/NoiseCanvas'
import CustomCursor from '@/components/shared/CustomCursor'
import EasterEgg from '@/components/shared/EasterEgg'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
})

export const metadata = {
  title: 'Portfolio | Full-Stack Developer',
  description: 'Building thoughtful digital products at the intersection of engineering and design. Full-stack developer specializing in React, Next.js, and TypeScript.',
  openGraph: {
    title: 'Portfolio | Full-Stack Developer',
    description: 'Building thoughtful digital products at the intersection of engineering and design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Full-Stack Developer',
    description: 'Building thoughtful digital products at the intersection of engineering and design.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSerif.variable} ${dmMono.variable}`}>
      <body className="cursor-none">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CustomCursor />
          <NoiseCanvas />
          <EasterEgg />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}