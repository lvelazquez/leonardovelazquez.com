<template>
  <a @click="handleClick">{{this.$slots.default[0]['text']}}</a>
</template>

<script>
import EventBus from "../EventBus";

export default {
  name: "Link",
  props: {
    to: ""
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      window.history.pushState({}, "", this.to);
      EventBus.$emit("routechange", this.to);
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
