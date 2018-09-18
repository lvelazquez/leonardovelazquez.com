<template>
  <section id="about" class="container content-section" :class="{invisible: !isLoaded}">
    <div class="row">
      <div class="">
        <h2>About me</h2>

        <div class="content-wrapper">
          <v-lazy-image alt="me baby me" class="leo lazy wht-frame" :src="`${cloudinaryUrl}image/upload/q_auto:good/v1537243889/leo2.jpg`"/>
          <p>
            I'm a Senior Software Developer currently based in Seattle, Washington. With ample experience
            in every facet of the web design and development process, I strive to meet the needs of every new
            project while using the latest technology trends and standards.
          </p>

          <p>
            Lately, I'm very excited to pursue work as a full stack Node.js / Vue.js, as well as to furthering my growth of Web
            Application Architecture, patterns and best practices.
          </p>

          <p>
            When I’m not programming, I like to listen to records, make vegan food &
            treats, play music or go hiking.
          </p>

          <dl>
            <dt>Skills:</dt>
            <dd>React/Redux</dd>
            <dd>Vue.js</dd>
            <dd>Node.js</dd>
            <dd>AngularJS</dd>
            <dd>Meteor</dd>
            <dd>Backbone</dd>
            <dd>Javascript</dd>
            <dd>HTML5</dd>
            <dd>CSS3</dd>
            <dd>NPM</dd>
            <dd>Gulp/Grunt</dd>
            <dd>Bootstrap</dd>
            <dd>Git</dd>
            <dd>SASS/LESS</dd>
            <dd>SVN</dd>
            <dd>Actionscript</dd>
            <dd>PHP</dd>
            <dd>Web & App Development for iOS/iPad/iPhone or Mobile/Tablet</dd>
            <dd>Motion Graphics in After Effects</dd>
            <dd>Analog and digital 2D illustration & animation techniques</dd>
          </dl>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import config from "../config";
import VLazyImage from "v-lazy-image";

export default {
  name: "About",
  props: {
    isLoaded: Boolean,
    cloudinaryUrl: {
      type: String,
      default: config.cloudinaryUrl
    }
  },
  components: {
    VLazyImage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/content";

#about {
  dd:after {
    content: ", ";
  }

  .leo {
    display: none;
    @media (min-width: $bp-ms) {
      display: block;
      width: 100%;
    }
    @media (min-width: $bp-md) {
      width: 30vw;
      float: left;
      margin-right: 16px;
    }
  }
}
</style>
