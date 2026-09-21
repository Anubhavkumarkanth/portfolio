import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Download, FileText, Mail, Menu, X } from 'lucide-react'
import { navItems, sectionIds } from '../../config/site'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollLock } from '../../hooks/useScrollLock'
import { buttonClasses } from '../../lib/button'
import { EASE_OUT, cn, withBase } from '../../lib/utils'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container, Monogram } from '../ui/primitives'

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const [open, setOpen] = useState(false)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const indicatorRef = useRef<HTMLSpanElement>(null)

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

  // Slide the highlight pill under the active link. Measured in the next frame
  // (not during commit) and only when the desktop nav is actually shown, so it
  // never forces a synchronous layout on load.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    let frame = 0
    const move = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const indicator = indicatorRef.current
        const link = linkRefs.current[active]
        if (!indicator || !desktop.matches) return
        if (!link) {
          indicator.style.opacity = '0'
          return
        }
        indicator.style.opacity = '1'
        indicator.style.width = `${link.offsetWidth}px`
        indicator.style.transform = `translateX(${link.offsetLeft}px)`
      })
    }
    move()
    window.addEventListener('resize', move)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', move)
    }
  }, [active])

  const isActive = (id: string) => active === id

  return (
    <m.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || open
            ? 'border-line bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container>
          <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-4">
            <a
              href="#home"
              aria-label={`${profile.name} — back to top`}
              className="group flex items-center gap-2.5 rounded-lg"
              onClick={() => setOpen(false)}
            >
              <Monogram />
              <span className="hidden text-sm font-medium tracking-tight text-fg sm:inline lg:hidden xl:inline">
                {profile.name}
              </span>
            </a>

            <div className="relative hidden items-center lg:flex">
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="absolute top-[calc(50%-1rem)] left-0 h-8 rounded-md bg-white/[0.06] opacity-0 ring-1 ring-white/[0.08] ring-inset transition-[transform,width,opacity] duration-300 ease-out"
              />
              <ul className="flex items-center">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      ref={(el) => {
                        linkRefs.current[item.id] = el
                      }}
                      href={`#${item.id}`}
                      aria-current={isActive(item.id) ? 'location' : undefined}
                      className={cn(
                        'relative block rounded-md px-3 py-1.5 text-[13px] transition-colors',
                        isActive(item.id) ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={withBase(profile.resume.href)}
                target="_blank"
                rel="noopener"
                className={buttonClasses({ variant: 'accent-outline', size: 'sm' })}
              >
                <FileText className="size-4" aria-hidden="true" />
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

      <AnimatePresence>
        {open && <MobileMenu active={active} onNavigate={() => setOpen(false)} />}
      </AnimatePresence>
    </m.header>
  )
}

function MobileMenu({ active, onNavigate }: { active: string; onNavigate: () => void }) {
  return (
    <m.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-ink-950/95 backdrop-blur-xl lg:hidden"
    >
      <Container className="flex min-h-full flex-col py-6">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <m.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.03 * i, ease: EASE_OUT }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'flex items-baseline gap-4 border-b border-line py-3.5 text-2xl font-medium tracking-tight transition-colors',
                    active === item.id ? 'text-fg' : 'text-fg-muted',
                  )}
                >
                  <span className="w-6 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </m.li>
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
          <div className="mt-4 grid grid-cols-3 gap-2">
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
    </m.div>
  )
}
