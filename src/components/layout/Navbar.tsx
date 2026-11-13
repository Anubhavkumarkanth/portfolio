import { useEffect, useMemo, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import type { ResumeLink, Track } from '../../data/types'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollLock } from '../../hooks/useScrollLock'
import { buttonClasses } from '../../lib/button'
import { cn, withBase } from '../../lib/utils'
import { Container } from '../ui/primitives'
import { TrackSwitch } from '../ui/TrackSwitch'

interface NavbarProps {
  links: readonly { id: string; label: string }[]
  resume: ResumeLink
  track: Track
  onTrack: (track: Track) => void
}

export function Navbar({ links, resume, track, onTrack }: NavbarProps) {
  const ids = useMemo(() => links.map((l) => l.id), [links])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const [open, setOpen] = useState(false)

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = () => mql.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-colors duration-200',
          scrolled || open ? 'border-line bg-paper/90 backdrop-blur-md' : 'border-transparent',
        )}
      >
        <Container>
          <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-4">
            <a
              href="#home"
              aria-label={`${profile.name}, back to top`}
              className="font-serif text-lg font-medium tracking-tight text-fg"
              onClick={() => setOpen(false)}
            >
              {profile.name}
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {links.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                      'block rounded-full px-3 py-1.5 text-sm transition-colors',
                      active === item.id ? 'bg-sunken text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {/* Wide screens only; smaller ones use the switch in the hero and the menu. */}
              <div className="hidden lg:block">
                <TrackSwitch track={track} onChange={onTrack} />
              </div>
              <a
                href={withBase(resume.href)}
                target="_blank"
                rel="noopener"
                className={buttonClasses({ variant: 'primary', size: 'sm' })}
              >
                <Download className="size-3.5" aria-hidden="true" />
                Resume
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={buttonClasses({ variant: 'ghost', size: 'icon-sm', className: 'md:hidden' })}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-paper md:hidden">
          <Container className="flex min-h-full flex-col py-4">
            <nav aria-label="Mobile">
              <ul>
                {links.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-3.5 font-serif text-2xl text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-3 pt-8">
              <TrackSwitch
                track={track}
                onChange={(t) => {
                  setOpen(false)
                  onTrack(t)
                }}
              />
              <a
                href={withBase(resume.href)}
                download={resume.fileName}
                className={buttonClasses({ variant: 'primary', className: 'w-full' })}
              >
                <Download className="size-4" aria-hidden="true" />
                Download {resume.label}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
