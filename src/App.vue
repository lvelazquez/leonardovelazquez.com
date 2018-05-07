<template>
  <div id="app" @routechange="handleRouteChange">
    <Nav currentSection="currentSection"/>
    <Background/>
    <Intro/>
    <Work/>
    <About/>
    <Contact/>
  </div>
</template>

<script>
import { find, map, get } from "lodash";
import TweenLite from "gsap/TweenLite";
import "gsap/CSSPlugin";
import { Strong, Circ } from "gsap/EasePack";

import Intro from "./pages/Intro";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";

import EventBus from "./EventBus";
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
  data() {
    return {
      currentSectionId: "intro"
    };
  },
  mounted() {
    this.introHeader = document.getElementById("intro-header");
    this.videoBg = document.getElementById("site-background");
    this.navHeight = document.getElementsByClassName("navbar")[0].offsetHeight;

    this.init();

    window.addEventListener("scroll", this.handleScroll);
    EventBus.$on("routechange", this.handleRouteChange);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    EventBus.$off("routechange", this.handleRouteChange);
  },
  methods: {
    init() {
      TweenLite.to(this.introHeader, 2, {
        delay: 1,
        alpha: 1,
        ease: Strong.easeOut
      });

      this.videoBg.addEventListener("canplay", this.showSite);
    },
    handleRouteChange(route) {
      const key = route.replace("/", "");
      window.scrollTo(0, this.getTop(key) - this.navHeight);
    },
    handleScroll() {
      if (window.scrollY > 40) {
        this.videoBg.pause();
      } else {
        this.videoBg.play();
      }

      const scrollY = window.scrollY + this.navHeight;

      document.querySelectorAll(".nav-item").forEach(navItem => {
        if (this.currentSectionId !== navItem.getAttribute("data-key"))
          navItem.classList.remove("active");
      });

      document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
        const currentId = section.getAttribute("id");

        if (
          scrollY >= section.offsetTop &&
          scrollY <= section.offsetTop + section.offsetHeight
        ) {
          if (currentId !== this.currentSectionId) {
            this.currentSectionId = currentId;
            if (currentId !== "intro") {
              history.pushState({}, "", currentId);
              document
                .querySelector(`a[data-key="${currentId}"]`)
                .classList.add("active");
            } else {
              history.pushState({}, "", "");
            }
          }
        }
      });
    },
    getTop(id) {
      const el = document.getElementById(id);
      return el === null ? 0 : el.offsetTop - document.body.scrollTop;
    },
    showSite() {
      TweenLite.to(this.videoBg, 1.5, {
        alpha: 1,
        ease: Circ.easeOut,
        delay: 4,
        onStart: () => {
          this.introHeader.classList.remove("loader");
          document
            .querySelectorAll("section")
            .forEach(section => section.classList.remove("invisible"));
        }
      });
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
