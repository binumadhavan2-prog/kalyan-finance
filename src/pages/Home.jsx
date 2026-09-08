import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from '../components/Draft'
import ScrollStack from '../components/ScrollStack'
import CoreValues from '../components/CoreValues'
import StepList from '../components/StepList'
import Stats from '../components/Stats'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'
import HeroVideo from '../components/HeroVideo'
import ScrollProgress from '../components/ScrollProgress'
import RepaymentCalculator from '../components/RepaymentCalculator'

export default function Home() {
  const { company, draft, services, ui, vision, whyPoints } = useCopy()
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
                {ui.getInTouch}
              </Link>
              <Link className="btn btn-ghost" to="/loan-products">
                {ui.pageProducts}
              </Link>
            </p>
          </div>

          <HeroVideo />
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell stack-lg">
          <div className="stack prose">
            <h2 className="heading">
              <Draft>{draft.productPreviewTitle}</Draft>
            </h2>
          </div>

          {/* The five products as a pinned stack rather than a three-up grid.
              Same content and the same art each product carries on
              /loan-products; only the way they arrive has changed. */}
          <ScrollStack items={services} />

          <p>
            <Link className="btn btn-ghost" to="/loan-products">
              {ui.seeEligibility}
            </Link>
          </p>
        </div>
      </section>

      {/* After the products and before the reasons: someone who has just seen
          what is offered can put numbers to it, then read why us. */}
      <RepaymentCalculator />

      {/* A short read of /why-us: the supplied reasons and a way through to
          the full page, which carries the process and trust sections too.

          Raised rather than plain, because the products band above it and the
          recognition band below are both on --page, and three plain sections
          in a row lose the alternation the page rhythm runs on. */}
      <section className="section section--raised">
        <div className="shell stack-lg">
          {/* Heading only. The lede under it (draft.whyLede) came out on
              2026-09-08: the supplied rows below say what differs, and a
              drafted line promising that they do was a sentence about the
              list rather than part of it. /why-us still opens with it, where
              it is the page's own lede and has nothing under it repeating
              the point. */}
          <div className="stack prose">
            <h2 className="heading">
              <Draft>{draft.whyTitle}</Draft>
            </h2>
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
              {ui.howWeWork}
            </Link>
          </p>
        </div>
      </section>

      <CoreValues />

      {/* The process, as /why-us carries it. Raised rather than plain: it sits
          between the dark core values band and the plain recognition band, and
          plain would run straight into the latter. */}
      <section className="section section--raised">
        <div className="shell stack-lg">
          <div className="stack prose">
            <p className="eyebrow">{ui.process}</p>
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
