import { BrainCircuit, ChartColumn, Code2, Database, Server, Table2, Workflow } from 'lucide-react'
import type { Capability, FocusArea } from './types'

// "What I can do" and "Where I'm headed". Each claim points at the work that
// backs it: `project` opens that case study, `section` scrolls to a section.

export const capabilities: Capability[] = [
  {
    title: 'Analyse data',
    description:
      'Clean, join and explore datasets with Pandas and NumPy, answer questions in SQL, and present the results in Power BI, Excel or a Streamlit app.',
    icon: ChartColumn,
    proof: [
      { label: 'Dietbot', project: 'dietbot' },
      { label: 'Data analysis certificates', section: 'certifications' },
    ],
  },
  {
    title: 'Write analytical SQL',
    description:
      'Joins, aggregations, HAVING, correlated subqueries, CTEs and window functions. And read the query plan when something is slow.',
    icon: Database,
    proof: [
      { label: 'Order Management System', project: 'order-management-system' },
      { label: 'SIP Friction Analyzer', project: 'sip-friction-analyzer' },
      { label: 'Kaggle SQL', section: 'certifications' },
    ],
  },
  {
    title: 'Build and evaluate ML models',
    description:
      'Train scikit-learn models on a clean train/validation/test split, compare them against simple baselines, and write down what the model can’t do.',
    icon: BrainCircuit,
    proof: [{ label: 'Dietbot', project: 'dietbot' }],
  },
  {
    title: 'Build data pipelines',
    description:
      'Turn raw source files into a reproducible dataset: download, join on keys, filter out unusable records, and regenerate the whole thing from one script.',
    icon: Workflow,
    proof: [{ label: 'Dietbot NHANES pipeline', project: 'dietbot' }],
  },
  {
    title: 'Model data in PostgreSQL',
    description:
      'Design normalised schemas with constraints enforced in the database, and write transactional code that commits everything or nothing.',
    icon: Table2,
    proof: [
      { label: 'SIP Friction Analyzer', project: 'sip-friction-analyzer' },
      { label: 'Order Management System', project: 'order-management-system' },
    ],
  },
  {
    title: 'Build Python backends',
    description:
      'REST APIs in FastAPI with request validation and JWT auth, backed by PostgreSQL, plus Spring Boot experience from my internship.',
    icon: Server,
    proof: [
      { label: 'SIP Friction Analyzer', project: 'sip-friction-analyzer' },
      { label: 'Internship', section: 'experience' },
    ],
  },
]

// Shown side by side, in no particular order.
export const focusAreas: FocusArea[] = [
  {
    title: 'Data analytics',
    description: 'SQL-first analysis, cleaning and visualisation.',
    icon: ChartColumn,
    evidence: [
      { label: 'Order Management System reports', project: 'order-management-system' },
      { label: 'Kaggle Intro & Advanced SQL', section: 'certifications' },
      { label: 'Career Essentials in Data Analysis', section: 'certifications' },
    ],
  },
  {
    title: 'Data science & ML',
    description: 'Models and simulations, measured against baselines.',
    icon: BrainCircuit,
    evidence: [
      { label: 'Dietbot calorie-intake model', project: 'dietbot' },
      { label: 'SIP Monte Carlo engine', project: 'sip-friction-analyzer' },
    ],
  },
  {
    title: 'Data engineering',
    description: 'Pipelines, schemas and queries that hold up.',
    icon: Workflow,
    evidence: [
      { label: 'Dietbot NHANES pipeline', project: 'dietbot' },
      { label: 'SIP schema & index tuning', project: 'sip-friction-analyzer' },
      { label: 'Order Management System schema', project: 'order-management-system' },
    ],
  },
  {
    title: 'Software engineering',
    description: 'Python backends, APIs and the apps around them.',
    icon: Code2,
    evidence: [
      { label: 'SIP Friction Analyzer backend', project: 'sip-friction-analyzer' },
      { label: 'Backend internship', section: 'experience' },
    ],
  },
]
