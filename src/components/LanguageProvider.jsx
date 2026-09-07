import { useEffect, useMemo, useState } from 'react'
import { COPY, LanguageContext, STORAGE_KEY } from '../i18n'

/**
 * Reads the stored choice. Wrapped because localStorage throws outright in a
 * few real configurations — Safari's private mode historically, and any
 * browser set to block site data — rather than merely returning null.
 */
function storedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ta') return saved
  } catch {
    /* Not fatal: fall through to the default. */
  }
  return 'en'
}

/**
 * Holds the chosen language for the tree below it.
 *
 * Mounted outside the router's routes and outside ErrorBoundary, so every page
 * and the crash screen alike can read it.
 */
export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(storedLanguage)

  useEffect(() => {
    /* The lang attribute is not decoration. It picks the font fallback for
       Tamil text, tells a screen reader which voice to read the page in, and
       is what a translation tool checks before offering to translate. */
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* The choice just will not survive a reload. Worth nothing else. */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, copy: COPY[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
