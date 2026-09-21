import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useProjectModal } from '../../context/projectModal'
import type { ProofTarget } from '../../data/types'

const chip =
  'group inline-flex items-center gap-1 rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent-strong'

/** A small link to the work backing a claim: opens a case study or jumps to a section. */
export function ProofLink({ target }: { target: ProofTarget }) {
  const { openProject, prefetch } = useProjectModal()
  if ('project' in target) {
    return (
      <button
        type="button"
        onClick={() => openProject(target.project)}
        onPointerEnter={prefetch}
        aria-haspopup="dialog"
        className={chip}
      >
        {target.label}
        <ArrowUpRight className="size-3 opacity-60 group-hover:opacity-100" aria-hidden="true" />
      </button>
    )
  }
  return (
    <a href={`#${target.section}`} className={chip}>
      {target.label}
      <ArrowDownRight className="size-3 opacity-60 group-hover:opacity-100" aria-hidden="true" />
    </a>
  )
}
