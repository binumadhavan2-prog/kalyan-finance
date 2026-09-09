import { Link } from 'react-router-dom'
import { useCopy } from '../i18n'
import Draft from '../components/Draft'
import CoreValues from '../components/CoreValues'
import StepList from '../components/StepList'
import Stats from '../components/Stats'
import Recognition from '../components/Recognition'
import ClosingCta from '../components/ClosingCta'
import HeroVideo from '../components/HeroVideo'
import ScrollProgress from '../components/ScrollProgress'
import RepaymentCalculator from '../components/RepaymentCalculator'

export default function Home() {
  const { company, draft, ui, vision, whyPoints } = useCopy()
  return (
    <>
      <ScrollProgress />

      <section className="section hero">
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

      {/* Straight from the hero into the numbers. The products preview that
          used to sit here came out on 2026-09-09; /loan-products carries the
          five products in full, and the hero already links to it. */}
      <RepaymentCalculator />

      {/* A short read of /why-us: the supplied reasons and a way through to
          the full page, which carries the process and trust sections too.

          Raised rather than plain, because the calculator above it is on
          --page, and two plain sections in a row lose the alternation the
          page rhythm runs on. */}
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
