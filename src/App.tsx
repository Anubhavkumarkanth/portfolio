import { useEffect, useState } from 'react'
import { DataAside, SoftwareAside } from './components/hero/Asides'
import { SkipLink } from './components/layout/Chrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Background } from './components/sections/Background'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Toolbox } from './components/sections/Toolbox'
import { Work } from './components/sections/Work'
import { TrackSwitch } from './components/ui/TrackSwitch'
import { navLinks } from './config/site'
import { profile } from './data/profile'
import { projectsByTrack } from './data/projects'
import { skills, tooling } from './data/skills'
import type { Track } from './data/types'
import { useJumpToHash } from './hooks/useJumpToHash'

/**
 * Which view to open on: `?role=data` picks Data Analyst, anything else Software.
 * An old link to a project only the data view has (`#retail-cancellation-leakage`) opens the data view too.
 */
function trackFromUrl(): Track {
  const params = new URLSearchParams(window.location.search)
  const role = params.get('role')
  if (role) return role.toLowerCase().startsWith('data') ? 'data' : 'software'
  const target = decodeURIComponent(window.location.hash.slice(1)) || params.get('project')
  const has = (track: Track) => projectsByTrack[track].some((p) => p.slug === target)
  return has('data') && !has('software') ? 'data' : 'software'
}

/** The whole portfolio, in one of two views: Software Engineer (the default) or Data Analyst. */
export default function App() {
  const [track, setTrack] = useState(trackFromUrl)
  useJumpToHash()
  const persona = profile.personas[track]

  useEffect(() => {
    document.title = persona.seo.title
  }, [persona])

  const choose = (next: Track) => {
    if (next === track) return
    setTrack(next)
    // Keep the choice in the address, so a link can open straight on either view.
    const url = new URL(window.location.href)
    if (next === 'software') url.searchParams.delete('role')
    else url.searchParams.set('role', next)
    url.searchParams.delete('project')
    url.hash = ''
    window.history.replaceState(null, '', url)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <SkipLink />
      <Navbar links={navLinks} resume={persona.resume} track={track} onTrack={choose} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero
          persona={persona}
          aside={track === 'software' ? <SoftwareAside /> : <DataAside />}
          switcher={<TrackSwitch track={track} onChange={choose} />}
        />
        <Work track={track} copy={persona.work} />
        <About paragraphs={persona.about} />
        <Toolbox
          groups={skills[track]}
          extras={tooling[track]}
          description="Grouped by the job each one does. Everything listed here is used in at least one of the projects above."
        />
        <Background />
        <Contact resume={persona.resume} description={persona.contact} />
      </main>
      <Footer tagline={persona.tagline} />
    </>
  )
}
