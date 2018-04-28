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
import NavBus from "./NavBus";
import Background from "./components/Background";
import Intro from "./pages/Intro";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
    this.videoBg = document.getElementById("site-background");
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
    handleScroll() {
      if (window.scrollY > 20) {
        this.videoBg.pause();
      } else {
        this.videoBg.play();
      }
    },
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
