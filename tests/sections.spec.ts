import { describe, it, expect } from 'vitest'
import { parsePath, buildPath, activeSection } from '../src/lib/sections'

describe('parsePath', () => {
  it('maps the root to the intro section', () => {
    expect(parsePath('/')).toEqual({ section: 'intro', projectId: null })
  })
  it('reads a section and a project id', () => {
    expect(parsePath('/work/wgl')).toEqual({ section: 'work', projectId: 'wgl' })
    expect(parsePath('/about')).toEqual({ section: 'about', projectId: null })
  })
  it('ignores a project segment outside the work section', () => {
    expect(parsePath('/about/wgl').projectId).toBeNull()
  })
  it('falls back to intro for unknown paths', () => {
    expect(parsePath('/nope').section).toBe('intro')
  })
  it('honours a deployment base path', () => {
    expect(parsePath('/repo/work/pp', '/repo/')).toEqual({ section: 'work', projectId: 'pp' })
    expect(parsePath('/repo/', '/repo/').section).toBe('intro')
    expect(parsePath('/repo', '/repo/').section).toBe('intro')
  })
})

describe('buildPath', () => {
  it('is the inverse of parsePath', () => {
    for (const p of ['/', '/work', '/work/wgl', '/about', '/contact']) {
      const { section, projectId } = parsePath(p)
      expect(buildPath(section, projectId)).toBe(p)
    }
  })
  it('prefixes the base path', () => {
    expect(buildPath('contact', null, '/repo/')).toBe('/repo/contact')
    expect(buildPath('intro', null, '/repo/')).toBe('/repo/')
    expect(buildPath('work', 'pp', '/repo')).toBe('/repo/work/pp')
  })
})

describe('activeSection', () => {
  const bands = [
    { id: 'intro', top: 0, height: 800 },
    { id: 'work', top: 800, height: 1200 },
  ]
  it('finds the band containing the scroll position', () => {
    expect(activeSection(0, bands)).toBe('intro')
    expect(activeSection(800, bands)).toBe('work')
    expect(activeSection(1999, bands)).toBe('work')
  })
  it('returns null outside every band', () => {
    expect(activeSection(2000, bands)).toBeNull()
  })
})
