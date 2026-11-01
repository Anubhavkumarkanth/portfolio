import { useEffect } from 'react'

/**
 * The browser tries to jump to a #section before React has rendered it, so deep
 * links need a nudge. Old `?project=<slug>` links scroll to that project too.
 */
export function useJumpToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1)) || new URLSearchParams(window.location.search).get('project')
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])
}
