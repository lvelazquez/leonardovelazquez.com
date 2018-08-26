<template>
    <div :id="`${type}-header`" :class="`brand-logo ${color}-logo ${type}-logo`">
        <Logo class="logo" />
        <h1 class="brand-title">
            <span>Leonardo Vel&aacute;zquez</span>
            <span class="sub-header">Full Stack Engineer</span></h1>
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
      margin-bottom: 0.1em;
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
    line-height: 0.8;
  }
  @media (min-width: $bp-sm) {
    .brand-title {
      font-size: 1.5rem;
    }
    .logo {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  @media (min-width: $bp-md) {
    .brand-title {
      font-size: 1.6rem;
    }
    .logo {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
  @media (min-width: $bp-lg) {
    .logo {
      width: 3.3rem;
      height: 3.3rem;
    }
    .brand-logo {
      padding: 0.25rem 0.25rem 0;
    }
    .brand-title {
      font-size: 2rem;
    }
  }
}

.intro-logo {
  @media (min-width: $bp-ms) {
    flex-direction: row;
  }
  .logo {
    margin: 0 auto;
    width: 5rem;
    height: 4.2rem;
  }
  flex-direction: column;
  .brand-title {
    text-align: center;
    line-height: 1;
    margin-bottom: 1rem;
    span {
      margin: 0 auto;
      width: 100%;
      white-space: normal;
      @media (min-width: $bp-sm) {
        width: 80%;
      }
      @media (min-width: $bp-ms) {
        white-space: nowrap;
        text-align: left;
        line-height: 0.75;
        width: 100%;
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes fillLoop {
    0% {
      fill: $blue-loader-color;
    }

    50% {
      fill: $black-loader-color;
    }

    100% {
      fill: $blue-loader-color;
    }
  }

  @keyframes colorLoop {
    0% {
      color: $blue-loader-color;
    }

    50% {
      color: $black-loader-color;
    }

    100% {
      color: $blue-loader-color;
    }
  }

  &.loader {
    .logo {
      animation: fillLoop 4s infinite ease-in-out;
    }

    .brand-title {
      animation: colorLoop 4s infinite ease-in-out;
    }
  }
}
</style>
