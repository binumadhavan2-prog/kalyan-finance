/**
 * Resolve a public-directory asset path against the app's base URL.
 *
 * The site ships as a GitHub Pages project page, served under `/<repo>/` rather
 * than the domain root, so a bare `/logo.png` would resolve to the domain root
 * and 404. Vite rewrites the asset URLs it can see — the ones in index.html and
 * in imports — but the paths held as data in content.js (and the logo in the
 * wordmark) are plain strings it never parses, so they are prefixed here at the
 * point they are read.
 *
 * `import.meta.env.BASE_URL` is whatever `base` in vite.config.js is set to; it
 * always ends in a slash. On a root deploy it is '/', and this returns the path
 * unchanged. Change `base` to '/' for a custom domain or user page and nothing
 * else has to move.
 */
export function asset(path) {
  if (!path) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
