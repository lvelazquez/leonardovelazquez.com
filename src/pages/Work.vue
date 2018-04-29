<template>
    <section id="work" class="container content-section invisible">
        <div class="work-container">
            <div id="thumb-container" class="work-column">
                <h2>Work</h2>
                <div class="thumbs-container">
                    <div v-for="(project) in thumbs" class="thumb-item">
                        <img :src="imageUrl(project.thumb)" />
                    </div>
                </div>
            </div>
            <div id="project-container" class="work-column"></div>
        </div>
    </section>
</template>

<script>
import projectData from "../data";
import config from "../config";

export default {
  name: "Work",
  data() {
    return {
      thumbs: [],
      cloudinaryUrl: config.cloudinaryUrl
    };
  },
  props: {},
  mounted() {
    this.thumbs = projectData;
  },
  methods: {
    imageUrl(thumb) {
      return `${this.cloudinaryUrl}image/upload/${thumb}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";
@import "../styles/media-queries.scss";

.work-container {
  display: flex;
}

.work-column {
  @media (min-width: $bp-ms) {
    flex: 1;
  }
}

#thumb-container {
  .thumbs-container {
    @media (min-width: $bp-ms) {
      column-count: 3;
      column-gap: 0px;
    }
  }
  .thumb-item {
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}

#project-container {
}
</style>
