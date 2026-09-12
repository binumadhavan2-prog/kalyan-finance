import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from './Draft'
import Missing from './Missing'

/* The direct-contact strip under the buttons. Phone is the one route most
   people reach for first, so it is listed even though the number is missing —
   a visible gap here is a prompt to the client, not a finished design. */

/**
 * The closing call to action, on every page but /contact.
 *
 * The last thing on the page and the one section that has to convert, so it
 * carries weight the other bands do not: the brand gold on the primary action
 * — the only gold button on the site — a hairline that separates it from the
 * stats band above, and the contact details repeated in full underneath.
 *
 * Three routes out on purpose. The form for people who want to describe a
 * requirement, a direct mailto for people who would rather just write, and the
 * raw details for people who will pick up the phone. The mail button only
 * renders once `contact.email` is filled in — a dead "Email us" button is
 * worse than no button.
 */
export default function ClosingCta() {
  const { contact, draft, ui } = useCopy()

  /* Built here rather than at module load: the labels are language state. */
  const channels = [
    { key: 'phone', label: ui.phone, href: (v) => `tel:${v.replace(/\s/g, '')}` },
    { key: 'location', label: ui.whereWeAre, href: null },
  ]
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
        </p>

        <p className="cta__note">
          <Draft>{draft.ctaNote}</Draft>
        </p>

        <ul className="cta__channels" role="list">
          {channels.map(({ key, label, href }) => {
            const value = contact[key]
            return (
              <li className="cta__channel" key={key}>
                <span className="cta__channel-label">{label}</span>
                <span className="cta__channel-value">
                  {value ? (
                    href ? (
                      <a href={href(value)}>{value}</a>
                    ) : (
                      value
                    )
                  ) : (
                    <Missing />
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
