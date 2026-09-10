import { useId, useState } from 'react'
import { fill, useCopy } from '../i18n'
import Draft from './Draft'

/**
 * A repayment calculator for the home page.
 *
 * The rate is asked for rather than supplied, and that is the whole design.
 * Kalyan has published no rates — `productDetail` carries no terms and the
 * products page says so plainly — and content.js is explicit that on this site
 * an invented figure is not a placeholder but a false claim. A calculator that
 * shipped with a default rate in the box would be quoting one, and for a
 * lender a quoted repayment reads as an offer.
 *
 * So this does arithmetic on the visitor's own three numbers and asserts
 * nothing. It is a tool for someone who already has a rate in mind, not a
 * price list. When real rates are signed off, a default can be filled in here
 * — deliberately, with the notice reworded to match.
 *
 * Each figure has a slider beside its box (see CalcField). The sliders are an
 * input method, not a set of published limits: they start unset, and the box
 * next to each one still accepts a figure outside the slider's span.
 *
 * The tick marks added on 2026-09-09 put that span on screen as numbers, which
 * is the one thing about them worth watching. A labelled 10K-to-50L scale can
 * be read as a lending range, and Kalyan has published none. What keeps it
 * honest is the Illustrative notice above the tool and the box beside every
 * slider taking figures past either end. If real limits are ever signed off,
 * these are the numbers to set to them.
 */

/* Indian digit grouping, and no paise: the figures run to lakhs, where a
   trailing .00 is noise. */
const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/* Tick labels only. Lakh-and-crore shorthand, so the amount scale reads
   10K / 25L / 50L rather than three figures wide enough to collide. The unit
   is left off here because every calcAmount label already carries the (Rs)
   sign, the same way the rate and term ticks are bare numbers under labels
   that name their units. */
const compact = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 0,
})

/**
 * Standard amortising repayment.
 *
 * P x r x (1+r)^n / ((1+r)^n - 1), with r the monthly rate and n the number of
 * months. A zero rate divides by zero in that formula, so it splits out to the
 * plain division it degenerates to.
 */
function monthlyRepayment(principal, annualRate, months) {
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  const growth = (1 + r) ** months
  return (principal * r * growth) / (growth - 1)
}

const EMPTY = { amount: '', rate: '', years: '' }

/*
 * Slider bounds. These are the span the control sweeps, and nothing more —
 * the number box beside each slider keeps its original open range, so a
 * requirement outside these can still be typed. They are deliberately not a
 * statement about what Kalyan lends: no amount, rate or term has been
 * published, and the notice above the tool says exactly that.
 */
const BOUNDS = {
  amount: {
    min: 10000,
    max: 5000000,
    step: 10000,
    ticks: [10000, 2500000, 5000000],
    tickLabel: (v) => compact.format(v),
  },
  rate: { min: 0, max: 30, step: 0.1, ticks: [0, 15, 30], tickLabel: String },
  years: { min: 1, max: 30, step: 1, ticks: [1, 15, 30], tickLabel: String },
}

/**
 * One figure, entered two ways: a slider to sweep to roughly the right place,
 * a number box for the exact value. Both write the same piece of state, and
 * the box is the authority — it takes any figure, and when that figure falls
 * outside the slider's span the thumb pins to whichever end it passed. Nudging
 * the slider from there snaps the value back inside the span, which is the
 * only case where the two read differently.
 *
 * Hoisted rather than defined inside RepaymentCalculator: a component created
 * during render is a new type on every pass, which remounts its subtree — here
 * that would drop focus out of the box halfway through typing a number.
 */
function CalcField({
  id,
  label,
  value,
  onChange,
  bounds,
  step,
  inputMode,
  placeholder,
  hint,
}) {
  const labelId = `${id}-label`
  const hintId = hint ? `${id}-hint` : undefined

  /* A range input always has a position, even when the box is empty, and a
     bare one parks at the midpoint of its span — which looks like a figure
     somebody chose. So an empty field pins the thumb to the minimum and
     leaves the track unfilled, which reads as "not set" instead. */
  const entered = value !== '' && Number.isFinite(Number(value))
  const position = entered
    ? Math.min(bounds.max, Math.max(bounds.min, Number(value)))
    : bounds.min
  const fill = entered
    ? ((position - bounds.min) / (bounds.max - bounds.min)) * 100
    : 0

  return (
    <p className="field">
      <label htmlFor={id} id={labelId}>
        {label}
      </label>
      {/* No max: the slider covers the common span, the box takes anything. */}
      <input
        id={id}
        type="number"
        inputMode={inputMode}
        min="0"
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-describedby={hintId}
      />
      {/* The bar is drawn by this wrapper rather than by the input, so that
          three things can be stacked in the right order: the bar underneath,
          the stop dots over it, and the thumb over both. The input's own track
          cannot do that — its thumb paints with it, so dots laid on top of the
          input would also cover the thumb, and the unset thumb parks on the
          first dot. --fill moves here with the bar; it still inherits down to
          the input, which does not read it. */}
      <span className="field__track" style={{ '--fill': `${fill}%` }}>
        {/* Dots on the bar, not stops in it: the thumb still lands anywhere
            the step allows, and the box still takes figures past either end.
            They are here so the span can be read without dragging to find it,
            which a bare bar cannot show.

            Before the input in the DOM so the thumb passes over them, and
            aria-hidden because the slider already announces its own min, max
            and value — voiced, these would be those numbers a second time. */}
        <span className="field__ticks" aria-hidden="true">
          {bounds.ticks.map((tick) => (
            <span
              key={tick}
              className="field__tick"
              /* Positioned the way --fill is, as a plain percentage of the
                 span, so a dot and the fill edge agree at every value. */
              style={{
                '--at': `${((tick - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
              }}
            >
              <span className="field__tick-label">{bounds.tickLabel(tick)}</span>
            </span>
          ))}
        </span>
        {/* Labelled by the same element as the box rather than carrying a
            second name for the same figure: the two are announced apart by
            their roles, spinbutton and slider. */}
        <input
          className="field__slider"
          type="range"
          aria-labelledby={labelId}
          aria-describedby={hintId}
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={position}
          onChange={onChange}
        />
      </span>
      {hint ? (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </p>
  )
}

export default function RepaymentCalculator() {
  const { draft, ui } = useCopy()
  const [values, setValues] = useState(EMPTY)
  const id = useId()

  function update(field) {
    return (event) => setValues((v) => ({ ...v, [field]: event.target.value }))
  }

  const amount = Number(values.amount)
  const rate = Number(values.rate)
  const years = Number(values.years)

  /* Every field has to be a usable number before anything is shown. Number('')
     is 0, so the blank form would otherwise compute a confident zero rather
     than staying quiet. A zero rate is allowed; a zero amount or term is not. */
  const ready =
    values.amount !== '' &&
    values.rate !== '' &&
    values.years !== '' &&
    Number.isFinite(amount) &&
    Number.isFinite(rate) &&
    Number.isFinite(years) &&
    amount > 0 &&
    rate >= 0 &&
    years > 0

  const months = years * 12
  const monthly = ready ? monthlyRepayment(amount, rate, months) : null
  const total = ready ? monthly * months : null
  const interest = ready ? total - amount : null

  /* Sandal since 2026-09-09, where it was the plain page ground before.

     It was plain because --raised sits directly under it and two of the same
     ground in a row lose the alternation the page rhythm runs on. A ground of
     its own answers that better than --page did: the hero above is also --page,
     so the calculator was the second plain band in a row at the top of the home
     page and only the raised one below it was breaking the run. Now the three
     read hero, sandal, raised. */
  return (
    <section className="section section--sandal" id="calculator">
      <div className="shell stack-lg">
        {/* No eyebrow. It read "Calculator" over a heading that already said
            "Work out a repayment", which is the same word twice in two sizes.
            The band keeps the h2, so it still has its own heading in the
            outline. ui.calculator stays in content.js — Tamil carries it
            too — but nothing reads it now. */}
        <div className="stack prose">
          <h2 className="heading">
            <Draft>{draft.calculatorTitle}</Draft>
          </h2>
          <p className="lede">
            <Draft>{draft.calculatorLede}</Draft>
          </p>
        </div>

        {/* Above the tool, not below it: the framing has to be read before the
            figures, the same way the indicative examples are headed. */}
        <p className="notice notice--illustrative">
          <span className="notice__flag">{ui.illustrative}</span>
          <span>
            <Draft>{draft.calculatorNotice}</Draft>
          </span>
        </p>

        <div className="calc">
          {/* Not a <form>: there is nothing to submit and nowhere to submit it.
              The figures update as the numbers are typed. */}
          <div className="calc__fields">
            <CalcField
              id={`${id}-amount`}
              label={ui.calcAmount}
              value={values.amount}
              onChange={update('amount')}
              bounds={BOUNDS.amount}
              step="1000"
              inputMode="numeric"
              placeholder="500000"
            />

            <CalcField
              id={`${id}-rate`}
              label={ui.calcRate}
              value={values.rate}
              onChange={update('rate')}
              bounds={BOUNDS.rate}
              step="0.1"
              inputMode="decimal"
              placeholder="12"
              /* The one field the site cannot fill in for them, and the hint
                 says why rather than leaving an unexplained empty box. */
              hint={<Draft>{draft.calculatorRateHint}</Draft>}
            />

            <CalcField
              id={`${id}-years`}
              label={ui.calcYears}
              value={values.years}
              onChange={update('years')}
              bounds={BOUNDS.years}
              step="1"
              inputMode="numeric"
              placeholder="5"
            />
          </div>

          {/*
            * aria-live so the figures are announced as they change: someone
            * using a screen reader is typing in a field and the result appears
            * somewhere else on the page, which is silent otherwise.
            */}
          <div className="calc__out" aria-live="polite">
            {ready ? (
              <>
                <p className="calc__headline">
                  <span className="calc__value">{rupees.format(monthly)}</span>
                  <span className="calc__label">{fill(ui.calcPerMonth, { months })}</span>
                </p>
                <dl className="terms">
                  <div className="terms__row">
                    <dt className="terms__label">{ui.calcBorrowed}</dt>
                    <dd className="terms__value">{rupees.format(amount)}</dd>
                  </div>
                  <div className="terms__row">
                    <dt className="terms__label">{ui.calcInterest}</dt>
                    <dd className="terms__value">{rupees.format(interest)}</dd>
                  </div>
                  <div className="terms__row">
                    <dt className="terms__label">{ui.calcTotal}</dt>
                    <dd className="terms__value">{rupees.format(total)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="calc__empty">
                <Draft>{draft.calculatorEmpty}</Draft>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
