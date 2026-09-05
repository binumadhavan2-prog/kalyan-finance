import { contact, draft } from '../content'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import EnquiryForm from '../components/EnquiryForm'

const rows = [
  { key: 'phone', label: 'Phone', href: (v) => `tel:${v.replace(/\s/g, '')}` },
  { key: 'email', label: 'Email', href: (v) => `mailto:${v}` },
  /* Location is the town; address is the full postal one. Only the first is
     known, so they stay separate rows rather than one half-true line. */
  { key: 'location', label: 'Location', href: null },
  { key: 'address', label: 'Address', href: null },
  { key: 'hours', label: 'Hours', href: null },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title={draft.contactTitle}
        lede={draft.contactLede}
      />

      <section className="section">
        <div className="shell split">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">Details</p>
              <dl className="details">
                {rows.map(({ key, label, href }) => {
                  const value = contact[key]
                  return (
                    <div className="details__row" key={key}>
                      <dt className="details__label">{label}</dt>
                      <dd className="details__value">
                        {value ? (
                          href ? (
                            <a href={href(value)}>{value}</a>
                          ) : (
                            value
                          )
                        ) : (
                          <Missing />
                        )}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>

            <div className="stack">
              <p className="eyebrow">
                <Draft>{draft.followTitle}</Draft>
              </p>
              {contact.instagram ? (
                <a
                  className="btn btn-ghost"
                  href={contact.instagram}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Instagram
                </a>
              ) : (
                <p>
                  <Missing>Instagram profile not supplied</Missing>
                </p>
              )}
            </div>
          </div>

          <div className="stack">
            <p className="eyebrow">
              <Draft>{draft.formTitle}</Draft>
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="shell stack">
          <p className="eyebrow">
            <Draft>{draft.locationTitle}</Draft>
          </p>
          {contact.mapUrl ? (
            <iframe
              className="map"
              src={contact.mapUrl}
              title="Office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="map map--empty">
              <Missing>Location not supplied</Missing>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
