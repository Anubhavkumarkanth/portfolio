import { ArrowUpRight } from 'lucide-react'
import { QaAside } from './components/hero/Asides'
import { SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ProjectBlock, Shot } from './components/projects/ProjectBlock'
import { Background } from './components/sections/Background'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Toolbox } from './components/sections/Toolbox'
import { Card, textLink } from './components/ui/primitives'
import { Section } from './components/ui/Section'
import { qaNav } from './config/site'
import { profile } from './data/profile'
import { useJumpToHash } from './hooks/useJumpToHash'
import { defects, orderdesk, otherTesting, qaSkills } from './data/qa'

const dataLink = { href: './', label: 'Looking for a data analyst? See my main portfolio' }

/** The QA page (/qa): one testing project in depth, then the same background and contact. */
export default function QaPage() {
  useJumpToHash()
  const { qa } = profile
  return (
    <>
      <SkipLink />
      <Navbar links={qaNav} resume={qa.resume} crossLink={dataLink} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero persona={qa} aside={<QaAside />} workLabel="See the test suite" />

        <Section
          id="work"
          eyebrow="Main project"
          title="A test suite for the bugs that cost a shop money."
          description="Double charges, refunds that never arrive, stock sold twice, payments stuck on “pending”. Here is how I tested for each of them."
        >
          <ProjectBlock project={orderdesk} index={0} />
          <div className="mt-14 grid grid-cols-1 gap-10 lg:ml-[calc(13rem+3rem)] lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl font-medium text-fg">How I tested it</h3>
              <ol className="mt-4 space-y-3">
                {orderdesk.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                    <span className="w-5 shrink-0 text-fg-subtle tabular-nums">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <Shot shot={orderdesk.shots[1]} />
          </div>
        </Section>

        <Section
          id="bugs"
          eyebrow="Bugs caught"
          title="Eight planted bugs, and the test that caught each one."
          description="Each bug can be switched on by itself. The suite runs once per bug, and CI fails if any of them slips through. Every one has a written report with steps, expected vs actual, evidence and the fix."
          className="border-y border-line bg-surface"
        >
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
              <thead className="bg-sunken text-sm text-fg-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Bug</th>
                  <th scope="col" className="px-4 py-3 font-medium">What was wrong</th>
                  <th scope="col" className="px-4 py-3 font-medium">Caught by</th>
                </tr>
              </thead>
              <tbody>
                {defects.map((d) => (
                  <tr key={d.id} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 font-mono text-sm font-normal whitespace-nowrap text-fg">
                      <a
                        href={`${orderdesk.links.github}/blob/main/docs/bugs/${d.id}.md`}
                        target="_blank"
                        rel="noreferrer"
                        className={textLink}
                      >
                        {d.id}
                      </a>
                    </th>
                    <td className="px-4 py-3 text-fg">{d.what}</td>
                    <td className="px-4 py-3 text-fg-muted">{d.caughtBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-fg">What it found</h3>
              <ul className="mt-3 space-y-2.5">
                {orderdesk.findings.map((f) => (
                  <li key={f} className="text-[15px] leading-relaxed text-fg-muted">{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-fg">Honest limits</h3>
              <ul className="mt-3 space-y-2.5">
                {orderdesk.limits.map((l) => (
                  <li key={l} className="text-[15px] leading-relaxed text-fg-muted">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="more" eyebrow="More testing" title="Testing shows up in everything I build.">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {otherTesting.map((item) => (
              <Card key={item.name} className="p-6">
                <h3 className="text-[17px] font-semibold tracking-tight text-fg">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-accent">
                      {item.name}
                      <ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-[15px] leading-relaxed text-fg-muted">{p}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Toolbox
          groups={qaSkills}
          description="Grouped by the job each one does, and all of it used in the project above."
        />
        <Background />
        <Contact
          resume={qa.resume}
          description="I’m looking for an entry-level QA or software test engineer role in Bengaluru. Write to me, call, or message me on LinkedIn."
        />
      </main>
      <Footer tagline="QA Engineer · pytest, Playwright, API testing" crossLink={dataLink} />
    </>
  )
}
