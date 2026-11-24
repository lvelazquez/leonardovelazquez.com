import { validateContact, type ContactForm } from '../src/lib/validate.ts'

export interface MailOptions {
  from: string
  to: string
  replyTo: { name: string; address: string }
  subject: string
  text: string
}

/** Remove CR/LF so user input can never inject extra mail headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

export function toAddress(user: string): string {
  return user.includes('@') ? user : `${user}@gmail.com`
}

export type BuildResult = { ok: true; mail: MailOptions } | { ok: false; error: string }

/** Validate an untrusted request body and turn it into a mail envelope. */
export function buildMail(body: unknown, mailbox: string): BuildResult {
  const raw = (body ?? {}) as Partial<Record<keyof ContactForm, unknown>>
  const form: ContactForm = {
    name: typeof raw.name === 'string' ? raw.name : '',
    email: typeof raw.email === 'string' ? raw.email : '',
    title: typeof raw.title === 'string' ? raw.title : '',
    message: typeof raw.message === 'string' ? raw.message : '',
  }
  const problem = validateContact(form)
  if (problem) return { ok: false, error: problem }
  const name = oneLine(form.name)
  const email = form.email.trim()
  return {
    ok: true,
    mail: {
      from: mailbox,
      to: mailbox,
      replyTo: { name, address: email },
      subject: `leonardovelazquez.com: ${oneLine(form.title)}`,
      text: `${name} (${email}) says: ${form.message}`,
    },
  }
}
