import { VT323 } from 'next/font/google'
import ThemeProviderWrapper from './ThemeProviderWrapper'
import '../globals.css'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

export const metadata = {
  title: 'terminal — ayush',
  description: 'interactive portfolio terminal',
}

export default function TerminalLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${vt323.variable}`}>
      <body className={`${vt323.className} cursor-default text-lg`}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
