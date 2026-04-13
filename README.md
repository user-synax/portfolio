# Portfolio

A modern portfolio site built with Next.js, featuring smooth GSAP animations, dark theme, and a contact form powered by Resend.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP with ScrollTrigger
- **Fonts**: DM Serif Display & DM Mono (next/font/google)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Resend API key (for contact form)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your-email@example.com
```

To get a Resend API key:
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys in your dashboard
3. Create a new API key
4. Add it to your `.env.local` file

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`: Your Resend API key
   - `CONTACT_EMAIL`: Your email address for receiving contact form submissions
4. Deploy

The site will be automatically built and deployed with zero configuration.

## Project Structure

```
app/
├── layout.tsx          # Root layout with fonts and theme provider
├── page.tsx            # Main page composing all sections
├── globals.css         # Global styles
└── api/
    └── contact/
        └── route.ts    # Resend email handler

components/
├── ui/                 # shadcn/ui components
├── sections/           # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
└── shared/
    ├── NoiseCanvas.tsx # Global noise overlay
    └── Navbar.tsx      # Navigation with scroll effects

lib/
├── utils.ts            # Utility functions
└── gsap.ts             # GSAP plugin registration
```

## Features

- **Hero Section**: Animated name reveal with stagger effects
- **About Section**: Skills grid, animated stats counters, timeline
- **Projects Section**: Interactive cards with hover effects, drawer details
- **Contact Section**: Form validation, loading states, success animations
- **Navbar**: Smooth scroll, backdrop blur on scroll
- **Dark Theme**: Built-in theme switching with next-themes
- **Noise Overlay**: Subtle canvas-based noise effect
