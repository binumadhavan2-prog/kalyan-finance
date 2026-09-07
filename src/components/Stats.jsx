import { useCopy } from '../i18n'
import Draft from './Draft'
import Missing from './Missing'

/**
 * `labelled` is true by default: on the home page this eyebrow is the only
 * thing naming the band. /why-us passes false, where the page has had its
 * section labels taken off.
 */
export default function Stats({ labelled = true }) {
  const { draft, stats } = useCopy()
  return (
    <section className="section section--raised">
      <div className="shell stack-lg">
        {labelled ? (
          <p className="eyebrow">
            <Draft>{draft.statsTitle}</Draft>
          </p>
        ) : null}
        <dl className="stats">
          {/* dt precedes dd for valid markup; the pair is flipped visually. */}
          {stats.map((stat) => (
            <div className="stat" key={stat.id}>
              <dt className="stat__label">{stat.label}</dt>
              <dd className="stat__value">{stat.value ?? <Missing />}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
