<template>
    <nav role="navigation" :class="updateNav">
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
                            <a href="#/work" class="nav-item" data-target="#work">Work</a>
                        </li>
                        <li>
                            <a href="#/about" class="nav-item" data-target="#about">About me</a>
                        </li>
                        <li>
                            <a href="#/contact" class="nav-item" data-target="#contact">Contact</a>
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

export default {
  name: "Nav",
  data: function() {
    return {
      isMenuOpen: false
    };
  },
  components: {
    BrandLogo
  },
  props: {},
  created() {
    this.updateNav = this.updateNav.bind(this);
    window.addEventListener("scroll", this.updateNav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateNav);
  },
  methods: {
    updateNav() {
      return window.scrollY === 0 ? "navbar-hide" : "";
    },
    handleMenu() {
      console.log("handle menu");
      // this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/media-queries";

nav {
  position: fixed;
  width: 100%;
  height: 5rem;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  z-index: 1000;
  background-color: $white-color;
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
  top: -50px;
}

.navbar-collapse {
  display: none;
}

.nav-list li {
  padding: 1rem;
  cursor: pointer;
}

.nav-list li:hover,
.nav-list a:hover {
  background-color: $black-color;
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
  left: 5px;
  font-weight: 700;
  display: inline-flex;
  height: 100%;
  align-items: center;
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
}

.navbar-menu-btn {
  font-size: 1.9rem;
  height: 100%;
  cursor: pointer;
}
@media (min-width: $bp-ms) {
  li {
    display: inline-block;
  }

  .navbar-right {
    display: inline-flex;
    position: relative;
    float: right;
    height: 100%;
    align-items: center;
    .nav-item {
      font-size: 0.8rem;
      display: inline-block;
    }
  }

  .navbar-menu-btn {
    display: none;
  }
}

@media (min-width: $bp-ms) {

}

</style>
