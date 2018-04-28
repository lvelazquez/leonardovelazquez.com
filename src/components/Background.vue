<template>
    <video id="site-background" v-once :poster="`${cloudinaryUrl }lakehi.png`" class="fullscreen" autoplay preload loop>
        <source v-once :src="`${cloudinaryUrl }lakehi.mp4`" type="video/mp4"/>
    </video>
</template>

<script>
import config from "../config";

export default {
  name: "Background",
  data() {
    return {
      cloudinaryUrl: config.cloudinaryUrl
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#site-background {
  position: fixed;
  overflow: hidden;
  z-index: -1000;
  min-width: 100%;
  min-height: 100%;
  opacity: 1;
  margin: 0;
  right: 0;
  bottom: 0;
  .background-poster {
    opacity: 0;
  }
}
</style>
