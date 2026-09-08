import { useLocation } from 'react-router-dom'

/**
 * A click handler for a nav link that may be pointing at the page already open.
 *
 * Layout scrolls to the top on every route change, but a link to the current
 * route fires no location change — the same quirk SiteHeader notes as the
 * reason its mobile panel closes on click rather than on route change. So the
 * header and footer both had links that did nothing at all from halfway down
 * the page they name.
 *
 * Only that case is handled. A link to another page is left to Layout, which
 * lands at the top instantly because the content under it has changed; this is
 * a move within a page the reader is already looking at, so it scrolls.
 *
 * `scroll-behavior: smooth` is set on html and the reduced-motion block turns
 * it off, but neither reaches a `behavior` passed in JavaScript — that has to
 * be asked for separately, which is what the matchMedia check is doing.
 *
 * Shared by SiteHeader and SiteFooter, which render the same `navLinks`.
 */
export function useSamePageTop() {
  const { pathname } = useLocation()

  return (to) => {
    if (to !== pathname) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' })
  }
}
