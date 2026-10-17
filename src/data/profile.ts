import type { Profile, ResumeLink } from './types.ts'

// Personal information, social links and the About copy.
// This file is also read by vite.config.ts to fill the SEO tags in index.html,
// so keep it free of browser-only code and icon imports.

// Second resume, for Python + data analysis roles. Shown next to the main resume (profile.resume below).
// The PDFs live in public/resume/. The older file names (Anubhav-Kumar-Resume.pdf and
// Anubhav-Kumar-Data-Analyst-Data-Scientist-Resume.pdf) are redirected to these in vercel.json.
export const dataResume: ResumeLink = {
  label: 'Python + Data Analysis Resume',
  shortLabel: 'Data Resume',
  href: 'resume/Anubhav-Kumar-Python-Data-Analysis-Resume.pdf',
  fileName: 'Anubhav_Kumar_Resume_Python_Data_Analysis.pdf',
}

export const profile: Profile = {
  name: 'Anubhav Kumar',
  initials: 'AK',
  role: 'Python Developer | Data Analyst',
  specialties: ['Java', 'Python', 'SQL'],
  intro:
    'A 2026 engineering graduate from NMIT Bangalore, with Java and Spring Boot internship experience and hands-on work in Python, SQL and data analysis.',
  tagline: 'Python · SQL · APIs · Data Analytics',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles',
  email: 'anubhavkumarkanth123@gmail.com',
  phone: '+91 72238 27840',
  phoneHref: '+917223827840',
  resume: {
    label: 'Python Software Developer Resume',
    shortLabel: 'Python Resume',
    href: 'resume/Anubhav-Kumar-Python-Software-Developer-Resume.pdf',
    fileName: 'Anubhav_Kumar_Resume_Python_Software_Developer.pdf',
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
      roles: ['Software Engineer', 'Python Developer', 'Backend Developer', 'Full-Stack Developer'],
      note: 'Python, backend and full-stack development.',
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
      'I graduated in 2026 with a B.E. in Electronics and Communication Engineering from Nitte Meenakshi Institute of Technology, Bangalore.',
      'My internship was at Redevelopers Automate Solution. I spent three months on the backend of a Java and Spring Boot application, writing REST APIs, working with the SQL and NoSQL layer, and fixing bugs with tests to cover them.',
      'Most of my own projects are in Python and SQL. One is a FastAPI and PostgreSQL app, another is an order system in Core Java, and a third is a calorie prediction model trained on public health data. The data side interests me too: cleaning the files, writing the queries and putting together simple reports.',
    ],
    facts: [
      { label: 'Education', value: 'B.E. ECE · NMIT Bangalore · 2026' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Internship', value: 'Full Stack Dev · Feb–Apr 2026' },
      { label: 'Core skills', value: 'Python · SQL · APIs · Data Analytics' },
      { label: 'Looking for', value: 'Software engineering or data analysis' },
    ],
  },
  seo: {
    title: 'Anubhav Kumar — Python Developer | Data Analyst',
    description:
      'Anubhav Kumar, B.E. ECE at NMIT Bangalore, Class of 2026. Java and Spring Boot from an internship, Python and SQL from personal projects, and practical data analytics with Pandas and Power BI. Open to entry-level software and data analyst roles.',
    keywords: [
      'Anubhav Kumar',
      'entry level software engineer',
      'fresher software engineer',
      'entry level data analyst',
      'fresher data analyst',
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
