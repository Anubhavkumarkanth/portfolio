import type { Profile } from './types.ts'

// Personal information, social links and the About copy.
// This file is also read by vite.config.ts to fill the SEO tags in index.html,
// so keep it free of browser-only code and icon imports.

export const profile: Profile = {
  name: 'Anubhav Kumar',
  initials: 'AK',
  role: 'Entry-Level Software Engineer',
  specialties: ['Java', 'Python', 'SQL'],
  intro:
    'I build backend and full-stack applications in Java and Python, and I work with data in SQL. Final-year B.E. student at NMIT Bangalore, graduating in 2026 and looking for my first full-time role.',
  tagline: 'Entry-level software engineer — Java, Python & SQL.',
  location: 'Bengaluru, India',
  availability: 'Open to entry-level roles',
  email: 'anubhavkumarkanth123@gmail.com',
  phone: '+91 72238 27840',
  phoneHref: '+917223827840',
  resume: {
    href: 'resume/Anubhav-Kumar-Resume.pdf',
    fileName: 'Anubhav-Kumar-Resume.pdf',
  },
  socials: {
    github: {
      label: 'GitHub',
      href: 'https://github.com/Anubhavkumarkanth',
      handle: 'Anubhavkumarkanth',
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anubhavkumar021',
      handle: 'anubhavkumar021',
    },
  },
  targetRoles: [
    {
      group: 'Entry-level roles',
      roles: [
        'Software Engineer',
        'Java Developer',
        'Python Developer',
        'Backend Developer',
        'Full-Stack Developer',
        'Data Analyst',
      ],
    },
  ],
  coreStack: ['Java', 'Python', 'SQL', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'React', 'Git'],
  about: {
    paragraphs: [
      'I’m in my final year of B.E. Electronics and Communication Engineering at Nitte Meenakshi Institute of Technology, Bangalore, graduating in 2026.',
      'During my internship at Redevelopers Automate Solution I worked on the backend: REST APIs in Java and Spring Boot, the SQL and NoSQL layer behind them, and unit and integration tests around the defects I fixed. That’s where most of my Java and Spring Boot experience comes from.',
      'On my own time I build in Python and SQL — a FastAPI and PostgreSQL simulation app, a calorie-prediction model trained on public health data, and an order management system in Core Java over JDBC.',
      'I’m applying for entry-level software, backend, full-stack and data roles. I’d like to join a team where I can keep writing code that’s tested and learn from people who’ve been doing this longer.',
    ],
    facts: [
      { label: 'Education', value: 'B.E. ECE · NMIT Bangalore · 2026' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Internship', value: 'Java Full Stack Dev · Feb–Apr 2026' },
      { label: 'Works with', value: 'Java · Python · SQL' },
      { label: 'Looking for', value: 'Entry-level software & data roles' },
    ],
  },
  seo: {
    title: 'Anubhav Kumar — Entry-Level Software Engineer · Java, Python & SQL',
    description:
      'Anubhav Kumar is a final-year B.E. student (Class of 2026, NMIT Bangalore) looking for entry-level software roles. Java and Spring Boot from a backend internship; Python, SQL and PostgreSQL from personal projects.',
    keywords: [
      'Anubhav Kumar',
      'entry level software engineer',
      'fresher software engineer',
      'Java developer',
      'Spring Boot',
      'Python developer',
      'backend developer',
      'full stack developer',
      'SQL',
      'PostgreSQL',
      'data analyst',
      'NMIT Bangalore',
      'portfolio',
    ],
  },
}
