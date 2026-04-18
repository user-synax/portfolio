export const WELCOME_MESSAGE = [
  'Welcome to my terminal portfolio.',
  'Type "help" or "/" to see available commands.',
  'Press Tab for auto-completion.',
  ''
]

export const COMMANDS = {
  whoami: {
    description: 'Display information about me',
    output: [
      'Name: Ayush',
      'Location: Delhi, India',
      'Role: Self-taught Full-Stack Developer',
      'Experience: Building real products since 2024',
      'Focus: Creating scalable web applications with modern tech stack'
    ]
  },
  skills: {
    description: 'List my technical skills',
    output: [
      '',
      '  FRONTEND:',
      '    • Next.js 15, React, TypeScript',
      '    • Tailwind CSS, shadcn/ui, GSAP',
      '',
      '  BACKEND:',
      '    • Node.js, Express, MongoDB',
      '    • PostgreSQL, REST APIs',
      '',
      '  TOOLS & PLATFORMS:',
      '    • Git, GitHub, Vercel, Netlify',
      '    • Auth.js, Resend, npm',
      '',
      '  DESIGN:',
      '    • Figma, Photoshop, UI/UX',
      '    • React GitHub Calendar',
      '',
      '  SYSTEM DESIGN',
      '    • Docker, CI/CD'
    ]
  },
  projects: {
    description: 'List my projects with details',
    output: [
      '',
      '  [icon:folder] CampusX',
      '     Student social platform for campus networking',
      '     Tech: Next.js, MongoDB, Auth.js',
      '',
      '  [icon:folder] MedBridge',
      '     AI-powered medical language translator',
      '     Tech: React, Python, OpenAI API',
      '',
      '  [icon:folder] Life Os',
      '     Personal Dashboard for stduents',
      '     Tech: Next.js, Tailwind CSS',
      '',
      '  [icon:folder] Tare Chat',
      '     Real time morden chat web app',
      '     Tech: React, Pusher, Tailwind',
      ''
    ]
  },
  status: {
    description: 'Show current status',
    output: [
      '',
      '  Current Status: 🟢 Open to opportunities',
      '',
      '  Availability: Internships & Freelance',
      '',
      '  Focus: Building CampusX towards public launch',
      '',
      '  Response Time: Within 24 hours'
    ]
  },
  contact: {
    description: 'Show contact information',
    output: [
      '',
      '  [icon:mail] Email:    user-synax@proton.me',
      '  [icon:github] GitHub:  github.com/user-synax',
      '',
      '  Feel free to reach out for collaborations!'
    ]
  },
  experience: {
    description: 'Show work experience',
    output: [
      '',
      '  2026 Jan - 2026 April',
      '    Full-Stack Developer (Internship) FCIT',
      '    • Building web applications',
      '    • Contributing to open-source projects',
    ]
  },
  education: {
    description: 'Show educational background',
    output: [
      '',
      '  Self-Taught Developer',
      '    • Learned through online resources and documentation',
      '    • Built practical projects to gain experience',
      '    • Active contributor to developer community',
      '',
      '  Focus Areas:',
      '    • Full-stack web development',
      '    • System design and architecture',
      '    • UI/UX best practices'
    ]
  },
  social: {
    description: 'Show social media links',
    output: [
      '',
      '  [icon:github] GitHub:     github.com/user-synax'
    ]
  },
  help: {
    description: 'Show all available commands',
    output: [
      '',
      '  Available Commands:',
      '    whoami     - Display information about me',
      '    skills     - List my technical skills',
      '    projects   - List my projects with details',
      '    status     - Show current status',
      '    contact    - Show contact information',
      '    experience - Show work experience',
      '    education  - Show educational background',
      '    social     - Show social media links',
      '    help       - Show this help message',
      '    clear      - Clear the terminal',
      '',
      '  Tips:',
      '    • Press Tab for auto-completion',
      '    • Use arrow keys to navigate suggestions',
      '    • Press ESC to hide suggestions'
    ]
  }
}
