<template>
  <a
    :href="href"
    :aria-current="current ? 'location' : undefined"
    @click.prevent="emit('navigate', sectionId)"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SectionId } from '../lib/sections'
import { buildPath } from '../lib/sections'

const props = defineProps<{ to: SectionId; current?: boolean }>()
const emit = defineEmits<{ navigate: [id: SectionId] }>()

const sectionId = computed(() => props.to)
const href = computed(() => buildPath(props.to, null, import.meta.env.BASE_URL))
</script>
