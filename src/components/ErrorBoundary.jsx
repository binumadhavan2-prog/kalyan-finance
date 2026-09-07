import { Component } from 'react'
import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from './Draft'

/**
 * The screen the boundary falls back to.
 *
 * Split out of the class because hooks cannot be called from one, and useCopy
 * is how the page gets its language now. It is safe to reach for the language
 * here even though something below has just crashed: useCopy falls back to the
 * English tree when there is no provider above it rather than throwing, so the
 * worst case is an English error page, not a second failure inside the handler
 * for the first.
 */
function ErrorScreen() {
  const { draft, ui } = useCopy()

  return (
    <section className="section section--dark message">
      <div className="shell stack">
        <p className="eyebrow">{ui.error}</p>
        <h1 className="heading">
          <Draft>{draft.errorTitle}</Draft>
        </h1>
        <p className="lede">
          <Draft>{draft.errorBody}</Draft>
        </p>
        <p className="hero__actions">
          <button className="btn" type="button" onClick={() => window.location.reload()}>
            {ui.reloadPage}
          </button>
          <Link className="btn btn-ghost" to="/">
            {ui.backToHome}
          </Link>
        </p>
      </div>
    </section>
  )
}

/**
 * Catches render errors anywhere below it so a broken section shows a friendly
 * page instead of the blank white screen React leaves behind.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return <ErrorScreen />
  }
}
