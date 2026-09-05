import { useEffect, useState } from 'react'
import { heroVideo } from '../content'

/**
 * The brand animation beside the home hero copy.
 *
 * It loops silently on its own, which only works because the file is small and
 * has no audio track. For anyone who has asked their system for less motion a
 * looping animation is exactly the thing they turned off, so they get the same
 * clip as a still first frame with controls — the content stays reachable,
 * nothing moves until they say so.
 *
 * `aria-hidden` on the autoplaying case is deliberate: the clip is decoration
 * that repeats the tagline and contact details already in the page text, and an
 * uncaptioned loop announced to a screen reader is noise, not information.
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

  if (reduceMotion) {
    return (
      <video
        className="hero__video"
        src={heroVideo}
        controls
        playsInline
        preload="metadata"
      />
    )
  }

  return (
    <video
      className="hero__video"
      src={heroVideo}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
