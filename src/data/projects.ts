import type { Project } from './types'

// Resume bullets are the primary source. Extra technical detail (endpoints,
// test counts, index timings, evaluation tables) comes from each repository's
// README so it can be checked against the code. The Order Management System
// isn't on the resume; everything about it comes from its repository.

export const projects: Project[] = [
  {
    slug: 'sip-friction-analyzer',
    name: 'SIP Friction Analyzer',
    kind: 'Python · backend · SQL',
    tagline: 'A tool that shows how skipped or reduced SIP contributions affect the final amount.',
    summary:
      'A Python simulation engine behind a FastAPI + React app. You set up a monthly SIP plan, add real-life “friction” — a skipped month, a six-month pause, a year at half the amount — and it puts a number on it: compounding loss, a contribution compliance rate, a 0–100 discipline score, and a Monte Carlo range over 1,000 return paths. Every run is stored in PostgreSQL with the events that produced it.',
    problem:
      'Most people who fall short of their projected SIP returns don’t do so because the market underperformed. They pause during a drawdown, skip a month, or quietly halve the amount and never put it back. Standard SIP calculators assume perfect discipline, so that cost stays invisible.',
    howItWorks: [
      'You define a plan — monthly amount, expected return, duration — and add friction events: skip a month, reduce by a factor, pause a date range, or apply an annual step-up.',
      'The React client sends the plan through a typed Axios layer to FastAPI, where Pydantic validates the request.',
      'A Python engine builds the ideal and actual contribution schedules and compounds both month by month. A Monte Carlo mode runs 1,000 randomised return paths and reports P10 / P50 / P90.',
      'The run and every event that produced it are saved to PostgreSQL in one transaction, so any historical result can be explained and reproduced.',
      'The client renders a year-by-year ideal-vs-actual chart with the gap shaded, alongside the friction metrics.',
    ],
    architecture: [
      { title: 'React 19 + TypeScript', detail: 'Dashboard, Monte Carlo and fund screens · typed Axios client' },
      { title: 'FastAPI', detail: 'Pydantic v2 validation · JWT auth · history & reporting endpoints' },
      { title: 'Simulation engine', detail: 'Compounding loop · friction metrics · Monte Carlo paths' },
      { title: 'PostgreSQL', detail: 'SQLAlchemy · foreign keys · cascades · CHECK constraints' },
    ],
    features: [
      'Friction events: skip, reduce, pause a range, annual step-up',
      'Year-by-year ideal vs actual chart with the gap shaded',
      'Compounding loss, Contribution Compliance Rate and a 0–100 Discipline Score',
      'Monte Carlo range from 1,000 randomised return paths (P10 / P50 / P90)',
      'JWT sign-in — each user only sees their own saved runs',
      'Reporting endpoint showing which kinds of friction cost a user the most',
      'Saved history: every run is stored with the events that produced it',
      'Fund comparison screens over a small reference catalogue',
    ],
    engineering: [
      {
        title: 'One source of truth for the maths',
        detail:
          'The simulation used to exist twice — TypeScript in the browser and Python on the server, with nothing keeping them in step, and nothing saved. I moved it behind the API so there is one implementation and every run is persisted.',
      },
      {
        title: 'Schema that enforces its own invariants',
        detail:
          'users → simulations → simulation_events, with foreign keys, cascading deletes and CHECK constraints mirroring the engine’s bounds (score 0–100, CCR 0–1, valid event types, a pause can’t end before it starts).',
      },
      {
        title: 'One transaction per run',
        detail:
          'A simulation and all of its event rows commit together through SQLAlchemy or not at all — a run saved without the events that produced it couldn’t be explained later.',
      },
      {
        title: 'Index tuning with evidence',
        detail:
          'A composite index on (user_id, created_at DESC) for the history lookup, checked with EXPLAIN ANALYZE: 1.80 ms → 0.47 ms on 20,000 synthetic rows. The write-up also explains why the planner kept the sort.',
      },
      {
        title: 'Statistics stated precisely',
        detail:
          'Annual volatility is scaled to monthly by √12, not 12. The model is documented as additive normal returns — not mislabelled as geometric Brownian motion.',
      },
      {
        title: 'Quality gates',
        detail:
          '17 backend tests against a real database, strict TypeScript, Jest, and GitHub Actions CI running type-checks, tests and a production build. A multi-stage Dockerfile builds the frontend and serves it from FastAPI.',
      },
    ],
    contribution: [
      'Built the full-stack application with React, TypeScript and FastAPI.',
      'Refactored duplicated simulation logic into centralised, API-based backend processing — a single source of truth for projections.',
      'Designed the PostgreSQL schema linking users, simulation runs and friction events with foreign keys and constraints, using transactional persistence through SQLAlchemy.',
      'Implemented JWT authentication, history and reporting endpoints, automated tests, strict TypeScript checking, and SQL query analysis with EXPLAIN ANALYZE.',
    ],
    limitations: [
      'Returns are modelled as normally distributed with constant volatility — no fat tails, volatility clustering or serial correlation.',
      'Fund data is a small hard-coded reference catalogue for exercising the UI, not live market data.',
      'Pre-tax; ignores expense ratios, exit loads and inflation. An educational simulator, not financial advice.',
    ],
    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI', 'Pydantic v2', 'JWT'] },
      { group: 'Data', items: ['PostgreSQL', 'SQLAlchemy', 'EXPLAIN ANALYZE'] },
      { group: 'Frontend', items: ['React 19', 'TypeScript (strict)', 'Axios', 'Recharts'] },
      { group: 'Quality & tooling', items: ['pytest', 'Jest', 'GitHub Actions', 'Docker'] },
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'TypeScript'],
    highlights: [
      'Simulation engine in Python, served through a FastAPI backend',
      'PostgreSQL stores every run along with the events behind it',
      'React and TypeScript front end, with tests running in CI',
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/sip-friction-analyzer',
    },
    preview: 'sip',
  },
  {
    slug: 'dietbot',
    name: 'Dietbot',
    kind: 'Python · data analysis',
    tagline: 'A model that predicts daily calorie intake, trained on public health survey data.',
    summary:
      'I built a training set from raw CDC survey files (three NHANES 2017–2018 tables joined into 4,624 usable adult records), tested four model designs against baselines, and kept the one that won: a Random Forest that predicts daily calorie intake more accurately than the Mifflin-St Jeor formula. It powers a Streamlit app that turns an athlete’s profile into calorie and macro targets and a meal plan. The project started as someone else’s prototype, which I rebuilt into a tested Python package.',
    problem:
      'The prototype’s model was trained on 99 rows whose macro labels were fixed multiples of calories, so it could only rediscover a formula — and because trees can’t extrapolate, every athlete above ~2,950 kcal got identical output. The app was also feeding the model a single workout’s calorie burn instead of the daily target.',
    howItWorks: [
      'The profile is turned into BMI, BMR (Mifflin-St Jeor), TDEE and session calorie burn.',
      'The calorie target, adjusted for activity and goal, drives the daily protein, carb, fat and sugar targets.',
      'A Random Forest trained on NHANES predicts typical intake for similar people. It’s shown beside the target as a reference — it doesn’t drive the plan.',
      'A meal plan is assembled by nearest-neighbour matching over a 145-item food table.',
      'Profiles and generated plans can be persisted to PostgreSQL and read back later.',
    ],
    architecture: [
      { title: 'NHANES pipeline', detail: 'build_dataset.py · 3 CDC files joined on SEQN · filtered' },
      { title: 'Model training', detail: 'train_models.py · 60/20/20 split · baselines · metrics JSON' },
      { title: 'Streamlit app', detail: 'Profile → calorie & macro targets → meal plan' },
      { title: 'PostgreSQL', detail: 'profiles → plans → plan_items · transactional saves' },
    ],
    features: [
      'Calorie target from Mifflin-St Jeor, adjusted for activity level and goal',
      'Reference calorie-intake prediction from a Random Forest trained on NHANES 2017–2018',
      'Daily protein, carbohydrate, fat and sugar targets',
      'Meal plans built by nearest-neighbour matching over a 145-item food table',
      'Optional plan history stored in PostgreSQL',
      'Optional plain-language plan summary, with a templated fallback',
    ],
    engineering: [
      {
        title: 'A reproducible data pipeline',
        detail:
          'build_dataset.py downloads three NHANES 2017–2018 files (demographics, body measures, day-1 dietary recall), joins them on the respondent id, keeps adults 18–80 with complete records and plausible intake (800–5,000 kcal), and writes the dataset the model trains on.',
      },
      {
        title: 'Diagnosed a model that could only memorise a formula',
        detail:
          'The original labels had a standard deviation in the fourth decimal place per calorie — they came from a formula. Above the training ceiling the trees flat-lined, which covered most of the athletes the app is for.',
      },
      {
        title: 'Four designs tested; three rejected with evidence',
        detail:
          'Macro grams from body + calories, from body alone, and macro composition all failed to beat their baselines. Only calorie intake from body measurements did. A --rejected flag reproduces the failures.',
      },
      {
        title: 'Evaluation that can’t leak',
        detail:
          '4,624 NHANES adults, a 60/20/20 split, and min_samples_leaf chosen on the validation set only. Test-set metrics are written to model_metrics.json at training time.',
      },
      {
        title: 'Transactional persistence',
        detail:
          'profiles → plans → plan_items in PostgreSQL. Tests confirm cascade deletes and that a constraint violation rolls the whole save back.',
      },
      {
        title: 'Regression tests for the old failure',
        detail:
          '24 tests, including one that guards against the old model’s flat-line behaviour and one that checks the recorded metrics still beat the formula baseline.',
      },
      {
        title: 'Provenance kept honest',
        detail:
          'The repository history is intact: the original upload and the start of the rewrite are separate commits, and the README credits the prototype’s author.',
      },
    ],
    contribution: [
      'Rebuilt an existing prototype into a modular, tested Python application and fixed two correctness issues.',
      'Replaced a formula-derived macro prediction model with a calorie-intake prediction pipeline trained on NHANES 2017–2018 data.',
      'Evaluated multiple approaches against baseline methods; the final Random Forest achieved MAE 633 kcal and R² 0.13 on held-out data.',
      'Added PostgreSQL persistence for profiles and generated plans, with reproducible model evaluation and documented limitations and provenance.',
    ],
    contributionNote:
      'The project started from notebooks written by someone else. The rewrite, bug fixes, NHANES pipeline, evaluation, persistence layer and tests are my work.',
    limitations: [
      'R² of 0.13 is low. A single 24-hour dietary recall is a noisy measure (test-set SD ≈ 855 kcal), so the honest claim is narrow: modestly better than the standard formula.',
      'It predicts typical intake, not requirement, and self-reported intake tends to be under-reported. Not medical advice.',
      'The food table has 145 items, mostly South Asian dishes, and the greedy matcher approaches the macro targets rather than hitting them exactly.',
    ],
    stack: [
      { group: 'App', items: ['Python', 'Streamlit'] },
      { group: 'ML & data', items: ['Scikit-learn', 'Pandas', 'NumPy', 'NHANES 2017–2018'] },
      { group: 'Storage', items: ['PostgreSQL', 'psycopg2'] },
      { group: 'Quality', items: ['pytest'] },
    ],
    tags: ['Python', 'Pandas', 'scikit-learn', 'NumPy', 'PostgreSQL', 'Streamlit'],
    highlights: [
      'Dataset put together from raw CDC survey files, down to 4,624 adults',
      'Random Forest compared against the standard formula on held-out data',
      'An older prototype rebuilt into a tested Python package',
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/Dietbot_For_Athletes',
    },
    preview: 'dietbot',
    evaluation: {
      caption: 'Held-out test set · 925 rows · NHANES 2017–2018',
      rows: [
        { model: 'Mean baseline', mae: 684.4, r2: -0.0008 },
        { model: 'Mifflin-St Jeor', mae: 650.6, r2: 0.0714 },
        { model: 'Random Forest', mae: 632.9, r2: 0.1298, best: true },
      ],
    },
  },
  {
    slug: 'order-management-system',
    name: 'Order Management System',
    kind: 'Java · SQL',
    tagline: 'A console order system in Core Java, running on PostgreSQL over plain JDBC.',
    summary:
      'A seven-table PostgreSQL database in 3NF with six analytical reporting queries (CTEs, window functions, correlated subqueries) and an index evaluated with EXPLAIN ANALYZE. A small Core Java console app drives it over plain JDBC with no ORM, so every query is visible SQL. Placing an order locks the product rows and writes the order, line items, stock change, inventory log and payment in one transaction: all of it commits, or none of it does.',
    problem:
      'An order touches several tables at once. If the app crashes after deducting stock but before recording the payment, the data is quietly wrong. And two customers buying the last unit at the same moment can both read “stock = 1” and both succeed. This project solves both explicitly in SQL, with no framework in between.',
    howItWorks: [
      'A console menu drives customers, products, orders and reports. An OrderService validates input and orchestrates each operation.',
      'Placing an order turns off auto-commit, sorts the cart’s product ids, and locks each product row with SELECT … FOR UPDATE, checking stock before anything is written.',
      'If any line is short, an InsufficientStockException is thrown and the whole transaction rolls back.',
      'Otherwise it inserts the order (reading back the generated key), batches the line items, stock decrements and inventory-log rows, records the payment, and commits.',
      'Cancelling an order locks the order row, restores stock and logs the movement, also in one transaction.',
    ],
    architecture: [
      { title: 'Console UI', detail: 'Main.java menu · customers, products, orders, reports' },
      { title: 'Service layer', detail: 'OrderService · validation and orchestration' },
      { title: 'DAO layer', detail: 'Dao<T> · CustomerDao · ProductDao · OrderDao · ReportDao' },
      { title: 'PostgreSQL', detail: '7 tables in 3NF · CHECK / UNIQUE / FK constraints' },
    ],
    features: [
      'Add, list and search customers and products',
      'Low-stock report for inventory',
      'Place an order: order, line items, stock, inventory log and payment in one transaction',
      'Cancel an order: stock restored and the movement logged, transactionally',
      'Six reporting queries, from revenue by category to top products per category',
      'Composite index on customer orders, evaluated with EXPLAIN (ANALYZE, BUFFERS)',
    ],
    engineering: [
      {
        title: 'Reports that answer real questions',
        detail:
          'Top 3 products per category needs RANK() in its own CTE, because WHERE runs before window functions are computed. Revenue by category uses COUNT(DISTINCT order_id) so an order with three line items isn’t counted three times.',
      },
      {
        title: 'Row locks that prevent overselling',
        detail:
          'SELECT … FOR UPDATE on each product row stops two buyers of the last unit from both reading stock = 1 and both succeeding. Locks are taken in ascending product-id order, so two orders sharing products acquire them in the same sequence.',
      },
      {
        title: 'All-or-nothing writes',
        detail:
          'Auto-commit is off for the whole order. Any exception (SQL, runtime or insufficient stock) triggers rollback(), so an order can never survive with stock deducted and no payment.',
      },
      {
        title: 'Price snapshot, not duplication',
        detail:
          'order_items.unit_price records what the customer was actually charged; products.price is the current catalogue price. Reprinting an old invoice must not change its total.',
      },
      {
        title: 'Cascade only where it belongs',
        detail:
          'ON DELETE CASCADE is used on order_items and nowhere else. A line item means nothing without its order, but a customer must never be deletable out from under their orders.',
      },
      {
        title: 'Constraints in the database',
        detail:
          'price > 0, stock_quantity >= 0, quantity > 0, status IN (PLACED, CANCELLED), UNIQUE (order_id, product_id). The rules hold even if application code gets them wrong.',
      },
    ],
    contribution: [
      'Designed the seven-table PostgreSQL schema in 3NF, with constraints enforced in the database.',
      'Wrote six reporting queries (JOIN, GROUP BY / HAVING, correlated subquery, CTEs, window functions) and evaluated a composite index with EXPLAIN ANALYZE.',
      'Wrote the order placement and cancellation transactions in plain JDBC, with row-level locking and full rollback on failure.',
      'Structured the application into model, DAO, service and exception layers, and added tests for the commit and rollback paths.',
    ],
    limitations: [
      'Console interface only: no REST API or web front end.',
      'No connection pool; a new connection is opened per operation.',
      'Seed data is generated for the reports and index exercise, not real order activity.',
    ],
    stack: [
      { group: 'Database', items: ['PostgreSQL', 'SQL', 'CTEs', 'Window functions', 'EXPLAIN ANALYZE'] },
      { group: 'Data access', items: ['JDBC', 'PreparedStatement', 'Batch updates'] },
      { group: 'Application', items: ['Java 21', 'Maven', 'JUnit 5'] },
    ],
    sql: {
      caption: 'Query 5 of 6 from sql/03_reports.sql, condensed. The first CTE sums revenue per product.',
      code: `WITH product_revenue AS (
  -- … revenue per product:
  --   4-table JOIN, GROUP BY, SUM
),
ranked AS (
  SELECT category, sku,
         product, revenue,
    RANK() OVER (
      PARTITION BY category
      ORDER BY revenue DESC
    ) AS rank_in_category
  FROM product_revenue
)
SELECT category, rank_in_category,
       sku, product, revenue
FROM ranked
WHERE rank_in_category <= 3
ORDER BY category, rank_in_category;`,
    },
    queries: [
      { title: 'Revenue by category', concepts: 'Multi-table JOIN, GROUP BY, SUM, COUNT(DISTINCT)' },
      { title: 'Customers with more than 3 orders', concepts: 'GROUP BY + HAVING' },
      { title: 'Customers who have never ordered', concepts: 'LEFT JOIN … IS NULL' },
      { title: 'Products above their category average', concepts: 'Correlated subquery' },
      { title: 'Top 3 products per category', concepts: 'CTE + RANK() OVER (PARTITION BY …)' },
      { title: 'Monthly revenue by order size', concepts: 'CTE + CASE' },
    ],
    tags: ['Java', 'JDBC', 'PostgreSQL', 'SQL', 'Transactions'],
    highlights: [
      'Seven tables in 3NF, with the constraints kept in the database',
      'Orders written in a single transaction, with row locks and rollback',
      'Six reporting queries using CTEs, window functions and subqueries',
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/order-management-system',
    },
    preview: 'oms',
  },
]

export const getProject = (slug: string | null) => projects.find((p) => p.slug === slug) ?? null
