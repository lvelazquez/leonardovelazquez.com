<template>
  <a class="skip-link" href="#main" @click.prevent="skipToMain">Skip to main content</a>
  <header>
    <main-nav
      :resume-link="RESUME_LINK"
      :current-section-id="currentSectionId"
      :hidden="isNavHidden"
      @navigate="goTo"
    />
  </header>
  <background :is-playing="isVideoPlaying" @is-ready="onReady" />
  <main id="main" tabindex="-1">
    <intro :is-loaded="isLoaded" @navigate="goTo" />
    <work
      :is-project-modal-open="isProjectModalOpen"
      :current-project-id="projectId"
      @select="selectProject"
      @close="closeProject"
    />
    <about />
    <contact />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Intro, Work, About, Contact } from './pages/'
import { MainNav, Background } from './components/'
import projectData from './data'
import { useScrollToSection } from './composables/useScrollToSection'
import { parsePath, buildPath, activeSection, type SectionId } from './lib/sections'
import { throttle, scrollBehavior } from './lib/motion'

const RESUME_LINK =
  'https://docs.google.com/document/d/1JaojBFdGMaM_Hm5qHArmPrXSBguRnJSmCM-q7t6ruBc/export?format=pdf'
const BASE = import.meta.env.BASE_URL
const MOBILE_MAX = 767

const currentSectionId = ref<SectionId>('intro')
const isLoaded = ref(false)
const isVideoPlaying = ref(false)
const isNavHidden = ref(true)
const navHeight = ref<number | null>(null)
const projectId = ref<string>(Object.keys(projectData)[0])
const isProjectModalOpen = ref(false)

const { scrollToSection } = useScrollToSection(navHeight)

function skipToMain() {
  const main = document.getElementById('main')
  main?.focus({ preventScroll: true })
  main?.scrollIntoView({ behavior: scrollBehavior() })
}

function measureNav() {
  navHeight.value = document.querySelector<HTMLElement>('.navbar')?.offsetHeight ?? null
  if (navHeight.value)
    document.documentElement.style.setProperty('--navbar-height', `${navHeight.value}px`)
}

function goTo(id: SectionId) {
  isProjectModalOpen.value = false
  scrollToSection(id)
}

function selectProject(id: string) {
  if (!projectData[id]) return
  projectId.value = id
  isProjectModalOpen.value = true
  history.pushState(null, '', buildPath('work', id, BASE))
}

function closeProject() {
  isProjectModalOpen.value = false
  history.replaceState(null, '', buildPath('work', null, BASE))
}

/** Apply the current URL to page state (used on load and on back/forward). */
function applyLocation(scroll: boolean) {
  const { section, projectId: pid } = parsePath(window.location.pathname, BASE)
  currentSectionId.value = section
  if (pid && projectData[pid]) {
    projectId.value = pid
    isProjectModalOpen.value = window.innerWidth <= MOBILE_MAX
  } else {
    isProjectModalOpen.value = false
  }
  if (scroll) scrollToSection(section)
}

const handleScroll = throttle(() => {
  isVideoPlaying.value = window.scrollY <= 40
  isNavHidden.value = window.scrollY === 0
  const bands = Array.from(document.querySelectorAll<HTMLElement>('main > section')).map(s => ({
    id: s.id,
    top: s.offsetTop,
    height: s.offsetHeight,
  }))
  // At the very bottom a short last section can never reach the top of the viewport.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  const id = (
    atBottom && bands.length
      ? bands[bands.length - 1].id
      : activeSection(window.scrollY + (navHeight.value ?? 0) + 1, bands)
  ) as SectionId | null
  if (id && id !== currentSectionId.value) {
    currentSectionId.value = id
    history.replaceState(null, '', buildPath(id, id === 'work' ? projectId.value : null, BASE))
  }
}, 100)

function onReady() {
  if (isLoaded.value) return
  isLoaded.value = true
  isVideoPlaying.value = window.scrollY <= 40
  measureNav()
  applyLocation(window.location.pathname.replace(BASE, '') !== '')
}

const handlePopstate = () => applyLocation(window.innerWidth > MOBILE_MAX)

onMounted(() => {
  measureNav()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('popstate', handlePopstate)
  window.addEventListener('resize', measureNav)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('popstate', handlePopstate)
  window.removeEventListener('resize', measureNav)
})
</script>
