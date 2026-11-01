import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { Container, textLink } from '../ui/primitives'

export function Footer({ tagline }: { tagline: string }) {
  const links = [
    { href: profile.socials.github.href, label: 'GitHub', external: true },
    { href: profile.socials.linkedin.href, label: 'LinkedIn', external: true },
    { href: `mailto:${profile.email}`, label: 'Email', external: false },
  ]

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base text-fg">{profile.name}</p>
          <p className="mt-1 text-fg-subtle">{tagline}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} {...(link.external && { target: '_blank', rel: 'noreferrer' })} className={textLink}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#home" className="inline-flex items-center gap-1 text-fg-subtle transition-colors hover:text-fg">
                Top
                <ArrowUp className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
