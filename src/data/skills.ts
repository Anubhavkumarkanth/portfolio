import { ChartColumn, Code2, Database, LayoutPanelTop, Server, Wrench } from 'lucide-react'
import type { SkillCategory } from './types'

// Grouped the way a backend role would read them: languages first, then the
// layers of a system. `applied: true` marks what I've actually used in the
// internship or in a project — the UI highlights those.

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code2,
    description: 'Java and Python are what I write most; SQL sits alongside both.',
    items: [
      { name: 'Java', applied: true },
      { name: 'Python', applied: true },
      { name: 'SQL', applied: true },
      { name: 'JavaScript', applied: true },
      { name: 'TypeScript', applied: true },
    ],
    appliedIn: ['Internship', 'Order Management System', 'SIP Friction Analyzer', 'Dietbot'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    description: 'Spring Boot from my internship, FastAPI from my own projects.',
    items: [
      { name: 'Spring Boot', applied: true },
      { name: 'FastAPI', applied: true },
      { name: 'REST APIs', applied: true },
      { name: 'JWT auth', applied: true },
    ],
    appliedIn: ['Internship', 'SIP Friction Analyzer'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    description: 'Schema design, joins and transactions — through JDBC and through an ORM.',
    items: [
      { name: 'PostgreSQL', applied: true },
      { name: 'SQL', applied: true },
      { name: 'NoSQL', applied: true },
      { name: 'JDBC', applied: true },
      { name: 'SQLAlchemy', applied: true },
    ],
    appliedIn: ['Order Management System', 'Internship', 'SIP Friction Analyzer'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: LayoutPanelTop,
    description: 'Enough React to build and wire up the interfaces my backends serve.',
    items: [
      { name: 'React', applied: true },
      { name: 'TypeScript', applied: true },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
    appliedIn: ['SIP Friction Analyzer'],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: ChartColumn,
    description: 'Cleaning and exploring datasets, then modelling or reporting on them.',
    items: [
      { name: 'Pandas', applied: true },
      { name: 'NumPy', applied: true },
      { name: 'scikit-learn', applied: true },
      { name: 'Streamlit', applied: true },
      { name: 'Power BI' },
      { name: 'Excel' },
    ],
    appliedIn: ['Dietbot'],
  },
  {
    id: 'tools',
    title: 'Testing & Tools',
    icon: Wrench,
    description: 'Tests written alongside the fix, and the tooling I use day to day.',
    items: [
      { name: 'Unit testing', applied: true },
      { name: 'Integration testing', applied: true },
      { name: 'Git', applied: true },
      { name: 'GitHub', applied: true },
      { name: 'Postman' },
      { name: 'Swagger UI' },
      { name: 'IntelliJ IDEA' },
      { name: 'VS Code' },
    ],
    appliedIn: ['Internship', 'SIP Friction Analyzer'],
  },
]
