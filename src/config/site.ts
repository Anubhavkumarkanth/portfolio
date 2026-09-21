import { profile } from '../data/profile'

// Site-level settings. Values that differ per deployment come from .env
// (see .env.example); everything else is edited here.

export const site = {
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
  /** Contact form endpoint. Empty → the form falls back to the visitor's email app. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
  github: {
    username: profile.socials.github.handle,
    /** Repos listed first, in this order. The rest are the most recently pushed. */
    featuredRepos: ['sip-friction-analyzer', 'Dietbot_For_Athletes', 'order-management-system'],
    repoLimit: 6,
    /** Contribution heatmap via github-contributions-api.jogruber.de (public data, no key). */
    showContributions: true,
  },
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const

/** Every section in page order — used by the scroll spy and the hero terminal. */
export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certifications',
  'capabilities',
  'focus',
  'github',
  'contact',
]
