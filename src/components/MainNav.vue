<template>
  <nav
    class="navbar"
    aria-label="Primary"
    :class="{ 'navbar-hide': hidden }"
    @keydown.esc="closeMenu"
  >
    <div class="navbar-header">
      <nav-link class="navbar-logo nav-item" to="intro" @navigate="onNavigate">
        <BrandLogo type="header" color="black" />
      </nav-link>
      <div id="primary-menu" class="navbar-right" :class="{ 'navbar-collapse': !isMenuOpen }">
        <ul class="nav-list">
          <li v-for="item in items" :key="item.id" class="nav-list-item">
            <nav-link
              :to="item.id"
              class="nav-item"
              :class="{ active: currentSectionId === item.id }"
              :current="currentSectionId === item.id"
              @navigate="onNavigate"
              >{{ item.label }}</nav-link
            >
          </li>
          <li class="nav-list-item">
            <a class="nav-item" :href="resumeLink" download="LeonardoVelazquezResume">
              <i class="icon-download-alt" aria-hidden="true"></i>
              Resume
            </a>
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="navbar-menu-btn"
        aria-controls="primary-menu"
        :aria-expanded="isMenuOpen"
        aria-label="Menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <i class="icon-menu" aria-hidden="true"></i>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavLink from './NavLink.vue'
import BrandLogo from './BrandLogo.vue'
import type { SectionId } from '../lib/sections'

defineProps<{ resumeLink: string; currentSectionId: string; hidden: boolean }>()
const emit = defineEmits<{ navigate: [id: SectionId] }>()

const items: { id: SectionId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About me' },
  { id: 'contact', label: 'Contact' },
]

const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function onNavigate(id: SectionId) {
  closeMenu()
  emit('navigate', id)
}
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  font-family: var(--font-display);
  text-transform: uppercase;
  z-index: 1000;
  color: var(--color-on-surface);
  background-color: var(--color-surface);
  transform: translateY(0);
  transition: transform var(--motion-enter);
}

/* Off-screen at the top of the page, but revealed if a keyboard user tabs into it. */
.navbar-hide:not(:focus-within) {
  transform: translateY(-100%);
  transition: transform var(--motion-exit);
}

.navbar-collapse {
  display: none;
}

.nav-list-item {
  padding: 0;
  margin: 0;
  display: flex;
  background-color: transparent;
  transition: background-color var(--motion-exit);

  .nav-item {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    width: 100%;
    padding: var(--space-4);
    font-weight: var(--weight-medium);
    &.active {
      color: var(--color-on-surface-inverse);
      background-color: var(--color-surface-inverse);
    }
    @media (min-width: media.$bp-ms) {
      padding: 1.7rem var(--space-4);
    }
    @media (min-width: media.$bp-lg) {
      padding: var(--space-6);
    }
  }

  &:hover {
    color: var(--color-on-hover-surface);
    background-color: var(--color-hover-surface);
    transition: background-color var(--motion-enter);
  }
}

.nav-list {
  display: block;
  @media (min-width: media.$bp-ms) {
    display: flex;
  }
}

.navbar-logo {
  position: relative;
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding: var(--space-3) 0 var(--space-3) var(--space-3);
  font-weight: var(--weight-bold);
}

.navbar-menu-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  min-width: var(--size-touch);
  height: var(--size-navbar);
  border: none;
  font-size: var(--text-xl);
  cursor: pointer;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  padding: var(--space-3);
}

@media (min-width: media.$bp-ms) {
  .navbar-right {
    display: inline-flex;
    position: relative;
    float: right;
    height: 100%;
    align-items: center;
    .nav-item {
      font-size: var(--text-xs);
    }
  }

  .navbar-menu-btn {
    display: none;
  }

  .navbar-collapse {
    display: inline-flex;
  }
}
</style>
