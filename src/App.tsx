import { DataAside } from './components/hero/Asides'
import { SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Background } from './components/sections/Background'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Toolbox } from './components/sections/Toolbox'
import { Work } from './components/sections/Work'
import { dataNav } from './config/site'
import { ProjectModalProvider } from './context/ProjectModalProvider'
import { useJumpToHash } from './hooks/useJumpToHash'
import { profile } from './data/profile'
import { skills, tooling } from './data/skills'

const qaLink = { href: 'qa', label: 'Hiring for QA? See my testing work' }

/** The main page: data analyst. */
export default function App() {
  useJumpToHash()
  const { data } = profile
  return (
    <ProjectModalProvider>
      <SkipLink />
      <Navbar links={dataNav} resume={data.resume} crossLink={qaLink} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero persona={data} aside={<DataAside />} workLabel="See my work" />
        <Work />
        <About />
        <Toolbox
          groups={skills}
          extras={tooling}
          description="Grouped by the job each one does. Everything listed here is used in at least one of the projects above."
        />
        <Background />
        <Contact
          resume={data.resume}
          description="I’m looking for an entry-level data analyst role in Bengaluru. Write to me, call, or message me on LinkedIn."
        />
      </main>
      <Footer tagline="Data Analyst · SQL, Python, Power BI" crossLink={qaLink} />
    </ProjectModalProvider>
  )
}
