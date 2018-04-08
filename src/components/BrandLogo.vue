<template>
    <div :class="`brand-logo ${color}-logo`">
        <Logo :width="`${logoWidth}`" :height="`${logoHeight}`"/>
        <h1 class="brand-title" :style="`font-size:${fontSize} !important`">
            <span class="titleLoader">Leonardo Vel&aacute;zquez</span>
            <span class="subheader titleLoader">Software Engineer</span></h1>
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
    fontSize: { type: String }
  }
};
</script>

<style lang="scss" scoped>
@import "../settings";
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
    span {
      display: block;
      margin-bottom: 0.15em;
    }
  }
}
</style>
