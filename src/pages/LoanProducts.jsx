import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
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
  const { draft, productDetail, services, ui } = useCopy()
  /* Until any product has terms, the right-hand column would repeat the same
     "not published" note five times. Say it once and let the products read as
     a clean list; the two-column form returns as soon as terms are supplied. */
  const anyTerms = services.some((service) => hasTerms(productDetail[service.id] ?? {}))

  return (
    <>
      {/* No eyebrow: draft.productsTitle is itself 'Loan products', so passing
          one printed the same two words twice, once in caps above the h1 that
          already said them. Contact had the same duplication and lost it too.

          Same backdrop as About, Why Kalyan Finance and Contact. This page used
          to carry /loan-products-header.png, the bright original of the same
          artwork, which left it the one inner page on a different asset — and a
          much lighter one, under a scrim measured against the darker file. */}
      <PageHeader
        title={draft.productsTitle}
        lede={draft.productsLede}
        image="/page-header.webp"
        fill
      >
        {/* The standing note about terms, in the banner rather than at the top
            of the list below it. It qualifies every product on the page, so it
            belongs with the page's own heading and not above the first entry,
            where it read as a note about that entry. */}
        {anyTerms ? null : (
          <>
            <Missing>Terms not published yet</Missing>
            <p className="page-head__note">
              <Draft>{draft.termsPending}</Draft>
            </p>
          </>
        )}
      </PageHeader>

      <section className="section section--tight">
        <div className="shell stack-lg">
          {services.map((service) => {
            const detail = productDetail[service.id] ?? {}
            return (
              <article
                className={
                  (anyTerms ? 'product' : 'product product--brief') +
                  (service.image ? ' product--media' : '') +
                  (service.image?.wide ? ' product--wide' : '')
                }
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
                      {ui.enquireAboutThis}
                    </Link>
                  </p>
                </div>

                {/* alt="" where the picture only illustrates: it says nothing
                    the title and blurb do not, and narrating a stock photo
                    helps nobody. Art with its own type in it carries wording
                    that exists nowhere else on the page, so it supplies `alt`
                    and gets described. */}
                {service.image ? (
                  <img
                    className={
                      'product__image' +
                      (service.image.wide ? ' product__image--wide' : '')
                    }
                    src={service.image.src}
                    alt={service.image.alt ?? ''}
                    loading="lazy"
                    width={service.image.width}
                    height={service.image.height}
                  />
                ) : null}

                {hasTerms(detail) ? (
                  <dl className="terms">
                    <Term label={ui.amount} value={detail.amount ?? <Missing />} />
                    <Term label={ui.tenure} value={detail.tenure ?? <Missing />} />
                    <Term
                      label={ui.eligibility}
                      value={
                        detail.eligibility?.length ? (
                          <List items={detail.eligibility} />
                        ) : (
                          <Missing />
                        )
                      }
                    />
                    <Term
                      label={ui.documents}
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

      {/* Back on .split now that the heading is back: the grid exists to stand
          the heading in its own column beside the copy, which is also where the
          copy gets its measure from, so .prose comes off with it. */}
      <section className="section section--raised section--tight">
        <div className="shell split">
          <div className="stack">
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

      {/* The steps stand alone now. .stack-lg went with the heading it was
          spacing away from them — one child has nothing to be spaced from. */}
      <section className="section">
        <div className="shell">
          <StepList items={draft.applySteps} />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
