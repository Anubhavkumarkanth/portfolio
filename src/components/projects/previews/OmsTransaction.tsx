import { Check, CircleAlert, Lock, Minus, RotateCcw } from 'lucide-react'
import { cn } from '../../../lib/utils'

// The statement sequence of OrderDao.placeOrder(), in the order the code runs it.
const STEPS: { sql: string; note?: string; kind: 'lock' | 'write' }[] = [
  { sql: 'SELECT … FROM products … FOR UPDATE', note: 'per line, ascending id', kind: 'lock' },
  { sql: 'INSERT INTO orders …', note: 'generated key', kind: 'write' },
  { sql: 'INSERT INTO order_items …', note: 'batch', kind: 'write' },
  { sql: 'UPDATE products SET stock_quantity …', note: 'batch', kind: 'write' },
  { sql: 'INSERT INTO inventory_log …', note: 'batch', kind: 'write' },
  { sql: 'INSERT INTO payments …', kind: 'write' },
]

export type OmsMode = 'commit' | 'rollback'

/** A trace of the order transaction: the commit path, or a rollback on insufficient stock. */
export function OmsTransaction({ mode = 'commit' }: { mode?: OmsMode }) {
  const rollback = mode === 'rollback'
  const rows = [
    { key: 'begin', node: <Row icon={null} sql="BEGIN" note="setAutoCommit(false)" tone="control" /> },
    ...STEPS.map((step, i) => {
      const skipped = rollback && step.kind === 'write'
      return {
        key: `step-${i}`,
        node: (
          <Row
            icon={skipped ? Minus : step.kind === 'lock' ? Lock : Check}
            sql={step.sql}
            note={skipped ? 'never runs' : step.note}
            tone={skipped ? 'skipped' : step.kind === 'lock' ? 'lock' : 'ok'}
          />
        ),
        after:
          rollback && step.kind === 'lock' ? (
            <Row icon={CircleAlert} sql="stock < quantity → InsufficientStockException" tone="error" />
          ) : null,
      }
    }),
  ]

  return (
    <div className="font-mono text-[11.5px] leading-5 sm:text-[12px]">
      <ol className="space-y-1">
        {rows.map((row) => (
          <li key={`${mode}-${row.key}`}>
            {row.node}
            {'after' in row && row.after}
          </li>
        ))}
      </ol>
      <div
        className={cn(
          'mt-3 flex items-center justify-between gap-3 rounded-md border px-3 py-2',
          rollback ? 'border-danger/30 bg-danger/[0.08] text-danger' : 'border-ok/25 bg-ok/[0.07] text-ok',
        )}
      >
        <span className="flex items-center gap-2 font-medium">
          {rollback ? <RotateCcw className="size-3.5" aria-hidden="true" /> : <Check className="size-3.5" aria-hidden="true" />}
          {rollback ? 'ROLLBACK' : 'COMMIT'}
        </span>
        <span className="truncate text-fg-muted">{rollback ? 'zero partial rows written' : 'all writes land together'}</span>
      </div>
    </div>
  )
}

type Tone = 'control' | 'lock' | 'ok' | 'skipped' | 'error'

function Row({
  icon: Icon,
  sql,
  note,
  tone,
}: {
  icon: typeof Check | null
  sql: string
  note?: string
  tone: Tone
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2.5 rounded px-1.5 py-0.5',
        tone === 'error' && 'bg-danger/[0.08]',
      )}
    >
      <span className="grid w-3.5 shrink-0 place-items-center" aria-hidden="true">
        {Icon ? (
          <Icon
            className={cn(
              'size-3.5',
              tone === 'lock' && 'text-accent',
              tone === 'ok' && 'text-ok',
              tone === 'skipped' && 'text-fg-subtle/60',
              tone === 'error' && 'text-danger',
            )}
          />
        ) : (
          <span className="size-1.5 rounded-full bg-fg-subtle" />
        )}
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 truncate',
          tone === 'control' && 'text-fg',
          tone === 'lock' && 'text-accent-strong',
          tone === 'ok' && 'text-fg-muted',
          tone === 'skipped' && 'text-fg-subtle/50 line-through decoration-fg-subtle/40',
          tone === 'error' && 'text-danger',
        )}
        title={sql}
      >
        {sql}
      </span>
      {note && <span className="hidden shrink-0 text-[10.5px] text-fg-subtle sm:inline">{note}</span>}
    </div>
  )
}
