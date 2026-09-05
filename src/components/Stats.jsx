import { draft, stats } from '../content'
import Draft from './Draft'
import Missing from './Missing'

export default function Stats() {
  return (
    <section className="section section--raised">
      <div className="shell stack-lg">
        <p className="eyebrow">
          <Draft>{draft.statsTitle}</Draft>
        </p>
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
