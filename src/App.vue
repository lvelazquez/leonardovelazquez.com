<template>
  <div id="app" @routechange="handleRouteChange">
    <Nav :isNavHidden="`${isNavHidden}`" :currentSectionId="currentSectionId"/>
    <Background/>
    <Intro/>
    <Work :currentSectionId="currentSectionId" :isLoaded="isLoaded"/>
    <About :currentSectionId="currentSectionId" :isLoaded="isLoaded"/>
    <Contact :currentSectionId="currentSectionId" :isLoaded="isLoaded"/>
  </div>
</template>

<script>
  import {find, map, get, isNumber, isEmpty} from "lodash";
  import TweenLite from "gsap/TweenLite";
  import "gsap/CSSPlugin";
  import {Strong, Circ} from "gsap/EasePack";

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
        isLoaded: false,
        isNavHidden: true
      };
    },
    mounted() {
      this.introHeader = document.getElementById("intro-header");
      this.videoBg = document.getElementById("site-background");
      this.navHeight = document.querySelector(".navbar").offsetHeight;

      window.addEventListener("scroll", this.handleScroll, {passive: true});
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
      EventBus.$off("routechange", this.handleRouteChange);
      this.videoBg.removeEventListener("canplay", this.showSite);
    },
    methods: {
      handlePopstate(e) {
        e.preventDefault();
        // TODO verify that route handling is progressive, anchor fallback?
        this.handleRouteChange(window.location.pathname);
      },
      // TODO click and scroll into view, currently not working
      handleRouteChange(route) {
        const key = route.replace("/", "");
        if (key !== "") {
          const section = document.getElementById(key);
          if (!isEmpty(section)) {
            window.scrollTo(0, get(section, "offsetTop") - this.navHeight);
          }
        } else {
          window.scrollTo(0, 0);
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
        // TODO add project route to the work section
        this.sections = document.querySelectorAll("section");
        // we can alsoread current project from the dom
        this.sections.forEach(section => {
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
            this.isLoaded = true;
            this.videoBg.play();
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
