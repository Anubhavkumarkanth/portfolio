import type { Certification } from './types'

// Data analysis certifications only; the Java course is left off this site.
// Add credential URLs to `links` as you collect them — cards without links
// simply don't show a button.

export const certifications: Certification[] = [
  {
    name: 'Kaggle SQL (Intro to SQL and Advanced)',
    issuer: 'Kaggle',
    date: '2026',
    description:
      'Certified in Introduction to SQL, building practical skills in working with and analysing data using SQL, and in Advanced SQL, developing the ability to solve complex data problems and extract meaningful insights with SQL.',
    skills: ['SQL', 'Data analysis'],
    links: [{ label: 'Intro to SQL certificate', href: 'certificates/kaggle-intro-to-sql.jpg' }],
  },
  {
    name: 'Career Essentials in Data Analysis',
    issuer: 'Microsoft & LinkedIn',
    date: '2026',
    description:
      'Hands-on foundational concepts in data analysis: data gathering and cleaning, building quality datasets, and visualisation. Software tools: Power BI, Python, Excel and PostgreSQL.',
    skills: ['Power BI', 'Python', 'Excel', 'PostgreSQL'],
    links: [],
  },
]
