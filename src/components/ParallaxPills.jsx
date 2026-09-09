import { useEffect, useRef } from 'react'

/**
 * The differentiators as pills that drift with the cursor.
 *
 * Built here rather than pulled from a registry, so it carries no dependency
 * and no second styling system — the look comes from the same tokens as the
 * rest of the page.
 *
 * The terms are real content, not decoration, so this stays a <ul> and is
 * never aria-hidden: with no JavaScript, no pointer or reduced motion asked
 * for, it renders as a plain list of labels and reads exactly as the divided
 * rows it replaced. The motion is applied on top of a working list, never as
 * the thing that makes one appear.
 */

/* Drift multiplier and resting tilt per pill, cycled by index rather than
   randomised: Math.random() in a render gives a different layout on every
   pass, so the pills would jump each time React re-rendered the page. Six
   entries against five terms, so the cycle does not visibly repeat. */
const DEPTHS = [0.55, 1.15, 0.75, 1.3, 0.9, 1.05]
/* Halved from the angles this started on. A tilt costs vertical room in
   proportion to the pill's width, not its height — W x sin(angle) — so the
   widest label here, "Customer-focused approach" at roughly 285px, grew about
   12px taller at 2.5deg and ate the row gap from both sides at once. At these
   angles that cost is about 6px, and the tilt still reads. */
const TILTS = [-1.25, 0.75, -0.5, 1, -0.875, 0.625]

/* Furthest a depth-1 pill travels from rest, in px. The deepest pill in the
   cycle takes 1.3x this, so the row needs a gap wider than the spread between
   neighbouring depths or the pills cross over each other at full lean. */
const STRENGTH = 48
/* Vertical travel is damped: the row is much wider than it is tall, so equal
   travel on both axes reads as the pills sliding off their own line. */
const VERTICAL_DAMPING = 0.45
/* Share of the remaining distance closed each frame. Low enough that the
   pills lag the cursor — that lag is the whole effect; at 1 they would be
   welded to it. */
const EASE = 0.085
/** Below this many px from target, stop the loop rather than idle on it. */
const SETTLED = 0.05

const clamp = (n) => Math.min(Math.max(n, -1), 1)

export default function ParallaxPills({ items }) {
  const list = useRef(null)

  useEffect(() => {
    const el = list.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /*
     * The entry animation is switched on from here for the same reason
     * Layout's reveal is: a stylesheet that hides the pills would need
     * something else to come along and un-hide them, and if that something
     * fails the content is gone. No class, no animation, list still visible.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-entering')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(el)

    /* A coarse pointer has no hover position to follow — a touch would snap
       the pills to wherever the finger landed and leave them there. The entry
       animation above still runs; only the drift is skipped. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return () => observer.disconnect()
    }

    const pills = Array.from(el.children)
    // Current px offset per pill, eased toward the target every frame.
    const offsets = pills.map(() => ({ x: 0, y: 0 }))

    /*
     * How far each pill may lean sideways before it leaves the row's own box.
     *
     * The drift is a transform, so it changes nothing about layout and the row
     * has no idea a pill has moved. That is fine in the middle of the row and
     * wrong at its ends: the five supplied terms come to about 1196px of pills
     * and gaps against a 1200px shell, so the row fits on one line with almost
     * nothing to spare, and then the outermost pill is asked to travel up to
     * 62px — STRENGTH 48 x the deepest depth 1.3 — into space that is not
     * there. It ends up outside the shell, and on a window not much wider than
     * the shell, outside the viewport, taking the page's horizontal scroll with
     * it.
     *
     * So each pill is clamped to the distance actually available on its own
     * side. Interior pills are unaffected, because the room beside them is far
     * more than they ever use; the end ones give up travel in proportion to how
     * close they already sit to the edge, which is the right trade and is only
     * visible on the widths where the alternative was a pill hanging off the
     * page.
     *
     * Measured from offsetLeft rather than getBoundingClientRect, because
     * offsets are layout values and are not affected by the transforms this is
     * in the middle of writing — reading rects here would feed the drift back
     * into its own limits.
     */
    const limits = pills.map(() => ({ left: 0, right: 0 }))
    // A little back from the true edge, for the width a pill's tilt adds.
    const EDGE_INSET = 4

    const measure = () => {
      const rowLeft = el.offsetLeft
      const rowRight = rowLeft + el.clientWidth

      pills.forEach((pill, i) => {
        const room = limits[i]
        room.left = Math.min(0, rowLeft - pill.offsetLeft + EDGE_INSET)
        room.right = Math.max(0, rowRight - pill.offsetLeft - pill.offsetWidth - EDGE_INSET)
      })
    }

    measure()
    // Pointer position relative to the row's centre, normalised to -1..1.
    const pointer = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      let moving = false

      pills.forEach((pill, i) => {
        const depth = DEPTHS[i % DEPTHS.length]
        const room = limits[i]
        const targetX = Math.min(
          Math.max(pointer.x * STRENGTH * depth, room.left),
          room.right,
        )
        const targetY = pointer.y * STRENGTH * depth * VERTICAL_DAMPING
        const at = offsets[i]

        at.x += (targetX - at.x) * EASE
        at.y += (targetY - at.y) * EASE

        if (
          Math.abs(targetX - at.x) > SETTLED ||
          Math.abs(targetY - at.y) > SETTLED
        ) {
          moving = true
        }

        /* Written straight to the node, as ScrollProgress does: this runs on
           every frame the cursor moves, and re-rendering the page for a
           transform is work the browser does not need to do.

           The translate sits on the <li> and the tilt on the pill inside it,
           so this never overwrites the entry animation's own transform. */
        pill.style.transform = `translate3d(${at.x.toFixed(2)}px, ${at.y.toFixed(2)}px, 0)`
      })

      // Idle once everything has arrived; the next pointer move restarts it.
      frame = moving ? requestAnimationFrame(tick) : 0
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      const box = el.getBoundingClientRect()
      if (!box.width || !box.height) return

      /*
       * Clamped, and the clamp is load-bearing rather than defensive. The
       * pointer is tracked on the window but normalised against the row's own
       * box, and that box is wide and short — a cursor a few hundred px above
       * it normalises to -10, not -1, which sent a pill several hundred px up
       * instead of the ~37 the spacing is built around. Outside the row the
       * lean now holds at full rather than continuing to grow.
       */
      pointer.x = clamp(((event.clientX - box.left) / box.width) * 2 - 1)
      pointer.y = clamp(((event.clientY - box.top) / box.height) * 2 - 1)
      schedule()
    }

    // Drift back to rest rather than snapping there when the cursor leaves.
    const onLeave = () => {
      pointer.x = 0
      pointer.y = 0
      schedule()
    }

    /* The row re-flows and the room beside each pill changes with it, so the
       limits are stale until this runs. It also covers the wrap to two lines,
       where a pill that was mid-row becomes the last one on its own. */
    const onResize = () => {
      measure()
      schedule()
    }

    /* Pill widths are set by the webfont, and the first measurement above can
       land before it arrives — the fallback stack is not the same width. One
       re-measure when the fonts settle costs nothing and stops the row's ends
       being clamped against widths that no longer apply. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(onResize).catch(() => {})
    }

    /* Tracked on the window, not the row: the pills should already be leaning
       toward the cursor as it approaches, and a listener on the row itself
       only fires once the cursor is on top of them. */
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [items])

  return (
    <ul className="pills" role="list" ref={list}>
      {items.map((item, i) => (
        <li className="pills__slot" key={item}>
          <span
            className="pills__pill"
            style={{
              '--tilt': `${TILTS[i % TILTS.length]}deg`,
              // Staggered so they arrive in sequence rather than as a block.
              '--delay': `${i * 90}ms`,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
