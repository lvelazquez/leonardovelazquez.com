<template>
    <nav @routechange="isMenuOpen = false" class="navbar" role="navigation" :class="{'navbar-hide': isNavHidden}" >
            <div class="navbar-header">
                <Link class="navbar-logo nav-item" to="/">
                    <BrandLogo type="header" color="black" />
                </Link>
                <div :class="{'navbar-collapse': !isMenuOpen}" class="navbar-right">
                    <ul class="nav-list">
                        <li class="nav-list-item">
                            <Link :nav-offset="navOffset" to="/work" class="nav-item" :class="{active: currentSectionId === 'work' }">Work</Link>
                        </li>
                        <li class="nav-list-item">
                            <Link :nav-offset="navOffset" to="/about" class="nav-item" :class="{active: currentSectionId === 'about' }">About me</Link>
                        </li>
                        <li class="nav-list-item">
                            <Link :nav-offset="navOffset" to="/contact" class="nav-item" :class="{active: currentSectionId === 'contact' }">Contact</Link>
                        </li>
                        <li class="nav-list-item">
                            <a class="nav-item"  href="../src/assets/files/LeonardoVelazquezResume.pdf" download="LeonardoVelazquezResume">
                                <i class="icon-download-alt"></i>
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
                <button class="navbar-menu-btn" @click="isMenuOpen = !isMenuOpen">
                    <i class="icon-menu"></i>
                </button>
            </div>
    </nav>
</template>

<script>
import { Link, BrandLogo } from "./.";
import EventBus from "../EventBus";

export default {
  name: "Nav",
  props: {
    currentSectionId: String,
    navOffset: Number
  },
  data() {
    return {
      isMenuOpen: false,
      isNavHidden: true
    };
  },
  components: {
    BrandLogo,
    Link
  },
  mounted() {
    EventBus.$on("routechange", this.openMenu);
    window.addEventListener("scroll", this.updateNav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateNav);
  },
  updated() {},
  methods: {
    updateNav() {
      this.isNavHidden = window.scrollY === 0;
    },
    openMenu() {
      this.isMenuOpen = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/media-queries";

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  text-transform: uppercase;
  z-index: 1000;
  background-color: $white-color;
  transition: all 0.25s ease-out;
  .top-nav-container {
    background-color: #fff;
    height: 0;
  }
}

.brand-heading {
  margin: 0;
}

.navbar-hide {
  top: -80px;
}

.navbar-collapse {
  display: none;
}

.nav-list-item {
  padding: 0;
  margin: 0;
  display: flex;
  transition: background-color 0.15s ease-out;
  .nav-item {
    cursor: pointer;
    font-weight: 500;
    align-items: center;
    width: 100%;
    padding: 1rem;
    &.active {
      color: $white-color;
      background-color: $black-color;
    }
    @media (min-width: $bp-ms) {
      padding: 1.7rem 1rem 1.7rem;
    }
    @media (min-width: $bp-lg) {
      padding: 2rem;
    }
  }

  &:hover {
    background-color: $gray-color;
  }
}

.nav-list {
  display: block;
  padding: 0;
  margin: 0;
  @media (min-width: $bp-ms) {
    display: flex;
  }
}

.nav-list li:hover,
.nav-list a:hover {
  color: $white-color;
  .download-icon {
    color: $white-color;
  }
}

.download-icon {
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDMzLjUgNDMzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzMy41IDQzMy41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9ImZpbGUtZG93bmxvYWQiPgoJCTxwYXRoIGQ9Ik0zOTUuMjUsMTUzaC0xMDJWMGgtMTUzdjE1M2gtMTAybDE3OC41LDE3OC41TDM5NS4yNSwxNTN6IE0zOC4yNSwzODIuNXY1MWgzNTd2LTUxSDM4LjI1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
  width: 20px;
  height: 18px;
  background-size: cover;
  display: inline-block;
  vertical-align: middle;
}

li:hover .download-icon {
  background-size: cover;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDMzLjUgNDMzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzMy41IDQzMy41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9ImZpbGUtZG93bmxvYWQiPgoJCTxwYXRoIGQ9Ik0zOTUuMjUsMTUzaC0xMDJWMGgtMTUzdjE1M2gtMTAybDE3OC41LDE3OC41TDM5NS4yNSwxNTN6IE0zOC4yNSwzODIuNXY1MWgzNTd2LTUxSDM4LjI1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
}

.navbar-logo {
  position: relative;
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding: 0.75rem 0 0.75rem 0.75rem;
  font-weight: 700;
  .top-logo {
    min-width: 35px;
    position: relative;
    float: left;
    height: auto;
    top: 0px;
    left: 0px;
  }

  &:focus {
    outline: 0;
  }
}

.navbar-menu-btn {
  position: absolute;
  right: 0;
  top: 2rem;
  border: none;
  z-index: 1;
  outline: none;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: $white-color;
  padding: 0.5rem;
  transform: translateY(-50%);
  @media (min-width: $bp-sm) {
    padding: 0.75rem;
    height: 4rem;
  }
}

@media (min-width: $bp-ms) {
  li {
    display: inline-block;
    font-weight: 500;
  }
  .navbar-right {
    display: inline-flex;
    position: relative;
    float: right;
    height: 100%;
    align-items: center;
    .nav-item {
      font-size: 0.8rem;
    }
  }

  .navbar-menu-btn {
    display: none;
  }
}
</style>
