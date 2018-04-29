<template>
    <section id="work" class="container content-section invisible">
        <div class="work-container">
            <div id="thumb-container" class="work-column">
                <h2>Work</h2>
                <div class="thumbs-container">
                    <div v-for="(project) in thumbs" class="thumb-item">
                        <img :src="imageUrl(project.thumb)" />
                        <div class="details">{{project.title}}</div>
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
  column-count: 2;
  column-gap: 5px;
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
      column-gap: 5px;
    }
  }

    @media (min-width: $bp-ms) {
      margin-bottom: 5px;
    }
    cursor: pointer;
    img {
      width: 100%;
    }
  }


.thumb-item:hover {
    .details {
        opacity: 1;
    }
}
.thumb-item {
    position: relative;
    .details {
        font-family: "Montserrat", Helvetica;
        font-size: 2rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        text-transform: uppercase;
        font-weight: 600;
        background: $white-color;
        color: $blue-color;
        opacity: 0;
    }
}
#project-container {
}
</style>
