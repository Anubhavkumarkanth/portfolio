import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.ts'
import type { Persona } from './src/data/types.ts'

// The live address, used when VITE_SITE_URL isn't set (link previews need absolute URLs).
const DEFAULT_SITE_URL = 'https://anubhav-kumar.vercel.app'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Fills the {{…}} placeholders in index.html (data page) and qa.html (QA page)
 * from src/data/profile.ts, and emits robots.txt and sitemap.xml.
 */
function siteMeta(siteUrl: string, base: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '')

  const tokensFor = (persona: Persona, path: string, ogImage: string): Record<string, string> => ({
    SITE_URL: url,
    PAGE_URL: `${url}${path}`,
    OG_IMAGE: `${url}/${ogImage}`,
    TITLE: escapeHtml(persona.seo.title),
    DESCRIPTION: escapeHtml(persona.seo.description),
    KEYWORDS: escapeHtml(persona.seo.keywords.join(', ')),
    NAME: escapeHtml(profile.name),
    ROLE: escapeHtml(persona.role),
    INTRO: escapeHtml(persona.intro),
    EMAIL: escapeHtml(profile.email),
    GITHUB: escapeHtml(profile.socials.github.href),
    LINKEDIN: escapeHtml(profile.socials.linkedin.href),
    RESUME: escapeHtml(`${base}${persona.resume.href}`),
    JSON_LD: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: persona.role,
      url: `${url}${path}`,
      email: `mailto:${profile.email}`,
      sameAs: [profile.socials.github.href, profile.socials.linkedin.href],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nitte Meenakshi Institute of Technology' },
      knowsAbout: persona.seo.keywords.slice(2),
    }).replace(/</g, '\\u003c'),
  })

  const pages = {
    data: tokensFor(profile.data, '/', 'og-image.png'),
    qa: tokensFor(profile.qa, '/qa', 'og-image-qa.png'),
  }

  return {
    name: 'site-meta',
    transformIndexHtml(html, ctx) {
      const tokens = ctx.filename.endsWith('qa.html') ? pages.qa : pages.data
      return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => tokens[key] ?? match)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n  <url><loc>${url}/qa</loc></url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'
  return {
    base,
    plugins: [react(), tailwindcss(), siteMeta(env.VITE_SITE_URL || DEFAULT_SITE_URL, base)],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          qa: resolve(import.meta.dirname, 'qa.html'),
        },
      },
    },
  }
})
