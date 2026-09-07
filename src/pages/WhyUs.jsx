import { useCopy } from '../i18n'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import ParallaxPills from '../components/ParallaxPills'
import StepList from '../components/StepList'
import Stats from '../components/Stats'
import ClosingCta from '../components/ClosingCta'

export default function WhyUs() {
  const { company, draft, founder, ui, whyPoints } = useCopy()
  return (
    <>
      {/* No eyebrow: draft.whyTitle is itself 'Why Kalyan Finance', so it was
          the same three words twice, in caps above the h1 that already said
          them. Same duplication About, Contact and Loan Products all had. */}
      <PageHeader
        title={draft.whyTitle}
        lede={draft.whyLede}
        image="/page-header.webp"
      />

      <section className="section">
        <div className="shell stack-lg">
          <div className="stack prose">
            <h2 className="heading">
              <Draft>{draft.differentiatorsTitle}</Draft>
            </h2>
          </div>
          {/* Supplied as terms with nothing under them. The core values take
              the divided-row treatment for the same reason; these get the
              pills instead, so the two bands of bare terms do not read as the
              same list printed twice on different pages. */}
          <ParallaxPills items={whyPoints} />
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell stack-lg">
          <div className="stack prose">
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
              <Missing>Registration and regulatory details not supplied</Missing>
              <p className="lede">
                <Draft>{draft.trustPending}</Draft>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* labelled={false} rather than deleting the eyebrow from Stats: that
          component also renders on the home page, where 'By the numbers' is the
          only thing naming the band. */}
      <Stats labelled={false} />
      <ClosingCta />
    </>
  )
}
