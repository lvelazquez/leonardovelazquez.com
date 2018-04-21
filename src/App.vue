<template>
  <div id="app">
    <Nav />
    <Background />
    <Intro />
    <About />
    <Contact />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Background from "./components/Background";
import Intro from "./components/pages/Intro";
import Work from "./components/pages/Work";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

export default {
  name: "app",
  components: {
    Background,
    Nav,
    Intro,
    About,
    Work,
    Contact
  },
  created() {}
};
</script>

<style>
@import "~reset-css";
@import "./styles/base.css";

a {
  text-decoration: none;
}
body {
  margin: 0;
}
h2 {
  padding-top: 4rem;
}
</style>
