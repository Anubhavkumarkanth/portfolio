import type { Project } from '../../../data/types'
import { cn } from '../../../lib/utils'

const formatR2 = (r2: number) => r2.toFixed(3).replace('-', '−')

/** Average error per model, as bars: shorter is better. */
export function EvaluationTable({ evaluation }: { evaluation: NonNullable<Project['evaluation']> }) {
  const maxMae = Math.max(...evaluation.rows.map((r) => r.mae))
  return (
    <div>
      <table className="w-full border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{evaluation.caption}</caption>
        <thead>
          <tr className="text-xs text-fg-subtle">
            <th scope="col" className="pb-2 font-normal">Model</th>
            <th scope="col" className="w-[45%] pb-2 font-normal">Average error (kcal)</th>
            <th scope="col" className="pb-2 text-right font-normal">R²</th>
          </tr>
        </thead>
        <tbody>
          {evaluation.rows.map((row) => (
            <tr key={row.model}>
              <th scope="row" className={cn('border-t border-line py-3 pr-3 font-normal', row.best ? 'text-fg' : 'text-fg-muted')}>
                {row.model}
                {row.best && <span className="ml-1.5 text-xs text-accent">kept</span>}
              </th>
              <td className="border-t border-line py-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-sunken">
                    <div
                      className={cn('h-full rounded-full', row.best ? 'bg-accent' : 'bg-fg-subtle/40')}
                      style={{ width: `${(row.mae / maxMae) * 100}%` }}
                    />
                  </div>
                  <span className={cn('w-12 text-right tabular-nums', row.best ? 'text-fg' : 'text-fg-muted')}>{row.mae.toFixed(1)}</span>
                </div>
              </td>
              <td className={cn('border-t border-line py-3 pl-3 text-right tabular-nums', row.best ? 'text-fg' : 'text-fg-muted')}>
                {formatR2(row.r2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
        {evaluation.caption}. Lower error is better. R² is the share of the variation the model explains (1 would be perfect).
      </p>
    </div>
  )
}
