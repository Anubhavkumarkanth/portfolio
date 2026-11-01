import type { SkillGroup } from './types'

// Only what a project or the internship actually used.

export const skills: SkillGroup[] = [
  {
    title: 'SQL',
    plain: 'Asking questions of big tables',
    items: ['Joins', 'CTEs', 'Window functions', 'CASE', 'Indexes', 'PostgreSQL', 'SQLite', 'DuckDB'],
  },
  {
    title: 'Python',
    plain: 'Cleaning, checking and modelling data',
    items: ['pandas', 'NumPy', 'scikit-learn', 'matplotlib', 'Plotly', 'pytest'],
  },
  {
    title: 'Reporting',
    plain: 'Showing results so people act on them',
    items: ['Power BI', 'DAX', 'Star schema', 'Excel', 'HTML dashboards'],
  },
  {
    title: 'Statistics',
    plain: 'Knowing when a number can be trusted',
    items: ['Bootstrap confidence ranges', 'Outlier checks', 'Baselines', 'Train / test splits', 'KPI definitions'],
  },
]

export const tooling = ['Git', 'GitHub', 'GitHub Actions', 'VS Code']
