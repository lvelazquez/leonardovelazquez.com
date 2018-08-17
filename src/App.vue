<template>
  <div id="app">
    <Nav :is-nav-hidden="`${isNavHidden}`"/>
    <Background :is-playing ="isVideoPlaying" @is-ready="onReady" />
    <Intro :is-loaded="isLoaded"/>
    <Work :is-loaded="isLoaded" :isProjectModalOpen="isProjectModalOpen" :currentProjectId="projectId"/>
    <About :is-loaded="isLoaded"/>
    <Contact :is-loaded="isLoaded"/>
  </div>
</template>

<script>
import { find, map, get, isNumber, isEmpty, throttle } from "lodash";
import { Intro, Work, About, Contact } from "./pages/";
import { Nav, Background } from "./components/";
import projectData from "./data";

import Vue from "vue";
import VueScrollTo from "vue-scrollto";
Vue.use(VueScrollTo, { offset: -80 });

const routes = {
  "": {
    sectionId: "intro"
  },
  work: {
    sectionId: "work"
  },
  about: {
    sectionId: "about"
  },
  contact: {
    sectionId: "contact"
  }
};

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
      isVideoPlaying: false,
      isNavHidden: true,
      projectId: Object.keys(projectData)[0],
      isProjectModalOpen: false
    };
  },
  mounted() {
    this.navHeight = document.querySelector(".navbar").offsetHeight;
    this.navItems = document.querySelectorAll(".nav-list .nav-item");

    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("popstate", this.handlePopstate);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("popstate", this.handlePopstate);
  },
  methods: {
    scrollTo(sectionId) {
      this.$scrollTo(`#${sectionId}`, 100);
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
      this.scrollTo(sectionId);
      if (sectionId === "work" && keys.length > 2) {
        this.projectId = keys[2];
      }
    },
    updateRoute(id) {
      if (id !== this.currentSectionId) {
        this.currentSectionId = id;
        if (id === "work" && this.projectId) {
          id = `work/${this.projectId}`;
        } else if (id === "intro") {
          id = "";
        }
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

          if (this.isProjectModalOpen && currentRoute !== "work") {
            this.isProjectModalOpen = false;
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
