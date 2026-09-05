import Draft from './Draft'

/**
 * Numbered rows, used for both the process flow and the how-to-apply flow.
 * `ordered` renders an <ol>; the values list on the home page is not a sequence
 * and passes false.
 */
export default function StepList({ items, ordered = true }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="steps" role="list">
      {items.map((item, i) => (
        <li className="step" key={item.id}>
          <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="step__title">
            <Draft>{item.title}</Draft>
          </h3>
          <p className="lede">
            <Draft>{item.body}</Draft>
          </p>
        </li>
      ))}
    </Tag>
  )
}
