<template>
    <div :class="`brand-logo ${color}-logo ${responsive ? '' : 'brand-responsive'}`">
        <Logo :width="`${logoWidth}`" :height="`${logoHeight}`"/>
        <h1 class="brand-title" :style="`font-size:${fontSize} !important`">
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
    logoWidth: { type: String, default: "4.5rem" },
    logoHeight: { type: String, default: "4.25rem" },
    color: { type: String, default: "white" },
    fontSize: { type: String },
    responsive: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings";
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
    width: 80%;
    line-height: 0.75;
    margin: 0;
    span {
      display: block;
      margin-bottom: 0.15em;
    }
  }
}

.brand-responsive {
  .logo {
    margin: 0 auto;
  }
  flex-direction: column;

  .brand-title {
    width: 100% !important;
    white-space: normal;
    text-align: center;
    line-height: 1;
    span {
      margin: 0 auto;
      width: 80%;
    }
  }
}
</style>
