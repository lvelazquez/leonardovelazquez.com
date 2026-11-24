<template>
  <div class="background" :class="{ loaded: isLoaded }" aria-hidden="true">
    <video
      ref="video"
      :poster="`${config.cloudinaryUrl}video/upload/f_auto,q_auto/lakehi.jpg`"
      preload="auto"
      loop
      muted
      playsinline
      tabindex="-1"
    >
      <source
        :src="`${config.cloudinaryUrl}video/upload/f_auto,q_auto/lakehi.mp4`"
        type="video/mp4"
      />
    </video>
    <div class="scrim"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import config from '../config'
import { prefersReducedMotion } from '../lib/motion'

const props = defineProps<{ isPlaying: boolean }>()
const emit = defineEmits<{ 'is-ready': [] }>()

const video = ref<HTMLVideoElement | null>(null)
const isLoaded = ref(false)
let fallbackTimer: ReturnType<typeof setTimeout> | undefined

function ready() {
  if (isLoaded.value) return
  isLoaded.value = true
  emit('is-ready')
}

function setPlaying(playing: boolean) {
  const el = video.value
  if (!el) return
  // Reduced motion: show the still poster frame and never start playback.
  if (!playing || prefersReducedMotion()) el.pause()
  else el.play().catch(() => {}) // autoplay can be blocked by the browser; the poster stays visible
}

watch(() => props.isPlaying, setPlaying)

onMounted(() => {
  const el = video.value
  if (!el) return
  if (el.readyState >= el.HAVE_FUTURE_DATA || prefersReducedMotion()) ready()
  else el.addEventListener('canplay', ready, { once: true })
  fallbackTimer = setTimeout(ready, 4000)
})

onBeforeUnmount(() => {
  clearTimeout(fallbackTimer)
  video.value?.removeEventListener('canplay', ready)
})
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--duration-extra-slow) var(--ease-smooth-out);
}

.background.loaded {
  opacity: 1;
}

video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Keeps light text readable over bright frames of the video (WCAG AA). */
.scrim {
  position: absolute;
  inset: 0;
  background: var(--color-scrim);
}
</style>
