<template>
  <div id="app">
    <main-nav
      :resume-link="resumeLink"
      :current-section-id="currentSectionId"
      :is-nav-hidden="`${isNavHidden}`"
      :nav-offset="-navHeight"
    />
    <background :is-playing="isVideoPlaying" @is-ready="onReady" />
    <intro :nav-offset="-navHeight" :is-loaded="isLoaded" />
    <work
      :is-active="currentSectionId === 'work'"
      :is-loaded="isLoaded"
      :isProjectModalOpen="isProjectModalOpen"
      :currentProjectId="projectId"
    />
    <about :is-loaded="isLoaded" />
    <contact :is-loaded="isLoaded" :render-map="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { throttle } from 'lodash'
import { Intro, Work, About, Contact } from './pages/'
import { MainNav, Background } from './components/'
import projectData from './data'
import EventBus from './EventBus'
import { useRoute } from 'vue-router'
import { useScrollToSection } from './composables/useScrollToSection'

const RESUME_LINK = `https://docs.google.com/document/d/1JaojBFdGMaM_Hm5qHArmPrXSBguRnJSmCM-q7t6ruBc/export?format=pdf`

const currentSectionId = ref(null)
const isLoaded = ref(false)
const isVideoPlaying = ref(false)
const isNavHidden = ref(true)
const navHeight = ref(null)
const resumeLink = ref(RESUME_LINK)
const projectId = ref(Object.keys(projectData)[0])
const isProjectModalOpen = ref(false)
const navItems = ref([])
const sections = ref([])

const route = useRoute()

const { scrollToSection } = useScrollToSection(navHeight)

watch(
  () => route && (route.fullPath || route.path || '/'),
  newPath => {
    let sectionId = newPath === '/' ? 'intro' : newPath.replace('/', '')
    scrollToSection(sectionId)
  }
)

const handleRouteChange = sectionId => {
  history.replaceState(null, null, sectionId)
  const selector = `#${sectionId}`
  if (sectionId && document.querySelector(selector)) {
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (navHeight.value) {
        window.scrollBy({ top: -navHeight.value, behavior: 'instant' })
      }
    }
  }
}

const handleResize = () => {
  navHeight.value = document.querySelector('.navbar').offsetHeight
}

const handleScroll = () => {
  if (window.scrollY > 40) {
    isVideoPlaying.value = false
  } else {
    isVideoPlaying.value = true
  }
  isNavHidden.value = window.scrollY === 0
  const scrollY = window.scrollY + navHeight.value
  updateSections(scrollY)
}

const handlePopstate = e => {
  e.preventDefault()

  const keys = window.location.pathname.split('/')
  const sectionId = keys[1]
  if (window.innerWidth > 750) {
    const el = document.querySelector(`#${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  if (sectionId === 'work' && keys.length > 2) {
    projectId.value = keys[2]
    isProjectModalOpen.value = true
  } else {
    isProjectModalOpen.value = false
  }
}

const updateRoute = id => {
  if (id !== currentSectionId.value) {
    currentSectionId.value = id
    if (id === 'work' && projectId.value) {
      id = `work/${projectId.value}`
      isProjectModalOpen.value = true
    } else if (id === 'intro') {
      id = ''
    }
    isProjectModalOpen.value = false
    history.replaceState(null, null, `/${id}`)
  }
}

const updateSections = scrollY => {
  const currentRoute = window.location.pathname.split('/')[1]
  sections.value = document.querySelectorAll('section')
  sections.value.forEach(section => {
    section.classList.remove('active')
    const currentId = section.getAttribute('id')
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      if (currentId !== currentRoute) {
        updateRoute(currentId)
        updateNavItems(currentId)
      }
    }
  })
}

const updateNavItems = currentRoute => {
  if (!currentRoute) return
  navItems.value.forEach(navItem => {
    if (currentRoute === navItem.getAttribute('data-id')) {
      navItem.classList.add('active')
    } else {
      navItem.classList.remove('active')
    }
  })
}

const onReady = () => {
  isLoaded.value = true
  isVideoPlaying.value = true
  nextTick(() => {
    const keys = window.location.pathname.split('/')
    const sectionId = keys[1] === '' ? 'intro' : keys[1]
    if (sectionId === 'work' && keys.length > 2) {
      projectId.value = keys[2]
    } else {
      isProjectModalOpen.value = false
    }
    currentSectionId.value = sectionId
    const selector = `#${sectionId}`
    const el = document.querySelector(selector)
    if (sectionId && el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (navHeight.value) {
        window.scrollBy({ top: -navHeight.value, behavior: 'instant' })
      }
    }
  })
}

const handleProjectClick = id => {
  projectId.value = id
  isProjectModalOpen.value = true
}

onMounted(() => {
  navHeight.value = document.querySelector('.navbar').offsetHeight + 5
  navItems.value = document.querySelectorAll('.nav-list .nav-item')

  window.addEventListener('scroll', throttle(handleScroll, 100), {
    passive: true,
  })
  window.addEventListener('popstate', handlePopstate)
  window.addEventListener('resize', handleResize)
  EventBus.on('routechange', handleRouteChange)
  EventBus.on('project.clicked', handleProjectClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('popstate', handlePopstate)
  EventBus.off('routechange', handleRouteChange)
  EventBus.off('project.clicked', handleProjectClick)
})
</script>

<style lang="scss">
@import './styles/base.css';
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

a {
  text-decoration: none;
}

body {
  margin: 0;
  font-family: 'Roboto', Arial, sans-serif;
}

h2 {
  padding-top: 3rem;
}

.invisible {
  display: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>
