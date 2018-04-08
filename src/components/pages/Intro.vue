<template>
    <section class="intro">
        <div class="intro-container">
            <BrandLogo />
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
import BrandLogo from "../BrandLogo";

export default {
  name: "Intro",
  components: {
    BrandLogo
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
