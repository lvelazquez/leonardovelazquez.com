<template>
    <div :class="`brand-logo ${color}-logo ${type}-logo`">
        <Logo class="logo" />
        <h1 class="brand-title">
            <span class="titleLoader">Leonardo Vel&aacute;zquez</span>
            <span class="subheader titleLoader">Full Stack Engineer</span></h1>
    </div>
</template>

<script>
import Logo from "./Logo";

export default {
  name: "BrandLogo",
  components: {
    Logo
  },
  props: {
    color: { type: String, default: "white" },
    fontSize: { type: String },
    type: { type: String, default: "header" }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/media-queries";

.white-logo {
  svg {
    fill: $white-color;
  }
  color: $white-color;
}
.black-logo {
  svg {
    fill: $black-color;
  }
  color: $black-color;
}

.brand-logo {
  display: flex;
  text-transform: uppercase;
  .brand-title {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 2.6rem;
    white-space: nowrap;
    width: 100%;
    line-height: 0.75;
    margin: 0;
    span:first-child {
      margin-bottom: 0.15em;
    }
    span {
      display: block;
    }
  }
}

.header-logo {
  .logo {
    width: 8vw;
    height: 8vw;
    max-width: 4rem;
    transition: width, height 0.25s ease-out;
  }
  .brand-title {
    font-size: 5vw;
    letter-spacing: 0.15px;
    transition: font-size 0.25s ease-out;
  }
  @media (min-width: $bp-sm) {
    .brand-title {
      font-size: 1.6rem;
    }
    .logo {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
  @media (min-width: $bp-md) {
    .logo {
      width: 3.5rem;
      height: 3.5rem;
    }
    .brand-logo {
      padding: 0.25rem 0.25rem 0;
    }
    .brand-title {
      font-size: 2.2rem;
    }
  }
}

.intro-logo {
  .logo {
    margin: 0 auto;
    width: 4rem;
    height: 4rem;
  }
  flex-direction: column;
  .brand-title {
    white-space: normal;
    text-align: center;
    line-height: 1;
    span {
      margin: 0 auto;
      width: 100%;
      @media (min-width: $bp-sm) {
        width: 80%;
      }
      @media (min-width: $bp-lg) {
        width: 100%;
      }
    }
  }
}
</style>
