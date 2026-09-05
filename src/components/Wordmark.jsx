/**
 * The supplied brand mark. It lives in `public/` and is referenced by URL, so
 * the same file also backs the favicon and the apple-touch icon. The artwork is
 * a square PNG on a transparent background, so it sits on the light page and on
 * the dark footer without needing a plate behind it.
 *
 * `alt` is empty on purpose: both call sites render the company name as text
 * beside the mark, so a description here would only repeat it.
 *
 * With `animated`, the mark renders as two registered layers — `logo-crown.png`
 * over `logo-shield.png`, cut from the same artwork so they stack back into the
 * flat logo — which lets the shield spin and the crown drop onto it separately.
 * See the `shield-spin` / `crown-drop` keyframes in App.css.
 *
 * Nothing passes it at the moment: the loading screen in index.html now plays
 * that intro full-size, and the header's copy would run behind the overlay, or
 * just after it on a slow bundle. Kept because it is the same two layers the
 * splash uses, so turning it back on is one prop.
 */
export default function Wordmark({ className = 'wordmark__mark', animated = false }) {
  if (!animated) {
    return <img className={className} src="/logo.png" alt="" width="512" height="512" />
  }

  return (
    <span className={`${className} wordmark__mark--layered`} aria-hidden="true">
      <img className="wordmark__shield" src="/logo-shield.png" alt="" width="512" height="512" />
      <img className="wordmark__crown" src="/logo-crown.png" alt="" width="512" height="512" />
    </span>
  )
}
