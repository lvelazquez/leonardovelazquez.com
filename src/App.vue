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
import TweenLite from "gsap/TweenLite";
import "gsap/CSSPlugin";
import { Strong, Circ } from "gsap/EasePack";

import Intro from "./pages/Intro";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";

import NavBus from "./NavBus";
import Nav from "./components/Nav.vue";
import Background from "./components/Background";

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
    this.introHeader = document.getElementById("intro-header");
    this.contentSection = document.querySelectorAll(".content-section");
    this.videoBg = document.getElementById("site-background");
    this.navHeight = document.getElementsByClassName("navbar")[0].offsetHeight;

    this.init();

    window.addEventListener("scroll", this.handleScroll);
    NavBus.$on("routechange", this.handleRouteChange);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
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
    },
    showSite() {
      this.contentSection.forEach(section =>
        section.classList.remove("invisible")
      );
      TweenLite.to(this.videoBg, 2, {
        alpha: 1,
        ease: Circ.easeOut,
        delay: 4,
        onStart: () => {
          this.introHeader.classList.remove("loader");
        }
      });
    },
    init() {
      TweenLite.to(this.introHeader, 2, {
        delay: 1,
        alpha: 1,
        ease: Strong.easeOut
      });

      this.videoBg.addEventListener("canplay", this.showSite);
    }
  }
};
</script>

<style lang="scss">
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
.invisible {
  display: none;
}
</style>
