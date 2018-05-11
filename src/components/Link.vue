<template>
  <a :data-key="`${to.replace('/','')}`" @click="handleClick">{{this.$slots.default[0]['text']}}</a>
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
      const key = this.to.replace('/','');

      EventBus.$emit("routechange", key);
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
