export interface ContactForm {
  name: string
  email: string
  title: string
  message: string
}

export type ContactError = 'required' | 'email' | null

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(String(email))
}

/** Returns which rule the form breaks first, or null when it can be sent. */
export function validateContact(form: ContactForm): ContactError {
  if (Object.values(form).some(v => v.trim() === '')) return 'required'
  if (!validateEmail(form.email)) return 'email'
  return null
}

export const CONTACT_ERROR_TEXT: Record<Exclude<ContactError, null>, string> = {
  required: 'All fields are required.',
  email: 'Please enter a valid email',
}
