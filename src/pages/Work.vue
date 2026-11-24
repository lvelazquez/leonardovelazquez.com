<template>
  <section id="work" class="content-section" aria-labelledby="work-heading">
    <div class="work-container">
      <div class="work-column">
        <h2 id="work-heading">Work</h2>
        <ul class="thumbs-container">
          <li v-for="(project, id) in projectData" :key="id">
            <button
              type="button"
              class="thumb-item"
              :class="{ selected: id === currentProjectId }"
              :aria-pressed="id === currentProjectId"
              :style="{
                paddingTop: `${(Number(project.thumbHeight) / Number(project.thumbWidth)) * 100}%`,
              }"
              @click="onSelect(id, $event)"
            >
              <img
                loading="lazy"
                decoding="async"
                :alt="project.title"
                :width="project.thumbWidth"
                :height="project.thumbHeight"
                :src="imageUrl(project.thumb, 400)"
                :srcset="`${imageUrl(project.thumb, 400)} 400w, ${imageUrl(project.thumb, 800)} 800w`"
                sizes="(min-width: 768px) 14vw, 100vw"
              />
              <span class="details" aria-hidden="true">
                <span>{{ project.title }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div class="work-column">
        <Project
          :current-project-id="currentProjectId"
          :is-project-modal-open="isProjectModalOpen"
          @close="onClose"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import projectData from '../data'
import config from '../config'
import { Project } from '../components/'

defineProps<{ currentProjectId: string; isProjectModalOpen: boolean }>()
const emit = defineEmits<{ select: [id: string]; close: [] }>()

let lastThumb: HTMLElement | null = null

function imageUrl(thumb: string, width: number) {
  return `${config.cloudinaryUrl}image/upload/f_auto,q_auto,c_limit,w_${width}/${thumb}`
}

function onSelect(id: string, event: MouseEvent) {
  lastThumb = event.currentTarget as HTMLElement
  emit('select', id)
}

function onClose() {
  emit('close')
  lastThumb?.focus()
}
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

/* The work grid runs edge to edge; only the thumbnails and project panel carry their own inset. */
#work.content-section {
  padding-inline: 0;
}

.work-container {
  @media (min-width: media.$bp-ms) {
    display: flex;
  }
}

.work-column {
  width: 100%;
  @media (min-width: media.$bp-ms) {
    flex: 1;
    max-width: 50vw;
  }
}

.thumbs-container {
  @media (min-width: media.$bp-ms) {
    column-count: 3;
    column-gap: var(--space-1);
    padding-left: var(--space-4);
  }
}

.thumb-item {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding: 0;
  margin-bottom: var(--space-1);
  overflow: hidden;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  break-inside: avoid-column;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  &.selected {
    outline: 3px solid var(--color-accent);
    outline-offset: -3px;
  }
  &:focus-visible {
    outline-offset: -3px;
  }

  .details {
    display: none;
    position: absolute;
    inset: 0;
    align-items: center;
    overflow: hidden;
    pointer-events: none;
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    line-height: 1;
    text-align: left;
    text-transform: uppercase;
    color: var(--palette-ink-soft);
    background: var(--color-caption-wash);
    opacity: 0;
    transition: opacity var(--motion-exit);
    @media (min-width: media.$bp-ms) {
      display: flex;
    }
    @media (min-width: media.$bp-lg) {
      font-size: var(--text-lg);
    }

    > span {
      flex: 1;
      padding: var(--space-1);
      transform: translateX(-100%);
      transition: transform var(--motion-exit);
    }
  }

  &:hover .details,
  &:focus-visible .details {
    opacity: 1;
    transition: opacity var(--motion-enter);
    > span {
      transform: translateX(0);
      transition: transform var(--duration-medium) var(--ease-smooth-out);
    }
  }
}
</style>
