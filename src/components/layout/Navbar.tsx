import { useEffect, useState } from 'react'
import { Download, Mail, Menu, X } from 'lucide-react'
import { navItems, sectionIds } from '../../config/site'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollLock } from '../../hooks/useScrollLock'
import { buttonClasses } from '../../lib/button'
import { cn, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../ui/primitives'

export function Navbar() {
  const active = useActiveSection(sectionIds)
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
    const mql = window.matchMedia('(min-width: 1024px)')
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
          scrolled || open ? 'border-line bg-ink-950' : 'border-transparent bg-transparent',
        )}
      >
        <Container>
          <nav aria-label="Primary" className="flex h-14 items-center justify-between gap-4">
            <a
              href="#home"
              aria-label={`${profile.name}, back to top`}
              className="rounded-sm text-[15px] font-semibold tracking-tight text-fg"
              onClick={() => setOpen(false)}
            >
              {profile.name}
            </a>

            <ul className="hidden items-center lg:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                      'block rounded-sm px-3 py-1.5 text-[13px] transition-colors',
                      active === item.id
                        ? 'text-fg underline decoration-fg/40 underline-offset-[6px]'
                        : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={withBase(profile.resume.href)}
                target="_blank"
                rel="noopener"
                className={buttonClasses({ variant: 'secondary', size: 'sm' })}
              >
                Resume
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={buttonClasses({ variant: 'ghost', size: 'icon-sm', className: 'lg:hidden' })}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {open && <MobileMenu active={active} onNavigate={() => setOpen(false)} />}
    </header>
  )
}

function MobileMenu({ active, onNavigate }: { active: string; onNavigate: () => void }) {
  return (
    <div id="mobile-menu" className="h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-line bg-ink-950 lg:hidden">
      <Container className="flex min-h-full flex-col py-4">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'block border-b border-line py-3 text-lg transition-colors',
                    active === item.id ? 'text-fg' : 'text-fg-muted',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8">
          <a
            href={withBase(profile.resume.href)}
            download={profile.resume.fileName}
            className={buttonClasses({ variant: 'primary', className: 'w-full' })}
          >
            <Download className="size-4" aria-hidden="true" />
            Download resume
          </a>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <a href={profile.socials.github.href} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a href={profile.socials.linkedin.href} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
