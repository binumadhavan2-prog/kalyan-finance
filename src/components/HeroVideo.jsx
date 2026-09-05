import { useEffect, useState } from 'react'
import { heroVideo } from '../content'

/**
 * The brand animation behind the home hero, in place of the photograph that
 * used to sit there. It is a backdrop, so it is `aria-hidden` and decorative
 * throughout: the clip only repeats the tagline and contact details the page
 * already states in text, and an uncaptioned loop announced to a screen reader
 * is noise rather than information.
 *
 * A looping background is exactly what someone asking their system for less
 * motion has turned off, so they get the same clip held on its first frame —
 * a still image, no controls, since there is nothing here to reach.
 */
export default function HeroVideo() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(query.matches)

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (!heroVideo) return null

  return (
    <video
      className="hero__backdrop"
      src={heroVideo}
      autoPlay={!reduceMotion}
      loop={!reduceMotion}
      muted
      playsInline
      preload={reduceMotion ? 'metadata' : 'auto'}
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
