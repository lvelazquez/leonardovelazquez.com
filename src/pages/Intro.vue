<template>
  <section id="intro" class="intro" aria-label="Introduction">
    <div class="intro-container">
      <BrandLogo :class="{ loader: !isLoaded }" type="intro" heading />
      <div class="intro-nav">
        <nav aria-label="Sections">
          <ul>
            <li v-for="item in items" :key="item.id">
              <nav-link :to="item.id" @navigate="id => emit('navigate', id)">{{
                item.label
              }}</nav-link>
            </li>
          </ul>
        </nav>
        <div class="page-scroll">
          <nav-link
            to="work"
            class="btn-lv"
            aria-label="Go to next section"
            @navigate="id => emit('navigate', id)"
          >
            <i class="icon-down-open" aria-hidden="true"></i>
          </nav-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BrandLogo, NavLink } from '../components/'
import type { SectionId } from '../lib/sections'

defineProps<{ isLoaded: boolean }>()
const emit = defineEmits<{ navigate: [id: SectionId] }>()

const items: { id: SectionId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About me' },
  { id: 'contact', label: 'Contact' },
]
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

.intro {
  color: var(--color-on-media);
  height: 100vh;
  height: 100svh;
}

.intro-container {
  display: flex;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-width: 100%;
  flex-direction: column;
  font-size: var(--text-2xl);
}

.intro-nav {
  text-align: center;
  ul {
    width: 100%;
    white-space: nowrap;
    display: none;
    @media (min-width: media.$bp-ms) {
      display: flex;
    }
    li {
      flex: 1;
    }
    a {
      display: inline-block;
      padding: var(--space-4);
      font-family: var(--font-body);
      font-weight: var(--weight-regular);
      color: var(--color-on-media);
      background: transparent;
      transition: background-color var(--motion-exit);
      &:hover {
        background: var(--color-hover-wash);
        transition: background-color var(--motion-enter);
      }
    }
  }
}

.page-scroll {
  clear: both;
  margin-top: var(--space-4);
}

.btn-lv {
  display: inline-block;
  width: 70px;
  height: 70px;
  padding: var(--space-2) var(--space-4);
  font-size: 2.5rem;
  color: var(--color-on-media);
  background: transparent;
  transition: background-color var(--motion-exit);
  &:hover {
    background: var(--color-hover-wash);
    transition: background-color var(--motion-enter);
  }
  &:hover i {
    animation: pulse var(--duration-loop) var(--ease-linear) infinite;
  }
  i {
    display: inline-block;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>
