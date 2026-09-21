import { useId } from 'react'
import { m } from 'framer-motion'
import type { SipPoint } from '../../../lib/sip'
import { EASE_OUT, cn, formatINRCompact } from '../../../lib/utils'

const W = 600
const H = 240
const PAD = { top: 14, right: 6, bottom: 6, left: 6 }

interface SipChartProps {
  points: SipPoint[]
  /** Draw the lines in when scrolled into view. Off for the live playground. */
  animate?: boolean
  className?: string
}

/** Ideal vs actual corpus over time, with the friction gap shaded. */
export function SipChart({ points, animate = false, className }: SipChartProps) {
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

  const draw = animate
    ? {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: '0px 0px -10% 0px' },
      }
    : {}

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label={`Ideal corpus grows to ${formatINRCompact(last.ideal)}; with friction events the actual corpus reaches ${formatINRCompact(last.actual)}.`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2b25c" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#f2b25c" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((f) => {
        const gy = PAD.top + f * (H - PAD.top - PAD.bottom)
        return <line key={f} x1={PAD.left} x2={W - PAD.right} y1={gy} y2={gy} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="3 6" />
      })}

      <m.path
        d={gapPath}
        fill={`url(#${gradientId})`}
        initial={animate ? { opacity: 0 } : false}
        whileInView={animate ? { opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <m.path
        d={idealPath}
        fill="none"
        stroke="rgb(237 237 235 / 0.55)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ duration: 1.4, ease: EASE_OUT }}
        {...draw}
      />
      <m.path
        d={actualPath}
        fill="none"
        stroke="#f2b25c"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ duration: 1.4, delay: 0.15, ease: EASE_OUT }}
        {...draw}
      />
      <circle cx={x(last.year)} cy={y(last.ideal)} r={3.5} fill="#ededeb" />
      <circle cx={x(last.year)} cy={y(last.actual)} r={4} fill="#f2b25c" />
    </svg>
  )
}

export function SipLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 font-mono text-[11px] text-fg-subtle', className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded bg-fg/55" aria-hidden="true" />
        Ideal
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded bg-accent" aria-hidden="true" />
        Actual
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-sm bg-accent/25" aria-hidden="true" />
        Friction gap
      </span>
    </div>
  )
}

export function YearAxis({ years }: { years: number }) {
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * years))
  return (
    <div className="mt-1.5 flex justify-between font-mono text-[10px] text-fg-subtle" aria-hidden="true">
      {ticks.map((t) => (
        <span key={t}>Y{t}</span>
      ))}
    </div>
  )
}
