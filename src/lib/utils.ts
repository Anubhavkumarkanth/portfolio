export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Resolves a /public path (or passes a full URL through) against Vite's base path. */
export function withBase(path: string) {
  if (/^(https?:|mailto:)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export function scrollToSection(id: string, smooth = true) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-02" → "Feb 2026" */
export function formatMonth(value: string) {
  if (value === 'present') return 'Present'
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

/** Inclusive month count between two YYYY-MM values, e.g. Feb–Apr → "3 mos". */
export function formatDuration(start: string, end: string) {
  const now = new Date()
  const [sy, sm] = start.split('-').map(Number)
  const [ey, em] = end === 'present' ? [now.getFullYear(), now.getMonth() + 1] : end.split('-').map(Number)
  const months = (ey - sy) * 12 + (em - sm) + 1
  if (months < 12) return `${months} mo${months === 1 ? '' : 's'}`
  const years = Math.floor(months / 12)
  const rest = months % 12
  return `${years} yr${years === 1 ? '' : 's'}${rest ? ` ${rest} mo${rest === 1 ? '' : 's'}` : ''}`
}

/** Indian-style compact rupees: ₹9.87L, ₹1.2Cr, ₹45K. */
export function formatINRCompact(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)}Cr`
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(2)}L`
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`
  return `₹${Math.round(value)}`
}

export function formatRelativeTime(iso: string) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  for (const [unit, seconds] of units) {
    if (Math.abs(diff) >= seconds) return rtf.format(Math.round(diff / seconds), unit)
  }
  return 'just now'
}
