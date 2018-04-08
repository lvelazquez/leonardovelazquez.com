<template>
    <nav role="navigation" :class="updateNav">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand nav-item" href="#/">
                    <BrandLogo logoWidth="40px" logoHeight="40px" color="black" fontSize="1.55rem" responsive />
                </a>
                <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                    <ul class="nav-list navbar-nav">
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
                            <a href="../src/assets/files/LeonardoVelazquezResume.pdf" download="LeonardoVelazquezResume">
                                <i class="download-icon"></i>
                                Resume
                            </a>

                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
    </nav>
</template>

<script>
import BrandLogo from "./BrandLogo";

export default {
  name: "Nav",
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/settings";

.brand-heading {
  margin: 0;
}

nav {
  position: fixed;
  width: 100%;
  height: 50px;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  ul {
    margin-right: 10px;
  }

  .top-nav-container {
    background-color: #fff;
    height: 0;
  }
}

.navbar-header {
  background-color: $white-color;
}

.navbar-hide {
  top: -50px;
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

.navbar-brand {
  position: relative;
  left: 5px;
}

.navbar-brand {
  font-weight: 700;
  display: block;
  padding: 0.5rem;
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

.table tbody tr:hover td,
.table tbody tr:hover th {
  background-color: transparent;
}

a .download-icon {
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

.nav-list li {
  padding: 1rem;
  cursor: pointer;
}

.navbar-collapse .navbar-brand {
  padding: 0;
  margin: 0;
  height: auto;
}
.navbar-main-collapse {
  position: relative;
  background-color: #fff;
}

.navbar-toggle {
  position: relative;
  float: right;
  border: none;
}

.navbar-toggle {
  font-size: 1.9rem;
  height: 100%;
}
</style>
