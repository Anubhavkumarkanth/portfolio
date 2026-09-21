import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { Container } from '../ui/primitives'

const footerLink = 'text-fg-muted underline decoration-fg/20 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg'

export function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { href: profile.socials.github.href, label: 'GitHub', external: true },
    { href: profile.socials.linkedin.href, label: 'LinkedIn', external: true },
    { href: `mailto:${profile.email}`, label: 'Email', external: false },
  ]

  return (
    <footer className="border-t border-line">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium text-fg">{profile.name}</p>
            <p className="mt-1 text-sm text-fg-muted">{profile.tagline}</p>
          </div>
          <ul className="flex gap-5 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} {...(link.external && { target: '_blank', rel: 'noreferrer' })} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React and Tailwind CSS.
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
