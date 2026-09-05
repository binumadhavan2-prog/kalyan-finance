import { useEffect, useRef } from 'react'

/**
 * A reading-progress bar pinned to the underside of the masthead.
 *
 * The fill is written straight to the node instead of through state: this
 * runs on every scroll frame, and re-rendering the page for a transform is
 * work the browser does not need to do.
 */
export default function ScrollProgress() {
  const fill = useRef(null)

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
  }, [])

  // Decorative: the position is already conveyed by the scrollbar itself.
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__fill" ref={fill} />
    </div>
  )
}
