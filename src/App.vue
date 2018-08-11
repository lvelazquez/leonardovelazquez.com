<template>
  <div id="app">
    <Nav :is-nav-hidden="`${isNavHidden}`"/>
    <Background :is-playing ="isVideoPlaying" @is-ready="onReady" />
    <Intro :is-loaded="isLoaded"/>
    <Work :is-loaded="isLoaded"/>
    <About :is-loaded="isLoaded"/>
    <Contact :is-loaded="isLoaded"/>
  </div>
</template>

<script>
import { find, map, get, isNumber, isEmpty } from 'lodash';
import { Intro, Work, About, Contact } from './pages/';
import { Nav, Background } from './components/';

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo, { offset: -80 });

export default {
  name: 'app',
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
      currentSectionId: 'intro',
      isLoaded: false,
      isVideoPlaying: false,
      isNavHidden: true
    };
  },
  mounted() {
    this.navHeight = document.querySelector('.navbar').offsetHeight;
    this.navItems = document.querySelectorAll('.nav-list .nav-item');
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('popstate', this.handlePopstate);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('popstate', this.handlePopstate);
  },
  methods: {
    handlePopstate(e) {
      e.preventDefault();
      const sectionId = window.location.pathname.replace('/', '');
      const cancelScroll = this.$scrollTo(`#${sectionId}`, 100);
      cancelScroll();
    },
    // TODO click and scroll into view, currently not working
    handleScrollToSection(key) {
      if (key !== '') {
        const section = document.getElementById(key);
        if (!isEmpty(section)) {
          const sectionTop = get(section, 'offsetTop');
          window.scrollTo(0, sectionTop - this.navHeight);
        }
      } else {
        window.scrollTo(0, 0);
      }
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
    updateRoute(id) {
      this.currentSectionId = id;
      history.replaceState(null, null, id);
    },
    updateSections(scrollY) {
      // TODO add project route to the work section
      this.sections = document.querySelectorAll('section');
      // we can alsoread current project from the dom
      const currentRoute = window.location.pathname.replace('/', '');
      console.log(currentRoute, 'currentRoute');
      this.sections.forEach(section => {
        section.classList.remove('active');
        const currentId = section.getAttribute('id');
        if (
          scrollY >= section.offsetTop &&
          scrollY <= section.offsetTop + section.offsetHeight
        ) {
          if (currentId !== currentRoute) {
            if (currentId !== 'intro') {
              this.updateRoute(currentId);
            } else {
              this.updateRoute('/');
            }
            this.updateNavItems(currentRoute);
          }
        }
      });
    },
    updateNavItems(currentRoute) {
      if (!currentRoute) return;
      this.navItems.forEach(navItem => {
        if (this.currentSectionId === navItem.getAttribute('data-id')) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      });
    },
    onReady() {
      this.isLoaded = true;
      this.isVideoPlaying = true;
      this.$nextTick(() => {
        const key = window.location.pathname.replace('/', '');
        // this.handleScrollToSection(key);
        this.updateNavItems(key);
      });
    }
  }
};
</script>

<style lang="scss">
@import './styles/base.css';

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
