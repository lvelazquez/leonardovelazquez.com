<template>
    <div id="site-background">
        <video id="site-player" v-once :poster="`${cloudinaryUrl }lakehi.png`" class="fullscreen" autoplay preload loop>
            <source v-once :src="`${cloudinaryUrl }lakehi.mp4`" type="video/mp4"/>
        </video>
    </div>
</template>

<script>
import config from "../config";

export default {
  name: "Background",
  data() {
    return {
      cloudinaryUrl: config.cloudinaryUrl
    };
  },
  mounted() {
    console.log(document.getElementById("site-player"));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#site-background {
  z-index: -1000;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  opacity: 1;
  position: fixed;
  margin: 0;
    background: aqua;
  .fullscreen {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    transform: translate(-50%, -50%);
  }

  .background-poster {
    opacity: 0;
  }
}
</style>
