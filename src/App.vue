<template>
  <div id="app" @routechange="handleRouteChange">
    <Nav :isNavHidden="`${isNavHidden}`" currentSection="currentSection"/>
    <Background/>
    <Intro/>
    <Work/>
    <About/>
    <Contact/>
  </div>
</template>

<script>
import { find, map, get, isNumber, isEmpty } from "lodash";
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
      currentSectionId: "intro",
      isNavHidden: true
    };
  },
  mounted() {
    this.introHeader = document.getElementById("intro-header");
    this.videoBg = document.getElementById("site-background");
    this.navHeight = document.querySelector(".navbar").offsetHeight;

    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("popstate", this.handlePopstate);

    EventBus.$on("routechange", this.handleRouteChange);

    this.videoBg.addEventListener("canplay", this.showSite);

    TweenLite.to(this.introHeader, 2, {
      delay: 1,
      alpha: 1,
      ease: Strong.easeOut
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("popstate", this.handlePopstate);
  },
  methods: {
    handlePopstate(e) {
      e.preventDefault();
      // TODO verify that route handling is progressive, anchor fallback?
      this.handleRouteChange(window.location.pathname);
    },
    // TODO click and scroll into view, currently not working
    handleRouteChange(key) {
      if (key !== "/") {
        const section = document.getElementById(key.replace("/", ""));
        if (!isEmpty(section)) {
          window.scrollTo(0, get(section, "offsetTop") - this.navHeight);
        }
      }
    },
    handleScroll() {
      if (window.scrollY > 40) {
        this.videoBg.pause();
      } else {
        this.videoBg.play();
      }

      this.isNavHidden = window.scrollY === 0;

      const scrollY = window.scrollY + this.navHeight;
      this.updateSections(scrollY);
    },
    getTop(id) {
      const el = document.getElementById(id);
      return el === null ? 0 : el.offsetTop;
    },
    updateSections(scrollY) {
      // loops thourhg sections as we scroll so that we can find if we are in the current section
      // TODO add project route to the work section
      // project route has to be remembered in a state object
      // there's an initial default project
      // we can alsoread current project from the dom
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
              history.pushState(null, null, currentId);
              document
                .querySelector(`a[data-key="${currentId}"]`)
                .classList.add("active");
            } else {
              history.pushState(null, null, "/");
            }
          }
        }
      });

      this.updateNavItems();
    },
    updateNavItems() {
      document.querySelectorAll(".nav-item").forEach(navItem => {
        if (this.currentSectionId !== navItem.getAttribute("data-key"))
          navItem.classList.remove("active");
      });
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
          this.handleRouteChange(window.location.pathname);
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
