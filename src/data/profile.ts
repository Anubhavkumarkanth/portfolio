import type { Profile } from './types.ts'

// Personal information, social links and the About copy.
// This file is also read by vite.config.ts to fill the SEO tags in index.html,
// so keep it free of browser-only code and icon imports.

export const profile: Profile = {
  name: 'Anubhav Kumar',
  initials: 'AK',
  role: 'Entry-Level Software Engineer | Data Analyst',
  specialties: ['Java', 'Python', 'SQL'],
  intro:
    'I’m a 2026 engineering graduate from NMIT Bangalore. My internship was in Java and Spring Boot, and I use Python and SQL for my projects, for backend work and for data analysis.',
  tagline: 'Entry-level software engineer and data analyst. Java, Python and SQL.',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles',
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
      group: 'Software',
      roles: ['Software Engineer', 'Java Developer', 'Python Developer', 'Backend Developer', 'Full-Stack Developer'],
      note: 'Java, Python, backend and full-stack development.',
    },
    {
      group: 'Data',
      roles: ['Data Analyst', 'BI Analyst'],
      note: 'SQL, Python and practical data analysis.',
    },
  ],
  coreStack: ['Java', 'Python', 'SQL', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'React', 'Power BI'],
  about: {
    paragraphs: [
      'I’m in my final year of B.E. Electronics and Communication Engineering at Nitte Meenakshi Institute of Technology, Bangalore. I graduate in 2026.',
      'My internship was at Redevelopers Automate Solution. I spent three months on the backend of a Java and Spring Boot application, writing REST APIs, working with the SQL and NoSQL layer, and fixing bugs with tests to cover them.',
      'Most of my own projects are in Python and SQL. One is a FastAPI and PostgreSQL app, another is an order system in Core Java, and a third is a calorie prediction model trained on public health data. The data side interests me too: cleaning the files, writing the queries and putting together simple reports.',
    ],
    facts: [
      { label: 'Education', value: 'B.E. ECE · NMIT Bangalore · 2026' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Internship', value: 'Java Full Stack Dev · Feb–Apr 2026' },
      { label: 'Works with', value: 'Java · Python · SQL' },
      { label: 'Looking for', value: 'Software engineering or data analysis' },
    ],
  },
  seo: {
    title: 'Anubhav Kumar — Entry-Level Software Engineer | Data Analyst · Java, Python & SQL',
    description:
      'Anubhav Kumar, B.E. Electronics and Communication Engineering at NMIT Bangalore, Class of 2026. Java and Spring Boot from an internship, Python and SQL from personal projects, plus data analysis with Pandas and Power BI. Looking for an entry-level role.',
    keywords: [
      'Anubhav Kumar',
      'entry level software engineer',
      'fresher software engineer',
      'entry level data analyst',
      'fresher data analyst',
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
