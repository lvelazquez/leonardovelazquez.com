<template>
    <section class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="header logo-header">
                        <svg class="site-logo"  version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="68.715px" height="71.741px" viewBox="0 0 68.715 71.741" enable-background="new 0 0 68.715 71.741" xml:space="preserve">
                        <polygon id="svgLogo" class="logoLoader" points="68.354,0.556 32.797,55.055 67.115,55.055 67.115,71.741
	0,71.741 0.175,0.556 0.175,0 16.862,0 16.862,44.421 45.832,0.556 46.197,0 68.715,0 "/>
                    </svg>
                        <h1 class="brand-heading">
                            <span class="titleLoader">Leonardo Vel&aacute;zquez</span>
                            <span class="subheader titleLoader">Software Engineer</span></h1>

                        <ul class="nav navbar-nav centered">
                            <li class="intro-nav">
                                <router-link href="#/work" class="nav-item">Work</router-link>
                            </li>
                            <li class="intro-nav">
                                <a href="#/about" class="nav-item">About me</a>
                            </li>
                            <li class="intro-nav">
                                <a href="#/contact" class="nav-item">Contact</a>
                            </li>
                        </ul>
                        <div class="page-scroll">
                            <a href="#/work" class="btn-lv nav-item" data-target="#work">
                                <i class="glyphicon glyphicon-chevron-down animated"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "Intro",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.intro {
  display: table;
  width: 100%;
  height: 100vh;
  padding: 100px 0;
  text-align: center;
  color: #fff;

  .logo-header {
    opacity: 0;
  }

  .intro-nav a {
    text-decoration: none;
  }

  .intro-body {
    display: table-cell;
    vertical-align: middle;
    a {
      color: #fff;
      font-size: 40px;
    }
  }

  .intro-text {
    font-size: 18px;
  }

  .header {
    position: relative;
    width: 622px;
    height: 75px;
    margin: 0 auto;

    .subheader {
      position: relative;
      left: 24px;
    }

    ul {
      padding-top: 10px;
      width: 540px;
    }
  }

  .page-scroll {
    clear: both;
    > i.animated {
      top: 8px;
      -webkit-transition-property: -webkit-transform;
      -webkit-transition-duration: 1s;
      -moz-transition-property: -moz-transform;
      -moz-transition-duration: 1s;
    }

    &:hover > .animated {
      -webkit-animation-name: pulse;
      -moz-animation-name: pulse;
      -webkit-animation-duration: 1.5s;
      -moz-animation-duration: 1.5s;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
    }
  }

  .btn-lv {
    width: 70px;
    height: 70px;
    margin-top: 15px;
    padding: 7px 16px;
    font-size: 40px;
    color: #fff;
    background: 0 0;
    -webkit-transition: background 0.3s ease-in-out;
    -moz-transition: background 0.3s ease-in-out;
    transition: background 0.3s ease-in-out;
  }
}

.header {
  .logo-copy {
    float: left;
    margin-left: 5px;
  }
}

#site-background {
  z-index: -1000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: block;
  position: fixed;

  .fullscreen {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    transform: translate(-50%, -50%);
  }

  .background-poster {
    opacity: 0;
  }
}

@media (min-width: 767px) {
  .intro {
    height: 100%;
    -webkit-transition: height 1s ease-out;
    padding: 0;

    .brand-heading {
      font-size: 40px;
      float: right;
    }
    .brand-heading > span,
    .site-logo > polygon {
      -webkit-transition: color 0.4s ease-out, fill 0.4s ease-out;
    }
    .brand-heading > span {
      color: #fff;
    }
    .site-logo > polygon {
      fill: #fff;
    }

    .site-logo {
      position: absolute;
      width: 69px;
      height: 72px;
      left: 0;
      top: 7px;
    }

    .intro-text {
      font-size: 25px;
    }
  }
}
</style>
