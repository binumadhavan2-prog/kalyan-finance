import { Link } from 'react-router-dom'
import { draft, productDetail, services } from '../content'
import Draft from '../components/Draft'
import Missing from '../components/Missing'
import PageHeader from '../components/PageHeader'
import ServiceIcon from '../components/ServiceIcons'
import StepList from '../components/StepList'
import IndicativeExamples from '../components/IndicativeExamples'
import ClosingCta from '../components/ClosingCta'

function Term({ label, value }) {
  return (
    <div className="terms__row">
      <dt className="terms__label">{label}</dt>
      <dd className="terms__value">{value}</dd>
    </div>
  )
}

/** True once any term of the product has been supplied. */
function hasTerms(detail) {
  return Boolean(
    detail.amount ||
      detail.tenure ||
      detail.eligibility?.length ||
      detail.documents?.length,
  )
}

function List({ items }) {
  return (
    <ul className="plain" role="list">
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}

export default function LoanProducts() {
  /* Until any product has terms, the right-hand column would repeat the same
     "not published" note five times. Say it once and let the products read as
     a clean list; the two-column form returns as soon as terms are supplied. */
  const anyTerms = services.some((service) => hasTerms(productDetail[service.id] ?? {}))

  return (
    <>
      <PageHeader
        eyebrow="Loan products"
        title={draft.productsTitle}
        lede={draft.productsLede}
      />

      {/* Five products is enough that a reader arriving for one of them should
          not have to scroll the other four to find it. */}
      <section className="section section--tight">
        <div className="shell stack">
          <p className="eyebrow">Jump to</p>
          <ul className="taglist" role="list">
            {services.map((service) => (
              <li key={service.id}>
                <a className="tag tag--link" href={`#${service.id}`}>
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell stack-lg">
          {anyTerms ? null : (
            <div className="panel">
              <Missing>Terms not published yet</Missing>
              <p className="lede">
                <Draft>{draft.termsPending}</Draft>
              </p>
            </div>
          )}

          {services.map((service) => {
            const detail = productDetail[service.id] ?? {}
            return (
              <article
                className={anyTerms ? 'product' : 'product product--brief'}
                key={service.id}
                id={service.id}
              >
                <div className="product__head">
                  <ServiceIcon name={service.icon} />
                  <h2 className="product__title">{service.title}</h2>
                  <p className="lede">
                    <Draft>{draft.productBlurbs[service.id]}</Draft>
                  </p>
                  <p>
                    <Link className="btn btn-ghost btn--sm" to="/contact">
                      Enquire about this
                    </Link>
                  </p>
                </div>

                {hasTerms(detail) ? (
                  <dl className="terms">
                    <Term label="Amount" value={detail.amount ?? <Missing />} />
                    <Term label="Tenure" value={detail.tenure ?? <Missing />} />
                    <Term
                      label="Eligibility"
                      value={
                        detail.eligibility?.length ? (
                          <List items={detail.eligibility} />
                        ) : (
                          <Missing />
                        )
                      }
                    />
                    <Term
                      label="Documents"
                      value={
                        detail.documents?.length ? (
                          <List items={detail.documents} />
                        ) : (
                          <Missing />
                        )
                      }
                    />
                  </dl>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="section section--raised section--tight">
        <div className="shell split">
          <div className="stack">
            <p className="eyebrow">Eligibility</p>
            <h2 className="heading">
              <Draft>{draft.eligibilityTitle}</Draft>
            </h2>
          </div>
          <div className="stack">
            <p className="lede">
              <Draft>{draft.eligibilityLede}</Draft>
            </p>
            <div className="panel">
              <Missing>Criteria not supplied yet</Missing>
            </div>
          </div>
        </div>
      </section>

      {/* Between eligibility and how to apply: what is offered, who it is for,
          what it looks like in practice, then what to do about it. */}
      <IndicativeExamples />

      <section className="section">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Applying</p>
            <h2 className="heading">
              <Draft>{draft.howToApplyTitle}</Draft>
            </h2>
          </div>
          <StepList items={draft.applySteps} />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
