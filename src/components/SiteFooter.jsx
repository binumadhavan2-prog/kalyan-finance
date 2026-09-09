import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import { useSamePageTop } from '../useSamePageTop'
import Wordmark from './Wordmark'
import Missing from './Missing'
import InstagramIcon from './InstagramIcon'

export default function SiteFooter() {
  const { company, contact, navLinks, ui } = useCopy()
  /* The footer is the bottom of the page, so a link here to the page already
     open is the one most likely to be clicked from a long way down it. */
  const toTop = useSamePageTop()
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__col">
            {/* The same lockup the masthead uses — mark, name, accent tagline
                stacked under it. Not aria-hidden here, unlike the masthead's:
                that one is suppressed so the home link reads as just the
                company name, which leaves this as the one place the tagline
                is actually announced. */}
            <span className="wordmark">
              <Wordmark />
              <span className="wordmark__lockup">
                <span className="wordmark__name">{company.name}</span>
                <span className="wordmark__tagline">{company.tagline}</span>
              </span>
            </span>
          </div>

          <div className="footer__col">
            <h2>{ui.discover}</h2>
            <ul className="footer__links" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} onClick={() => toTop(to)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>{ui.contact}</h2>
            <ul className="footer__links" role="list">
              <li>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                ) : (
                  <Missing>Email not supplied</Missing>
                )}
              </li>
              <li>
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                ) : (
                  <Missing>Phone not supplied</Missing>
                )}
              </li>
              <li>
                {contact.instagram ? (
                  <a
                    className="social"
                    href={contact.instagram}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <InstagramIcon />
                    {contact.instagramHandle ?? ui.instagram}
                  </a>
                ) : (
                  <Missing>Instagram not supplied</Missing>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <small>
            &copy; {new Date().getFullYear()} {company.name}
          </small>
        </div>
      </div>
    </footer>
  )
}
