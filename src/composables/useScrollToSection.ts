import type { Ref } from 'vue'
import { scrollBehavior } from '../lib/motion'

/** Smooth-scrolls (or jumps, under reduced motion) to a section, clearing the fixed navbar. */
export function useScrollToSection(navHeight: Ref<number | null>) {
  function scrollToSection(sectionId: string) {
    const el = sectionId ? document.getElementById(sectionId) : null
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - (navHeight.value ?? 0)
    window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() })
    // Move keyboard/screen-reader context to the section without stealing a visible focus ring.
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
  return { scrollToSection }
}
