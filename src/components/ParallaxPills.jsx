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
    // Pointer position relative to the row's centre, normalised to -1..1.
    const pointer = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      let moving = false

      pills.forEach((pill, i) => {
        const depth = DEPTHS[i % DEPTHS.length]
        const targetX = pointer.x * STRENGTH * depth
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

    /* Tracked on the window, not the row: the pills should already be leaning
       toward the cursor as it approaches, and a listener on the row itself
       only fires once the cursor is on top of them. */
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', onLeave)
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
