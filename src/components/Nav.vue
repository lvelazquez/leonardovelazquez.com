<template>
    <nav class="navbar" role="navigation" :class="{'navbar-hide': isNavHidden}" >
            <div class="navbar-header">
                <button class="navbar-menu-btn" @click="isMenuOpen = !isMenuOpen">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-logo nav-item" href="#/">
                    <BrandLogo type="header" color="black" />
                </a>
                <div :class="{'navbar-collapse': !isMenuOpen, 'navbar-right':true }">
                    <ul class="nav-list">
                        <li>
                            <Link to="/work" class="nav-item">Work</Link>
                        </li>
                        <li>
                            <Link to="/about" class="nav-item">About me</Link>
                        </li>
                        <li>
                            <Link to="/contact" class="nav-item">Contact</Link>
                        </li>
                        <li>
                            <a class="nav-item"  href="../src/assets/files/LeonardoVelazquezResume.pdf" download="LeonardoVelazquezResume">
                                <i class="download-icon"></i>
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
    </nav>
</template>

<script>
import BrandLogo from "./BrandLogo";
import Link from "./Link";
import NavBus from "./NavBus";

export default {
  name: "Nav",
  data() {
    return {
      isMenuOpen: false,
      isNavHidden: false
    };
  },
  components: {
    BrandLogo,
    Link
  },
  props: {},
  created() {
    NavBus.$on("routechange", o => {
      this.isMenuOpen = false;
    });
    window.addEventListener("scroll", this.updateNav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateNav);
  },
  methods: {
    updateNav() {
      this.isNavHidden = window.scrollY === 0;
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
  height: 5rem;
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

.navbar-header {
  background-color: $white-color;
}

.navbar-hide {
  top: -80px;
}

.navbar-collapse {
  display: none;
}

.nav-list li {
  .nav-item {
    height: 100%;
    cursor: pointer;
    display: flex;
    font-weight: 500;
    @media (min-width: $bp-ms) {
      display: inline-flex;
    }
    align-items: center;
    padding: 0 1rem 0;
  }
}

.nav-list li:hover {
  background-color: $black-color;
}

.nav-list li:hover,
.nav-list a:hover {
  color: $white-color;
  .download-icon {
    color: $white-color;
  }
}

.nav-list li.active {
  color: $white-color;
  background-color: $black-color;
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
  font-weight: 700;
  display: inline-flex;
  height: 100%;
  align-items: center;
  padding-left: 1rem;
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
  position: relative;
  float: right;
  border: none;
  z-index: 1;
  outline: none;
  font-size: 1.5rem;
  height: 100%;
  padding-right: 1rem;
  cursor: pointer;
  background-color: $white-color;
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
