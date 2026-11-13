import { profile } from '../../data/profile'
import type { Track } from '../../data/types'
import { cn } from '../../lib/utils'

const tracks: Track[] = ['software', 'data']

/** Two-way switch between the Software Engineer and Data Analyst views of the page. */
export function TrackSwitch({ track, onChange, className }: { track: Track; onChange: (track: Track) => void; className?: string }) {
  return (
    <div
      role="group"
      aria-label="Show this portfolio for"
      className={cn('inline-flex rounded-full border border-line-strong bg-surface p-0.5', className)}
    >
      {tracks.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={track === t}
          onClick={() => onChange(t)}
          className={cn(
            'h-8 rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors',
            track === t ? 'bg-accent text-paper' : 'text-fg-muted hover:text-fg',
          )}
        >
          {profile.personas[t].short}
        </button>
      ))}
    </div>
  )
}
