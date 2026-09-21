import type { Profile } from './types.ts'

// Personal information, social links and the About copy.
// This file is also read by vite.config.ts to fill the SEO tags in index.html,
// so keep it free of browser-only code and icon imports.

export const profile: Profile = {
  name: 'Anubhav Kumar',
  initials: 'AK',
  role: 'Software Engineer',
  specialties: ['Python', 'data analysis', 'machine learning'],
  intro:
    'I work mostly in Python and SQL: analysing data, building and evaluating models, and writing the backends and databases around them. Recently: a Monte Carlo SIP simulator on FastAPI and PostgreSQL, and a calorie-intake model built from 4,624 NHANES survey records.',
  tagline: 'Software engineer — Python, data analysis & machine learning.',
  location: 'India',
  availability: 'Open to entry-level roles',
  email: 'anubhavkumarkanth123@gmail.com',
  resume: {
    href: 'resume/Anubhav_Kumar_Resume.pdf',
    fileName: 'Anubhav_Kumar_Resume.pdf',
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
    { group: 'Software', roles: ['Software Engineer', 'Python Developer', 'Backend Developer', 'Full-Stack Developer'] },
    { group: 'Data', roles: ['Data Analyst', 'BI Analyst', 'Data Scientist', 'Data Engineer'] },
  ],
  coreStack: ['Python', 'SQL', 'Pandas', 'NumPy', 'scikit-learn', 'PostgreSQL', 'FastAPI', 'Power BI'],
  about: {
    paragraphs: [
      "I'm a final-year B.E. student in Electronics and Communication Engineering at Nitte Meenakshi Institute of Technology in Bangalore (Class of 2026).",
      'Most of my own work is in Python and SQL. I’ve built a dataset from raw public health survey files, trained a model and tested it against the formulas it was meant to replace, written a Monte Carlo simulation engine, and designed the PostgreSQL schemas and APIs that keep results reproducible.',
      'My internship at Redevelopers Automate Solution was backend work: RESTful APIs in Spring Boot, the SQL and NoSQL data layer behind them, and unit and integration tests around the defects I fixed. That’s where I learned to measure a speed-up before claiming it, and to put a test around every fix.',
      'The problems I enjoy are the ones where the answer has to be measured rather than assumed: how much a few skipped SIP instalments cost after twenty years, or whether a model actually beats the formula it replaces. So I lean on the unglamorous parts: clean joins, schemas with real constraints, query plans checked with EXPLAIN ANALYZE, and models reported against baselines with their limitations written down.',
      'I’m applying for entry-level software and data roles: Python and backend development, data analysis, data science and data engineering. Anywhere I can work with real data, ship code that’s tested, and learn from people who’ve done it longer.',
    ],
    facts: [
      { label: 'Based in', value: 'India' },
      { label: 'Education', value: 'B.E. (ECE), NMIT Bangalore · 2026' },
      { label: 'Works with', value: 'Python · SQL · Pandas · scikit-learn' },
      { label: 'Experience', value: 'Development internship · 2026' },
      { label: 'Looking for', value: 'Software & data roles' },
    ],
  },
  seo: {
    title: 'Anubhav Kumar — Software Engineer · Python, Data Analysis & Machine Learning',
    description:
      'Anubhav Kumar is an early-career software engineer (B.E., Class of 2026) working in Python and SQL: data analysis with Pandas and Power BI, machine learning with scikit-learn, and backends on FastAPI and PostgreSQL.',
    keywords: [
      'Anubhav Kumar',
      'software engineer',
      'Python developer',
      'data analyst',
      'data scientist',
      'data engineer',
      'machine learning',
      'SQL',
      'PostgreSQL',
      'Pandas',
      'scikit-learn',
      'FastAPI',
      'portfolio',
    ],
  },
}
