import { Check } from 'lucide-react'
import { Card } from '../ui/primitives'

// Small hero visuals drawn from real project numbers (UPI Pulse README,
// retail findings, Orderdesk results). Plain HTML bars, so they read in both themes.

const upiByYear = [
  { year: '2022', rate: 1.45 },
  { year: '2023', rate: 1.01 },
  { year: '2024', rate: 0.59 },
  { year: '2025', rate: 0.4 },
  { year: '2026', rate: 0.26 },
]

export function DataAside() {
  const max = 1.6
  return (
    <Card className="p-6 sm:p-7">
      <p className="text-[13px] font-medium text-fg-subtle">Two things the data told me</p>

      <figure className="mt-5">
        <figcaption className="text-[15px] leading-snug text-fg">
          UPI payments failing because of the bank fell by more than 80% in four years.
        </figcaption>
        <div
          role="img"
          aria-label="Bank-side UPI failure rate by year: 2022 1.45%, 2023 1.01%, 2024 0.59%, 2025 0.40%, 2026 0.26%. The 1% target line sits between 2022 and 2023."
        >
          <div className="relative mt-7 h-32 border-b border-line-strong" aria-hidden="true">
            <div className="absolute inset-x-0 border-t border-dashed border-fg-subtle/70" style={{ bottom: `${(1 / max) * 100}%` }}>
              <span className="absolute right-0 -top-5 text-[11px] text-fg-subtle">1% line</span>
            </div>
            <div className="absolute inset-0 flex items-end gap-3">
              {upiByYear.map((d, i) => (
                <div
                  key={d.year}
                  className={i === upiByYear.length - 1 ? 'relative flex-1 rounded-t bg-accent' : 'relative flex-1 rounded-t bg-accent/30'}
                  style={{ height: `${(d.rate / max) * 100}%` }}
                >
                  <span className="absolute inset-x-0 -top-5 text-center text-[11px] text-fg-muted tabular-nums">
                    {d.rate.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-1.5 flex gap-3" aria-hidden="true">
            {upiByYear.map((d) => (
              <span key={d.year} className="flex-1 text-center text-[11px] text-fg-subtle tabular-nums">
                {d.year}
              </span>
            ))}
          </div>
        </div>
      </figure>

      <figure className="mt-8 border-t border-line pt-6">
        <figcaption className="text-[15px] leading-snug text-fg">
          A shop’s cancellation rate was half what its headline said.
        </figcaption>
        <dl className="mt-4 space-y-2.5 text-sm">
          {[
            { label: 'Headline', value: 3.65, tone: 'bg-fg-subtle/40' },
            { label: 'Real', value: 1.88, tone: 'bg-accent' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3">
              <dt className="text-fg-muted">{row.label}</dt>
              <dd className="h-2.5 overflow-hidden rounded-full bg-sunken">
                <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${(row.value / 4) * 100}%` }} />
              </dd>
              <dd className="text-right text-fg tabular-nums">{row.value}%</dd>
            </div>
          ))}
        </dl>
      </figure>
    </Card>
  )
}

const layers = [
  { name: 'API', count: 113 },
  { name: 'Browser', count: 21 },
  { name: 'Database', count: 8 },
  { name: 'Simulator', count: 2 },
]

export function QaAside() {
  return (
    <Card className="p-6 sm:p-7">
      <p className="text-[13px] font-medium text-fg-subtle">Orderdesk QA Suite, in numbers</p>

      <figure className="mt-5">
        <figcaption className="text-[15px] leading-snug text-fg">144 automated tests, at every layer a bug can hide in.</figcaption>
        <dl className="mt-4 space-y-2.5 text-sm">
          {layers.map((l) => (
            <div key={l.name} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3">
              <dt className="text-fg-muted">{l.name}</dt>
              <dd className="h-2.5 overflow-hidden rounded-full bg-sunken">
                <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(3, (l.count / 113) * 100)}%` }} />
              </dd>
              <dd className="text-right text-fg tabular-nums">{l.count}</dd>
            </div>
          ))}
        </dl>
      </figure>

      <figure className="mt-8 border-t border-line pt-6">
        <figcaption className="text-[15px] leading-snug text-fg">8 bugs planted on purpose. 8 caught.</figcaption>
        <ul className="mt-4 grid grid-cols-8 gap-2" aria-label="All 8 planted bugs were caught">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i} className="grid aspect-square place-items-center rounded-md bg-good/12 text-good">
              <Check className="size-4" aria-hidden="true" />
              <span className="sr-only">Bug {i + 1} caught</span>
            </li>
          ))}
        </ul>
      </figure>
    </Card>
  )
}
