<template>
    <section id="intro" class="intro">
        <div class="intro-container">
            <BrandLogo :class="{loader: !isLoaded}" type="intro" />
            <div class="intro-nav">
                <ul>
                    <li>
                        <Link to="/work" class="nav-item">Work</Link>
                    </li>
                    <li>
                        <Link to="/about" class="nav-item">About me</Link>
                    </li>
                    <li>
                        <Link to="/contact" class="nav-item">Contact</Link>
                    </li>
                </ul>
                <div class="page-scroll">
                    <a href="/work" class="btn-lv nav-item" data-target="#work">
                        <i class="glyphicon glyphicon-chevron-down animated"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { BrandLogo, Link } from "../components/";

export default {
  name: "Intro",
  components: {
    BrandLogo,
    Link
  },
  props: {
    isLoaded: { type: Boolean, default: false }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/media-queries";
@import "../styles/settings";

.intro {
  color: $white-color;
  height: 100vh;
}

#intro-logo {
  opacity: 0;
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
    display: none;
    @media screen and (min-width: $bp-sm) {
      display: flex !important;
    }
    padding: 0;
    margin: 0 auto;
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
    transition: transform 1s ease-out;
  }

  &:hover > .animated {
    animation-name: pulse;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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
  transition: background 0.3s ease-in-out;
}
</style>
