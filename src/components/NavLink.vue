<template>
  <a
    :href="`${to}`"
    v-scroll-to="{ offset: navOffset, el: `#${this.sectionId}` }"
    :data-id="`${this.sectionId}`"
    @click="handleClick"
  >
    <slot></slot>
  </a>
</template>

<script>
import { useScrollTo } from 'vue-scrollto'
import EventBus from '../EventBus'

export default {
  name: 'NavLink',
  props: {
    to: String,
    navOffset: {
      default: -80,
      type: Number,
    },
  },
  data() {
    return {
      sectionId: '',
    }
  },
  mounted() {
    this.sectionId = this.to === '/' ? 'intro' : this.to.replace('/', '')
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      if (this.to !== location.pathname) {
        EventBus.emit('routechange')
      }
    },
  },
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
