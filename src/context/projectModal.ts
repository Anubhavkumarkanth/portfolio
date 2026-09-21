import { createContext, useContext } from 'react'

export interface ProjectModalApi {
  openSlug: string | null
  openProject: (slug: string) => void
  closeProject: () => void
  /** Starts downloading the modal chunk so it opens instantly. */
  prefetch: () => void
}

export const ProjectModalContext = createContext<ProjectModalApi | null>(null)

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext)
  if (!ctx) throw new Error('useProjectModal must be used inside <ProjectModalProvider>')
  return ctx
}
