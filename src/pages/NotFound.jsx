import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from '../components/Draft'

/*
 * On --page like every other route. This was the last section--dark page
 * opening on the site once About, Why Kalyan Finance, Contact and Loan Products
 * moved off it, and the deeper ground made a 404 read as a different site
 * rather than as a page of this one.
 *
 * Two ways out and nothing else. The full nav list that used to sit here was
 * repeating the masthead, which is on this page as it is on every other, so it
 * gave a reader a second copy of what they already had rather than a decision.
 * Home first because it is the safe answer when you do not know where you are;
 * Contact second because the other reason to arrive here is a broken link
 * someone sent you, and then a person is what you want.
 *
 * No illustration. The 404 code itself is gone with the eyebrow that carried
 * it: it names a status, not a problem, and the heading already says the thing
 * in words a visitor can act on.
 */
export default function NotFound() {
  const { draft, ui } = useCopy()
  return (
    <section className="section message">
      <div className="shell stack-lg">
        <div className="stack prose">
          <h1 className="heading">
            <Draft>{draft.notFoundTitle}</Draft>
          </h1>
          <p className="lede">
            <Draft>{draft.notFoundBody}</Draft>
          </p>
        </div>

        <p className="message__actions">
          <Link className="btn" to="/">
            {ui.backToHome}
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            {ui.pageContact}
          </Link>
        </p>
      </div>
    </section>
  )
}
