<template>
  <div id="app">
    <Background />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Background from "./components/Background";
import Intro from "./components/pages/Intro";

export default {
  name: "app",
  components: {
    Background,
    Nav,
    Intro
  },
  created() {}
};
</script>

<style>
body {
  margin: 0;
}
</style>
