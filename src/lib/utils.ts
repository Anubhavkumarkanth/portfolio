export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Resolves a /public path (or passes a full URL through) against Vite's base path. */
export function withBase(path: string) {
  if (/^(https?:|mailto:)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-02" → "Feb 2026" */
export function formatMonth(value: string) {
  if (value === 'present') return 'Present'
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

/** Indian-style compact rupees: ₹9.87L, ₹1.2Cr, ₹45K. */
export function formatINRCompact(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)}Cr`
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(2)}L`
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`
  return `₹${Math.round(value)}`
}
