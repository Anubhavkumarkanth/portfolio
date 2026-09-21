import type { Project } from '../../../data/types'
import { cn } from '../../../lib/utils'

const formatR2 = (r2: number) => r2.toFixed(3).replace('-', '−')

export function EvaluationTable({ evaluation, size = 'sm' }: { evaluation: NonNullable<Project['evaluation']>; size?: 'sm' | 'lg' }) {
  const maxR2 = Math.max(...evaluation.rows.map((r) => r.r2), 0.01)
  return (
    <div>
      <table className={cn('w-full border-separate border-spacing-0 text-left', size === 'lg' ? 'text-sm' : 'text-[12.5px]')}>
        <caption className="sr-only">{evaluation.caption}</caption>
        <thead>
          <tr className="text-xs text-fg-subtle">
            <th scope="col" className="pb-2 font-normal">Model</th>
            <th scope="col" className="pb-2 text-right font-normal">MAE (kcal)</th>
            <th scope="col" className="w-[42%] pb-2 pl-4 font-normal">R²</th>
          </tr>
        </thead>
        <tbody>
          {evaluation.rows.map((row) => (
            <tr key={row.model}>
              <th scope="row" className={cn('border-t border-line py-2.5 pr-2 font-normal', row.best ? 'text-fg' : 'text-fg-muted')}>
                {row.model}
                {row.best && <span className="ml-2 text-xs text-fg-subtle">(kept)</span>}
              </th>
              <td className={cn('border-t border-line py-2.5 text-right font-mono tabular-nums', row.best ? 'text-fg' : 'text-fg-muted')}>
                {row.mae.toFixed(1)}
              </td>
              <td className="border-t border-line py-2.5 pl-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className={cn('h-full rounded-full', row.best ? 'bg-accent' : 'bg-white/30')}
                      style={{ width: `${(Math.max(0, row.r2) / maxR2) * 100}%` }}
                    />
                  </div>
                  <span className={cn('w-12 text-right font-mono tabular-nums', row.best ? 'text-fg' : 'text-fg-muted')}>
                    {formatR2(row.r2)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">{evaluation.caption}. Lower MAE and higher R² are better.</p>
    </div>
  )
}
