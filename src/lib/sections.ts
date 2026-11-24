/** Section ids that exist on the page, in document order. */
export const SECTION_IDS = ['intro', 'work', 'about', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export interface ParsedPath {
  section: SectionId
  projectId: string | null
}

function stripBase(pathname: string, base: string): string {
  const b = base.endsWith('/') ? base : `${base}/`
  if (pathname.startsWith(b)) return pathname.slice(b.length)
  if (`${pathname}/` === b) return ''
  return pathname.replace(/^\//, '')
}

/** Turn a location pathname ("/work/wgl") into a section and optional project id. */
export function parsePath(pathname: string, base = '/'): ParsedPath {
  const [first = '', second = ''] = stripBase(pathname, base).split('/')
  const section = (SECTION_IDS as readonly string[]).includes(first)
    ? (first as SectionId)
    : 'intro'
  return { section, projectId: section === 'work' && second ? second : null }
}

/** Inverse of parsePath: the URL path for a section, with an optional project. */
export function buildPath(section: SectionId, projectId: string | null = null, base = '/'): string {
  const b = base.endsWith('/') ? base : `${base}/`
  if (section === 'intro') return b
  return projectId && section === 'work' ? `${b}work/${projectId}` : `${b}${section}`
}

/** Id of the section whose vertical band contains `scrollY`, or null. */
export function activeSection(
  scrollY: number,
  bands: ReadonlyArray<{ id: string; top: number; height: number }>
): string | null {
  const hit = bands.find(b => scrollY >= b.top && scrollY < b.top + b.height)
  return hit ? hit.id : null
}
