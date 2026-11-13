import type { Project, SkillGroup } from './types'

// Orderdesk, the third project of the software view. Facts come from the orderdesk-qa-suite README.

export const orderdesk: Project = {
  slug: 'orderdesk-qa-suite',
  name: 'Orderdesk QA Suite',
  hook: 'I planted 8 bugs in an online shop. My tests caught all 8.',
  summary:
    'Orderdesk is a small shop with a UPI checkout that I built so I could test it properly: 144 automated tests across the API, the database and the browser, a written test plan, and a reproducible bug report for every defect. It even fails UPI payments on purpose, at the real rates NPCI reports.',
  results: [
    { value: '144', label: 'automated tests: 113 API, 8 database, 21 browser, 2 simulator' },
    { value: '8 of 8', label: 'planted bugs caught, each with a bug report' },
    { value: '34', label: 'extra ways I broke the code; a test failed every time' },
  ],
  choices: [
    {
      pick: 'Playwright',
      over: 'Selenium',
      because:
        'it waits for the page by itself and installs with one command, so browser tests are less flaky. Selenium is more common, and the same ideas (locators, waits) carry over.',
    },
    {
      pick: 'pytest and requests',
      over: 'a Postman collection',
      because:
        'the API tests live in code next to the app and run in CI (automatic checks on every change) with nothing extra to install.',
    },
    {
      pick: 'Planted bugs',
      over: 'only testing the clean build',
      because:
        'switching 8 known bugs on one at a time proves the tests actually catch problems, instead of just showing they pass.',
    },
  ],
  tools: ['Python', 'pytest', 'Playwright', 'requests', 'SQL', 'FastAPI', 'GitHub Actions'],
  shots: [
    {
      src: 'projects/orderdesk-bug-008.webp',
      alt: 'Two checkout panels side by side for the same order with coupon FLAT50: the correct build shows a total of Rs 290.00, the build with bug 8 switched on shows Rs 340.00',
      caption:
        'BUG-008, caught by a browser test: the page ignored the ₹50 coupon (₹300 − ₹50 + ₹40 shipping should be ₹290). The API was right, so only an end-to-end test could see it.',
      width: 748,
      height: 1010,
    },
    {
      src: 'projects/orderdesk-checkout.webp',
      alt: 'The Orderdesk shop: a product table with prices and stock, and a checkout panel with an order total and UPI test IDs',
      caption: 'The live shop the tests run against, including the “test item” products that sit exactly on each price limit.',
      width: 900,
      height: 1239,
    },
  ],
  links: {
    github: 'https://github.com/Anubhavkumarkanth/orderdesk-qa-suite',
    demo: 'https://orderdesk-qa-suite-live.onrender.com',
  },
  question:
    'Can a test suite catch the payment bugs that cost a shop money or customers: double charges, refunds that never happen, stock oversold in a sale, payments stuck as pending?',
  steps: [
    'Wrote the requirements and a test plan first, then 73 test cases that become 144 automated tests, each traced back to a requirement.',
    'Tested the edges where bugs hide: quantities 0, 1, 10 and 11; coupon minimums at ₹499.99, ₹500.00 and ₹500.01; one-paisa rounding; 500 buyers racing for the last 5 units.',
    'Used boundary values (testing right at each limit), equivalence partitions (one test per group of similar inputs) and a state-transition table (12 order-status changes that must be refused).',
    'Simulated real UPI failures with NPCI’s error codes (wrong PIN, low balance, bank timeout) at real decline rates, plus forged payment messages, failed refunds and a phone on 3G that double-taps Pay.',
    'Checked the database directly with SQL after each scenario: totals add up, stock is never negative, no order is charged twice.',
  ],
  findings: [
    'Every planted bug was caught by at least one test, and the clean build has zero failures.',
    'BUG-008 (a wrong total on the page) passed every API test. Only the browser test caught it, which is why the suite has three layers.',
    'CI blocks any change that fails a test, and also fails if any planted bug goes undetected.',
  ],
  findingsTitle: 'What the tests showed',
  limits: [
    'I wrote both the app and the tests, so this shows how sensitive the tests are, not that I found bugs in someone else’s software.',
    'Not covered: load testing, security beyond payment signatures, accessibility audits, browsers other than Chromium, real phones.',
  ],
}

export const defects = [
  { id: 'BUG-001', what: 'Quantity 11 accepted (the limit is 10)', caughtBy: '1 test (boundary value 11)' },
  { id: 'BUG-002', what: 'SAVE10 coupon rejected at exactly ₹500.00', caughtBy: '3 tests' },
  { id: 'BUG-003', what: 'Free shipping lost after a discount', caughtBy: '1 test' },
  { id: 'BUG-004', what: 'Cancelling an order doesn’t return the stock', caughtBy: '6 tests across API, SQL and browser' },
  { id: 'BUG-005', what: 'A shipped order can still be cancelled', caughtBy: '2 tests (API, browser)' },
  { id: 'BUG-006', what: '“user@nodot” accepted as an e-mail', caughtBy: '1 test (one equivalence partition)' },
  { id: 'BUG-007', what: 'Discount cut off instead of rounded (1 paisa out)', caughtBy: '1 test' },
  { id: 'BUG-008', what: 'Checkout total ignores the coupon', caughtBy: '1 browser test; every API test passes' },
]

export const qaSkills: SkillGroup[] = [
  {
    title: 'Test design',
    plain: 'Deciding what is worth testing',
    items: ['Test plans', 'Test cases', 'Boundary values', 'Equivalence partitions', 'State transitions', 'Traceability'],
  },
  {
    title: 'Automation',
    plain: 'Making the checks run by themselves',
    items: ['Python', 'pytest (fixtures, parametrize)', 'Playwright', 'requests', 'GitHub Actions'],
  },
  {
    title: 'API & data',
    plain: 'Testing behind the screen',
    items: ['REST API testing', 'Status codes and error cases', 'SQL validation queries', 'Data-quality checks'],
  },
  {
    title: 'Reporting',
    plain: 'Writing bugs a developer can fix fast',
    items: ['Steps to reproduce', 'Expected vs actual', 'Evidence and screenshots', 'Root cause', 'Regression tests'],
  },
]

export const otherTesting = [
  {
    name: 'UPI Pulse: data and AI testing',
    href: 'https://github.com/Anubhavkumarkanth/upi-pulse',
    points: [
      '50 data checks run before every update; they caught a real error in NPCI’s published figures.',
      'The AI question box got 30 of 30 known-answer questions right.',
      'Attacked it with 16 tricky questions: it refused all 8 attacks, and the 2 it shouldn’t have answered are recorded as failures, not hidden.',
    ],
  },
  {
    name: 'SIP Friction Analyzer',
    href: 'https://github.com/Anubhavkumarkanth/sip-friction-analyzer',
    points: [
      'pytest tests for sign-in, one-transaction saves and cascading deletes, run against a real database.',
      'Checked the maths by hand: skipping month 2 of a ₹5,000 plan at 12% leaves ₹5,578 less after a year, matching the app.',
    ],
  },
  {
    name: 'Internship, Redevelopers Automate Solution',
    points: ['Found and fixed defects in a Java and Spring Boot backend, and wrote unit and integration tests to keep them fixed.'],
  },
]
