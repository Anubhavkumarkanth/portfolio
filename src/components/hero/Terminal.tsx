import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useProjectModal } from '../../context/projectModal'
import { navItems } from '../../config/site'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn, formatMonth, scrollToSection, withBase } from '../../lib/utils'

type Tone = 'default' | 'muted' | 'accent' | 'ok' | 'error'
interface Line {
  id: number
  kind: 'in' | 'out'
  text: string
  tone?: Tone
}

let lineId = 0
const input = (text: string): Line => ({ id: ++lineId, kind: 'in', text })
const out = (text: string, tone: Tone = 'muted'): Line => ({ id: ++lineId, kind: 'out', text, tone })

// "Data Analyst" → "analyst", "Python Developer" → "python", to keep each group on one line.
const shortRole = (role: string) =>
  role.replace(/^(Software|Data) /, '').replace(/ Developer$/, '').toLowerCase()

const INTRO: { cmd: string; lines: [string, Tone?][] }[] = [
  { cmd: 'whoami', lines: [[`${profile.name} — ${profile.role.toLowerCase()} (${profile.specialties.join(' · ')})`, 'default']] },
  {
    cmd: 'cat status.txt',
    lines: [
      [`● ${profile.availability}`, 'ok'],
      ...profile.targetRoles.map((g): [string, Tone?] => [
        `  ${g.group.toLowerCase().padEnd(10)}${g.roles.map(shortRole).join(' · ')}`,
      ]),
    ],
  },
  { cmd: 'ls projects/', lines: [[projects.map((p) => `${p.slug}/`).join('   '), 'accent']] },
]

const introLines = () => INTRO.flatMap((step) => [input(step.cmd), ...step.lines.map(([t, tone]) => out(t, tone))])

const SUGGESTIONS = ['help', 'projects', 'stack', 'contact']
const SECTIONS: string[] = navItems.map((n) => n.id).filter((id) => id !== 'home')

type Action = { type: 'scroll'; id: string } | { type: 'project'; slug: string } | { type: 'resume' } | { type: 'clear' }

function execute(raw: string): { lines: Line[]; action?: Action } {
  const [cmd = '', ...args] = raw.trim().split(/\s+/)
  const name = cmd.toLowerCase()
  const arg = args.join(' ').toLowerCase()

  switch (name) {
    case 'help':
      return {
        lines: [
          out('whoami            who I am', 'default'),
          out('stack             languages and frameworks I use'),
          out('projects          list projects'),
          out('open <project>    open a case study, e.g. open dietbot'),
          out('experience        where I’ve worked'),
          out('cd <section>      jump to a section (try: ls)'),
          out('contact           how to reach me'),
          out('resume            open my resume (PDF)'),
          out('clear             clear the terminal'),
        ],
      }
    case 'whoami':
      return { lines: [out(`${profile.name} — ${profile.tagline}`, 'default'), out(`Based in ${profile.location}.`)] }
    case 'stack':
      return {
        lines: [
          out('python    Pandas · NumPy · scikit-learn · FastAPI', 'default'),
          out('sql       PostgreSQL · CTEs · window functions · SQLAlchemy', 'default'),
          out('viz       Power BI · Excel · Streamlit', 'default'),
          out('also      React · TypeScript · Java'),
        ],
      }
    case 'projects':
    case 'ls':
      if (name === 'ls' && arg !== 'projects' && arg !== 'projects/') {
        return { lines: [out(SECTIONS.map((s) => `${s}/`).join('  '), 'accent')] }
      }
      return {
        lines: [
          ...projects.map((p) => out(`${p.slug.padEnd(22)} ${p.kind}`, 'default')),
          out('→ open <name> for the case study'),
        ],
      }
    case 'open': {
      const match = projects.find((p) => arg && (p.slug.startsWith(arg) || p.name.toLowerCase().startsWith(arg)))
      if (!match) return { lines: [out(`open: no project matches “${arg || '…'}”. Try: projects`, 'error')] }
      return { lines: [out(`Opening ${match.name}…`, 'ok')], action: { type: 'project', slug: match.slug } }
    }
    case 'experience': {
      const job = experience[0]
      return {
        lines: [
          out(`${job.role} @ ${job.company}`, 'default'),
          out(`${formatMonth(job.start)} – ${formatMonth(job.end)} · ${job.location}`),
        ],
        action: { type: 'scroll', id: 'experience' },
      }
    }
    case 'cd': {
      const target = arg.replace(/\/$/, '')
      if (!target || target === '~') return { lines: [], action: { type: 'scroll', id: 'home' } }
      if (!SECTIONS.includes(target)) return { lines: [out(`cd: no such section: ${target}`, 'error')] }
      return { lines: [], action: { type: 'scroll', id: target } }
    }
    case 'contact':
    case 'email':
      return {
        lines: [out(profile.email, 'accent'), out(`linkedin.com/in/${profile.socials.linkedin.handle}`)],
        action: { type: 'scroll', id: 'contact' },
      }
    case 'resume':
    case 'cv':
      return { lines: [out('Opening resume…', 'ok')], action: { type: 'resume' } }
    case 'clear':
      return { lines: [], action: { type: 'clear' } }
    case 'sudo':
      return { lines: [out('Permission denied. Try asking nicely: contact', 'error')] }
    case '':
      return { lines: [] }
    default:
      return { lines: [out(`command not found: ${cmd}. Type “help”.`, 'error')] }
  }
}

const toneClass: Record<Tone, string> = {
  default: 'text-fg',
  muted: 'text-fg-muted',
  accent: 'text-accent',
  ok: 'text-ok',
  error: 'text-danger',
}

function Prompt() {
  return (
    <span className="shrink-0 pr-2 whitespace-pre select-none" aria-hidden="true">
      <span className="text-accent">➜</span> <span className="text-fg-subtle">~</span>
    </span>
  )
}

export function Terminal() {
  const reducedMotion = usePrefersReducedMotion()
  const { openProject } = useProjectModal()
  const [introDone, setIntroDone] = useState(reducedMotion)
  const [lines, setLines] = useState<Line[]>(() => (reducedMotion ? introLines() : []))
  const [typing, setTyping] = useState('')
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Type the intro commands one character at a time.
  useEffect(() => {
    if (introDone) return
    const timers: number[] = []
    let t = 600
    for (const step of INTRO) {
      for (let i = 1; i <= step.cmd.length; i++) {
        const partial = step.cmd.slice(0, i)
        timers.push(window.setTimeout(() => setTyping(partial), t))
        t += 42
      }
      t += 220
      timers.push(
        window.setTimeout(() => {
          setTyping('')
          setLines((prev) => [...prev, input(step.cmd), ...step.lines.map(([text, tone]) => out(text, tone))])
        }, t),
      )
      t += 420
    }
    timers.push(window.setTimeout(() => setIntroDone(true), t))
    return () => timers.forEach(window.clearTimeout)
  }, [introDone])

  useEffect(() => {
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [lines, typing])

  const finishIntro = () => {
    if (introDone) return
    setLines(introLines())
    setTyping('')
    setIntroDone(true)
  }

  const run = (raw: string) => {
    finishIntro()
    const command = raw.trim()
    if (command) {
      history.current = [command, ...history.current].slice(0, 30)
      historyIndex.current = -1
    }
    const { lines: output, action } = execute(command)
    if (action?.type === 'clear') {
      setLines([])
      return
    }
    setLines((prev) => [...prev, input(command), ...output].slice(-60))
    if (!action) return
    window.setTimeout(() => {
      if (action.type === 'scroll') scrollToSection(action.id, !reducedMotion)
      if (action.type === 'project') openProject(action.slug)
      if (action.type === 'resume') window.open(withBase(profile.resume.href), '_blank', 'noopener')
    }, 280)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    run(value)
    setValue('')
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const list = history.current
      if (!list.length) return
      event.preventDefault()
      const next =
        event.key === 'ArrowUp'
          ? Math.min(historyIndex.current + 1, list.length - 1)
          : Math.max(historyIndex.current - 1, -1)
      historyIndex.current = next
      setValue(next === -1 ? '' : list[next])
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setLines([])
    }
  }

  const focusInput = () => {
    if (window.getSelection()?.toString()) return
    finishIntro()
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div>
      <div className="relative">
        <div aria-hidden="true" className="absolute -inset-px rounded-xl bg-linear-to-b from-white/[0.14] to-white/[0.02]" />
        <div className="relative overflow-hidden rounded-xl bg-ink-900/85 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <p className="flex-1 truncate text-center font-mono text-[11px] text-fg-subtle">anubhav@portfolio: ~</p>
            <span className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">zsh</span>
          </div>

          <div
            ref={bodyRef}
            onClick={focusInput}
            className="scrollbar-thin h-[17.5rem] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-6 sm:h-[19rem] sm:text-[13px]"
          >
            <div role="log" aria-live={introDone ? 'polite' : 'off'} aria-label="Terminal output">
              {lines.map((line) =>
                line.kind === 'in' ? (
                  <div key={line.id} className="flex text-fg">
                    <Prompt />
                    <span className="break-all">{line.text}</span>
                  </div>
                ) : (
                  <div key={line.id} className={cn('break-words whitespace-pre-wrap', toneClass[line.tone ?? 'muted'])}>
                    {line.text}
                  </div>
                ),
              )}
            </div>

            {introDone ? (
              <form onSubmit={onSubmit} className="flex">
                <Prompt />
                <label htmlFor="terminal-input" className="sr-only">
                  Terminal command. Type help for a list of commands.
                </label>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="type “help”"
                  className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none placeholder:text-fg-subtle/60 focus-visible:outline-none"
                />
              </form>
            ) : (
              <div className="flex text-fg" aria-hidden="true">
                <Prompt />
                <span>{typing}</span>
                <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[3px] bg-accent/80 motion-safe:animate-blink" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-fg-subtle">try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent-strong"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
