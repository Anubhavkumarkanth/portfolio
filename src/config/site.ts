// Site-level settings. Values that differ per deployment come from .env
// (see .env.example); everything else is edited here.

export const site = {
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
  /** Contact form endpoint. Empty → the form falls back to the visitor's email app. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
}

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
] as const
