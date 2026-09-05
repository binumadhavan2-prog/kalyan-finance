import { draft, indicativeExamples, services } from '../content'
import Draft from './Draft'
import Missing from './Missing'

/** The rows of one example, in the order they read best. */
const rows = [
  { key: 'amount', label: 'Amount' },
  { key: 'tenure', label: 'Tenure' },
  { key: 'repayment', label: 'Repayment' },
]

/**
 * Worked examples for the loan products page.
 *
 * Marked twice over, on purpose. A standing notice heads the section, and
 * every individual example carries its own Illustrative chip — because an
 * example can be screenshotted, linked to or scrolled past the notice, and on
 * a lender's site a figure with no qualifier attached reads as an offer.
 *
 * `indicativeExamples` is empty until the client supplies figures, and this
 * renders the gap plainly rather than filling it. See the note on that export:
 * an illustrative number is still a number a visitor anchors on.
 */
export default function IndicativeExamples() {
  const withExamples = services.filter(
    (service) => indicativeExamples[service.id]?.length,
  )

  return (
    <section className="section section--tight" id="indicative-examples">
      <div className="shell stack-lg">
        <div className="stack prose">
          <p className="eyebrow">Examples</p>
          <h2 className="heading">
            <Draft>{draft.indicativeTitle}</Draft>
          </h2>
          <p className="lede">
            <Draft>{draft.indicativeLede}</Draft>
          </p>
        </div>

        {/* The notice sits above the examples and stays in the flow whether or
            not there are any, so the framing is read before the figures. */}
        <p className="notice notice--illustrative">
          <span className="notice__flag">Illustrative</span>
          <span>
            <Draft>{draft.indicativeNotice}</Draft>
          </span>
        </p>

        {withExamples.length ? (
          withExamples.map((service) => (
            <div className="stack" key={service.id}>
              <h3 className="product__title">{service.title}</h3>
              <ul className="example-grid" role="list">
                {indicativeExamples[service.id].map((example) => (
                  <li className="example" key={example.id}>
                    <p className="example__flag">Illustrative example</p>
                    {example.scenario ? (
                      <p className="example__scenario">{example.scenario}</p>
                    ) : null}
                    <dl className="terms">
                      {rows.map(({ key, label }) =>
                        example[key] ? (
                          <div className="terms__row" key={key}>
                            <dt className="terms__label">{label}</dt>
                            <dd className="terms__value">{example[key]}</dd>
                          </div>
                        ) : null,
                      )}
                    </dl>
                    {example.note ? (
                      <p className="example__note">{example.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="panel">
            <Missing>Example figures not supplied yet</Missing>
            <p className="lede">
              <Draft>{draft.indicativePending}</Draft>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
