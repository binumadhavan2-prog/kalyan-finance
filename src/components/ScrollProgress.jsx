import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * A reading-progress bar pinned to the underside of the masthead.
 *
 * The fill is written straight to the node instead of through state: this
 * runs on every scroll frame, and re-rendering the page for a transform is
 * work the browser does not need to do.
 */
export default function ScrollProgress() {
  const fill = useRef(null)
  const { pathname } = useLocation()

  /*
   * Keyed on the route, which it did not need to be while the home page was
   * the only thing rendering it: leaving that page unmounted the component and
   * arriving back mounted a fresh one, so the fill always started from a
   * measurement of the page it was on.
   *
   * It lives in the layout now and survives navigation, so it has to re-measure
   * itself. The layout scrolls to the top on every route change and that alone
   * usually resets the fill through the scroll listener below — but only if a
   * scroll event actually fires, and arriving at a page already at offset zero
   * fires nothing. Without this the bar would keep the previous page's fill.
   *
   * Re-subscribing the two listeners per navigation is the cost, and it is not
   * one worth engineering around.
   */
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = fill.current
      if (!el) return

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      // A page shorter than the viewport has nothing to progress through.
      const progress = scrollable > 0 ? scrollTop / scrollable : 0

      el.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
    }

    // Scroll fires far faster than the screen repaints; coalesce to one frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  // Decorative: the position is already conveyed by the scrollbar itself.
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__fill" ref={fill} />
    </div>
  )
}
