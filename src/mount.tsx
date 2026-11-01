import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/newsreader'
import './index.css'

/** Shared bootstrap for index.html and qa.html. */
export function mount(Page: ComponentType) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
