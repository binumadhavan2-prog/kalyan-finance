import { Link } from 'react-router-dom'
import { draft } from '../content'
import Draft from '../components/Draft'
import { navLinks } from '../nav'

export default function NotFound() {
  return (
    <section className="section section--dark message">
      <div className="shell stack-lg">
        <div className="stack">
          <p className="eyebrow">404</p>
          <h1 className="heading">
            <Draft>{draft.notFoundTitle}</Draft>
          </h1>
          <p className="lede">
            <Draft>{draft.notFoundBody}</Draft>
          </p>
        </div>

        <ul className="link-list" role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
