import { useEffect } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { Hero } from './components/hero/Hero'
import { ScrollProgress, SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Capabilities } from './components/sections/Capabilities'
import { Certifications } from './components/sections/Certifications'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { ExperienceTimeline } from './components/sections/ExperienceTimeline'
import { Focus } from './components/sections/Focus'
import { GitHubActivity } from './components/sections/GitHubActivity'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { ProjectModalProvider } from './context/ProjectModalProvider'

function Divider() {
  return <div aria-hidden="true" className="section-divider mx-auto max-w-6xl" />
}

export default function App() {
  // The browser tries to jump to a #section before React has rendered it,
  // so deep links like /#projects need a nudge once the page exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <ProjectModalProvider>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="relative focus:outline-none">
            <Hero />
            <About />
            <Divider />
            <Skills />
            <Divider />
            <Projects />
            <Divider />
            <ExperienceTimeline />
            <Divider />
            <Education />
            <Divider />
            <Certifications />
            <Divider />
            <Capabilities />
            <Divider />
            <Focus />
            <Divider />
            <GitHubActivity />
            <Divider />
            <Contact />
          </main>
          <Footer />
        </ProjectModalProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
