import { ChartColumn, Code2, Coffee, Database, LayoutPanelTop, Wrench } from 'lucide-react'
import type { SkillCategory } from './types'

// Four pillars first, at equal weight: Java, Python, SQL and data analytics.
// Frontend and tooling sit underneath as supporting sections.
// `applied: true` marks what I've used in the internship or in a project.

export const skillCategories: SkillCategory[] = [
  {
    id: 'java',
    title: 'Java',
    icon: Coffee,
    description: 'From my internship and my order management project.',
    tier: 'pillar',
    items: [
      { name: 'Java', applied: true },
      { name: 'Spring Boot', applied: true },
      { name: 'REST APIs', applied: true },
      { name: 'JDBC', applied: true },
      { name: 'OOP', applied: true },
      { name: 'Unit testing', applied: true },
      { name: 'Integration testing', applied: true },
    ],
    appliedIn: ['Internship', 'Order Management System'],
  },
  {
    id: 'python',
    title: 'Python',
    icon: Code2,
    description: 'What I write most of my own projects in.',
    tier: 'pillar',
    items: [
      { name: 'Python', applied: true },
      { name: 'FastAPI', applied: true },
      { name: 'Pandas', applied: true },
      { name: 'NumPy', applied: true },
      { name: 'scikit-learn', applied: true },
      { name: 'Streamlit', applied: true },
    ],
    appliedIn: ['SIP Friction Analyzer', 'Dietbot'],
  },
  {
    id: 'sql',
    title: 'SQL',
    icon: Database,
    description: 'Schema design, reporting queries and transactions.',
    tier: 'pillar',
    items: [
      { name: 'SQL', applied: true },
      { name: 'PostgreSQL', applied: true },
      { name: 'JOINs', applied: true },
      { name: 'CTEs', applied: true },
      { name: 'Window functions', applied: true },
      { name: 'GROUP BY / HAVING', applied: true },
      { name: 'Transactions', applied: true },
      { name: 'Query analysis', applied: true },
    ],
    appliedIn: ['Order Management System', 'Internship', 'Kaggle SQL'],
  },
  {
    id: 'data',
    title: 'Data Analytics',
    icon: ChartColumn,
    description: 'Cleaning data, digging through it and reporting on it.',
    tier: 'pillar',
    items: [
      { name: 'SQL analysis', applied: true },
      { name: 'Data cleaning', applied: true },
      { name: 'Data exploration', applied: true },
      { name: 'Pandas', applied: true },
      { name: 'Data visualisation', applied: true },
      { name: 'Power BI' },
      { name: 'Excel' },
    ],
    appliedIn: ['Dietbot', 'Order Management System', 'Microsoft & LinkedIn certificate'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: LayoutPanelTop,
    description: 'Enough React to build the front end for my own projects.',
    tier: 'support',
    items: [
      { name: 'React', applied: true },
      { name: 'TypeScript', applied: true },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
    appliedIn: ['SIP Friction Analyzer'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    description: 'What I use day to day.',
    tier: 'support',
    items: [
      { name: 'Git', applied: true },
      { name: 'GitHub', applied: true },
      { name: 'Postman' },
      { name: 'Swagger UI' },
      { name: 'VS Code' },
      { name: 'IntelliJ IDEA' },
    ],
    appliedIn: [],
  },
]
