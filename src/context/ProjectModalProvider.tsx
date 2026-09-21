import { Component, Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { CircleAlert, LoaderCircle, RotateCw, X } from 'lucide-react'
import { getProject } from '../data/projects'
import type { Project } from '../data/types'
import { buttonClasses } from '../lib/button'
import { ProjectModalContext, type ProjectModalApi } from './projectModal'

const loadModal = () => import('../components/projects/ProjectModal')
const ProjectModal = lazy(loadModal)

function slugFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('project')
  return getProject(slug) ? slug : null
}

/**
 * Owns which case study is open. The open project is mirrored to
 * `?project=<slug>` so it can be linked to directly and closed with Back.
 */
export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [openSlug, setOpenSlug] = useState<string | null>(slugFromUrl)
  const pushed = useRef(false)

  useEffect(() => {
    const onPop = () => {
      pushed.current = false
      setOpenSlug(slugFromUrl())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openProject = useCallback((slug: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('project', slug)
    if (slugFromUrl()) {
      window.history.replaceState(window.history.state, '', url)
    } else {
      window.history.pushState({ project: slug }, '', url)
      pushed.current = true
    }
    setOpenSlug(slug)
  }, [])

  const closeProject = useCallback(() => {
    if (pushed.current) {
      // popstate clears openSlug
      pushed.current = false
      window.history.back()
      return
    }
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    window.history.replaceState(window.history.state, '', url)
    setOpenSlug(null)
  }, [])

  const prefetch = useCallback(() => {
    void loadModal()
  }, [])

  const api = useMemo<ProjectModalApi>(
    () => ({ openSlug, openProject, closeProject, prefetch }),
    [openSlug, openProject, closeProject, prefetch],
  )

  const project = getProject(openSlug)

  return (
    <ProjectModalContext.Provider value={api}>
      {children}
      {project && (
        <ModalErrorBoundary key="project-modal" project={project} onClose={closeProject}>
          <Suspense fallback={<ModalLoading />}>
            <ProjectModal project={project} onClose={closeProject} onSwitch={openProject} />
          </Suspense>
        </ModalErrorBoundary>
      )}
    </ProjectModalContext.Provider>
  )
}

function ModalLoading() {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60">
      <p role="status" className="flex items-center gap-3 rounded-md border border-line bg-ink-900 px-4 py-3 text-sm text-fg-muted">
        <LoaderCircle className="size-4 animate-spin text-fg-subtle" aria-hidden="true" />
        Loading project details…
      </p>
    </div>
  )
}

interface BoundaryProps {
  project: Project
  onClose: () => void
  children: ReactNode
}

/** Catches a failed chunk download (e.g. after a redeploy) and offers a way out. */
class ModalErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    const { project, onClose } = this.props
    return (
      <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-5">
        <div role="alertdialog" aria-labelledby="modal-error-title" className="w-full max-w-md rounded-lg border border-line-strong bg-ink-900 p-6">
          <div className="flex items-start justify-between gap-4">
            <CircleAlert className="size-5 shrink-0 text-danger" aria-hidden="true" />
            <button type="button" onClick={onClose} className={buttonClasses({ variant: 'ghost', size: 'icon-sm' })} aria-label="Close">
              <X className="size-4" />
            </button>
          </div>
          <h2 id="modal-error-title" className="mt-3 font-medium text-fg">
            Couldn’t load the {project.name} case study
          </h2>
          <p className="mt-2 text-sm text-fg-muted">The page may have been updated since you opened it. Reloading usually fixes this.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => window.location.reload()} className={buttonClasses({ variant: 'primary', size: 'sm' })}>
              <RotateCw className="size-4" aria-hidden="true" />
              Reload
            </button>
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }
}
