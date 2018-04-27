<template>
  <a @click="handleClick">{{this.$slots.default[0]['text']}}</a>
</template>

<script>
import NavBus from "./NavBus";

export default {
  name: "Link",
  props: {
    to: ""
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      window.history.pushState({}, "", this.to);
      NavBus.$emit("routechange", this.to);
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
