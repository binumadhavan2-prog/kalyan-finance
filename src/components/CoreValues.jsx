import { coreValues } from '../content'

/**
 * The five core values from the company profile, as supplied.
 *
 * Terms only, with no explanation under each: the client gave the words and
 * nothing else, and the drafted values this replaced were invented to fill
 * the band. Nothing here is underlined — it is approved copy.
 */
export default function CoreValues() {
  return (
    <section className="section section--dark">
      <div className="shell split">
        <div className="stack">
          <h2 className="heading">Core Values</h2>
        </div>
        <ul className="valuelist" role="list">
          {coreValues.map((value) => (
            <li className="valuelist__item" key={value}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
