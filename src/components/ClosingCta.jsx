import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from './Draft'

/**
 * The closing call to action, on every page but /contact.
 *
 * The last thing on the page and the one section that has to convert, so it
 * carries weight the other bands do not: the bright accent on the primary
 * action — the only button on the site that takes it.
 *
 * One route out: the form, for people who want to describe a requirement. The
 * direct mailto button that used to sit beside it was removed on 2026-09-17 —
 * /contact carries the email and the footer repeats it on every page, so the
 * band leads with the single primary action rather than offering two.
 *
 * The phone / email / location strip that used to sit under the note came out
 * on 2026-09-09. /contact carries the same details, and the footer repeats
 * them on every page.
 */
export default function ClosingCta() {
  const { draft } = useCopy()

  return (
    <section className="section section--dark cta-band">
      <div className="shell cta">
        {/* No eyebrow, the same cut the calculator band took: it read
            "Contact" over a heading that already asks you to talk to us, which
            is the band naming itself twice before saying anything. The h2
            stays, so the band keeps its own heading in the outline.
            ui.contact stays in content.js — Tamil carries it, and the footer
            still heads its contact column with it. */}
        <h2 className="cta__title">
          <Draft>{draft.ctaTitle}</Draft>
        </h2>
        <p className="lede cta__lede">
          <Draft>{draft.ctaBody}</Draft>
        </p>

        <p className="cta__actions">
          <Link className="btn btn--feature btn--lg" to="/contact">
            <Draft>{draft.ctaButton}</Draft>
          </Link>
        </p>

        <p className="cta__note">
          <Draft>{draft.ctaNote}</Draft>
        </p>
      </div>
    </section>
  )
}
