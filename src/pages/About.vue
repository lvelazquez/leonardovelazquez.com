<template>
  <section id="about" class="container content-section" :class="{ invisible: !isLoaded }">
    <div class="row">
      <div class>
        <h2>About me</h2>

        <div class="content-wrapper">
          <p>
            As a platform agnostic UX engineer and creative developer, I focus on building
            high-impact user interfaces that blend technical precision with visual sophistication.
            My work spans across platforms and frameworks — from React, Angular, and Vue to Web
            Components, custom rendering engines and/or physical spaces — always driven by the goal
            of creating thoughtful, fluid, and expressive user experiences.
          </p>
          <p>
            I specialize in advanced UI/UX patterns, motion design, and browser-based visualization,
            often working at the intersection of design systems, WebGL, and programmatic animation.
            Whether crafting scroll-based storytelling, shader-driven interactions, or data-rich
            prototypes, I thrive in spaces where detail and performance matter just as much as
            clarity and accessibility.
          </p>
          <p>
            With a foundation in illustration and animation, I bring a visual designer's intuition
            to my engineering practice — shaping not just how things work, but how they feel. My
            approach is platform-agnostic, but my goal is always the same: deliver elegant,
            responsive, and memorable user experiences that stand apart.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from '../config'

export default {
  name: 'AboutView',
  props: {
    isLoaded: Boolean,
    cloudinaryUrl: {
      type: String,
      default: config.cloudinaryUrl,
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@use '../styles/settings.scss' as *;
@use '../styles/content.scss' as content;
@use '../styles/media-queries.scss' as media;

#about {
  dd:after {
    content: ', ';
  }

  .leo {
    display: none;
    @media (min-width: media.$bp-ms) {
      display: block;
      width: 100%;
      border-radius: 5px;
    }
    @media (min-width: media.$bp-md) {
      width: 30vw;
      float: left;
      margin-right: 16px;
    }
  }
}
</style>
