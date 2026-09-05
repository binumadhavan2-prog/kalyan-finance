import { Link } from 'react-router-dom'
import { company, draft, services, vision } from '../content'
import Draft from '../components/Draft'
import ServiceIcon from '../components/ServiceIcons'
import CoreValues from '../components/CoreValues'
import Stats from '../components/Stats'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'
import HeroVideo from '../components/HeroVideo'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <section className="section section--dark hero hero--video">
        <HeroVideo />

        <div className="shell hero__grid">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">{company.name}</p>
              <h1 className="display display--statement">{vision}</h1>
              <p className="lede hero__lede">
                <Draft>{draft.heroLede}</Draft>
              </p>
            </div>
            <p className="hero__actions">
              <Link className="btn" to="/contact">
                Get in touch
              </Link>
              <Link className="btn btn-ghost" to="/loan-products">
                Loan products
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Products</p>
            <h2 className="heading">
              <Draft>{draft.productPreviewTitle}</Draft>
            </h2>
            <p className="lede">
              <Draft>{draft.productPreviewLede}</Draft>
            </p>
          </div>

          <ul className="grid" role="list">
            {services.map((service) => (
              <li className="card" key={service.id}>
                <ServiceIcon name={service.icon} />
                <h3 className="card__title">{service.title}</h3>
              </li>
            ))}
          </ul>

          <p>
            <Link className="btn btn-ghost" to="/loan-products">
              See eligibility and how to apply
            </Link>
          </p>
        </div>
      </section>

      <CoreValues />

      <Recognition />
      <Stats />
      <ClosingCta />
    </>
  )
}
