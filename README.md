# Anubhav Kumar — Portfolio

Personal portfolio for Anubhav Kumar, an early-career software engineer focused on Python, data analysis
and machine learning, targeting both software and data roles. It's a single-page React app with a dark,
engineering-style design: an interactive terminal in the hero, case-study modals (a live SIP simulator,
a model-evaluation table, featured SQL and a transaction walkthrough), a timeline, and a GitHub section
that loads live data.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide icons

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command              | What it does                                 |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                   |
| `npm run build`      | Type-check, then build to `dist/`            |
| `npm run preview`    | Serve the production build locally           |
| `npm run lint`       | ESLint (TypeScript + React hooks rules)      |
| `npm run type-check` | TypeScript only                              |

---

## Editing your information

All content lives in `src/data/` and `src/config/`, separate from the UI. You shouldn't need to touch
a component to update the site.

| To change…                                           | Edit                                                    |
| ---------------------------------------------------- | ------------------------------------------------------- |
| Name, role, intro, email, location, About text       | `src/data/profile.ts`                                   |
| GitHub / LinkedIn links                              | `src/data/profile.ts` → `socials`                       |
| Page title, meta description, keywords               | `src/data/profile.ts` → `seo`                           |
| Resume PDF                                           | Replace `public/resume/Anubhav_Kumar_Resume.pdf`        |
| Projects, GitHub links, live demo links              | `src/data/projects.ts`                                  |
| Skills and their groupings                           | `src/data/skills.ts`                                    |
| Internship / jobs                                    | `src/data/experience.ts`                                |
| Degree, college, university                          | `src/data/education.ts`                                 |
| Certifications and certificate links                 | `src/data/certifications.ts`                            |
| "What I can do" and "Career focus" cards             | `src/data/capabilities.ts`                              |
| Nav items, GitHub section settings                   | `src/config/site.ts`                                    |
| Site URL, contact form endpoint, base path           | `.env` (copy from `.env.example`)                       |
| Colours, fonts, animations                           | `src/index.css` → `@theme`                              |

### Common tasks

**Update the resume.** Drop the new PDF at `public/resume/Anubhav_Kumar_Resume.pdf`. To use a different
file name, change `profile.resume.href` and `profile.resume.fileName`.

**Change the email, GitHub or LinkedIn.** Edit `profile.email` and `profile.socials` in
`src/data/profile.ts`. The GitHub section reads its username from `socials.github.handle`, and the page
`<title>`, meta tags and structured data are generated from the same file at build time.

**Add a live demo link.** In `src/data/projects.ts`, set `links.demo` on the project. Until it's set, the
UI shows "Live demo · not deployed yet".

**Add a project.** Add an object to the `projects` array in `src/data/projects.ts`. Every field is typed
(see `src/data/types.ts`), so the editor will tell you what's missing. The card preview is chosen by
`preview` (`sip`, `dietbot` or `oms`). Optional `sql` and `queries` fields show a featured SQL snippet
and a query list. Add a new preview component in `src/components/projects/previews/` for anything else.

**Add a certificate link.** Put a file in `public/certificates/` (or use a full URL) and add it to that
certification's `links` array. Cards without links just don't show a button.

**Fill in details the resume doesn't list.** `src/data/education.ts` has `field` (your major) and
`university`, both `null` for now because the resume doesn't state them. They stay hidden until you
fill them in.

**Change the accent colour.** Edit `--color-accent`, `--color-accent-strong` and `--color-accent-soft` in
`src/index.css`. A few inline SVG colours use the same hex (`#f2b25c`): search for it and update those
too, along with `public/favicon.svg`.

---

## Contact form

The form works without any backend:

- **No endpoint configured (default):** submitting opens the visitor's email app with the message
  pre-filled and addressed to you.
- **With an endpoint:** set `VITE_CONTACT_ENDPOINT` in `.env` to any service that accepts a JSON POST of
  `{ name, email, message }` (Formspree, Web3Forms, Getform, …). Free tiers are enough. The form shows
  loading, success and error states, and falls back to email if the request fails.

```bash
cp .env.example .env
# VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

---

## GitHub section

Loads live, public data when the section scrolls near the viewport, never on page load:

- Profile and repositories from the GitHub REST API. Unauthenticated, so it's limited to 60 requests per
  hour per visitor IP. Results are cached in `sessionStorage` for an hour.
- Contribution heatmap from `github-contributions-api.jogruber.de` (public data, no key). If it's
  unreachable, the rest of the section still renders and the heatmap card links to GitHub instead.
- Featured repos (listed first) and the repo count are set in `src/config/site.ts`. To turn off the
  heatmap, set `showContributions: false`.

Nothing in this section is hard-coded. If GitHub can't be reached, visitors see an error state with a
retry button and a link to the profile.

---

## Deployment

It's a static site: build it and upload `dist/`.

**Live site:** https://anubhav-kumar.vercel.app (Vercel project `anubhav-kumar`, linked in `.vercel/`).
`VITE_SITE_URL` is set in the Vercel project's production environment.

The Vercel project is connected to [github.com/Anubhavkumarkanth/portfolio](https://github.com/Anubhavkumarkanth/portfolio),
so every push to `main` publishes the site; pushes to other branches get a preview URL. To publish changes:

```bash
git add -A
git commit -m "Describe the change"
git push
```

`npx vercel deploy --prod` still works for a one-off deploy without committing.

**Vercel / Netlify / Cloudflare Pages:** framework "Vite", build command `npm run build`, output
directory `dist`. Set `VITE_SITE_URL` (and `VITE_CONTACT_ENDPOINT` if you use one) as environment
variables.

**GitHub Pages (project site):** set `VITE_BASE_PATH=/<repo-name>/` and
`VITE_SITE_URL=https://<user>.github.io/<repo-name>`, build, and publish `dist/`.

Once `VITE_SITE_URL` is set, the build also adds canonical/`og:url` tags, absolute Open Graph image
URLs, and a `sitemap.xml`. `robots.txt` is always generated.

---

## Project structure

```text
portfolio/
├── index.html                  # SEO/OG tags filled from src/data/profile.ts at build time
├── vite.config.ts              # Vite + Tailwind + the small SEO/robots/sitemap plugin
├── public/
│   ├── resume/                 # Resume PDF served for download
│   ├── certificates/           # Certificate images
│   ├── favicon.svg, apple-touch-icon.png, og-image.png
└── src/
    ├── main.tsx, App.tsx, index.css
    ├── config/site.ts          # Nav, section order, GitHub settings, env values
    ├── data/                   # ← all personal content (typed)
    │   ├── profile.ts  skills.ts  projects.ts  experience.ts
    │   ├── education.ts  certifications.ts  capabilities.ts  types.ts
    ├── context/                # Case-study modal state (synced to ?project=<slug>)
    ├── hooks/                  # Scroll spy, GitHub fetch, focus trap, scroll lock, reduced motion
    ├── lib/                    # Helpers, button styles, TypeScript port of the SIP engine
    └── components/
        ├── layout/             # Navbar (+ mobile menu), Footer, scroll progress, skip link
        ├── hero/               # Hero, interactive Terminal
        ├── projects/           # ProjectCard, ProjectModal (lazy-loaded), previews/
        ├── sections/           # About, Skills, Projects, ExperienceTimeline, Education,
        │                       # Certifications, Capabilities, Focus, GitHubActivity, Contact
        └── ui/                 # Section, Card, Tag, Reveal, brand icons, ProofLink
```

---

## Details worth knowing

- **Deep links.** Sections are addressable (`/#projects`), and each case study has its own URL
  (`/?project=sip-friction-analyzer`). The browser Back button closes the modal.
- **Terminal.** The hero terminal accepts `help`, `whoami`, `stack`, `projects`, `open <project>`,
  `experience`, `ls`, `cd <section>`, `contact`, `resume` and `clear`. Arrow keys cycle through history.
- **SIP playground.** The case study includes an interactive simulator. It's a TypeScript port of the
  project's `engine/simulation.py` and `engine/friction.py`, using the same compounding loop and formulas.
  Its output was checked against the Python engine for the default scenario, and both give identical
  results.
- **Accessibility.** Semantic landmarks, skip link, visible focus rings, focus-trapped modal with Escape
  to close, labelled form errors, `prefers-reduced-motion` respected (animations and smooth scrolling
  switch off).
- **Performance.** Self-hosted variable fonts (only the subsets a page uses are downloaded), the
  case-study modal is code-split and prefetched on hover, and GitHub data loads lazily. Local Lighthouse
  runs on the production build scored Performance 100 (desktop) / ~94 (mobile, simulated slow 4G), and
  100 for Accessibility, Best Practices and SEO.

## Content sources

The resume is the source of truth. Project details that go beyond the resume, such as endpoint names,
test counts, the `EXPLAIN ANALYZE` timings and the Dietbot evaluation table, come from each project's own
README so they can be checked against the code. The Order Management System is not on the resume; its
write-up comes entirely from its repository. Nothing on the site is invented. If you change a
project, update `src/data/projects.ts` to match.
