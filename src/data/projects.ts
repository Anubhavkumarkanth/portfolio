import type { Project } from './types'

// Resume bullets are the primary source. Extra technical detail (test counts,
// evaluation tables, findings) comes from each repository's README so it can
// be checked against the code. UPI Pulse and the retail analysis are newer than
// the resume; everything about them comes from their repositories.

export const projects: Project[] = [
  {
    slug: 'upi-pulse',
    name: 'UPI Pulse',
    kind: 'SQL · Python · DuckDB · pytest',
    tagline: 'How often UPI payments fail at India’s 50 busiest banks, month by month, from NPCI’s own data.',
    summary:
      'I turned NPCI’s monthly “Top 50 Member Performance” tables (January 2022 to September 2026) into one clean bank-by-month table, tested it before publishing anything, and built a static site on top: trend charts, a scoreboard of every bank against the 1% technical-decline line, and alerts for unusual months. Technical declines fell every year, from about 1.45% of payments in 2022 to 0.26% so far in 2026, while business declines doubled.',
    problem:
      'A failed UPI payment is one of two kinds. A technical decline means the bank’s or the network’s systems failed. A business decline is a normal “no”, such as a wrong PIN or a daily limit. A single failure rate hides which is which, and RBI has reportedly asked NPCI to keep technical declines under 1% at each bank, yet there was no single view of who meets that line over time.',
    howItWorks: [
      'NPCI’s monthly API responses are saved unchanged in the repository.',
      'A parser gives each bank one name (NPCI’s files use 78 names for 62 banks) and builds one bank-by-month table in DuckDB and CSV.',
      'Data checks run first: percentages stay between 0 and 100, approved + business + technical add up to 100%, every month has exactly 50 banks, and spot checks match NPCI’s published values.',
      'The analysis weights rates by each bank’s payments and flags unusual months against each bank’s own history.',
      'The static site is built and published to GitHub Pages only if every check passes.',
    ],
    architecture: [
      { title: 'NPCI files', detail: 'Monthly Top 50 tables · Jan 2022 – Sep 2026 · saved unchanged' },
      { title: 'Parse & clean', detail: '78 bank names → 62 banks · one bank × month table' },
      { title: 'Data checks', detail: 'pytest · totals, coverage, spot checks · run before the build' },
      { title: 'Static site', detail: 'Charts, scoreboard, alerts · GitHub Pages' },
    ],
    features: [
      'Headline numbers for the latest month',
      'Trend charts of technical and business declines, with the 1% line',
      'A sortable scoreboard of all 50 banks with a 12-month mini-chart',
      'Compare up to three banks side by side',
      'Unusual-month alerts for banks whose technical declines jump above their own usual level',
      'A shop calculator that estimates failed payments from your volume and banks',
      'A question box that turns a question into a SQL query and shows the query next to the answer',
      'A table view for every chart; works on phones and in dark mode',
    ],
    engineering: [
      {
        title: 'Found a real error in NPCI’s data',
        detail:
          'In August 2022 NPCI published every bank’s debit reversal success rate without the decimal point (“9123.00%” for 91.23%). The data checks caught it; the pipeline corrects that month and keeps the raw file unchanged.',
      },
      {
        title: 'One name per bank',
        detail:
          'NPCI names the same bank differently over time. Even after ignoring capitals and “Ltd”, 78 names belong to 62 banks. Two pairs that look alike stay separate because both names appear in the same month.',
      },
      {
        title: 'Alerts built on plain statistics',
        detail:
          'A month is flagged when a bank’s technical declines are at least 1 point above its own 12-month median and at least 5 robust standard deviations above it. About 3% of bank-months are flagged; on simulated stable banks the false-alarm rate is 1.15%.',
      },
      {
        title: 'Rates weighted by payments',
        detail: 'Rates across banks are weighted by each bank’s number of payments, so they show what a typical payer experiences.',
      },
      {
        title: 'Checks before the build',
        detail:
          'A bad or changed NPCI file never reaches the site, because the data tests run before it is built and run again on every push.',
      },
      {
        title: 'AI kept on a short leash',
        detail:
          'A model writes a short monthly summary, but code first checks that every number in it appears in the computed figures. On 30 test questions the question box scored 30 of 30; a red-team set of 16 questions it must refuse scored 14 of 16, and that result is published too.',
      },
    ],
    contribution: [
      'Collected and parsed NPCI’s monthly tables into a single, tested bank-by-month dataset.',
      'Wrote the data checks and found and corrected an error in NPCI’s August 2022 file.',
      'Built the analysis: payment-weighted rates, the 1% line, each bank’s share of the rise in business declines, and the unusual-month alerts.',
      'Built and published the site, with the tests as a gate on every deploy.',
    ],
    limitations: [
      'The data is monthly totals per bank, so the shop calculator is an estimate from averages.',
      'The 1% line comes from press reports of RBI’s request to NPCI. It is not a published rule.',
      'For one month of receiving-bank data, NPCI’s own file lost its decimal detail, so a matching copy from Time Series of India is used and approval and reversal figures are not available for that month.',
      'The AI summary restates the month’s figures and does not explain causes. The question box can misread a question, which is why the query is always shown.',
    ],
    stack: [
      { group: 'Data', items: ['Python', 'SQL', 'DuckDB', 'CSV'] },
      { group: 'Quality', items: ['pytest', 'GitHub Actions'] },
      { group: 'Publishing', items: ['GitHub Pages', 'FastAPI', 'Render'] },
    ],
    tags: ['SQL', 'Python', 'DuckDB', 'Data validation', 'pytest'],
    highlights: [
      'Technical declines fell from about 1.45% of payments (2022) to 0.26% (2026)',
      '45 of the top 50 banks were under the 1% line in September 2026, up from 24',
      'Data checks caught a decimal-point error in NPCI’s own August 2022 file',
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/upi-pulse',
      demo: 'https://anubhavkumarkanth.github.io/upi-pulse/',
    },
    screenshots: [
      {
        src: 'projects/upi-pulse.png',
        alt: 'The UPI Pulse site: headline numbers and trend charts of technical and business declines',
        caption: 'The live site: latest-month numbers and the decline trends.',
      },
    ],
  },
  {
    slug: 'retail-cancellation-leakage',
    name: 'Retail Cancellation Leakage',
    kind: 'SQL · Python · Power BI · Excel',
    tagline: 'Separating quick reversals from real cancellations in 1.07 million retail sales rows.',
    summary:
      'An SQL and Python analysis of two years of real sales from a UK online gift retailer (UCI Online Retail II). The headline cancellation rate is 3.65% of sales, but 49.5% of the cancelled value is orders reversed within 24 hours (same customer, same product, same quantity). Counted separately, the rate falls to 1.88%, and two single orders explain the two biggest monthly spikes. The result is published as a live dashboard, an Excel summary and a four-page Power BI report.',
    problem:
      'How much sales value is lost to cancellations, where does it come from, and how much of it can the business actually do something about? One combined number makes the problem look about twice as big as it is and sends the business after the wrong thing.',
    howItWorks: [
      'The original UCI workbook is downloaded and checked against a fixed SHA-256 fingerprint, then copied unchanged into SQLite.',
      'SQL cleaning rules remove the sheet overlap, zero-price adjustments and non-product rows such as postage and bank charges. Every rule comes from first examining the raw table.',
      'A second SQL step labels each cancellation as a same-day reversal or “other”.',
      'Metrics queries (CTEs and window functions) break the results down by month, country, product and customer.',
      'Python adds bootstrap confidence ranges, then builds the dashboard, the Excel summary and the CSV outputs.',
    ],
    architecture: [
      { title: 'Raw data', detail: 'UCI Online Retail II · 1.07 million rows · SHA-256 checked' },
      { title: 'SQL', detail: 'Clean → classify reversals → metrics' },
      { title: 'Python', detail: 'Bootstrap ranges · concentration · outputs' },
      { title: 'Reports', detail: 'Plotly dashboard · Excel · Power BI · GitHub Pages' },
    ],
    features: [
      'Headline and adjusted cancellation rates, month by month',
      'Cancelled value by product, with the few products that drive most of it',
      'Country and customer breakdowns, with confidence ranges',
      'Interactive HTML dashboard published on GitHub Pages',
      'Excel summary workbook and CSV results for every query',
      'Four-page Power BI report on a star schema, with DAX measures',
    ],
    engineering: [
      {
        title: 'A definition that is tested at its boundary',
        detail:
          'A same-day reversal is the same customer, product and opposite quantity within 24 hours. Tests cover 23 h 59 min and exactly 24 h (counted) and 24 h 1 min (not counted), plus a quantity mismatch and a cancellation before the sale.',
      },
      {
        title: 'Every cleaning rule is accounted for',
        detail:
          'Of the 1.07 million raw rows, 22,523 duplicates, 6,029 zero-price rows and 5,901 non-product rows are dropped, each for a stated reason, and a test confirms every raw row is accounted for.',
      },
      {
        title: 'Spikes traced to single orders',
        detail:
          'Two orders (80,995 and 74,215 units of one product each, placed and cancelled within 16 minutes) make up 34% of all cancelled value. Without reversals, December 2011 drops from 28.3% to 1.15%.',
      },
      {
        title: 'Resampling customers, not rows',
        detail:
          'Confidence ranges come from a bootstrap that resamples whole customers 2,000 times, because one customer’s lines are not independent of each other. The seed is fixed, so every run gives the same numbers.',
      },
      {
        title: 'Country gaps that do not hold up',
        detail:
          'Spain’s 12.0% and France’s 5.3% each come down to one customer (94.5% and 78.2% of that country’s cancelled value). Without that customer they are 0.8% and 1.2%, so the write-up recommends no country-wide action.',
      },
      {
        title: 'The Power BI report reconciles to the pipeline',
        detail:
          'With no filters, the report’s cards match the pipeline exactly: £19,699,785 gross sales, £719,656 cancelled, 3.65% headline rate and 1.88% adjusted rate. 22 automated tests run before every deploy.',
      },
    ],
    contribution: [
      'Defined the reversal rule and wrote the SQL for cleaning, classification and metrics.',
      'Wrote the Python analysis: bootstrap ranges, concentration shares and leave-one-customer-out checks.',
      'Built the Plotly dashboard, the Excel summary and the Power BI star schema and DAX measures.',
      'Wrote the findings and the five recommendations, each tied to the evidence behind it.',
    ],
    limitations: [
      'The data has no cancellation reasons and no link back to the original invoice, so the reversal rule is a rule of thumb.',
      '22% of sale lines have no customer ID, so customer-level figures cover identified customers only.',
      'One retailer from December 2009 to December 2011, in pounds not adjusted for inflation. Cancelled value is the invoice price, not profit.',
      'The Power BI file is attached to a GitHub release because it is 17 MB.',
    ],
    stack: [
      { group: 'SQL', items: ['SQLite', 'CTEs', 'Window functions'] },
      { group: 'Python', items: ['Pandas', 'Plotly', 'Bootstrap statistics'] },
      { group: 'BI & reporting', items: ['Power BI', 'DAX', 'Star schema', 'Excel'] },
      { group: 'Quality', items: ['pytest', 'GitHub Actions'] },
    ],
    tags: ['SQL', 'Python', 'Power BI', 'Excel', 'Plotly'],
    highlights: [
      'Cancellation rate falls from 3.65% to 1.88% once quick reversals are counted separately',
      'Two single orders explain the two biggest monthly spikes',
      '22 automated tests; the live dashboard is only published if they pass',
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/retail-cancellation-leakage',
      demo: 'https://anubhavkumarkanth.github.io/retail-cancellation-leakage/',
    },
    screenshots: [
      {
        src: 'projects/retail-dashboard.png',
        alt: 'The retail cancellation dashboard with headline and adjusted cancellation rates by month',
        caption: 'The published dashboard.',
      },
      {
        src: 'projects/retail-powerbi.png',
        alt: 'The Power BI overview page showing gross sales, cancelled value and the headline and adjusted rates',
        caption: 'The Power BI overview page, which matches the pipeline’s figures exactly.',
      },
    ],
  },
  {
    slug: 'sip-friction-analyzer',
    name: 'SIP Friction Analyzer',
    kind: 'Python · FastAPI · PostgreSQL · React',
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
      demo: 'https://sip-friction-analyzer.onrender.com',
    },
    preview: 'sip',
  },
  {
    slug: 'dietbot',
    name: 'Dietbot',
    kind: 'Python · Pandas · scikit-learn',
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
      demo: 'https://dietbot-for-athletes.onrender.com',
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
]

export const getProject = (slug: string | null) => projects.find((p) => p.slug === slug) ?? null
