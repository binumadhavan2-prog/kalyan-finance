import { Component } from 'react'
import { Link } from 'react-router-dom'
import { draft } from '../content'
import Draft from './Draft'

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

    return (
      <section className="section section--dark message">
        <div className="shell stack">
          <p className="eyebrow">Error</p>
          <h1 className="heading">
            <Draft>{draft.errorTitle}</Draft>
          </h1>
          <p className="lede">
            <Draft>{draft.errorBody}</Draft>
          </p>
          <p className="hero__actions">
            <button className="btn" type="button" onClick={() => window.location.reload()}>
              Reload the page
            </button>
            <Link className="btn btn-ghost" to="/">
              Back to home
            </Link>
          </p>
        </div>
      </section>
    )
  }
}
