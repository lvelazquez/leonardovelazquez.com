<template>
    <div :class="`brand-logo ${color}-logo`" :style="`font-size:${fontSize}`">
        <Logo :width="`${logoWidth}`" :height="`${logoHeight}`"/>
        <h1 class="title">
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
  line-height: 0.95;
  margin-bottom: 5px;
  .logo {
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
</style>
