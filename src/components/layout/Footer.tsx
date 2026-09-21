import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { buttonClasses } from '../../lib/button'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container, Monogram } from '../ui/primitives'

export function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { href: profile.socials.github.href, label: 'GitHub', icon: <GitHubIcon className="size-4" />, external: true },
    { href: profile.socials.linkedin.href, label: 'LinkedIn', icon: <LinkedInIcon className="size-4" />, external: true },
    { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-4" aria-hidden="true" />, external: false },
  ]

  return (
    <footer className="relative border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <Monogram />
            <div>
              <p className="font-medium text-fg">{profile.name}</p>
              <p className="mt-1 text-sm text-fg-muted">{profile.tagline}</p>
            </div>
          </div>
          <ul className="flex gap-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external && { target: '_blank', rel: 'noreferrer' })}
                  aria-label={link.label}
                  className={buttonClasses({ variant: 'secondary', size: 'icon-sm' })}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React, Tailwind CSS and Framer Motion.
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
