import type { Experience } from './types'

export const experience: Experience[] = [
  {
    company: 'Redevelopers Automate Solution Pvt. Ltd.',
    role: 'Java Full Stack Development Intern',
    type: 'Internship',
    start: '2026-02',
    end: '2026-04',
    location: 'MP, India',
    summary: 'Backend internship: REST APIs, the SQL and NoSQL data layer behind them, and the tests around them.',
    highlights: [
      'Developed and implemented RESTful backend APIs in Java Spring Boot, improving application performance by 30% and reducing server response time by 50%.',
      'Designed and managed relational database components using SQL and NoSQL technologies for application data persistence.',
      'Identified and resolved software defects, and wrote unit and integration tests to improve application reliability.',
    ],
    metrics: [
      { value: '30%', label: 'Improvement in application performance' },
      { value: '50%', label: 'Reduction in server response time' },
    ],
    tech: ['REST APIs', 'SQL', 'NoSQL', 'Unit testing', 'Integration testing', 'Spring Boot', 'Java'],
  },
]
