<template>
  <div id="app">
    <main-nav
      :resume-link="resumeLink"
      :current-section-id="currentSectionId"
      :is-nav-hidden="`${isNavHidden}`"
      :nav-offset="-navHeight"
    />
    <background :is-playing="isVideoPlaying" @is-ready="onReady"/>
    <intro :nav-offset="-navHeight" :is-loaded="isLoaded"/>
    <work
      :is-active="currentSectionId === 'work'"
      :is-loaded="isLoaded"
      :isProjectModalOpen="isProjectModalOpen"
      :currentProjectId="projectId"
    />
    <about :is-loaded="isLoaded"/>
    <contact :is-loaded="isLoaded"/>
  </div>
</template>

<script>
import { throttle } from "lodash";
import { Intro, Work, About, Contact } from "./pages/";
import { MainNav, Background } from "./components/";
import projectData from "./data";
import EventBus from "./EventBus";

import Vue from "vue";

// global vue plugins
import VueScrollTo from "vue-scrollto";
import VueTinyLazyloadImg from "vue-tiny-lazyload-img";

const RESUME_LINK = `https://docs.google.com/document/d/1JaojBFdGMaM_Hm5qHArmPrXSBguRnJSmCM-q7t6ruBc/export?format=pdf`;

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

Vue.use(VueTinyLazyloadImg);

export default {
  name: "app",
  components: {
    background: Background,
    "main-nav": MainNav,
    intro: Intro,
    about: About,
    work: Work,
    contact: Contact
  },
  data() {
    return {
      currentSectionId: null,
      isLoaded: false,
      isVideoPlaying: false,
      isNavHidden: true,
      navHeight: null,
      resumeLink: RESUME_LINK,
      projectId: Object.keys(projectData)[0],
      isProjectModalOpen: false
    };
  },
  mounted() {
    this.navHeight = document.querySelector(".navbar").offsetHeight + 5;
    this.navItems = document.querySelectorAll(".nav-list .nav-item");

    window.addEventListener("scroll", throttle(this.handleScroll, 100), {
      passive: true
    });
    window.addEventListener("popstate", this.handlePopstate);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    EventBus.$on("routechange", this.handleRouteChange);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("popstate", this.handlePopstate);
  },
  methods: {
    scrollTo(sectionId) {
      this.$scrollTo(`#${sectionId}`, 100);
    },
    handleRouteChange(sectionId) {
      history.replaceState(null, null, sectionId);
      this.$scrollTo(`#${sectionId}`, 200, {
        easing: "ease-in-out",
        offset: -this.navHeight
      });
    },
    handleResize() {
      this.navHeight = document.querySelector(".navbar").offsetHeight;
    },
    handleScroll() {
      if (window.scrollY > 40) {
        this.isVideoPlaying = false;
      } else {
        this.isVideoPlaying = true;
      }
      this.isNavHidden = window.scrollY === 0;
      const scrollY = window.scrollY + this.navHeight;
      this.updateSections(scrollY);
    },
    handlePopstate(e) {
      e.preventDefault();

      const keys = window.location.pathname.split("/");
      const sectionId = keys[1];
      if (window.innerWidth > 750) {
        this.scrollTo(sectionId);
      }
      if (sectionId === "work" && keys.length > 2) {
        this.projectId = keys[2];
        this.isProjectModalOpen = true;
      } else {
        this.isProjectModalOpen = false;
      }
    },
    updateRoute(id) {
      if (id !== this.currentSectionId) {
        this.currentSectionId = id;
        if (id === "work" && this.projectId) {
          id = `work/${this.projectId}`;
          this.isProjectModalOpen = true;
        } else if (id === "intro") {
          id = "";
        }
        this.isProjectModalOpen = false;
        history.replaceState(null, null, `/${id}`);
      }
    },
    updateSections(scrollY) {
      const currentRoute = window.location.pathname.split("/")[1];
      this.sections = document.querySelectorAll("section");
      this.sections.forEach(section => {
        section.classList.remove("active");
        const currentId = section.getAttribute("id");
        if (
          scrollY >= section.offsetTop &&
          scrollY < section.offsetTop + section.offsetHeight
        ) {
          if (currentId !== currentRoute) {
            this.updateRoute(currentId);
            this.updateNavItems(currentId);
          }
        }
      });
    },
    updateNavItems(currentRoute) {
      if (!currentRoute) return;
      this.navItems.forEach(navItem => {
        if (currentRoute === navItem.getAttribute("data-id")) {
          navItem.classList.add("active");
        } else {
          navItem.classList.remove("active");
        }
      });
    },
    onReady() {
      this.isLoaded = true;
      this.isVideoPlaying = true;
      this.$nextTick(() => {
        const keys = window.location.pathname.split("/");
        const currentSectionId = keys[1] === "" ? "intro" : keys[1];

        if (currentSectionId === "work" && keys.length > 2) {
          this.projectId = keys[2];
        } else {
          this.isProjectModalOpen = false;
        }
        this.currentSectionId = currentSectionId;
        this.scrollTo(currentSectionId);
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
