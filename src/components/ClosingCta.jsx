import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from './Draft'

/**
 * The closing call to action, on every page but /contact.
 *
 * The last thing on the page and the one section that has to convert, so it
 * carries weight the other bands do not: the brand gold on the primary action
 * — the only gold button on the site.
 *
 * Two routes out. The form for people who want to describe a requirement, and
 * a direct mailto for people who would rather just write. The mail button only
 * renders once `contact.email` is filled in — a dead "Email us" button is
 * worse than no button.
 *
 * The phone / email / location strip that used to sit under the note came out
 * on 2026-09-09. /contact carries the same details, and the footer repeats
 * them on every page.
 */
export default function ClosingCta() {
  const { contact, draft } = useCopy()

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
          <Link className="btn btn--gold btn--lg" to="/contact">
            <Draft>{draft.ctaButton}</Draft>
          </Link>
          {contact.email ? (
            <a
              className="btn btn-ghost btn--lg btn--wrap"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          ) : null}
        </p>

        <p className="cta__note">
          <Draft>{draft.ctaNote}</Draft>
        </p>
      </div>
    </section>
  )
}
