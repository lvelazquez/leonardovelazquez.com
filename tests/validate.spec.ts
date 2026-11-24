import { describe, it, expect } from 'vitest'
import { validateEmail, validateContact } from '../src/lib/validate'
import { hexToRgba } from '../src/lib/color'

describe('validateEmail', () => {
  it('rejects malformed addresses', () => {
    for (const e of ['ar', '', ' ', 'lalo@lol', ' leo@example.com', 'a@b.c']) {
      expect(validateEmail(e)).toBe(false)
    }
  })
  it('accepts well-formed addresses', () => {
    for (const e of ['leo@example.com', 'lula@lolli.co.so', 'a+tag@x.io']) {
      expect(validateEmail(e)).toBe(true)
    }
  })
})

describe('validateContact', () => {
  const ok = { name: 'Leo', email: 'leo@example.com', title: 'Hi', message: 'Hello' }
  it('passes a complete form', () => expect(validateContact(ok)).toBeNull())
  it('requires every field, ignoring whitespace-only values', () => {
    expect(validateContact({ ...ok, message: '' })).toBe('required')
    expect(validateContact({ ...ok, name: '   ' })).toBe('required')
  })
  it('flags a bad email once fields are filled', () => {
    expect(validateContact({ ...ok, email: 'la2' })).toBe('email')
  })
})

describe('hexToRgba', () => {
  it('converts hex colors', () => {
    expect(hexToRgba('#D1D8E0', 0.5)).toBe('rgba(209, 216, 224, 0.5)')
    expect(hexToRgba('000000')).toBe('rgba(0, 0, 0, 0.65)')
  })
  it('returns transparent for malformed input', () => {
    expect(hexToRgba('')).toBe('transparent')
    expect(hexToRgba('#12')).toBe('transparent')
  })
})
