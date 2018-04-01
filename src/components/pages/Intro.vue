<template>
    <section class="intro">
        <div class="intro-container">
                    <div class="intro-header">
                        <svg class="logo"  version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="68.715px" height="71.741px" viewBox="0 0 68.715 71.741" enable-background="new 0 0 68.715 71.741" xml:space="preserve">
                        <polygon id="svgLogo" class="logoLoader" points="68.354,0.556 32.797,55.055 67.115,55.055 67.115,71.741
	0,71.741 0.175,0.556 0.175,0 16.862,0 16.862,44.421 45.832,0.556 46.197,0 68.715,0 "/>
                    </svg>
                        <h1 class="title">
                            <span class="titleLoader">Leonardo Vel&aacute;zquez</span>
                            <span class="subheader titleLoader">Software Engineer</span></h1>
                </div>
            <div class="intro-nav">
                <ul>
                    <li>
                        <a href="#/work" class="nav-item">Work</a>
                    </li>
                    <li>
                        <a href="#/about" class="nav-item">About me</a>
                    </li>
                    <li>
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
@import "../../settings.scss";

.intro {
  color: $white-color;
}

.intro-container {
  display: flex;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  flex-direction: column;
  font-size: 2.5rem;
}

.intro-header {
  display: flex;
  text-transform: uppercase;
  line-height: 0.95;
  margin-bottom: 5px;
  .logo {
    fill: $white-color;
    margin-right: 5px;
    margin-top: 4px;
  }
  .title {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 2.6rem;
    white-space: nowrap;
    width: 80%;
    span {
      display: block;
    }
  }
}

.intro-nav {
  display: inline-flex;
  ul {
    padding: 0;
    margin: 0 auto;
    display: flex;
    width: 90%;
    white-space: nowrap;
    text-align: center;
    li {
      display: inline-block;
      flex: 1;
    }
    a {
      display: inline-block;
      padding: 1rem;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 400;
      color: $white-color;
      height: 1.5rem;
      line-height: 0.65;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgba($white-color, 0.15);
      }
    }
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
</style>
