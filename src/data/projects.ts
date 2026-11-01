import type { Project } from './types'

// Data projects, most relevant first. Every number comes from the project's
// own README or resume line, so it can be checked against the repository.

export const projects: Project[] = [
  {
    slug: 'upi-pulse',
    name: 'UPI Pulse',
    hook: 'Your UPI payment failed. Was it you, or the bank?',
    summary:
      'I turned 57 months of NPCI’s bank-by-bank reports into one clean table and a live site that answers that question for India’s 50 busiest banks. Bank-side failures fell from 1.45% of payments in 2022 to 0.26% in 2026, while customer-side ones, like a wrong PIN, doubled.',
    results: [
      { value: '1.45% → 0.26%', label: 'bank-side failures, 2022 to 2026' },
      { value: '45 of 50', label: 'banks under RBI’s reported 1% line' },
      { value: '50', label: 'data checks; one caught an error in NPCI’s own file' },
    ],
    choices: [
      {
        pick: 'DuckDB',
        over: 'PostgreSQL',
        because:
          'it runs SQL straight on a file inside the Python script. No database server to set up, so the whole pipeline rebuilds for free on every update.',
      },
      {
        pick: 'Automated data checks (pytest)',
        over: 'spot-checking in Excel',
        because:
          'they run by themselves before every update, so a bad file never reaches the site. That is how a missing decimal point in NPCI’s August 2022 figures got caught.',
      },
      {
        pick: 'A static site',
        over: 'a Power BI dashboard',
        because: 'anyone can open it on a phone with no account or licence, and every chart has a plain table view.',
      },
    ],
    tools: ['SQL', 'Python', 'pandas', 'DuckDB', 'pytest', 'GitHub Actions'],
    shots: [
      {
        src: 'projects/upi-pulse-trend.webp',
        alt: 'Line chart of UPI technical declines across the top 50 banks from 2022 to 2026, falling from above 1% to about 0.26%, with a dashed 1% line',
        caption: 'Bank-side failures, weighted by each bank’s payments. The dashed line is the 1% target.',
        width: 1600,
        height: 842,
      },
      {
        src: 'projects/upi-pulse-scoreboard.webp',
        alt: 'Bank scoreboard table listing State Bank of India, Bank of Baroda, HDFC Bank and others with technical and business decline rates and 12-month sparklines',
        caption: 'The scoreboard: every top-50 bank, its rates this month and a 12-month mini-chart.',
        width: 1600,
        height: 991,
      },
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/upi-pulse',
      demo: 'https://anubhavkumarkanth.github.io/upi-pulse/',
    },
    question:
      'A failed UPI payment is one of two kinds. A technical decline means the bank’s or the network’s systems failed. A business decline is a normal “no”, like a wrong PIN or a low balance. One combined failure rate hides which is which. RBI has reportedly asked banks to keep technical declines under 1%: who actually meets that line, and is it getting better?',
    steps: [
      'Saved NPCI’s monthly “Top 50 Member Performance” tables (Jan 2022 to Sep 2026) unchanged, so every number traces back to its source.',
      'Gave each bank one name. NPCI’s files use 78 different names for 62 banks.',
      'Wrote 50 automatic checks: percentages stay between 0 and 100, the three outcomes add up to 100%, and every month has exactly 50 banks.',
      'Weighted every rate by each bank’s number of payments, so the figures show what a typical payer actually experiences.',
      'Flagged unusual months with a robust z-score: a measure of how far a month sits from that bank’s normal, built so one-off spikes don’t distort it.',
      'Added a question box: an AI model turns a plain-English question into SQL, and code checks the query is read-only before it runs. It got 30 of 30 test questions right.',
    ],
    findings: [
      'Technical declines fell every year: about 1.45% of payments in 2022, then 1.01%, 0.59%, 0.40% and 0.26% so far in 2026. That is about 1 payment in 385.',
      '45 of the top 50 banks were under the 1% line in September 2026, up from 24 in January 2022.',
      'Business declines doubled, from 5.2% in 2023 to 10.1% in 2026. SBI alone explains 0.70 points of the 3.39-point rise.',
      'NPCI published its August 2022 reversal rates without the decimal point (“9123.00%” for 91.23%). The checks caught it; the raw file stays unchanged and the fix is documented.',
    ],
    limits: [
      'The data is monthly totals per bank, so it shows that payments failed, not why.',
      'The 1% line comes from press reports of RBI’s request. It is not a published rule.',
      'The AI can misread a question, which is why the SQL it wrote is always shown next to the answer.',
    ],
  },
  {
    slug: 'retail-cancellation-leakage',
    name: 'Retail Cancellation Leakage',
    hook: 'Half of this shop’s “lost” sales were never really lost.',
    summary:
      'I analysed 1.07 million real sales rows from a UK online gift shop. The headline said 3.65% of sales were cancelled, but half of that was orders undone within 24 hours, so the cancellations the shop can actually act on come to 1.88%.',
    results: [
      { value: '3.65% → 1.88%', label: 'real cancellation rate, once quick reversals are set apart' },
      { value: '49.5%', label: 'of cancelled value was undone within 24 hours' },
      { value: '2 orders', label: 'explained the two worst months' },
    ],
    choices: [
      {
        pick: 'SQLite',
        over: 'PostgreSQL',
        because:
          'the whole database is one file the script rebuilds from scratch, so anyone can rerun the analysis without installing a server.',
      },
      {
        pick: 'A customer-level bootstrap',
        over: 'the textbook confidence-interval formula',
        because:
          'it re-runs the numbers 2,000 times on reshuffled samples of whole customers. One customer’s orders aren’t independent of each other, and the textbook formula assumes they are.',
      },
      {
        pick: 'Power BI plus a web dashboard',
        over: 'Power BI alone',
        because:
          'Power BI is what most teams already use, so the report is there, built on a star schema (one sales table linked to product, customer and date tables). The web version opens in any browser.',
      },
    ],
    tools: ['SQL', 'SQLite', 'Python', 'pandas', 'Power BI', 'DAX', 'Excel', 'Plotly'],
    shots: [
      {
        src: 'projects/retail-dashboard.webp',
        alt: 'Dashboard with four headline figures and four charts: monthly cancellation rate with and without reversals, where cancelled value comes from, top 10 products and rate by country with confidence ranges',
        caption: 'The live dashboard. The grey line is the headline rate; the blue line is the rate without quick reversals.',
        width: 1180,
        height: 1094,
      },
      {
        src: 'projects/retail-powerbi.webp',
        alt: 'Power BI overview cards: £19,699,785 gross sales, £719,656 cancelled, 3.65% headline rate, 49.5% reversal share and 1.88% adjusted rate',
        caption: 'The Power BI report’s overview. With no filters it matches the Python pipeline to the pound.',
        width: 1600,
        height: 278,
      },
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/retail-cancellation-leakage',
      demo: 'https://anubhavkumarkanth.github.io/retail-cancellation-leakage/',
    },
    question:
      'How much money does this shop lose to cancelled orders, where does it come from, and how much of it can the business actually do something about?',
    steps: [
      'Checked the original file against a fixed fingerprint (SHA-256), so every run starts from exactly the same data.',
      'Cleaned it in SQL with written rules: 22,523 duplicates, 6,029 zero-price rows and 5,901 non-product rows like postage, each removed for a stated reason.',
      'Defined a quick reversal: the same customer cancels the same product and quantity within 24 hours. Tests check the edges: 23 h 59 min counts, 24 h 1 min doesn’t.',
      'Broke the results down by month, product, country and customer using CTEs (named steps inside one query) and window functions (rankings and running totals).',
      'Published a dashboard, an Excel summary and a four-page Power BI report, behind 22 automated tests.',
    ],
    findings: [
      '49.5% of cancelled value was quick reversals. Set apart, the cancellation rate falls from 3.65% to 1.88%.',
      'Two single orders of 80,995 and 74,215 units, each cancelled within 16 minutes, caused the two biggest monthly spikes and 34% of all cancelled value.',
      'The top 5% of products hold 53% of the remaining cancelled value, so a short list is the place to start.',
      'Spain’s alarming 12% rate comes from one customer. Without them it is 0.8%, so no country-wide action is needed.',
    ],
    limits: [
      'The data has no cancellation reasons and no link to the original order, so the 24-hour rule is a careful rule of thumb.',
      '22% of sale lines have no customer ID, so customer-level figures cover identified customers only.',
      'Cancelled value is the invoice price, not lost profit.',
    ],
  },
  {
    slug: 'dietbot',
    name: 'Dietbot',
    hook: 'Every athlete above 2,950 calories got the exact same diet. I found out why.',
    summary:
      'I inherited a diet app whose model had learned from 99 rows generated by a formula, so it could only repeat that formula. I rebuilt it on 4,624 real adults from US government survey data, tested it against simple baselines, and reported the honest result: a small gain, not a breakthrough.',
    results: [
      { value: '99 → 4,624', label: 'training rows: formula-made to real survey records' },
      { value: '633 vs 651', label: 'average error in kcal: model vs the standard formula' },
      { value: '24', label: 'automated tests, one guarding the old bug' },
    ],
    choices: [
      {
        pick: 'Real NHANES survey data',
        over: 'the 99-row sample it came with',
        because:
          'those 99 labels were a fixed multiple of calories, so a model trained on them could never learn anything new. NHANES records what real people actually ate.',
      },
      {
        pick: 'Testing against simple baselines',
        over: 'reporting the model’s accuracy on its own',
        because:
          'a score only means something next to a baseline. A plain linear regression matched the Random Forest (632 vs 633 kcal), and the write-up says so.',
      },
      {
        pick: 'Streamlit',
        over: 'a separate React front end',
        because: 'it turns a Python script into a web app, so the data, the model and the screen live in one language.',
      },
    ],
    tools: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'Streamlit', 'PostgreSQL', 'pytest'],
    shots: [
      {
        src: 'projects/dietbot-plan.webp',
        alt: 'Dietbot results for a 70 kg badminton player: BMI 22.6, 385 kcal burned per session, a 2,424 kcal daily target, a 2,480 kcal typical intake, and daily macro targets',
        caption: 'A plan for a very active 70 kg badminton player. “Typical intake” is the model’s estimate, shown beside the target.',
        width: 1600,
        height: 1007,
      },
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/Dietbot_For_Athletes',
      demo: 'https://dietbot-for-athletes.onrender.com',
    },
    question:
      'Can height, weight, age and sex predict how much a person typically eats better than the standard formula dietitians use (Mifflin-St Jeor)?',
    steps: [
      'Spotted the problem: the original labels varied only in the fourth decimal place, a sure sign a formula made them. Above 2,953 kcal, every input got identical output.',
      'Built a repeatable pipeline that downloads three CDC files (NHANES 2017–18), joins them on each person’s ID and keeps 4,624 adults with complete, plausible records.',
      'Tested four model designs. Three lost to their baseline and were dropped, and a script reproduces each failure.',
      'Split the data 60/20/20 (train, tune, final test) and tuned only on the middle slice, so the final score is honest.',
    ],
    findings: [
      'The kept model’s average error is 633 kcal, against 651 for the standard formula and 684 for a plain average.',
      'A simple linear regression does just as well (632 kcal). Most of the gain comes from fitting to real data, not from the fancier model.',
      'R² is 0.13 (body size explains about 13% of the variation in what people eat), and the write-up says that plainly.',
    ],
    limits: [
      'One day of self-reported eating is a noisy measure, and people tend to under-report.',
      'It estimates typical intake, not what an athlete should eat. Not medical advice.',
    ],
    credit:
      'The app started from someone else’s notebooks. The rebuild, data pipeline, evaluation, database layer and tests are mine, and the README credits the original author.',
    evaluation: {
      caption: 'Held-out test set · 925 people · NHANES 2017–2018',
      rows: [
        { model: 'Plain average', mae: 684.4, r2: -0.001 },
        { model: 'Mifflin-St Jeor formula', mae: 650.6, r2: 0.071 },
        { model: 'Linear regression', mae: 632.1, r2: 0.134 },
        { model: 'Random Forest', mae: 632.9, r2: 0.13, best: true },
      ],
    },
  },
  {
    slug: 'sip-friction-analyzer',
    name: 'SIP Friction Analyzer',
    hook: 'Pause your SIP for a year and you skip ₹1.2 lakh. By year 20 it has cost you ₹9.75 lakh.',
    summary:
      'A SIP is a fixed amount invested every month, and most SIP calculators assume you never miss one. This app lets you add real life (a skipped month, a pause, a cut) and shows what it costs at the end, as a range of likely outcomes rather than one hopeful number.',
    results: [
      { value: '₹9.75L', label: 'cost of a one-year pause on ₹10,000 a month at 12%' },
      { value: '1,000', label: 'random market paths behind every range' },
      { value: '1.80 → 0.47 ms', label: 'history lookup after adding an index' },
    ],
    choices: [
      {
        pick: 'Monte Carlo simulation',
        over: 'one fixed yearly return',
        because:
          'markets don’t return 12% every year. Running 1,000 random paths gives a likely range (worst 10%, middle, best 10%) instead of one optimistic line.',
      },
      {
        pick: 'FastAPI',
        over: 'Flask',
        because: 'it checks every request against a typed schema by itself, so bad input is rejected before it reaches the maths.',
      },
      {
        pick: 'PostgreSQL',
        over: 'SQLite',
        because:
          'many users can save runs at the same time, and its query plans (EXPLAIN ANALYZE) showed exactly where an index would speed things up.',
      },
    ],
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'TypeScript', 'pytest'],
    shots: [
      {
        src: 'projects/sip-dashboard.webp',
        alt: 'SIP Friction results for ₹10,000 a month over 20 years with a pause from month 12 to 24: ideal wealth ₹99.91L, actual ₹87.95L, compounding loss ₹11.96L, total invested ₹22.70L, discipline score 90.65, compliance 94.6%, and a chart of ideal and actual growth',
        caption: 'A 20-year plan with a 13-month pause: ₹11.96 lakh lost to compounding, and a discipline score of 90.65 out of 100.',
        width: 1184,
        height: 1594,
      },
    ],
    links: {
      github: 'https://github.com/Anubhavkumarkanth/sip-friction-analyzer',
      demo: 'https://sip-friction-analyzer.onrender.com',
    },
    question: 'How much does real-life inconsistency, not the market, cost someone who invests every month?',
    steps: [
      'Built the simulation in Python: an ideal plan and an actual plan with your skips, pauses and cuts, both compounded month by month.',
      'Added three plain measures: compounding loss (money lost to the gaps), compliance rate (share of the planned money actually invested) and a 0–100 discipline score.',
      'Saved every run and the events behind it to PostgreSQL in one transaction (all of it saves, or none of it), so any result can be explained later.',
      'Checked the maths by hand: skipping month 2 of a ₹5,000 plan at 12% leaves ₹5,578 less after a year, matching the app.',
    ],
    findings: [
      'A one-year pause in year 3 costs about eight times the money skipped, because those months miss 17 more years of compounding.',
      'Halving the amount for a year hurts less than pausing, but the gap still grows all the way to the end.',
      'An index on (user, date) made the history lookup about four times faster: 1.80 ms to 0.47 ms on 20,000 rows.',
    ],
    limits: [
      'Returns are modelled as normally distributed with steady volatility, so rare crashes are under-represented.',
      'Ignores tax, fund fees and inflation. A learning tool, not financial advice.',
    ],
    extra: 'sip-playground',
  },
]

export const getProject = (slug: string | null) => projects.find((p) => p.slug === slug) ?? null
