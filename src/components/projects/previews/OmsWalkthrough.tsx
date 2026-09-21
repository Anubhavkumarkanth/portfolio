import { useState } from 'react'
import { cn } from '../../../lib/utils'
import { OmsTransaction, type OmsMode } from './OmsTransaction'

const MODES: { id: OmsMode; label: string; explain: string }[] = [
  {
    id: 'commit',
    label: 'Enough stock',
    explain:
      'Every product row is locked before anything is written, so stock can’t change underneath the order. The five writes then commit together.',
  },
  {
    id: 'rollback',
    label: 'Stock runs out',
    explain:
      'The stock check runs before any write. The exception triggers rollback(), and the test suite asserts that no order, line item, payment or log row is left behind.',
  },
]

/** Toggle between the two paths through OrderDao.placeOrder(). */
export function OmsWalkthrough() {
  const [mode, setMode] = useState<OmsMode>('commit')
  const current = MODES.find((m) => m.id === mode) ?? MODES[0]

  return (
    <div className="rounded-md border border-line p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-fg-subtle">OrderDao.placeOrder()</p>
        <div role="group" aria-label="Transaction outcome" className="inline-flex rounded-md border border-line p-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                'rounded px-3 py-1.5 text-xs transition-colors',
                mode === m.id ? 'bg-white/[0.08] text-fg' : 'text-fg-muted hover:text-fg',
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <OmsTransaction mode={mode} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted" aria-live="polite">
        {current.explain}
      </p>
    </div>
  )
}
