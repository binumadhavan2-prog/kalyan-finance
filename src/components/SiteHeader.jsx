import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { company } from '../content'
import { navLinks } from '../nav'
import Wordmark from './Wordmark'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="masthead">
      <div className="shell masthead__inner">
        <Link className="wordmark" to="/" onClick={close}>
          <Wordmark />
          {company.name}
        </Link>

        <nav className="masthead__nav" aria-label="Primary">
          <ul className="navlist" role="list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn btn--sm masthead__cta" to="/contact" onClick={close}>
          Get in touch
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Closed on link click rather than on route change: navigating to the
          current route fires no location change, and the panel would stick. */}
      <div className="mobile-nav" id="mobile-nav" hidden={!open}>
        <nav className="shell" aria-label="Primary, mobile">
          <ul className="mobile-nav__list" role="list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} onClick={close}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
