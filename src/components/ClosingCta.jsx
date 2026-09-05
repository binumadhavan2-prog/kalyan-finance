import { Link } from 'react-router-dom'
import { contact, draft } from '../content'
import Draft from './Draft'
import Missing from './Missing'

/* The direct-contact strip under the buttons. Phone is the one route most
   people reach for first, so it is listed even though the number is missing —
   a visible gap here is a prompt to the client, not a finished design. */
const channels = [
  { key: 'phone', label: 'Phone', href: (v) => `tel:${v.replace(/\s/g, '')}` },
  { key: 'email', label: 'Email', href: (v) => `mailto:${v}` },
  { key: 'location', label: 'Where we are', href: null },
]

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
  return (
    <section className="section section--dark cta-band">
      <div className="shell cta">
        <p className="eyebrow cta__eyebrow">Contact</p>
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
