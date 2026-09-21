import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ArrowUpRight, CircleAlert, GitFork, RotateCw, Star } from 'lucide-react'
import { site } from '../../config/site'
import { profile } from '../../data/profile'
import { useGitHub, type ContributionDay, type GitHubData, type GitHubRepo } from '../../hooks/useGitHub'
import { buttonClasses } from '../../lib/button'
import { cn, formatRelativeTime } from '../../lib/utils'
import { GitHubIcon } from '../ui/BrandIcons'
import { Card } from '../ui/primitives'
import { Section } from '../ui/Section'

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#663399',
  Shell: '#89e051',
  PLpgSQL: '#336790',
}

const LEVEL_CLASSES = ['bg-white/[0.05]', 'bg-white/[0.18]', 'bg-white/[0.34]', 'bg-white/[0.55]', 'bg-white/[0.8]']

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('rounded-md bg-white/[0.04]', className)} />
}

function ProfileCard({ data }: { data: GitHubData }) {
  const { user } = data
  const lastPush = data.repos.map((r) => r.pushed_at).sort().at(-1)
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center gap-4">
        <img
          src={`${user.avatar_url}${user.avatar_url.includes('?') ? '&' : '?'}s=112`}
          alt={`${user.name ?? user.login}'s GitHub avatar`}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="size-14 rounded-full border border-line-strong"
        />
        <div className="min-w-0">
          <p className="truncate font-medium text-fg">{user.name ?? user.login}</p>
          <p className="truncate text-sm text-fg-subtle">@{user.login}</p>
        </div>
      </div>
      {user.bio && <p className="mt-4 text-sm leading-relaxed text-fg-muted">{user.bio}</p>}
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
        <div>
          <dt className="text-xs text-fg-subtle">Public repos</dt>
          <dd className="mt-0.5 text-lg text-fg tabular-nums">{user.public_repos}</dd>
        </div>
        {lastPush && (
          <div>
            <dt className="text-xs text-fg-subtle">Last push</dt>
            <dd className="mt-0.5 truncate text-lg text-fg">{formatRelativeTime(lastPush)}</dd>
          </div>
        )}
      </dl>
      <div className="mt-auto pt-5">
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({ variant: 'secondary', size: 'sm', className: 'w-full' })}
        >
          <GitHubIcon className="size-4" />
          View profile
        </a>
      </div>
    </Card>
  )
}

function ContributionGraph({ contributions }: { contributions: GitHubData['contributions'] }) {
  const weeks = useMemo(() => {
    if (!contributions) return []
    const days = contributions.days
    if (!days.length) return []
    // Pad the first week so columns line up Sunday → Saturday, like GitHub.
    const offset = new Date(`${days[0].date}T00:00:00`).getDay()
    const padded: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days]
    const cols: (ContributionDay | null)[][] = []
    for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7))
    return cols
  }, [contributions])

  if (!contributions) {
    return (
      <Card className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-fg-muted">The contribution graph couldn’t be loaded right now.</p>
        <a
          href={`${profile.socials.github.href}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-fg"
        >
          See it on GitHub <ArrowUpRight className="size-3.5 text-fg-subtle" aria-hidden="true" />
        </a>
      </Card>
    )
  }

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-fg">
          <span className="text-lg tabular-nums">{contributions.total.toLocaleString('en-IN')}</span>{' '}
          <span className="text-fg-muted">contributions in the last year</span>
        </p>
        <p className="text-xs text-fg-subtle">Public activity</p>
      </div>
      <div
        className="scrollbar-thin mt-5 overflow-x-auto pb-2"
        ref={(el) => {
          // Start scrolled to the most recent weeks on narrow screens.
          if (el) el.scrollLeft = el.scrollWidth
        }}
      >
        <div
          role="img"
          aria-label={`${contributions.total} GitHub contributions in the last year`}
          className="flex w-max gap-[3px]"
        >
          {weeks.map((week, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {week.map((day, d) =>
                day ? (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    className={cn('size-[10px] rounded-[2px]', LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0])}
                  />
                ) : (
                  <span key={`pad-${d}`} className="size-[10px]" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-end gap-1.5 pt-3 text-[11px] text-fg-subtle" aria-hidden="true">
        Less
        {LEVEL_CLASSES.map((c) => (
          <span key={c} className={cn('size-[10px] rounded-[2px]', c)} />
        ))}
        More
      </div>
    </Card>
  )
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <Card className="h-full transition-colors hover:border-line-strong">
      <a href={repo.html_url} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-md p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 truncate font-mono text-sm text-fg underline-offset-4 group-hover:underline">{repo.name}</p>
          <ArrowUpRight className="size-4 shrink-0 text-fg-subtle group-hover:text-fg" aria-hidden="true" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">
          {repo.description ?? <span className="text-fg-subtle italic">No description</span>}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-fg-subtle">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8a8a84' }}
                aria-hidden="true"
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" aria-hidden="true" />
              {repo.stargazers_count}
              <span className="sr-only">stars</span>
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <GitFork className="size-3.5" aria-hidden="true" />
              {repo.forks_count}
              <span className="sr-only">forks</span>
            </span>
          )}
          <span>Updated {formatRelativeTime(repo.pushed_at)}</span>
        </div>
      </a>
    </Card>
  )
}

function LoadingState() {
  return (
    <div role="status" aria-label="Loading GitHub activity" className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
        <div>
          <p className="font-medium text-fg">Couldn’t reach GitHub right now</p>
          <p className="mt-1 text-sm text-fg-muted">{message} The profile is still one click away.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onRetry} className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
          <RotateCw className="size-4" aria-hidden="true" />
          Retry
        </button>
        <a href={profile.socials.github.href} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
          <GitHubIcon className="size-4" />
          Open GitHub
        </a>
      </div>
    </Card>
  )
}

/** True once the element comes within 600px of the viewport, so the API is only hit when needed. */
function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, near])
  return near
}

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null)
  const nearViewport = useNearViewport(ref)
  const { status, data, error, retry } = useGitHub(site.github.username, nearViewport)

  return (
    <Section
      id="github"
      title="On GitHub"
      description="My public repositories and recent activity."
      aside={
        <a
          href={profile.socials.github.href}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({ variant: 'secondary', size: 'sm' })}
        >
          <GitHubIcon className="size-4" />
          @{profile.socials.github.handle}
        </a>
      }
    >
      <div ref={ref} aria-busy={status === 'loading'}>
        {status === 'success' && data ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
              <ProfileCard data={data} />
              {site.github.showContributions && <ContributionGraph contributions={data.contributions} />}
            </div>
            {data.repos.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.repos.map((repo) => (
                  <li key={repo.id}>
                    <RepoCard repo={repo} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-md border border-dashed border-line p-8 text-center text-sm text-fg-muted">
                No public repositories yet.
              </p>
            )}
          </div>
        ) : status === 'error' ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <LoadingState />
        )}
      </div>
    </Section>
  )
}
