<template>
    <section id="work" class="container content-section" :class="{invisible: !isLoaded}">
        <div class="work-container">
            <div id="thumb-container" class="work-column">
                <h2>Work</h2>
                <div class="thumbs-container">
                    <div v-for="(project) in thumbs" class="thumb-item" @click="handleProject(project.id)">
                        <img :src="imageUrl(project.thumb)"/>
                        <div class="details"><span>{{project.title}}</span></div>
                    </div>
                </div>
            </div>
            <div id="project-container" class="work-column">
                <Project :projectId="currentProjectId"/>
            </div>
        </div>
    </section>
</template>

<script>
import projectData from "../data";
import config from "../config";
import { Project } from "../components/";
import EventBus from "../EventBus";

export default {
  name: "Work",
  components: {
    Project
  },
  data() {
    return {
      thumbs: [],
      cloudinaryUrl: config.cloudinaryUrl,
      currentProjectId: projectData[0].id
    };
  },
  props: { isLoaded: Boolean },
  mounted() {
    this.thumbs = projectData;
  },
  methods: {
    imageUrl(thumb) {
      return `${this.cloudinaryUrl}image/upload/${thumb}`;
    },
    handleProject(id) {
      this.currentProjectId = id;
      EventBus.$emit("project.changed", id);
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
    max-width: 50vw;
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

.thumb-item {
  position: relative;
  .details {
    font-family: "Montserrat", Helvetica, sans-serif;
    pointer-events: none;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
    background: $white-color;
    color: $blue-color;
    transition: opacity 0.25s ease-out;
    opacity: 0;
    height: 100%;
    line-height: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-direction: row;
    & span {
      padding: 5px;
      flex: 1;
      text-indent: 0;
      transition: all 0.25s ease-out;
      transform: translateX(-100%);
    }
  }

  &:hover {
    .details {
      opacity: 1;
      background: transparentize($white-color, 0.3);
      color: $black-color;
      & span {
        transform: translateX(0);
      }
    }
  }

  @media (min-width: $bp-ms) {
    & .details {
      font-size: 1rem;
    }
  }

  @media (min-width: $bp-lg) {
    & .details {
      font-size: 1.5rem;
    }
  }
}
#project-container {
}
</style>
