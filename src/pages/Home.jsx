import { Link } from 'react-router-dom'
import { company, draft, services, vision, whyPoints } from '../content'
import Draft from '../components/Draft'
import ServiceIcon from '../components/ServiceIcons'
import CoreValues from '../components/CoreValues'
import StepList from '../components/StepList'
import Stats from '../components/Stats'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'
import HeroVideo from '../components/HeroVideo'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <section className="section section--dark hero">
        <div className="shell hero__grid">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow hero__name">{company.name}</p>
              {/* Under the name, the same lockup the masthead carries.
                  Approved copy, so no <Draft> wrapper and no dotted underline. */}
              <p className="hero__tagline">{company.tagline}</p>
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

          <HeroVideo />
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

      {/* A short read of /why-us: the supplied reasons and a way through to
          the full page, which carries the process and trust sections too.

          Raised rather than plain, because the products band above it and the
          recognition band below are both on --page, and three white sections
          in a row lose the alternation the page rhythm runs on. */}
      <section className="section section--raised">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Why us</p>
            <h2 className="heading">
              <Draft>{draft.whyTitle}</Draft>
            </h2>
            <p className="lede">
              <Draft>{draft.whyLede}</Draft>
            </p>
          </div>

          {/* Terms only, as supplied — the same rows /why-us shows. */}
          <ul className="valuelist" role="list">
            {whyPoints.map((point) => (
              <li className="valuelist__item" key={point}>
                {point}
              </li>
            ))}
          </ul>

          <p>
            <Link className="btn btn-ghost" to="/why-us">
              How we work, and what you can check
            </Link>
          </p>
        </div>
      </section>

      <CoreValues />

      {/* The process, as /why-us carries it. Raised rather than plain: it sits
          between the dark core values band and the white recognition band, and
          plain would run straight into the latter. */}
      <section className="section section--raised">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">Process</p>
            <h2 className="heading">
              <Draft>{draft.processTitle}</Draft>
            </h2>
          </div>
          <StepList items={draft.steps} />
        </div>
      </section>

      <Recognition />
      <Stats />
      <ClosingCta />
    </>
  )
}
