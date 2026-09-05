/**
 * Stands in for a fact the client has not supplied. Deliberately visible: a
 * blank space reads as finished, and on a finance site a plausible-looking
 * invented value is worse than an obvious gap.
 */
export default function Missing({ children = 'Not supplied yet' }) {
  return <span className="todo">{children}</span>
}
