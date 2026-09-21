import { BrainCircuit, ChartColumn, Code2, Database, LayoutPanelTop, Server, ShieldCheck, Wrench } from 'lucide-react'
import type { SkillCategory } from './types'

// Resume skills, plus techniques the projects demonstrate (CTEs, window
// functions, Monte Carlo). `applied: true` marks what appears in the internship
// or project work; the UI highlights those. Python and data come first.

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    description: 'Python and SQL for most of my work, TypeScript for front ends, and Java from my internship.',
    items: [
      { name: 'Python', applied: true },
      { name: 'SQL', applied: true },
      { name: 'TypeScript', applied: true },
      { name: 'JavaScript' },
      { name: 'Java', applied: true },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
    appliedIn: ['SIP Friction Analyzer', 'Dietbot', 'Order Management System', 'Internship'],
    wide: true,
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    icon: ChartColumn,
    description: 'Cleaning, joining and exploring data, then presenting it.',
    items: [
      { name: 'Pandas', applied: true },
      { name: 'NumPy', applied: true },
      { name: 'Streamlit', applied: true },
      { name: 'Power BI' },
      { name: 'Excel' },
    ],
    appliedIn: ['Dietbot', 'Microsoft & LinkedIn certificate'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: BrainCircuit,
    description: 'Models and simulations, judged against baselines on held-out data.',
    items: [
      { name: 'Scikit-learn', applied: true },
      { name: 'Random Forest', applied: true },
      { name: 'Baseline evaluation', applied: true },
      { name: 'Train / val / test split', applied: true },
      { name: 'Monte Carlo', applied: true },
    ],
    appliedIn: ['Dietbot', 'SIP Friction Analyzer'],
  },
  {
    id: 'databases',
    title: 'Databases & SQL',
    icon: Database,
    description: 'Analytical queries, normalised schemas, transactional writes, and query plans I actually read.',
    items: [
      { name: 'PostgreSQL', applied: true },
      { name: 'SQL', applied: true },
      { name: 'CTEs & window functions', applied: true },
      { name: 'Schema design', applied: true },
      { name: 'Transactions', applied: true },
      { name: 'EXPLAIN ANALYZE', applied: true },
      { name: 'SQLAlchemy', applied: true },
      { name: 'NoSQL', applied: true },
      { name: 'JDBC', applied: true },
    ],
    appliedIn: ['SIP Friction Analyzer', 'Order Management System', 'Dietbot', 'Internship'],
    wide: true,
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    description: 'Python APIs with FastAPI; Spring Boot from my internship.',
    items: [
      { name: 'FastAPI', applied: true },
      { name: 'RESTful APIs', applied: true },
      { name: 'JWT auth', applied: true },
      { name: 'Spring Boot', applied: true },
    ],
    appliedIn: ['SIP Friction Analyzer', 'Internship'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: LayoutPanelTop,
    description: 'Typed React interfaces for the apps I build.',
    items: [{ name: 'React', applied: true }, { name: 'TypeScript', applied: true }, { name: 'HTML & CSS' }],
    appliedIn: ['SIP Friction Analyzer'],
  },
  {
    id: 'quality',
    title: 'Testing & Debugging',
    icon: ShieldCheck,
    description: 'Tests written alongside the fix, not after the release.',
    items: [
      { name: 'Unit testing', applied: true },
      { name: 'Integration testing', applied: true },
      { name: 'Automated testing', applied: true },
      { name: 'Debugging', applied: true },
    ],
    appliedIn: ['SIP Friction Analyzer', 'Dietbot', 'Order Management System', 'Internship'],
    wide: true,
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    description: 'Day-to-day development and API tooling.',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Postman' },
      { name: 'Swagger UI' },
      { name: 'IntelliJ IDEA' },
    ],
    appliedIn: [],
    wide: true,
  },
]
