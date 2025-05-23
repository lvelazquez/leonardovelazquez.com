export function useScrollToSection(navHeight) {
  function scrollToSection(sectionId) {
    const selector = `#${sectionId}`
    const el = document.querySelector(selector)
    if (sectionId && el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (navHeight.value) {
        window.scrollBy({ top: -navHeight.value, behavior: 'instant' })
      }
    }
  }
  return { scrollToSection }
}
