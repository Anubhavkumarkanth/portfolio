import { useId } from 'react'
import type { SipPoint } from '../../../lib/sip'
import { cn, formatINRCompact } from '../../../lib/utils'

const W = 600
const H = 240
const PAD = { top: 14, right: 6, bottom: 6, left: 6 }

interface SipChartProps {
  points: SipPoint[]
  className?: string
}

/** Ideal vs actual corpus over time, with the friction gap shaded. */
export function SipChart({ points, className }: SipChartProps) {
  const gradientId = `sip-gap-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const last = points[points.length - 1]
  const maxValue = Math.max(...points.map((p) => p.ideal)) * 1.08 || 1
  const x = (year: number) => PAD.left + (year / last.year) * (W - PAD.left - PAD.right)
  const y = (value: number) => H - PAD.bottom - (value / maxValue) * (H - PAD.top - PAD.bottom)
  const path = (key: 'ideal' | 'actual') =>
    points.map((p, i) => `${i ? 'L' : 'M'}${x(p.year).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ')

  const idealPath = path('ideal')
  const actualPath = path('actual')
  const gapPath = `${idealPath} ${[...points]
    .reverse()
    .map((p) => `L${x(p.year).toFixed(1)} ${y(p.actual).toFixed(1)}`)
    .join(' ')} Z`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label={`Ideal corpus grows to ${formatINRCompact(last.ideal)}; with friction events the actual corpus reaches ${formatINRCompact(last.actual)}.`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.22 }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.02 }} />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((f) => {
        const gy = PAD.top + f * (H - PAD.top - PAD.bottom)
        return <line key={f} x1={PAD.left} x2={W - PAD.right} y1={gy} y2={gy} className="stroke-line" strokeDasharray="3 6" />
      })}

      <path d={gapPath} fill={`url(#${gradientId})`} />
      <path
        d={idealPath}
        fill="none"
        className="stroke-fg-subtle"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={actualPath}
        fill="none"
        className="stroke-accent"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={x(last.year)} cy={y(last.ideal)} r={3.5} className="fill-fg-subtle" />
      <circle cx={x(last.year)} cy={y(last.actual)} r={4} className="fill-accent" />
    </svg>
  )
}

export function SipLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-xs text-fg-subtle', className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded bg-fg-subtle" aria-hidden="true" />
        If you never missed a month
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded bg-accent" aria-hidden="true" />
        With the pause and the cut
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-sm bg-accent/20" aria-hidden="true" />
        What it cost
      </span>
    </div>
  )
}

export function YearAxis({ years }: { years: number }) {
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * years))
  return (
    <div className="mt-1.5 flex justify-between text-[11px] text-fg-subtle tabular-nums" aria-hidden="true">
      {ticks.map((t) => (
        <span key={t}>Y{t}</span>
      ))}
    </div>
  )
}
