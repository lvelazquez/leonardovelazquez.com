<template>
  <div id="app" @routechange="handleRouteChange">
    <Nav />
    <Background />
    <Intro />
    <About />
    <Contact />
  </div>
</template>

<script>
import { find } from "lodash";
import Nav from "./components/Nav.vue";
import NavBus from "./components/NavBus";
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
  mounted() {
    this.navHeight = document.getElementsByClassName("navbar")[0].offsetHeight;
    window.addEventListener("scroll", this.handleScroll);
    NavBus.$on("routechange", this.handleRouteChange);
  },
  destroyed() {
    NavBus.$off("routechange", this.handleRouteChange);
  },
  methods: {
    handleRouteChange(route) {
      const key = route.replace("/", "");
      window.scrollTo(0, this.getTop(key) - this.navHeight);
    },
    handleScroll() {},
    getTop(id) {
      const el = document.getElementById(id);
      return el === null ? 0 : el.offsetTop - document.body.scrollTop;
    }
  }
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
  padding-top: 3rem;
}
</style>
