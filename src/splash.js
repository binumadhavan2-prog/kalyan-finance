/**
 * Takes the loading screen out of the document once it has faded.
 *
 * The fade itself is CSS (see the inline styles in index.html) so the splash
 * clears even if this never runs. All this does is drop the finished element,
 * which matters for more than tidiness: while it is in the DOM it sits over the
 * whole page at z-index 100, and a `visibility: hidden` layer still counts as a
 * containing block for anything that comes later.
 */
const CLEAR_AT_MS = 3500 // the CSS fade ends at 3s + 0.5s

export function removeSplash() {
  const el = document.getElementById('splash')
  if (!el) return

  // Measured from page start, not from here, so a slow bundle does not extend
  // the wait past the point the fade has already finished.
  const left = Math.max(0, CLEAR_AT_MS - performance.now())
  window.setTimeout(() => el.remove(), left)
}
