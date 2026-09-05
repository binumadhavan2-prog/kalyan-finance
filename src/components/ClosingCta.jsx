import { Link } from 'react-router-dom'
import { draft } from '../content'
import Draft from './Draft'

export default function ClosingCta() {
  return (
    <section className="section section--dark">
      <div className="shell cta">
        <h2 className="heading">
          <Draft>{draft.ctaTitle}</Draft>
        </h2>
        <p className="lede">
          <Draft>{draft.ctaBody}</Draft>
        </p>
        <Link className="btn" to="/contact">
          <Draft>{draft.ctaButton}</Draft>
        </Link>
      </div>
    </section>
  )
}
