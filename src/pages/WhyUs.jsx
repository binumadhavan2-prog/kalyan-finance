import { company, draft, founder } from '../content'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import StepList from '../components/StepList'
import Stats from '../components/Stats'
import ClosingCta from '../components/ClosingCta'

export default function WhyUs() {
  return (
    <>
      <PageHeader
        eyebrow="Why Kalyan Finance"
        title={draft.whyTitle}
        lede={draft.whyLede}
      />

      <section className="section">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Differentiators</p>
            <h2 className="heading">
              <Draft>{draft.differentiatorsTitle}</Draft>
            </h2>
          </div>
          {/* Two-up: four cards in the three-column grid left two dead cells,
              one of them showing the grid gap as a grey block. */}
          <ul className="grid grid--pair" role="list">
            {draft.differentiators.map((item) => (
              <li className="card card--text" key={item.id}>
                <h3 className="card__title card__title--top">
                  <Draft>{item.title}</Draft>
                </h3>
                <p className="lede">
                  <Draft>{item.body}</Draft>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Process</p>
            <h2 className="heading">
              <Draft>{draft.processTitle}</Draft>
            </h2>
          </div>
          <StepList items={draft.steps} />
        </div>
      </section>

      <section className="section">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">Trust</p>
            <h2 className="heading">
              <Draft>{draft.trustTitle}</Draft>
            </h2>
            <p className="lede">
              <Draft>{draft.trustLede}</Draft>
            </p>
          </div>

          <div className="stack-lg">
            {/* The checkable facts we actually have. */}
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

            <div className="panel">
              <Missing>Registration and regulatory details not supplied</Missing>
              <p className="lede">
                <Draft>{draft.trustPending}</Draft>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <ClosingCta />
    </>
  )
}
