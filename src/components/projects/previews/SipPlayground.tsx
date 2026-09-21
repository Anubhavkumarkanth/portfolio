import { useId, useMemo, useState, type CSSProperties } from 'react'
import { previewScenario, simulateSip } from '../../../lib/sip'
import { cn, formatINRCompact } from '../../../lib/utils'
import { SipChart, SipLegend, YearAxis } from './SipChart'

const MAX_MONTHS = 36

function Slider({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint: string
  value: number
  onChange: (value: number) => void
}) {
  const id = useId()
  const fill = `${(value / MAX_MONTHS) * 100}%`
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-fg">
          {label}
        </label>
        <output htmlFor={id} className="text-sm text-fg tabular-nums">
          {value} mo
        </output>
      </div>
      <p className="mt-0.5 text-xs text-fg-subtle">{hint}</p>
      <input
        id={id}
        type="range"
        min={0}
        max={MAX_MONTHS}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value} months`}
        className="range mt-2 w-full"
        style={{ '--fill': fill } as CSSProperties}
      />
    </div>
  )
}

/** Interactive version of the engine: drag the friction and watch the metrics move. */
export function SipPlayground() {
  const [pauseMonths, setPauseMonths] = useState(previewScenario.pause?.months ?? 0)
  const [reduceMonths, setReduceMonths] = useState(previewScenario.reduce?.months ?? 0)

  const result = useMemo(
    () =>
      simulateSip({
        ...previewScenario,
        pause: { startMonth: 25, months: pauseMonths },
        reduce: { startMonth: 85, months: reduceMonths, factor: 0.5 },
      }),
    [pauseMonths, reduceMonths],
  )

  const metrics = [
    { label: 'Ideal corpus', value: formatINRCompact(result.ideal) },
    { label: 'Actual corpus', value: formatINRCompact(result.actual) },
    { label: 'Compounding loss', value: formatINRCompact(result.cld) },
    { label: 'Compliance rate', value: `${(result.ccr * 100).toFixed(1)}%` },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 rounded-md border border-line p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col gap-6">
        <Slider
          label="Pause contributions"
          hint="Starting in year 3"
          value={pauseMonths}
          onChange={setPauseMonths}
        />
        <Slider
          label="Contribute half the amount"
          hint="Starting in year 8"
          value={reduceMonths}
          onChange={setReduceMonths}
        />

        <div className="rounded-md border border-line p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-fg-muted">Discipline score</p>
            <p className="text-2xl text-fg tabular-nums" aria-live="polite">
              {result.disciplineScore.toFixed(1)}
              <span className="text-sm text-fg-subtle">/100</span>
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className={cn(
                'h-full rounded-full',
                result.disciplineScore >= 90 ? 'bg-ok' : 'bg-accent',
              )}
              style={{ width: `${result.disciplineScore}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-subtle">
            100 − (40 × (1 − CCR) + 60 × loss ratio)
          </p>
        </div>
      </div>

      <div>
        <SipLegend />
        <div className="mt-4">
          <SipChart points={result.points} />
          <YearAxis years={previewScenario.years} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-md border border-line px-3 py-2.5">
              <dt className="text-[11px] text-fg-subtle">{m.label}</dt>
              <dd className="mt-1 text-sm text-fg tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">
          ₹10,000/month at 12% expected annual return for 20 years. Same compounding loop and metric formulas as the
          project’s Python engine, ported to TypeScript for this page.
        </p>
      </div>
    </div>
  )
}
