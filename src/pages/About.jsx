import { Link } from 'react-router-dom'
import { fill, useCopy } from '../i18n'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import CoreValues from '../components/CoreValues'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'

export default function About() {
  const { about, company, draft, founder, mission, services, ui, vision } = useCopy()
  return (
    <>
      {/* No eyebrow: "About us" above an h1 reading "About Kalyan Finance" is
          the same label twice, the second time with the company's name in it. */}
      <PageHeader
        title={about.title}
        lede={about.body}
        drafted={false}
        image="/page-header.webp"
        fill
      />

      {/* The story, first thing after the intro. The heading is the founding
          year straight out of `company` rather than drafted wording, and the
          rows beside it are the four facts we actually hold. Nobody has written
          us a history, so that shows as a gap instead of invented narrative.

          This replaces the old "At a glance" band: same facts, but framed as
          the story the page was missing rather than as a spec sheet. */}
      <section className="section section--tight">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">{ui.ourStory}</p>
            <h2 className="heading">{fill(ui.foundedIn, { year: company.established })}</h2>
          </div>
          <div className="stack-lg">
            <dl className="details">
              <div className="details__row">
                <dt className="details__label">{ui.established}</dt>
                <dd className="details__value">{company.established}</dd>
              </div>
              <div className="details__row">
                <dt className="details__label">{ui.businessType}</dt>
                <dd className="details__value">{company.type}</dd>
              </div>
              <div className="details__row">
                <dt className="details__label">{ui.location}</dt>
                <dd className="details__value">{company.location}</dd>
              </div>
              <div className="details__row">
                <dt className="details__label">{ui.founder}</dt>
                <dd className="details__value">{founder.name}</dd>
              </div>
            </dl>

            <div className="panel">
              <Missing>Company history not supplied</Missing>
              <p className="lede">
                <Draft>{draft.storyPending}</Draft>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and tagline are both client-approved, so they carry a band of
          their own. The drafted "Our story" section that used to sit here was
          saying the same thing as the approved intro above, in worse words. */}
      <section className="section section--dark section--tight">
        <div className="shell quote">
          <p className="eyebrow">{ui.ourVision}</p>
          <blockquote className="quote__text">{vision}</blockquote>
          <p className="tagline">{company.tagline}</p>
        </div>
      </section>

      {/* The profile gives the mission and the vision as a pair, so they sit
          together here. Its own band rather than a third line in the quote
          above: it is a sentence, not a slogan, and needs the room. */}
      <section className="section section--tight">
        <div className="shell quote">
          <p className="eyebrow">{ui.ourMission}</p>
          <p className="quote__text quote__text--sm">{mission}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell stack-lg">
          {/* draft.founderTitle is itself 'Founder', so the eyebrow that used to
              sit here printed the same word twice in a row. The h2 keeps it. */}
          <div className="stack prose">
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
                  alt={founder.name ?? fill(ui.founderOf, { company: company.name })}
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

      {/* Pulls the approved service names onto the page and gives the section
          somewhere to send people, rather than ending on a full stop. */}
      <section className="section section--raised section--tight">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">{ui.whatWeDo}</p>
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
                {ui.seeAllProducts}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CoreValues />

      <Recognition />

      <ClosingCta />
    </>
  )
}
