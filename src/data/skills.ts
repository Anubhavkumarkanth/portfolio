import type { SkillCategory } from './types'

// Four data-analyst pillars first: SQL, Python, reporting and analysis.
// `applied: true` marks what I've used in a project or my internship.

export const skillCategories: SkillCategory[] = [
  {
    id: 'sql',
    title: 'SQL',
    description: 'Cleaning, classifying and summarising data in queries.',
    tier: 'pillar',
    items: [
      { name: 'SQL', applied: true },
      { name: 'PostgreSQL', applied: true },
      { name: 'SQLite', applied: true },
      { name: 'DuckDB', applied: true },
      { name: 'JOINs', applied: true },
      { name: 'CTEs', applied: true },
      { name: 'Window functions', applied: true },
      { name: 'GROUP BY / HAVING', applied: true },
      { name: 'Query analysis', applied: true },
    ],
    appliedIn: ['Retail Cancellation Leakage', 'UPI Pulse', 'Kaggle SQL'],
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Pipelines, statistics and tests for the analysis.',
    tier: 'pillar',
    items: [
      { name: 'Python', applied: true },
      { name: 'Pandas', applied: true },
      { name: 'NumPy', applied: true },
      { name: 'scikit-learn', applied: true },
      { name: 'Bootstrap statistics', applied: true },
      { name: 'pytest', applied: true },
    ],
    appliedIn: ['Retail Cancellation Leakage', 'UPI Pulse', 'Dietbot'],
  },
  {
    id: 'bi',
    title: 'BI & Reporting',
    description: 'Turning the results into something a manager can open.',
    tier: 'pillar',
    items: [
      { name: 'Power BI', applied: true },
      { name: 'DAX', applied: true },
      { name: 'Star schema', applied: true },
      { name: 'Plotly dashboards', applied: true },
      { name: 'Excel', applied: true },
      { name: 'Data visualisation', applied: true },
    ],
    appliedIn: ['Retail Cancellation Leakage', 'UPI Pulse', 'Microsoft & LinkedIn certificate'],
  },
  {
    id: 'analysis',
    title: 'Data Analysis',
    description: 'Checking the data first, then explaining what it shows.',
    tier: 'pillar',
    items: [
      { name: 'Data cleaning', applied: true },
      { name: 'Data validation', applied: true },
      { name: 'Exploratory analysis', applied: true },
      { name: 'Outlier detection', applied: true },
      { name: 'Confidence intervals', applied: true },
      { name: 'Findings write-ups', applied: true },
    ],
    appliedIn: ['Retail Cancellation Leakage', 'UPI Pulse', 'Dietbot'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'What I use day to day.',
    tier: 'support',
    items: [
      { name: 'Git', applied: true },
      { name: 'GitHub', applied: true },
      { name: 'GitHub Actions', applied: true },
      { name: 'GitHub Pages', applied: true },
      { name: 'VS Code' },
    ],
    appliedIn: [],
  },
]
