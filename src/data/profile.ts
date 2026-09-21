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
    'I worked on Java and Spring Boot REST APIs during my internship, and I build backend projects in Python. I also work with data — SQL queries, Pandas and Power BI. Final-year B.E. student at NMIT Bangalore, graduating in 2026.',
  tagline: 'Entry-level software engineer and data analyst — Java, Python & SQL.',
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
      group: 'Software',
      roles: ['Software Engineer', 'Java Developer', 'Python Developer', 'Backend Developer', 'Full-Stack Developer'],
      note: 'Backend and full-stack work using Java, Spring Boot, Python and React.',
    },
    {
      group: 'Data',
      roles: ['Data Analyst', 'BI Analyst'],
      note: 'SQL-based analysis, data cleaning and reporting using Python, Pandas and Power BI.',
    },
  ],
  coreStack: ['Java', 'Python', 'SQL', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'React', 'Power BI'],
  about: {
    paragraphs: [
      'I’m in my final year of B.E. Electronics and Communication Engineering at Nitte Meenakshi Institute of Technology, Bangalore, graduating in 2026.',
      'During my internship at Redevelopers Automate Solution I worked on the backend. I developed RESTful APIs in Java and Spring Boot, worked with SQL and NoSQL for data persistence, and wrote unit and integration tests for the defects I fixed. That’s where I learned what a real codebase and a real review cycle feel like.',
      'On my own I build in Python and SQL — a FastAPI and PostgreSQL app, a Core Java order system over JDBC, and a calorie-prediction model built from public health data. I also do the data side of that work: cleaning the raw files, writing the queries and reporting what the numbers actually show. I’m applying for entry-level software and data analyst roles.',
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
      'Anubhav Kumar is a final-year B.E. student (Class of 2026, NMIT Bangalore) looking for entry-level software engineering and data analyst roles. Java and Spring Boot from a backend internship; Python, SQL, Pandas and Power BI from personal projects and coursework.',
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
