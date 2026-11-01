# Anubhav Kumar — Portfolio

Personal portfolio for Anubhav Kumar, a data analyst working in SQL, Python and Power BI.

- **`/`** is the main page, for data analyst roles: four projects (UPI Pulse, retail cancellations,
  Dietbot and a SIP simulator), each with a one-line hook, three headline numbers, why each tool was
  chosen, a real screenshot and a short case study.
- **`/qa`** is a separate page for QA roles: the Orderdesk QA suite, the eight bugs it catches, testing
  skills and the QA resume. The main page links to it only from the footer and the mobile menu.

Calm, light editorial design with an automatic dark mode.

**Stack:** React 19 · TypeScript · Vite 8 (two pages) · Tailwind CSS 4 · Newsreader + Geist fonts

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173 and http://localhost:5173/qa.html
```

| Command              | What it does                                 |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                   |
| `npm run build`      | Type-check, then build both pages to `dist/` |
| `npm run preview`    | Serve the production build locally           |
| `npm run lint`       | ESLint (TypeScript + React hooks rules)      |
| `npm run type-check` | TypeScript only                              |

---

## Editing the content

All content lives in `src/data/`, separate from the UI.

| To change…                                              | Edit                                         |
| ------------------------------------------------------- | -------------------------------------------- |
| Name, contact details, About text                       | `src/data/profile.ts`                        |
| Hero line, intro, stats, resume and SEO for each page   | `src/data/profile.ts` → `data` / `qa`        |
| Data projects (hook, summary, numbers, tool choices…)   | `src/data/projects.ts`                       |
| QA project, bug table, QA skills, other testing work    | `src/data/qa.ts`                             |
| Skills on the main page                                 | `src/data/skills.ts`                         |
| Internship, degree, certificates                        | `src/data/experience.ts`, `education.ts`, `certifications.ts` |
| Navigation links                                        | `src/config/site.ts`                         |
| Colours (light and dark) and fonts                      | `src/index.css`                              |
| Site URL, contact form endpoint, base path              | `.env` (copy from `.env.example`)            |

**Writing style.** Plain English first, about a third technical, and every technical word explained where
it appears. Each project opens with a one-line hook, then two short sentences. Tool choices are written as
"X instead of Y: because…".

**Resumes.** `public/resume/Anubhav-Kumar-Data-Analyst-Resume.pdf` (main page) and
`public/resume/Anubhav-Kumar-QA-Resume.pdf` (QA page). Replace a PDF to update it. `vercel.json`
redirects older resume file names to the data analyst resume.

**Screenshots.** Real screenshots of each live project, saved as WebP in `public/projects/`. List them in a
project's `shots` with their pixel `width` and `height`. The first one appears on the page; the rest appear
in the case study. Tall (portrait) images are shown no wider than 520 px.

**Social preview images.** `public/og-image.png` and `public/og-image-qa.png` (1200 × 630).

---

## Contact form

Works without a backend. With no endpoint set, submitting opens the visitor's email app with the message
pre-filled. Set `VITE_CONTACT_ENDPOINT` to any service that accepts a JSON POST of
`{ name, email, message }` (Formspree, Web3Forms…) to send directly.

---

## Deployment

**Live site:** https://anubhav-kumar.vercel.app (Vercel project `anubhav-kumar`). The project is connected
to [github.com/Anubhavkumarkanth/portfolio](https://github.com/Anubhavkumarkanth/portfolio), so every push
to `main` publishes the site and other branches get a preview URL.

`vercel.json` turns on clean URLs (so `qa.html` is served at `/qa`), caches the hashed files in
`/assets` for a year, and keeps the resume redirects. The build writes `robots.txt` and a `sitemap.xml`
listing both pages. `VITE_SITE_URL` defaults to the live address so link previews always get absolute URLs.

---

## Project structure

```text
portfolio/
├── index.html, qa.html          # The two pages; SEO tags filled from src/data/profile.ts at build time
├── vite.config.ts               # Two-page build + the small SEO/robots/sitemap plugin
├── public/                      # resume/, projects/ (screenshots), certificates/, icons, og images
└── src/
    ├── main.tsx → App.tsx       # Data analyst page
    ├── qa.tsx → QaPage.tsx      # QA page
    ├── mount.tsx, index.css     # Shared bootstrap, fonts and theme
    ├── config/site.ts           # Nav links, env values
    ├── data/                    # All content (typed in types.ts)
    ├── context/                 # Case-study modal state (synced to ?project=<slug>)
    ├── hooks/                   # Scroll spy, focus trap, scroll lock, hash jump
    ├── lib/                     # Helpers, button styles, TypeScript port of the SIP engine
    └── components/
        ├── layout/              # Navbar, Footer, skip link
        ├── hero/                # The small data visuals beside each hero
        ├── projects/            # ProjectBlock, ProjectModal (lazy-loaded), previews/
        ├── sections/            # Hero, Work, About, Toolbox, Background, Contact
        └── ui/                  # Section, Card, Tag, brand icons
```

---

## Content sources

The resumes are the source of truth. Extra detail (test counts, evaluation tables, findings) comes from
each project's own README so it can be checked against the code. Nothing on the site is invented. If you
change a project, update its data file to match.
