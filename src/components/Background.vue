<template>
    <video id="site-background" v-once :poster="`${cloudinaryUrl}video/upload/lakehi.png`" autoplay preload="auto" loop muted>
        <source v-once :src="`${cloudinaryUrl}video/upload/lakehi.mp4`" type="video/mp4"/>
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
  opacity: 0;
  margin: 0;
  right: 0;
  bottom: 0;
}
</style>
