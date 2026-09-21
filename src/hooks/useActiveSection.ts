import { useEffect, useState } from 'react'

/**
 * Scroll spy: returns the id of the section crossing a thin band ~38% down
 * the viewport. At the very bottom of the page the last section wins, since
 * a short final section may never reach the band.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const visible = new Set<string>()
    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) return setActive(ids[ids.length - 1])
      const current = ids.find((id) => visible.has(id))
      if (current) setActive(current)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        pick()
      },
      { rootMargin: '-38% 0px -60% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    window.addEventListener('scroll', pick, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', pick)
    }
  }, [ids])

  return active
}
