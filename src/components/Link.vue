<template>
  <a :href="`${to}`" v-scroll-to="{offset: navOffset, el:`#${this.sectionId}`}" :data-id="`${this.sectionId}`" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script>
import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import { get } from "lodash";
import EventBus from "../EventBus";

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease-in-out",
  offset: -80,
  cancelable: true,
  x: false,
  y: true
});

export default {
  name: "Link",
  mixins: { VueScrollTo },
  props: {
    to: String,
    navOffset: {
      default: -80,
      type: Number
    }
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
        EventBus.$emit("routechange");
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
