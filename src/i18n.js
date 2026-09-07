import { createContext, useContext } from 'react'
import * as content from './content'
import { navLinks } from './nav'
import { ta } from './content.ta'

/**
 * Two languages, one content tree.
 *
 * English is the source: `content.js` and `nav.js` hold every string, and
 * `content.ta.js` is an overlay of the same shape carrying only what has been
 * translated. Anything the overlay leaves out falls through to the English, so
 * the Tamil layer can be partial — which it is, deliberately: names, figures
 * and the brand mark are not translated at all, and a string added to the
 * English tomorrow renders in English on both sides rather than disappearing
 * from one of them.
 *
 * English is also the authority. If the two ever disagree about what the
 * business is offering, the English is what was supplied and signed off; the
 * Tamil is a translation of it, and an unreviewed one at that. The header of
 * content.ta.js says which parts most need a second pair of eyes.
 */

export const LANGUAGES = { en: 'English', ta: 'தமிழ்' }
export const STORAGE_KEY = 'kf-lang'

/**
 * The key an array element is matched on when overlaying. Arrays are merged by
 * identity rather than by position, so reordering the English list — or adding
 * to it — cannot silently pair an entry with somebody else's translation.
 */
function keyOf(item) {
  return item?.id ?? item?.to ?? item?.key
}

/**
 * Overlay `over` onto `base`, returning a new tree.
 *
 * Rules, in order: nothing to say (null/undefined) keeps the base; two arrays
 * of identifiable objects merge element-wise by key, keeping base entries the
 * overlay omits; two plain objects recurse; anything else is a replacement.
 * Arrays of plain strings — the core values, for instance — fall to that last
 * rule and are replaced whole, which is right: a list of five terms is one
 * translation unit, not five independent ones.
 */
function overlay(base, over) {
  if (over === null || over === undefined) return base

  if (Array.isArray(base) && Array.isArray(over)) {
    if (base.every((item) => keyOf(item) !== undefined)) {
      const byKey = new Map(over.map((item) => [keyOf(item), item]))
      return base.map((item) => overlay(item, byKey.get(keyOf(item))))
    }
    return over
  }

  const plain = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)
  if (plain(base) && plain(over)) {
    const merged = { ...base }
    for (const k of Object.keys(over)) merged[k] = overlay(base[k], over[k])
    return merged
  }

  return over
}

/* Built once at module load. The content is static — nothing here depends on
   render state — so rebuilding the merged tree per render would be pure work
   for no result, and would hand every consumer a new object identity. */
export const COPY = {
  en: { ...content, navLinks },
  ta: overlay({ ...content, navLinks }, ta),
}

/* Exported because the provider lives in its own module: this file holds
   values and hooks, that one holds the component, and the react-refresh rule
   wants them apart. */
export const LanguageContext = createContext(null)

/**
 * The content tree for the active language.
 *
 * Falls back to English outside a provider rather than throwing. That is not
 * defensiveness for its own sake: ErrorBoundary renders when the tree below it
 * has already failed, and a hook that throws there would replace the error
 * screen with a blank page.
 */
export function useCopy() {
  return useContext(LanguageContext)?.copy ?? COPY.en
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  return [ctx?.lang ?? 'en', ctx?.setLang ?? (() => {})]
}

/** `fill(ui.foundedIn, { year: 2023 })` — the {name} slots in a ui string. */
export function fill(template, values) {
  return Object.entries(values).reduce(
    (out, [k, v]) => out.replaceAll(`{${k}}`, String(v)),
    template,
  )
}
