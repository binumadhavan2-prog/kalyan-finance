import { useCopy } from '../i18n'

/**
 * The five core values from the company profile, as supplied.
 *
 * Terms only, with no explanation under each: the client gave the words and
 * nothing else, and the drafted values this replaced were invented to fill
 * the band. Nothing here is underlined — it is approved copy.
 */
export default function CoreValues() {
  const { coreValues, ui } = useCopy()
  return (
    <section className="section section--dark">
      <div className="shell split">
        <div className="stack">
          <h2 className="heading">{ui.coreValues}</h2>
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
