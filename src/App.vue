<template>
  <div id="app">
    <Nav />
    <Background />
    <Intro />
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
@import "~reset-css";
a {
  text-decoration: none;
}
body {
  margin: 0;
}

section {
  height: 100vh;
}
</style>
