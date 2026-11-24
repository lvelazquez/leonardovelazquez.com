<template>
  <div
    class="project-wrapper mobile-modal"
    :class="{ 'modal-open': isProjectModalOpen }"
    role="region"
    :aria-label="`Project: ${project.title}`"
    @keydown.esc="emit('close')"
  >
    <div class="project-header">
      <h3 class="title">{{ project.title }}</h3>
      <button
        ref="closeBtn"
        type="button"
        class="close-btn"
        aria-label="Close project"
        @click="emit('close')"
      >
        <i class="icon-close" aria-hidden="true"></i>
      </button>
    </div>
    <div class="carousel" role="group" aria-roledescription="carousel" aria-label="Project images">
      <div
        class="carousel-wrapper"
        :style="{ backgroundColor: hexToRgba(project.backgroundColor) }"
      >
        <div
          v-for="(image, index) in project.images"
          :key="`${currentProjectId}-${index}`"
          class="item"
          role="group"
          aria-roledescription="slide"
          :aria-label="`Image ${index + 1} of ${project.images.length}`"
          :aria-hidden="currentImageIndex !== index"
          :inert="currentImageIndex !== index"
          :style="
            currentImageIndex !== index
              ? { transform: `translate(${200 * direction}%, 0)` }
              : undefined
          "
          :class="{ active: currentImageIndex === index, past: previousImageIndex === index }"
        >
          <img
            loading="lazy"
            decoding="async"
            :alt="`${project.title}, screenshot ${index + 1}`"
            :src="imageUrl(image.image_url)"
            @load="isLoading = false"
            @error="isLoading = false"
          />
        </div>
        <div class="loader" :class="{ loading: isLoading }" aria-hidden="true">
          <Loader v-if="isLoading" />
        </div>
        <div class="controls">
          <div class="overlay-btn overlay-left" aria-hidden="true" @click="step(-1)"></div>
          <div class="overlay-btn overlay-right" aria-hidden="true" @click="step(1)"></div>
          <button
            type="button"
            aria-label="Previous image"
            class="carousel-control carousel-left"
            @click="step(-1)"
          >
            <span class="icon-left-open" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            class="carousel-control carousel-right"
            @click="step(1)"
          >
            <span class="icon-right-open" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div class="carousel-details">
        <ol class="carousel-indicators">
          <li v-for="(_, index) in project.images" :key="index">
            <button
              type="button"
              class="indicator"
              :class="{ active: currentImageIndex === index }"
              :aria-label="`Show image ${index + 1}`"
              :aria-current="currentImageIndex === index"
              @click="goTo(index)"
            ></button>
          </li>
        </ol>
        <p class="carousel-caption" aria-live="polite">{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import projectData from '../data'
import config from '../config'
import Loader from './Loader.vue'
import { hexToRgba } from '../lib/color'

const props = defineProps<{ currentProjectId: string; isProjectModalOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const direction = ref(1)
const currentImageIndex = ref(0)
const previousImageIndex = ref<number | null>(null)
const isLoading = ref(true)
const closeBtn = ref<HTMLButtonElement | null>(null)
let stepTimer: ReturnType<typeof setTimeout> | undefined

const project = computed(() => projectData[props.currentProjectId] ?? Object.values(projectData)[0])

const imageUrl = (file: string) =>
  `${config.cloudinaryUrl}image/upload/f_auto,q_auto,c_limit,w_1200/${file}`

watch(
  () => props.currentProjectId,
  () => {
    isLoading.value = true
    currentImageIndex.value = 0
    previousImageIndex.value = null
  }
)

// On phones the project opens as a full-width panel: move focus into it.
watch(
  () => props.isProjectModalOpen,
  open => {
    if (open) nextTick(() => closeBtn.value?.focus())
  }
)

function goTo(index: number) {
  previousImageIndex.value = currentImageIndex.value
  currentImageIndex.value = index
  isLoading.value = true
}

function step(dir: number) {
  direction.value = dir
  const count = project.value.images.length
  const next = (currentImageIndex.value + dir + count) % count
  previousImageIndex.value = currentImageIndex.value
  clearTimeout(stepTimer)
  stepTimer = setTimeout(() => (currentImageIndex.value = next), 250)
}

onBeforeUnmount(() => clearTimeout(stepTimer))
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

.project-wrapper {
  position: fixed;
  top: var(--navbar-height, var(--size-navbar));
  left: 0;
  width: 100%;
  z-index: 900;
  @media (min-width: media.$bp-ms) {
    position: relative;
    top: 0;
    z-index: auto;
    padding: 0 var(--space-4);
  }
}

.mobile-modal {
  display: none;
  @media (min-width: media.$bp-ms) {
    display: block;
  }
}

.modal-open {
  display: flex;
  flex-direction: column;
  @media (min-width: media.$bp-ms) {
    display: block;
  }
}

.project-header {
  position: relative;
  width: 100%;
  background-color: var(--color-scrim-strong);
  padding: var(--space-5) var(--space-4);
  @media (min-width: media.$bp-ms) {
    background-color: transparent;
    max-width: calc(50vw - 2rem);
    padding: var(--space-7) 0 0;
    margin: 0 0 2.2rem;
  }
}

.title {
  display: inline-block;
  width: 85%;
  margin: 0;
  font-size: 1.2rem;
  text-align: left;
  @media (min-width: media.$bp-ms) {
    width: 100%;
    font-size: var(--text-2xl);
    text-align: center;
  }
}

.close-btn {
  position: absolute;
  top: 50%;
  right: var(--space-2);
  min-width: var(--size-touch);
  min-height: var(--size-touch);
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-on-media);
  font-size: var(--text-sm);
  cursor: pointer;
  @media (min-width: media.$bp-ms) {
    display: none;
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--motion-exit);
  &.loading {
    opacity: 1;
    transition: opacity var(--motion-enter);
  }
}

.carousel {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background-color: var(--color-control-surface);
  transition: background-color var(--duration-slow) var(--ease-smooth-out);
}

.controls {
  width: 100%;
  height: 100%;
  .overlay-btn {
    position: absolute;
    width: 50%;
    height: inherit;
    cursor: pointer;
  }
  .overlay-left {
    left: 0;
  }
  .overlay-right {
    right: 0;
  }
  @media (min-width: media.$bp-ms) {
    opacity: 0;
    transition: opacity var(--motion-exit);
    &:hover,
    &:focus-within {
      opacity: 1;
      transition: opacity var(--motion-enter);
    }
  }
}

.item {
  position: absolute;
  left: 50%;
  width: calc(100% - 3rem);
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transform: translate(200%, 0);
  transition: transform var(--duration-medium) var(--ease-smooth-out);
  &.active {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  &.past {
    opacity: 0;
    transform: translate(-50%, 0);
    transition: opacity var(--motion-exit);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.carousel-control {
  position: absolute;
  top: calc(50% - 2.5rem);
  width: 3rem;
  height: 5rem;
  border: none;
  color: var(--palette-ink);
  background-color: var(--color-control-surface);
  cursor: pointer;
  &.carousel-left {
    left: 0;
  }
  &.carousel-right {
    right: 0;
  }
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-4) 0 0;
}

.indicator {
  width: 0.75rem;
  height: 0.75rem;
  padding: 0;
  border: var(--space-hairline) solid var(--color-accent);
  border-radius: var(--radius-pill);
  background-color: var(--palette-white);
  cursor: pointer;
  /* Visual dot stays small; the hit area grows to a comfortable target. */
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: -0.6rem;
  }
  &.active {
    background-color: var(--color-accent);
  }
}

.carousel-caption {
  margin: 0;
  padding: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-wide);
  color: var(--color-on-media);
}
</style>
