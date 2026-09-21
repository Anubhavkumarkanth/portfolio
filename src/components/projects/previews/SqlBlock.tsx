import { Fragment } from 'react'
import { cn } from '../../../lib/utils'

const KEYWORDS =
  /\b(WITH|AS|SELECT|FROM|WHERE|JOIN|ON|AND|GROUP|ORDER|BY|PARTITION|OVER|DESC|ASC|HAVING|LEFT|IS|NULL|CASE|WHEN|THEN|ELSE|END|RANK|SUM|COUNT|DISTINCT)\b/

/** Minimal SQL highlighter: keywords, numbers and comments. Enough for a short snippet. */
function highlight(line: string) {
  if (line.trimStart().startsWith('--')) {
    return <span className="text-fg-subtle italic">{line}</span>
  }
  return line.split(/(\b[A-Z_]+\b|\d+|<=|>=)/).map((part, i) =>
    KEYWORDS.test(part) && part === part.toUpperCase() ? (
      <span key={i} className="text-accent-strong">
        {part}
      </span>
    ) : /^\d+$/.test(part) ? (
      <span key={i} className="text-ok">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export function SqlBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre
      className={cn(
        'scrollbar-thin overflow-x-auto font-mono text-[11px] leading-[1.6] text-fg-muted sm:text-[12px]',
        className,
      )}
    >
      <code>
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span aria-hidden="true" className="w-7 shrink-0 pr-3 text-right text-fg-subtle/40 select-none">
              {i + 1}
            </span>
            <span className="whitespace-pre">{highlight(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}
