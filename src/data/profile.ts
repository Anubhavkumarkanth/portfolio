import type { Profile } from './types.ts'

// Personal information, social links and the About copy.
// This file is also read by vite.config.ts to fill the SEO tags in index.html,
// so keep it free of browser-only code and icon imports.

export const profile: Profile = {
  name: 'Anubhav Kumar',
  initials: 'AK',
  role: 'Data Analyst',
  specialties: ['SQL', 'Python', 'Power BI', 'Excel'],
  intro:
    'A 2026 engineering graduate from NMIT Bangalore. I clean public data, query it in SQL and Python, and publish the findings as dashboards anyone can open and check: UPI payment failures at India’s top 50 banks, and cancellations in 1.07 million retail sales rows.',
  tagline: 'SQL · Python · Power BI · Data Analytics',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles',
  email: 'anubhavkumarkanth123@gmail.com',
  phone: '+91 72238 27840',
  phoneHref: '+917223827840',
  // The PDF keeps its original file name so links already shared keep working.
  resume: {
    label: 'Data Analyst Resume',
    shortLabel: 'Resume',
    href: 'resume/Anubhav-Kumar-Python-Data-Analysis-Resume.pdf',
    fileName: 'Anubhav_Kumar_Data_Analyst_Resume.pdf',
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
      group: 'Data',
      roles: ['Data Analyst', 'Business Analyst', 'BI Analyst', 'Reporting Analyst'],
      note: 'SQL, Python and Power BI, from cleaning the data to publishing the dashboard.',
    },
  ],
  coreStack: ['SQL', 'Python', 'Pandas', 'Power BI', 'Excel', 'DuckDB', 'PostgreSQL'],
  about: {
    paragraphs: [
      'I graduated in 2026 with a B.E. in Electronics and Communication Engineering from Nitte Meenakshi Institute of Technology, Bangalore.',
      'I like analysis that someone else can check. For UPI Pulse I tested NPCI’s published bank tables before building anything on them, and the tests caught a real decimal-point error in NPCI’s August 2022 file. In the retail analysis, about half of one retailer’s cancelled value turned out to be orders reversed within 24 hours, so the 3.65% headline cancellation rate falls to 1.88% once they are counted separately.',
      'I also did a three-month internship on the backend of a Java and Spring Boot application, which is where I got used to SQL inside a working codebase. Since then my own projects have been SQL, Python and Power BI.',
    ],
    facts: [
      { label: 'Education', value: 'B.E. ECE · NMIT Bangalore · 2026' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Internship', value: 'Full Stack Dev · Feb–Apr 2026' },
      { label: 'Core skills', value: 'SQL · Python · Power BI · Excel' },
      { label: 'Looking for', value: 'Data analyst roles' },
    ],
  },
  seo: {
    title: 'Anubhav Kumar — Data Analyst',
    description:
      'Anubhav Kumar, B.E. ECE at NMIT Bangalore, Class of 2026. Data analyst skilled in SQL, Python (Pandas) and Power BI, with live projects on UPI payment failures and retail cancellations. Open to entry-level data analyst roles.',
    keywords: [
      'Anubhav Kumar',
      'data analyst',
      'entry level data analyst',
      'fresher data analyst',
      'business analyst',
      'BI analyst',
      'SQL',
      'Python',
      'Pandas',
      'Power BI',
      'Excel',
      'data visualisation',
      'NMIT Bangalore',
      'portfolio',
    ],
  },
}
