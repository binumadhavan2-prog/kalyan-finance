import { useCopy } from '../i18n'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import EnquiryForm from '../components/EnquiryForm'
import InstagramIcon from '../components/InstagramIcon'


export default function Contact() {
  const { contact, draft, ui } = useCopy()

  /* Both of these read `contact`, which is per-language state now rather
     than a module import, so they are built here instead of at module
     load — where `contact` no longer exists. */
  const rows = [
    { key: 'phone', label: ui.phone, href: (v) => `tel:${v.replace(/\s/g, '')}` },
    { key: 'email', label: ui.email, href: (v) => `mailto:${v}` },
    /* Location is the town; address is the full postal one. Only the first
       is known, so they stay separate rows rather than one half-true line. */
    { key: 'location', label: ui.location, href: null },
    { key: 'address', label: ui.address, href: null },
    { key: 'hours', label: ui.hours, href: null },
  ]

  /*
   * No office address has been supplied, so the map falls back to the town that
   * has been: centred on `contact.location` and captioned as the town, never as
   * "our office" — the pin is Sivagangai, not a building we cannot name. The
   * `?output=embed` form needs no API key and no billing account.
   *
   * `contact.mapUrl` still wins when it is set; drop the real embed in there and
   * this fallback stops being used.
   */
  const townMapUrl = contact.location
    ? `https://www.google.com/maps?q=${encodeURIComponent(contact.location)}&output=embed`
    : null
  return (
    <>
      {/* No eyebrow: draft.contactTitle is itself 'Contact us', so passing one
          printed the same two words twice, once in caps above the h1 that
          already said them. PageHeader renders nothing when it is omitted. */}
      <PageHeader
        title={draft.contactTitle}
        lede={draft.contactLede}
        image="/page-header.webp"
      />

      {/* The way through, before the detail below it. Most people arriving on
          this page want to do one of two things, so both are one tap from the
          top of it. Anything not yet supplied simply does not render — a Call
          button with no number behind it is worse than no button. */}
      <section className="section section--tight">
        <div className="shell contact-actions">
          {contact.phone ? (
            <a className="btn btn--lg" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
              {ui.callUs}
            </a>
          ) : null}
          {contact.email ? (
            <a
              className={`btn btn--lg${contact.phone ? ' btn-ghost' : ''}`}
              href={`mailto:${contact.email}`}
            >
              {ui.emailUs}
            </a>
          ) : null}
          <a className="btn btn-ghost btn--lg" href="#enquiry">
            {ui.sendAnEnquiry}
          </a>
        </div>
      </section>

      <section className="section">
        <div className="shell split">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">{ui.details}</p>
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
                  <InstagramIcon />
                  {contact.instagramHandle ?? ui.instagram}
                </a>
              ) : (
                <p>
                  <Missing>Instagram profile not supplied</Missing>
                </p>
              )}
            </div>
          </div>

          <div className="stack" id="enquiry">
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
          {contact.mapUrl || townMapUrl ? (
            <iframe
              className="map"
              src={contact.mapUrl ?? townMapUrl}
              title={contact.mapUrl ? 'Office location' : contact.location}
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
