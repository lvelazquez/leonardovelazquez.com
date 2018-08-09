<template>
  <a :href="`${to}`" :data-id="`${this.sectionId}`" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script>
import EventBus from "../EventBus";

export default {
  name: "Link",
  props: {
    to: String
  },
  data() {
    return {
      sectionId: ""
    };
  },
  mounted() {
    this.sectionId = this.to.replace("/", "");
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      if (this.to !== location.pathname) {
        EventBus.$emit("routechange", this.sectionId);
      }
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
