import type { Certification } from './types'

// Add credential URLs to `links` as you collect them — cards without links
// simply don't show a button.

export const certifications: Certification[] = [
  {
    name: 'Career Essentials in Data Analysis',
    issuer: 'Microsoft & LinkedIn',
    date: '2026',
    description:
      'Foundations of data analysis: gathering and cleaning data, building quality datasets, and visualisation.',
    skills: ['Power BI', 'Python', 'Excel', 'PostgreSQL'],
    links: [],
  },
  {
    name: 'Intro to SQL & Advanced SQL',
    issuer: 'Kaggle',
    date: '2026',
    description:
      'Working with and analysing data in SQL, then solving complex data problems and extracting insights with advanced SQL.',
    skills: ['SQL', 'Data analysis'],
    links: [{ label: 'Intro to SQL certificate', href: 'certificates/kaggle-intro-to-sql.jpg' }],
  },
  {
    name: 'Java Programming Masterclass',
    issuer: 'Udemy',
    date: '2025–26',
    description:
      'Java syntax, object-oriented programming and core concepts, with practical work on collections, exception handling, inheritance and interfaces.',
    skills: ['Java', 'OOP'],
    links: [],
  },
]
