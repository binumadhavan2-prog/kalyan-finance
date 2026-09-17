import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { COPY, useCopy, useLanguage } from '../i18n'
import { useSamePageTop } from '../useSamePageTop'
import Wordmark from './Wordmark'
import LanguageToggle from './LanguageToggle'

export default function SiteHeader() {
  const { company, navLinks, ui } = useCopy()
  const [lang] = useLanguage()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  /* The masthead is sticky, so every one of these links is there to be clicked
     at any scroll depth — including the one naming the page already open. */
  const toTop = useSamePageTop()

  return (
    <header className="masthead">
      <div className="shell masthead__inner">
        <Link
          className="wordmark"
          to="/"
          onClick={() => {
            close()
            toTop('/')
          }}
        >
          <Wordmark />
          {/* Name and tagline stack into one lockup beside the mark. The
              tagline is aria-hidden so the link keeps "Kalyan Finance" as its
              accessible name — it is a repeat of the footer's, and reading it
              out on every page's first link is noise. */}
          <span className="wordmark__lockup">
            <span className="wordmark__name">{company.name}</span>
            <span className="wordmark__tagline" aria-hidden="true">
              {company.tagline}
            </span>
          </span>
        </Link>

        <nav className="masthead__nav" aria-label={ui.navPrimary}>
          <ul className="navlist" role="list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} onClick={() => toTop(to)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageToggle className="lang-link" />

        <Link
          className="btn btn--sm masthead__cta"
          to="/contact"
          onClick={() => {
            close()
            toTop('/contact')
          }}
        >
          {/* Both languages' wording reserves the button's width, so the CTA
              keeps one size across a switch and does not drag the toggle beside
              it. Only the active-language label shows; the other holds its
              width. aria-hidden because the visible label is enough. */}
          <span className="swap">
            <span
              className="swap__opt"
              lang="en"
              aria-hidden={lang !== 'en'}
              data-active={lang === 'en'}
            >
              {COPY.en.ui.getInTouch}
            </span>
            <span
              className="swap__opt"
              lang="ta"
              aria-hidden={lang !== 'ta'}
              data-active={lang === 'ta'}
            >
              {COPY.ta.ui.getInTouch}
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? ui.close : ui.menu}
        </button>
      </div>

      {/* Closed on link click rather than on route change: navigating to the
          current route fires no location change, and the panel would stick. */}
      <div className="mobile-nav" id="mobile-nav" hidden={!open}>
        <nav className="shell" aria-label={ui.navPrimaryMobile}>
          <ul className="mobile-nav__list" role="list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => {
                    close()
                    toTop(to)
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Under a rule rather than as a sixth item in the list: it leaves
              the site, and it is not a page. */}
          <p className="mobile-nav__foot">
            <LanguageToggle className="lang-link" onClick={close} />
          </p>
        </nav>
      </div>
    </header>
  )
}
