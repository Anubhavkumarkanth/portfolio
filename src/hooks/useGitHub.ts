import { useEffect, useState } from 'react'
import { site } from '../config/site'

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubData {
  user: GitHubUser
  repos: GitHubRepo[]
  /** null when the contribution service was unreachable — the rest still renders. */
  contributions: { total: number; days: ContributionDay[] } | null
  fetchedAt: number
}

export type GitHubStatus = 'idle' | 'loading' | 'success' | 'error'

const CACHE_TTL = 60 * 60 * 1000

function readCache(key: string): GitHubData | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const data = JSON.parse(raw) as GitHubData
    return Date.now() - data.fetchedAt < CACHE_TTL ? data : null
  } catch {
    return null
  }
}

function writeCache(key: string, data: GitHubData) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Storage can be full or blocked; the data just won't be cached.
  }
}

interface RawRepo extends GitHubRepo {
  fork: boolean
  archived: boolean
}

function pickRepos(repos: RawRepo[]): GitHubRepo[] {
  const featured = site.github.featuredRepos.map((name) => name.toLowerCase())
  const rank = (repo: RawRepo) => {
    const i = featured.indexOf(repo.name.toLowerCase())
    return i === -1 ? Number.POSITIVE_INFINITY : i
  }
  return repos
    // The <username>/<username> repo only holds the GitHub profile README, so it isn't a project.
    .filter((repo) => !repo.fork && !repo.archived && repo.name.toLowerCase() !== site.github.username.toLowerCase())
    .sort((a, b) => rank(a) - rank(b) || Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, site.github.repoLimit)
    .map(({ id, name, description, html_url, language, stargazers_count, forks_count, pushed_at }) => ({
      id,
      name,
      description,
      html_url,
      language,
      stargazers_count,
      forks_count,
      pushed_at,
    }))
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(res.status === 403 || res.status === 429 ? 'GitHub’s rate limit was reached.' : `GitHub responded with ${res.status}.`)
  }
  return res.json() as Promise<T>
}

async function loadGitHub(username: string, signal: AbortSignal): Promise<GitHubData> {
  const api = 'https://api.github.com'
  const [user, repos, contributions] = await Promise.all([
    getJson<GitHubUser>(`${api}/users/${username}`, signal),
    getJson<RawRepo[]>(`${api}/users/${username}/repos?per_page=100&sort=pushed`, signal),
    site.github.showContributions
      ? getJson<{ total: Record<string, number>; contributions: ContributionDay[] }>(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          signal,
        ).then(
          (json) => ({
            total: json.total.lastYear ?? json.contributions.reduce((sum, d) => sum + d.count, 0),
            days: json.contributions,
          }),
          () => null,
        )
      : Promise.resolve(null),
  ])

  return {
    user: {
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      bio: user.bio,
      public_repos: user.public_repos,
    },
    repos: pickRepos(repos),
    contributions,
    fetchedAt: Date.now(),
  }
}

/**
 * Fetches public GitHub data once `enabled` turns true (i.e. the section is
 * near the viewport), caching it in sessionStorage for an hour.
 */
export function useGitHub(username: string, enabled: boolean) {
  const cacheKey = `gh:${username}`
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(() => ({
    data: readCache(cacheKey),
    error: null as string | null,
    attempt: 0,
  }))

  useEffect(() => {
    if (!enabled || result.data) return
    const controller = new AbortController()
    loadGitHub(username, controller.signal)
      .then((data) => {
        writeCache(cacheKey, data)
        setResult({ data, error: null, attempt })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'Something went wrong.'
        setResult({ data: null, error: message, attempt })
      })
    return () => controller.abort()
  }, [enabled, attempt, username, cacheKey, result.data])

  const status: GitHubStatus = result.data
    ? 'success'
    : result.error && result.attempt === attempt
      ? 'error'
      : enabled
        ? 'loading'
        : 'idle'

  return {
    status,
    data: result.data,
    error: result.error,
    retry: () => setAttempt((n) => n + 1),
  }
}
