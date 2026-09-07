import { useState } from 'react'
import { useCopy } from '../i18n'

const EMPTY = { name: '', email: '', phone: '', message: '' }

/* Takes the messages rather than owning them. They are language state now,
   and this runs outside the component where the hook cannot reach. */
function validate(values, ui) {
  const errors = {}
  if (!values.name.trim()) errors.name = ui.errName
  if (!values.email.trim() && !values.phone.trim()) {
    errors.email = ui.errContact
  } else if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = ui.errEmail
  }
  if (!values.message.trim()) errors.message = ui.errMessage
  return errors
}

/**
 * The project has no backend, so `contact.formEndpoint` is null and the form
 * submits nowhere. Rather than accept enquiries into a void, it validates,
 * then blocks submission and says so. Set the endpoint in content.js to enable.
 */
export default function EnquiryForm() {
  const { contact, ui } = useCopy()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle')

  const live = !!contact.formEndpoint

  function update(field) {
    return (event) => setValues((v) => ({ ...v, [field]: event.target.value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const found = validate(values, ui)
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

  /* Every field carries a placeholder as a hint, never as a label substitute:
     the labels above them all stay, because a placeholder vanishes the moment
     someone types and takes its guidance with it. Format examples where the
     format is the question (email, phone), plain guidance where it is not.
     example.com is the reserved example domain, so nothing here points at a
     real address. */
  return (
    <form className="form stack" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">{ui.formName}</label>
        <input
          id="f-name"
          name="name"
          placeholder={ui.formNamePlaceholder}
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
        <label htmlFor="f-email">{ui.formEmail}</label>
        <input
          id="f-email"
          name="email"
          type="email"
          inputMode="email"
          placeholder={ui.formEmailPlaceholder}
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
        <label htmlFor="f-phone">{ui.formPhone}</label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder={ui.formPhonePlaceholder}
          value={values.phone}
          onChange={update('phone')}
        />
      </div>

      <div className="field">
        <label htmlFor="f-message">{ui.formMessage}</label>
        <textarea
          id="f-message"
          name="message"
          rows="5"
          placeholder={ui.formMessagePlaceholder}
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
          {state === 'sending' ? ui.formSending : ui.formSend}
        </button>

        <p aria-live="polite" className="form__status">
          {state === 'sent' ? ui.formSent : null}
          {state === 'failed' ? ui.formFailed : null}
          {state === 'no-endpoint' ? (
            <span className="todo">
              {ui.formNoEndpoint}
            </span>
          ) : null}
        </p>
      </div>
    </form>
  )
}
