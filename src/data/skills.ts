import type { SkillGroup, Track } from './types'

// Only what a project or the internship actually used.

export const skills: Record<Track, SkillGroup[]> = {
  software: [
    {
      title: 'Python',
      plain: 'Writing the backend and the models',
      items: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'pandas', 'scikit-learn', 'Streamlit', 'pytest'],
    },
    {
      title: 'APIs',
      plain: 'Letting other software talk to mine',
      items: ['REST APIs', 'Request validation', 'JWT sign-in', 'Database transactions'],
    },
    {
      title: 'Databases',
      plain: 'Storing data so it stays correct',
      items: ['PostgreSQL', 'DuckDB', 'Table design', 'Indexes', 'Query plans'],
    },
    {
      title: 'Testing and delivery',
      plain: 'Catching mistakes before users do',
      items: ['pytest', 'GitHub Actions CI', 'Deploys on Render'],
    },
  ],
  data: [
    {
      title: 'SQL',
      plain: 'Asking questions of big tables',
      items: ['Joins', 'CTEs', 'Window functions', 'CASE', 'Indexes', 'MySQL', 'PostgreSQL', 'DuckDB'],
    },
    {
      title: 'Python',
      plain: 'Cleaning, checking and charting data',
      items: ['pandas', 'NumPy', 'matplotlib', 'Plotly', 'pytest'],
    },
    {
      title: 'Reporting',
      plain: 'Showing results so people act on them',
      items: ['Power BI', 'DAX', 'Star schema', 'Excel', 'HTML dashboards'],
    },
    {
      title: 'Statistics',
      plain: 'Knowing when a number can be trusted',
      items: ['Bootstrap confidence ranges', 'Outlier checks', 'Baselines', 'KPI definitions'],
    },
  ],
}

/** The "Also in use" line under the skill groups. */
export const tooling: Record<Track, string[]> = {
  software: ['SQL', 'Java and Spring Boot (internship)', 'JavaScript', 'TypeScript', 'React', 'Git', 'VS Code'],
  data: ['Git', 'GitHub', 'GitHub Actions', 'VS Code'],
}
