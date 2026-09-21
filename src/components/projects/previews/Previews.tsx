import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import type { Project } from '../../../data/types'
import { previewScenario, simulateSip } from '../../../lib/sip'
import { EASE_OUT, cn, formatINRCompact } from '../../../lib/utils'
import { SqlBlock } from './SqlBlock'
import { SipChart, SipLegend, YearAxis } from './SipChart'

export function PreviewFrame({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-line bg-ink-900 shadow-2xl shadow-black/40', className)}>
      <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="truncate font-mono text-[11px] text-fg-subtle">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

const previewResult = simulateSip(previewScenario)

export function SipPreview() {
  const { ccr, cld, disciplineScore, points } = previewResult
  const stats = [
    { label: 'Compounding loss', value: formatINRCompact(cld) },
    { label: 'Compliance rate', value: `${(ccr * 100).toFixed(1)}%` },
    { label: 'Discipline score', value: disciplineScore.toFixed(1) },
  ]
  return (
    <PreviewFrame title="simulate --pause 12mo@y3 --reduce 12mo×0.5@y8">
      <div className="flex items-center justify-between gap-3">
        <SipLegend />
      </div>
      <div className="mt-4">
        <SipChart points={points} animate />
        <YearAxis years={previewScenario.years} />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-2">
            <dt className="text-[10.5px] leading-tight text-fg-subtle">{s.label}</dt>
            <dd className="mt-1 font-mono text-sm text-fg">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">
        Illustrative run: ₹10,000/month, 12% p.a., 20 years — computed with the project’s own formulas.
      </p>
    </PreviewFrame>
  )
}

const formatR2 = (r2: number) => r2.toFixed(3).replace('-', '−')

export function EvaluationTable({ evaluation, size = 'sm' }: { evaluation: NonNullable<Project['evaluation']>; size?: 'sm' | 'lg' }) {
  const maxR2 = Math.max(...evaluation.rows.map((r) => r.r2), 0.01)
  return (
    <div>
      <table className={cn('w-full border-separate border-spacing-0 text-left', size === 'lg' ? 'text-sm' : 'text-[12.5px]')}>
        <caption className="sr-only">{evaluation.caption}</caption>
        <thead>
          <tr className="font-mono text-[10.5px] tracking-wider text-fg-subtle uppercase">
            <th scope="col" className="pb-2 font-normal">Model</th>
            <th scope="col" className="pb-2 text-right font-normal">MAE (kcal)</th>
            <th scope="col" className="w-[42%] pb-2 pl-4 font-normal">R²</th>
          </tr>
        </thead>
        <tbody>
          {evaluation.rows.map((row, i) => (
            <tr key={row.model}>
              <th scope="row" className={cn('border-t border-line py-2.5 pr-2 font-normal', row.best ? 'text-fg' : 'text-fg-muted')}>
                {row.model}
                {row.best && <span className="ml-2 font-mono text-[10px] text-accent">kept</span>}
              </th>
              <td className={cn('border-t border-line py-2.5 text-right font-mono tabular-nums', row.best ? 'text-accent-strong' : 'text-fg-muted')}>
                {row.mae.toFixed(1)}
              </td>
              <td className="border-t border-line py-2.5 pl-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <m.div
                      className={cn('h-full origin-left rounded-full', row.best ? 'bg-accent' : 'bg-white/30')}
                      style={{ width: `${(Math.max(0, row.r2) / maxR2) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE_OUT }}
                    />
                  </div>
                  <span className={cn('w-12 text-right font-mono tabular-nums', row.best ? 'text-accent-strong' : 'text-fg-muted')}>
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

export function DietbotPreview({ project }: { project: Project }) {
  if (!project.evaluation) return null
  return (
    <PreviewFrame title="python scripts/train_models.py  # held-out evaluation">
      <EvaluationTable evaluation={project.evaluation} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: 'NHANES adults', value: '4,624' },
          { label: 'Designs tested', value: '4' },
          { label: 'Tests', value: '24' },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-line bg-white/[0.02] px-2.5 py-2">
            <p className="text-[10.5px] leading-tight text-fg-subtle">{s.label}</p>
            <p className="mt-1 font-mono text-sm text-fg">{s.value}</p>
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

export function OmsPreview({ project }: { project: Project }) {
  if (!project.sql) return null
  return (
    <PreviewFrame title="sql/03_reports.sql  # top 3 products per category">
      <SqlBlock code={project.sql.code} />
      {project.queries && (
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[10.5px] text-fg-subtle">All six reports</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.queries.map((q) => (
              <li key={q.title} className="rounded border border-line bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10.5px] text-fg-muted">
                {q.concepts.split(',')[0]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PreviewFrame>
  )
}

export function ProjectPreview({ project }: { project: Project }) {
  if (project.preview === 'sip') return <SipPreview />
  if (project.preview === 'oms') return <OmsPreview project={project} />
  return <DietbotPreview project={project} />
}
