import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.ts'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Fills the SEO placeholders in index.html from src/data/profile.ts, so the
 * page title, description and social links are edited in one place. Also
 * emits robots.txt, plus sitemap.xml when VITE_SITE_URL is set.
 */
function siteMeta(siteUrl: string, base: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    ...(url && { url: `${url}/` }),
    email: `mailto:${profile.email}`,
    sameAs: [profile.socials.github.href, profile.socials.linkedin.href],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nitte Meenakshi Institute of Technology' },
    knowsAbout: profile.coreStack,
  }
  const tokens: Record<string, string> = {
    SITE_URL: url,
    TITLE: escapeHtml(profile.seo.title),
    DESCRIPTION: escapeHtml(profile.seo.description),
    KEYWORDS: escapeHtml(profile.seo.keywords.join(', ')),
    NAME: escapeHtml(profile.name),
    ROLE: escapeHtml(profile.role),
    INTRO: escapeHtml(profile.intro),
    EMAIL: escapeHtml(profile.email),
    GITHUB: escapeHtml(profile.socials.github.href),
    LINKEDIN: escapeHtml(profile.socials.linkedin.href),
    RESUME: escapeHtml(`${base}${profile.resume.href}`),
    JSON_LD: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      // Canonical and og:url must be absolute; leave them out until a URL is configured.
      const source = url ? html : html.replace(/^\s*<(link rel="canonical"|meta property="og:url")[^>]*>\r?\n/gm, '')
      return source.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => tokens[key] ?? match)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(url ? [`Sitemap: ${url}/sitemap.xml`] : [])]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
      if (url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'
  return {
    base,
    plugins: [react(), tailwindcss(), siteMeta(env.VITE_SITE_URL ?? '', base)],
  }
})
