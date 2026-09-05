import { useId } from 'react'

/**
 * The Instagram glyph in its brand colours: the gradient tile with the white
 * camera outline, lens and flash sitting on it — the app icon as Instagram
 * publishes it, rather than a monochrome outline.
 *
 * The gradient is the official corner-to-corner ramp, anchored bottom-left:
 * warm yellow through orange and magenta into purple and indigo.
 *
 * Unlike the rest of the site's icons this one does NOT take currentColor —
 * it is fixed brand artwork, so it looks the same on the white Contact page
 * and on the navy footer. `useId` keeps the gradient id unique because the
 * Contact page renders this twice, once in the Follow button and once in the
 * footer, and duplicate SVG ids would collide.
 */
export default function InstagramIcon({ className = 'social__icon' }) {
  const gradientId = `ig-${useId().replace(/:/g, '')}`

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Instagram"
    >
      <defs>
        <radialGradient id={gradientId} cx="0.28" cy="1.0" r="1.15">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>

      {/* The gradient tile. */}
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={`url(#${gradientId})`} />

      {/* Camera body, lens and flash, knocked out in white. Stroke weights are
          heavier than the site's 1.6 because this renders at ~20px and the
          official proportions go mushy any thinner. */}
      <rect
        x="5.6"
        y="5.6"
        width="12.8"
        height="12.8"
        rx="3.9"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.35" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.15" cy="6.85" r="1.05" fill="#fff" />
    </svg>
  )
}
