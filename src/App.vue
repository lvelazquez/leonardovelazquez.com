<template>
  <div id="app" @routechange="handleRouteChange">
    <Nav :is-nav-hidden="`${isNavHidden}`" :current-section-id="currentSectionId"/>
    <Background :is-playing ="isVideoPlaying" @is-ready="onReady" />
    <Intro :is-loaded="isLoaded"/>
    <Work :current-section-id="currentSectionId" :is-loaded="isLoaded"/>
    <About :current-section-id="currentSectionId" :is-loaded="isLoaded"/>
    <Contact :current-section-id="currentSectionId" :is-loaded="isLoaded"/>
  </div>
</template>

<script>
import { find, map, get, isNumber, isEmpty } from 'lodash';
import EventBus from './EventBus';
import { Intro, Work, About, Contact } from './pages/';
import { Nav, Background } from './components/';

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
    this.navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('popstate', this.handlePopstate);
    EventBus.$on('routechange', this.handleRouteChange);
    this.handleScroll = this.handleScroll.bind(this);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('popstate', this.handlePopstate);
    EventBus.$off('routechange', this.handleRouteChange);
  },
  methods: {
    handlePopstate(e) {
      e.preventDefault();
      // TODO verify that route handling is progressive, anchor fallback?
      this.handleRouteChange(window.location.pathname);
    },
    // TODO click and scroll into view, currently not working
    handleRouteChange(route) {
      const key = route.replace('/', '');
      if (key !== '') {
        const section = document.getElementById(key);
        if (!isEmpty(section)) {
          window.scrollTo(0, get(section, 'offsetTop') - this.navHeight);
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
    getTop(id) {
      const el = document.getElementById(id);
      return el === null ? 0 : el.offsetTop;
    },
    updateSections(scrollY) {
      // TODO add project route to the work section
      this.sections = document.querySelectorAll('section');
      // we can alsoread current project from the dom
      this.sections.forEach(section => {
        section.classList.remove('active');
        const currentId = section.getAttribute('id');
        if (
          scrollY >= section.offsetTop &&
          scrollY <= section.offsetTop + section.offsetHeight
        ) {
          if (currentId !== this.currentSectionId) {
            this.currentSectionId = currentId;
            if (currentId !== 'intro') {
              history.pushState(null, null, currentId);
            } else {
              history.pushState(null, null, '/');
            }
            this.updateNavItems();
          }
        }
      });
    },
    updateNavItems() {
      this.navItems.forEach(navItem => {
        if (this.currentSectionId !== navItem.getAttribute('data-id'))
          navItem.classList.remove('active');
      });
    },
    onReady() {
      this.isLoaded = true;
      this.isVideoPlaying = true;
      this.handleRouteChange(window.location.pathname);
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
