import { Link } from 'react-router-dom'
import { about, company, draft, founder, mission, services, vision } from '../content'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import CoreValues from '../components/CoreValues'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={about.title}
        lede={about.body}
        drafted={false}
      />

      {/* Vision and tagline are both client-approved, so they carry a band of
          their own. The drafted "Our story" section that used to sit here was
          saying the same thing as the approved intro above, in worse words. */}
      <section className="section section--dark section--tight">
        <div className="shell quote">
          <p className="eyebrow">Our vision</p>
          <blockquote className="quote__text">{vision}</blockquote>
          <p className="tagline">{company.tagline}</p>
        </div>
      </section>

      {/* The profile gives the mission and the vision as a pair, so they sit
          together here. Its own band rather than a third line in the quote
          above: it is a sentence, not a slogan, and needs the room. */}
      <section className="section section--tight">
        <div className="shell quote">
          <p className="eyebrow">Our mission</p>
          <p className="quote__text quote__text--sm">{mission}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Founder</p>
            <h2 className="heading">
              <Draft>{draft.founderTitle}</Draft>
            </h2>
          </div>

          <div className="person-card">
            <div className="person__portrait">
              {founder.photo ? (
                /* Falls back to the role rather than an empty alt: a portrait
                   with no text alternative tells a screen reader nothing. */
                <img
                  src={founder.photo}
                  alt={founder.name ?? `Founder of ${company.name}`}
                  width="427"
                  height="533"
                />
              ) : (
                <Missing>Photo not supplied</Missing>
              )}
            </div>
            <div className="stack">
              <p className="person__name">
                {founder.name ?? <Missing>Name not supplied</Missing>}
              </p>
              <p className="person__role">
                {founder.role ?? <Missing>Role not supplied</Missing>}
              </p>
              <p className="lede">
                {founder.bio ?? <Missing>Biography not supplied</Missing>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">At a glance</p>
          </div>
          <dl className="details">
            <div className="details__row">
              <dt className="details__label">Established</dt>
              <dd className="details__value">{company.established}</dd>
            </div>
            <div className="details__row">
              <dt className="details__label">Business type</dt>
              <dd className="details__value">{company.type}</dd>
            </div>
            <div className="details__row">
              <dt className="details__label">Location</dt>
              <dd className="details__value">{company.location}</dd>
            </div>
            <div className="details__row">
              <dt className="details__label">Founder</dt>
              <dd className="details__value">{founder.name}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Pulls the approved service names onto the page and gives the section
          somewhere to send people, rather than ending on a full stop. */}
      <section className="section section--raised section--tight">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">What we do</p>
          </div>
          <div className="stack">
            <ul className="taglist" role="list">
              {services.map((service) => (
                <li className="tag" key={service.id}>
                  {service.title}
                </li>
              ))}
            </ul>
            <p>
              <Link className="btn btn-ghost" to="/loan-products">
                See all loan products
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Recognition />

      <CoreValues />

      <ClosingCta />
    </>
  )
}
