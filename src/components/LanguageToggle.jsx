import { LANGUAGES, fill, useCopy, useLanguage } from '../i18n'

/**
 * The language switch in the nav.
 *
 * The label is the language it switches TO, not the one you are reading. That
 * is the only form that works: a reader who cannot read the current language
 * needs to recognise the way out, and "தமிழ்" is recognisable to someone who
 * reads no English at all, where a button saying "English" would not be.
 *
 * A button rather than a link, because nothing is being navigated to — the
 * route does not change and the page is not reloaded.
 */
export default function LanguageToggle({ className, onClick }) {
  const [lang, setLang] = useLanguage()
  const { ui } = useCopy()
  const next = lang === 'en' ? 'ta' : 'en'

  return (
    <button
      type="button"
      className={className}
      /* The visible label is in the target language, so it is tagged as such:
         it picks the Tamil font fallback and the right screen-reader voice.
         The aria-label stays in the language being read, because it is the
         explanation and the reader is still in the old language when they
         meet it. */
      lang={next}
      aria-label={fill(ui.switchLanguage, { language: LANGUAGES[next] })}
      onClick={() => {
        setLang(next)
        onClick?.()
      }}
    >
      {/* Both names occupy the control so its width is constant across the
          switch; only the target-language one shows. The button's accessible
          name comes from aria-label above, so this is presentation only. */}
      <span className="swap" aria-hidden="true">
        <span className="swap__opt" lang="en" data-active={next === 'en'}>
          {LANGUAGES.en}
        </span>
        <span className="swap__opt" lang="ta" data-active={next === 'ta'}>
          {LANGUAGES.ta}
        </span>
      </span>
    </button>
  )
}
