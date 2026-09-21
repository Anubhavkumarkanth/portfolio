import { useEffect } from 'react'

/** Locks page scroll while `locked` is true, compensating for the scrollbar width. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const scrollbar = window.innerWidth - root.clientWidth
    const prevOverflow = root.style.overflow
    const prevPadding = root.style.paddingRight
    root.style.overflow = 'hidden'
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`
    return () => {
      root.style.overflow = prevOverflow
      root.style.paddingRight = prevPadding
    }
  }, [locked])
}
