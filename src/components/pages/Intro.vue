<template>
    <section class="intro">
        <div class="intro-container">

                    <div class="intro-header">
                        <Logo width="4.5" height="4.25"/>
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
import Logo from "../Logo";

export default {
  name: "Intro",
  components: {
    Logo
  },
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
