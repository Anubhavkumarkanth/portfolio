import { useEffect } from 'react'

/** The browser tries to jump to a #section before React has rendered it, so deep links need a nudge. */
export function useJumpToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])
}
