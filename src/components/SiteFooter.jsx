import { Link } from 'react-router-dom'
import { company, contact } from '../content'
import Wordmark from './Wordmark'
import Missing from './Missing'
import { navLinks } from '../nav'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__col">
            <span className="wordmark">
              <Wordmark />
              {company.name}
            </span>
            <p className="footer__tagline">{company.tagline}</p>
          </div>

          <div className="footer__col">
            <h2>Discover</h2>
            <ul className="footer__links" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>Contact</h2>
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
                  <a href={contact.instagram} rel="noreferrer noopener" target="_blank">
                    {contact.instagramHandle ?? 'Instagram'}
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
