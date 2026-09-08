import { useEffect, useRef } from 'react'
import ServiceIcon from './ServiceIcons'

/**
 * The products as a stack of cards that pin, recede and dissolve on scroll.
 *
 * Built here rather than pulled from a registry, for the reason ParallaxPills
 * gives: no dependency and no second styling system, so the panels take
 * --radius, --line and --page like everything else on the page.
 *
 * Three layers, and each one has to stand on its own:
 *
 *   no CSS beyond the stylesheet — a plain list of product cards
 *   CSS only, no JavaScript    — they pin and stack, via position: sticky
 *   with JavaScript            — they also scale back, turn and fade
 *
 * The pinning is the stylesheet's, not this file's, which is what keeps the
 * middle row true. Nothing here hides anything: if this effect never runs, the
 * cards are still stacked and still readable.
 */

/* The slot is the scroll distance; the card inside it is what sticks. They have
   to be separate elements — a sticky element's own rect stops moving the moment
   it pins, so it cannot tell you how far you have scrolled since. The slot
   keeps moving and is what the progress below is measured against. */

/* How far a card recedes once it is fully buried. Small on purpose: this is a
   card settling behind the next one, not a card leaving. */
const SCALE_BACK = 0.08
const LIFT = 12 /* px, upward, so the receding card reads as further away */
const FADE_TO = 0.45 /* never to zero — the stack behind is the effect */
/* Share of a slot's travel over which the card recedes. At 1 the card was still
   dissolving as the next one arrived, which read as a slow drift rather than as
   one card settling behind another; under 1 it finishes early and then simply
   holds while the rest of the slot scrolls past. Lower is faster. */
const RECEDE_OVER = 0.55

/* Resting turn per card, cycled by index rather than randomised, for the reason
   DEPTHS is in ParallaxPills: Math.random() in a render gives a new layout on
   every pass. Six against five so the cycle does not visibly repeat. */
const TURNS = [-1.6, 1.1, -0.7, 1.4, -1.2, 0.8]

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)

export default function ScrollStack({ items }) {
  const list = useRef(null)

  useEffect(() => {
    const el = list.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const slots = Array.from(el.children)
    const cards = slots.map((slot) => slot.firstElementChild).filter(Boolean)
    if (cards.length !== slots.length) return

    let frame = 0

    const paint = () => {
      frame = 0

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i]
        const slot = slots[i]

        /* The pin offset is read back off the card rather than duplicated here,
           so the stagger stays a stylesheet decision and this file cannot drift
           out of step with it. */
        const pin = parseFloat(getComputedStyle(card).top) || 0
        const slotBox = slot.getBoundingClientRect()

        /* Distance scrolled since this card pinned, over the distance it has to
           cover before the next card has fully replaced it. Zero until it pins,
           because the slot is still below the pin line and this goes negative. */
        const travel = (slotBox.height || 1) * RECEDE_OVER
        const progress = clamp01((pin - slotBox.top) / travel)

        /* The last card has nothing arriving to bury it, so it stays put. */
        const p = i === cards.length - 1 ? 0 : progress

        card.style.transform =
          `translate3d(0, ${(-LIFT * p).toFixed(2)}px, 0)` +
          ` scale(${(1 - SCALE_BACK * p).toFixed(4)})` +
          ` rotate(${(TURNS[i % TURNS.length] * p).toFixed(3)}deg)`
        card.style.opacity = (1 - (1 - FADE_TO) * p).toFixed(3)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    /* Only while the stack is somewhere near the viewport. Five getBoundingClientRect
       calls per frame is cheap, but not worth paying for on the rest of the page. */
    let live = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        live = entry.isIntersecting
        if (live) schedule()
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(el)

    const onScroll = () => {
      if (live) schedule()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    paint()

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
    }
  }, [items])

  return (
    <ul className="stack-cards" role="list" ref={list}>
      {items.map((item, i) => (
        <li className="stack-cards__slot" key={item.id} style={{ '--i': i }}>
          <article className="stack-card">
            <div className="stack-card__media">
              {item.image ? (
                <img
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.image.alt ?? ''}
                  loading="lazy"
                />
              ) : (
                <ServiceIcon name={item.icon} />
              )}
            </div>
            <h3 className="stack-card__title">{item.title}</h3>
          </article>
        </li>
      ))}
    </ul>
  )
}
