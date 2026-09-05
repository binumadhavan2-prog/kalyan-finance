import { useState } from 'react'
import { contact } from '../content'

const EMPTY = { name: '', email: '', phone: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim() && !values.phone.trim()) {
    errors.email = 'Please give us either an email address or a phone number.'
  } else if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'That does not look like an email address.'
  }
  if (!values.message.trim()) errors.message = 'Please tell us roughly what you need.'
  return errors
}

/**
 * The project has no backend, so `contact.formEndpoint` is null and the form
 * submits nowhere. Rather than accept enquiries into a void, it validates,
 * then blocks submission and says so. Set the endpoint in content.js to enable.
 */
export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle')

  const live = !!contact.formEndpoint

  function update(field) {
    return (event) => setValues((v) => ({ ...v, [field]: event.target.value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (!live) {
      setState('no-endpoint')
      return
    }

    setState('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setValues(EMPTY)
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  return (
    <form className="form stack" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">Name</label>
        <input
          id="f-name"
          name="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'e-name' : undefined}
        />
        {errors.name ? (
          <p className="field__error" id="e-name">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'e-email' : undefined}
        />
        {errors.email ? (
          <p className="field__error" id="e-email">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="f-phone">Phone</label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={update('phone')}
        />
      </div>

      <div className="field">
        <label htmlFor="f-message">What do you need?</label>
        <textarea
          id="f-message"
          name="message"
          rows="5"
          value={values.message}
          onChange={update('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'e-message' : undefined}
        />
        {errors.message ? (
          <p className="field__error" id="e-message">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="form__foot">
        <button className="btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>

        <p aria-live="polite" className="form__status">
          {state === 'sent' ? 'Thank you — we will come back to you.' : null}
          {state === 'failed' ? 'That did not send. Please try again or call us.' : null}
          {state === 'no-endpoint' ? (
            <span className="todo">
              Form is not connected yet — no destination configured
            </span>
          ) : null}
        </p>
      </div>
    </form>
  )
}
