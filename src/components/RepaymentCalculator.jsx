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
 */

/* Indian digit grouping, and no paise: the figures run to lakhs, where a
   trailing .00 is noise. */
const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
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

const EMPTY = { amount: '', rate: '', term: '' }

/* The two units the term can be entered in. Years first: it is the unit the
   field asked for on its own until now, so the tool opens where it always did
   and months are the thing you switch to. */
const TERM_UNITS = ['years', 'months']

/**
 * The same term, read in the other unit.
 *
 * Switching unit re-expresses what has been entered rather than clearing it —
 * someone who has swept to five years and then wants to say thirty months is
 * starting from five, not from empty.
 *
 * Months come out whole, and years to the nearest half, which is as fine as
 * the year slider goes. So the conversion is lossy in one direction: seven
 * months reads as half a year and comes back as six. That is the field's own
 * granularity rather than a rounding bug, and it is why the month side exists
 * — a term that has to be exact to the month is entered in months.
 */
function convertTerm(value, to) {
  if (value === '' || !Number.isFinite(Number(value))) return value
  const n = Number(value)
  if (to === 'months') return String(Math.round(n * 12))
  return String(Math.round((n / 12) * 2) / 2)
}

/*
 * Slider bounds. These are the span the control sweeps, and nothing more —
 * the number box beside each slider keeps its original open range, so a
 * requirement outside these can still be typed. They are deliberately not a
 * statement about what Kalyan lends: no amount, rate or term has been
 * published, and the notice above the tool says exactly that.
 */
const BOUNDS = {
  amount: { min: 10000, max: 5000000, step: 10000 },
  rate: { min: 0, max: 30, step: 0.1 },
  /* Two faces of one field, picked by the switch beside its label. They meet at
     the top — 360 months is the year slider's thirty — and part at the bottom,
     where months run down to six against the year slider's one: a term shorter
     than a year is the case the year slider cannot express. The year slider
     steps in halves so a term converted from months has somewhere to land
     (thirty months is two and a half years). */
  years: { min: 1, max: 30, step: 0.5 },
  months: { min: 6, max: 360, step: 1 },
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
  unit,
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
      {/* Label and unit switch on one line. The switch is a sibling of the
          <label> rather than a child of it: a label may not contain a control,
          and one that did would fire its own buttons every time the field name
          was clicked. */}
      <span className="field__head">
        <label htmlFor={id} id={labelId}>
          {label}
        </label>
        {unit}
      </span>
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
      {/* Labelled by the same element as the box rather than carrying a second
          name for the same figure: the two are announced apart by their roles,
          spinbutton and slider. */}
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
        style={{ '--fill': `${fill}%` }}
      />
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
  const [termUnit, setTermUnit] = useState('years')
  const id = useId()

  function update(field) {
    return (event) => setValues((v) => ({ ...v, [field]: event.target.value }))
  }

  function switchTermUnit(next) {
    if (next === termUnit) return
    setTermUnit(next)
    setValues((v) => ({ ...v, term: convertTerm(v.term, next) }))
  }

  const amount = Number(values.amount)
  const rate = Number(values.rate)
  const term = Number(values.term)

  /* Every field has to be a usable number before anything is shown. Number('')
     is 0, so the blank form would otherwise compute a confident zero rather
     than staying quiet. A zero rate is allowed; a zero amount or term is not. */
  const ready =
    values.amount !== '' &&
    values.rate !== '' &&
    values.term !== '' &&
    Number.isFinite(amount) &&
    Number.isFinite(rate) &&
    Number.isFinite(term) &&
    amount > 0 &&
    rate >= 0 &&
    term > 0

  /* Months are the unit the arithmetic and the result line both run in, so the
     term is converted once, here, and rounded. A part-month is not a thing a
     repayment schedule has. */
  const months = Math.round(termUnit === 'months' ? term : term * 12)
  const monthly = ready ? monthlyRepayment(amount, rate, months) : null
  const total = ready ? monthly * months : null
  const interest = ready ? total - amount : null

  /* Plain, not --raised. It sits between the dark products band and the raised
     why-us read, and raised on either side of it would put two of the same
     ground together and lose the alternation the page rhythm runs on. */
  return (
    <section className="section" id="calculator">
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

            {/* One field, two units. The label names the unit in force, so the
                box is never a bare number whose meaning is only on the switch
                beside it. */}
            <CalcField
              id={`${id}-term`}
              label={termUnit === 'months' ? ui.calcMonths : ui.calcYears}
              unit={
                <span
                  className="field__units"
                  role="group"
                  aria-label={ui.calcTermUnit}
                >
                  {TERM_UNITS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="field__unit"
                      /* aria-pressed rather than a radio group: these are two
                         states of one control, and the pressed one is the unit
                         the field is currently in. */
                      aria-pressed={termUnit === option}
                      onClick={() => switchTermUnit(option)}
                    >
                      {option === 'months' ? ui.calcUnitMonths : ui.calcUnitYears}
                    </button>
                  ))}
                </span>
              }
              value={values.term}
              onChange={update('term')}
              bounds={termUnit === 'months' ? BOUNDS.months : BOUNDS.years}
              step="1"
              inputMode="numeric"
              placeholder={termUnit === 'months' ? '60' : '5'}
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
