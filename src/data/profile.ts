import type { Profile } from './types.ts'

// Personal details and page copy. This file is also read by vite.config.ts to
// fill the SEO tags in index.html, so keep it free of browser-only
// code and icon imports.
//
// The page has two views, picked with the role switch: `software` (the
// default) and `data`. Everything that differs between them lives in
// `personas`.
//
// House style: plain English first, about a third technical, and every
// technical word explained where it appears.

export const profile: Profile = {
  name: 'Anubhav Kumar',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles',
  email: 'anubhavkumarkanth123@gmail.com',
  phone: '+91 72238 27840',
  phoneHref: '+917223827840',
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
  personas: {
    software: {
      role: 'Software Engineer (Python)',
      short: 'Software Engineer',
      headline: 'I build Python backends, and the tests that keep them honest.',
      intro:
        'I write REST APIs (the endpoints other software calls) with FastAPI, store the data in PostgreSQL, and ship every project with automated tests that run on each change.',
      resume: {
        label: 'Software Engineer resume',
        href: 'resume/Anubhav-Kumar-Software-Engineer-Python-Resume.pdf',
        fileName: 'Anubhav_Kumar_Software_Engineer_Python_Resume.pdf',
      },
      stats: [
        { value: '2', label: 'backend services live for you to open' },
        { value: '55', label: 'backend tests on one service, 34 against a real database' },
        { value: '30 of 30', label: 'test questions an AI question box got right' },
      ],
      about: [
        'I graduated in 2026 with a B.E. in Electronics and Communication from NMIT, Bangalore. I write backend software in Python: the part of an app that takes a request, applies the rules and stores the result.',
        'I like code that can show it works. Every project here ships with automated tests that run on each change, so a broken change is stopped before it goes live. On one of them, 34 tests run against a real PostgreSQL database instead of a stand-in.',
        'Before this I spent three months as a full stack intern, building REST APIs in Java and Spring Boot and fixing defects in a real codebase.',
      ],
      work: {
        title: 'Two services, both live and both tested.',
        description:
          'Both are running right now for you to open, and both have automated tests that run on each change. The more backend-heavy one comes first.',
      },
      contact: 'I’m looking for an entry-level Python software engineer role. Write to me, call, or message me on LinkedIn.',
      tagline: 'Software Engineer (Python) · FastAPI, PostgreSQL, pytest',
      // This is the view the page opens on, so its SEO text covers both roles.
      seo: {
        title: 'Anubhav Kumar · Software Engineer (Python) and Data Analyst',
        description:
          'Anubhav Kumar, entry-level Python software engineer and data analyst in Bengaluru (B.E. ECE, NMIT, 2026). FastAPI, PostgreSQL, SQL and pandas, with live projects: an investment simulator and a UPI payment-failure tracker for India’s top 50 banks.',
        keywords: [
          'Anubhav Kumar',
          'software engineer',
          'Python developer',
          'entry level software engineer',
          'fresher Python developer',
          'backend developer Bengaluru',
          'data analyst',
          'FastAPI',
          'Python',
          'PostgreSQL',
          'SQL',
          'pytest',
          'REST APIs',
          'pandas',
          'Power BI',
          'NMIT Bangalore',
        ],
      },
    },
    data: {
      role: 'Data Analyst',
      short: 'Data Analyst',
      headline: 'I turn messy public data into answers people can check.',
      intro:
        'I clean data in SQL and Python, test it before I trust it, and share what I find in Power BI, Excel and live dashboards anyone can open.',
      // Older resume file names redirect to this one in vercel.json.
      resume: {
        label: 'Data Analyst resume',
        href: 'resume/Anubhav-Kumar-Data-Analyst-Resume.pdf',
        fileName: 'Anubhav_Kumar_Data_Analyst_Resume.pdf',
      },
      stats: [
        { value: '1.07M', label: 'sales rows cleaned and analysed' },
        { value: '50', label: 'banks tracked, month by month' },
        { value: '3', label: 'projects you can open live' },
      ],
      about: [
        'I graduated in 2026 with a B.E. in Electronics and Communication from NMIT, Bangalore. I got into data the practical way: I kept wanting to know whether a number was actually true.',
        'So I check before I chart. On every project I write small automated tests that try to prove the data wrong, and that habit once caught a decimal-point error in NPCI’s own published figures. Then I explain what I found in plain words, because a finding nobody understands doesn’t change anything.',
        'Before this I spent three months as a backend intern on a Java and Spring Boot app, which is where I learned how data actually lives inside real software.',
      ],
      work: {
        title: 'Three projects, each starting with a real question.',
        description:
          'Every one uses public data, is tested before anything is published, and is live for you to open. The most relevant to a data analyst role come first.',
      },
      contact: 'I’m looking for an entry-level data analyst role in Bengaluru. Write to me, call, or message me on LinkedIn.',
      tagline: 'Data Analyst · SQL, Python, Power BI',
      seo: {
        title: 'Anubhav Kumar · Data Analyst',
        description:
          'Anubhav Kumar, entry-level data analyst in Bengaluru (B.E. ECE, NMIT, 2026). SQL, Python (pandas) and Power BI, with live projects on UPI payment failures at India’s top 50 banks and cancellations in 1.07 million retail sales rows.',
        keywords: [
          'Anubhav Kumar',
          'data analyst',
          'entry level data analyst',
          'fresher data analyst',
          'data analyst Bengaluru',
          'business analyst',
          'BI analyst',
          'SQL',
          'Python',
          'pandas',
          'Power BI',
          'Excel',
          'NMIT Bangalore',
        ],
      },
    },
  },
}
