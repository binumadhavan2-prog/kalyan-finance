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
  const { company, draft, ui, vision } = useCopy()
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

      {/* Put numbers to it, then straight into the values. */}
      <RepaymentCalculator />

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
