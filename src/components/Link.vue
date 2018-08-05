<template>
  <a :data-key="`${to.replace('/','')}`" :href="`${to}`" @click="handleClick"><slot></slot></a>
</template>

<script>
import EventBus from "../EventBus";

export default {
  name: "Link",
  props: {
    to: String
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      const key = this.to.replace("/", "");
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
