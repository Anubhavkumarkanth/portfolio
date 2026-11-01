import { profile } from '../../data/profile'
import { Container, Eyebrow } from '../ui/primitives'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-y border-line bg-surface py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 id="about-heading" className="mt-2 font-serif text-3xl font-medium text-fg">
            Hi, I’m Anubhav.
          </h2>
        </div>
        <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-pretty text-fg-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  )
}
