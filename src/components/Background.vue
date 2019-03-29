<template>
  <div :class="{ loaded: isLoaded }">
    <video
      id="site-background"
      v-once
      :poster="`${cloudinaryUrl}video/upload/f_auto/lakehi.jpg`"
      autoplay
      preload="auto"
      loop
      muted
      playsinline
    >
      <source v-once :src="`${cloudinaryUrl}video/upload/f_auto/lakehi.mp4`" type="video/mp4">
    </video>
  </div>
</template>

<script>
import config from "../config";

export default {
  name: "Background",
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    onReady: Function,
    cloudinaryUrl: {
      type: String,
      default: config.cloudinaryUrl
    }
  },
  data() {
    return {
      isLoaded: false
    };
  },
  mounted() {
    this.video = document.getElementById("site-background");
    this.handlePlay = this.handlePlay.bind(this);
    if (this.video.readyState >= this.video.HAVE_FUTURE_DATA) {
      setTimeout(this.handlePlay, 10);
    } else {
      this.video.addEventListener("canplay", this.handlePlay);
    }
  },
  watch: {
    isPlaying(newVal) {
      try {
        if (newVal) {
          this.video.play();
        } else {
          this.video.pause();
        }
      } catch (err) {
        console.log(
          `error auto playing, good job if you have this blocked in your browser :P ${err}`
        );
      }
    }
  },
  destroyed() {
    this.video.removeEventListener("canplay", this.handlePlay);
  },
  methods: {
    handlePlay() {
      this.video.removeEventListener("canplay", this.handlePlay);
      this.isLoaded = true;
      this.$emit("is-ready");
    }
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
  transition: opacity 1s ease-out;
}

.loaded video {
  opacity: 1 !important;
}
</style>
