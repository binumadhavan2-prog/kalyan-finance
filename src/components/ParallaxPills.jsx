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

/* Drift multiplier and arrival tilt per pill, cycled by index rather than
   randomised: Math.random() in a render gives a different layout on every
   pass, so the pills would jump each time React re-rendered the page. Six
   entries against five terms, so the cycle does not visibly repeat.

   TILTS is spent entirely on the way in now. It was the pill's resting angle
   until 2026-09-09, which left the finished row sitting at five different
   angles rather than level; the keyframes in App.css say the rest. */
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
/*
 * There is no vertical travel. It was damped rather than removed for a long
 * time, on the reasoning that a smaller share of the same movement would read
 * as depth without costing the row its line. It does not: any vertical share
 * at all puts five pills at five different heights, because each takes its own
 * depth, and a row of labels reads as a row by sharing a baseline. Asked about
 * twice as a misalignment before it was called an effect, which is the answer.
 *
 * So the drift is horizontal only. The pills still lead and lag each other by
 * depth, which is the whole of the parallax, and the line they sit on is never
 * in question. The vertical half of the pointer is still measured — see REACH
 * — but only to decide how near the cursor is, never to move anything.
 */
/*
 * How far from the row the drift still answers the cursor, in px, measured out
 * from the row's own edge.
 *
 * This is what was missing, and it is why the pills landed scattered rather
 * than on their line. Y was normalised against the row's own box the way X is,
 * and that box is wide and short — around 60px tall against 1200 wide. X reads
 * honestly at that width; Y did not. Half a row above or below it already read
 * as a full lean, and the cursor is hardly ever inside those 60px, so the
 * vertical drift sat pinned at its maximum for practically every pointer
 * position on the page.
 *
 * That is where the row is when it scrolls into view: the reader's cursor is
 * wherever they left it, the first pointermove pins the lean, and the entry
 * animation hands the pills straight into it. Each one takes its own depth, up
 * to 28px of it, so the bounce finished and the row settled off its own line
 * instead of on it.
 *
 * So Y now reads as a distance from the row rather than a position inside it,
 * and both axes fade across that same distance: at the row, the full effect;
 * this far away, none of it. The row rests level until the cursor comes near.
 */
const REACH = 320
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
    const offsets = pills.map(() => ({ x: 0 }))

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
    /* A little back from the true edge. It covered the width a pill's resting
       tilt added; the tilt is gone from the resting state, but the inset stays
       as plain slack against a sub-pixel row width. */
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
    /* How far across the row the pointer is, -1..1, faded by how near it is
       vertically. One axis, because only one axis moves anything. */
    const pointer = { x: 0 }
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
        const at = offsets[i]

        at.x += (targetX - at.x) * EASE

        if (Math.abs(targetX - at.x) > SETTLED) {
          moving = true
        }

        /* Written straight to the node, as ScrollProgress does: this runs on
           every frame the cursor moves, and re-rendering the page for a
           transform is work the browser does not need to do.

           The translate sits on the <li> and the tilt on the pill inside it,
           so this never overwrites the entry animation's own transform. */
        pill.style.transform = `translate3d(${at.x.toFixed(2)}px, 0, 0)`
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
       * Both axes are still clamped, and the clamp is still load-bearing rather
       * than defensive: the pointer is tracked on the window, so without it a
       * cursor a few hundred px above the row normalises to -10, not -1, and
       * sends a pill several hundred px up instead of the ~37 the spacing is
       * built around.
       *
       * What the clamp cannot do on its own is decide when the row should be
       * leaning at all — held at full is still held. See REACH above for why
       * that showed up on the vertical axis and not the horizontal one.
       *
       * X reads as a position across the row, which is the axis the effect is
       * about and the one the row is wide enough to measure honestly. The
       * vertical distance is measured too, but only to fade X in and out: at
       * the row, the full effect; REACH away, none of it. So the drift belongs
       * to a cursor that has come to the row rather than to one parked
       * anywhere on the page, and nothing it does can move a pill off its line.
       */
      const centreY = box.top + box.height / 2
      const gap = Math.max(0, Math.abs(event.clientY - centreY) - box.height / 2)
      const near = 1 - clamp(gap / REACH)

      pointer.x = clamp(((event.clientX - box.left) / box.width) * 2 - 1) * near
      schedule()
    }

    // Drift back to rest rather than snapping there when the cursor leaves.
    const onLeave = () => {
      pointer.x = 0
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
       only fires once the cursor is on top of them. REACH is what decides how
       far "as it approaches" reaches. */
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', onResize)
    /* The cursor leaving the page is not a blur: the window keeps focus when it
       goes to the browser chrome, to a second screen, or off the top of the
       display. Without this the row held its last lean until something else
       moved, which is the same misalignment arriving by a different door. */
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', onResize)
      document.documentElement.removeEventListener('pointerleave', onLeave)
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
