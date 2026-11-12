import { DataAside } from './components/hero/Asides'
import { SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Background } from './components/sections/Background'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { QaSection } from './components/sections/QaSection'
import { Toolbox } from './components/sections/Toolbox'
import { Work } from './components/sections/Work'
import { navLinks } from './config/site'
import { profile } from './data/profile'
import { skills, tooling } from './data/skills'
import { useJumpToHash } from './hooks/useJumpToHash'

/** The whole portfolio: data analyst first, the testing project last. */
export default function App() {
  useJumpToHash()
  const { data } = profile
  return (
    <>
      <SkipLink />
      <Navbar links={navLinks} resume={data.resume} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero persona={data} aside={<DataAside />} />
        <Work />
        <About />
        <Toolbox
          groups={skills}
          extras={tooling}
          description="Grouped by the job each one does. Everything listed here is used in at least one of the projects above."
        />
        <Background />
        <QaSection />
        <Contact
          resume={data.resume}
          description="I’m looking for an entry-level data analyst role in Bengaluru. Write to me, call, or message me on LinkedIn."
        />
      </main>
      <Footer tagline="Data Analyst · SQL, Python, Power BI" />
    </>
  )
}
