import { describe, it, expect } from 'vitest'
import { buildMail, toAddress } from '../server/contact'

const body = { name: 'Leo', email: 'leo@example.com', title: 'Hi', message: 'Hello there' }

describe('toAddress', () => {
  it('adds the gmail domain to a bare user and keeps full addresses', () => {
    expect(toAddress('me')).toBe('me@gmail.com')
    expect(toAddress('me@example.com')).toBe('me@example.com')
  })
})

describe('buildMail', () => {
  it('builds a mail envelope with reply-to set to the visitor', () => {
    const r = buildMail(body, 'me@gmail.com')
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.mail.to).toBe('me@gmail.com')
      expect(r.mail.replyTo).toEqual({ name: 'Leo', address: 'leo@example.com' })
      expect(r.mail.subject).toBe('leonardovelazquez.com: Hi')
    }
  })
  it('strips line breaks so input cannot inject mail headers', () => {
    const r = buildMail({ ...body, title: 'Hi\r\nBcc: x@y.z', name: 'A\nB' }, 'me@gmail.com')
    expect(r.ok && r.mail.subject).not.toMatch(/[\r\n]/)
    expect(r.ok && r.mail.replyTo.name).not.toMatch(/[\r\n]/)
  })
  it('rejects bad input of any shape', () => {
    expect(buildMail(undefined, 'm@g.com')).toEqual({ ok: false, error: 'required' })
    expect(buildMail({ ...body, email: 'nope' }, 'm@g.com')).toEqual({ ok: false, error: 'email' })
    expect(buildMail({ ...body, name: 42 }, 'm@g.com').ok).toBe(false)
  })
})
