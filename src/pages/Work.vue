<template>
  <section id="work" class="container content-section" :class="{ invisible: !isLoaded }">
    <div class="work-container">
      <div id="thumb-container" class="work-column">
        <h2>Work</h2>
        <div class="thumbs-container">
          <div
            v-for="(project, index) in thumbs"
            v-bind:key="index"
            class="thumb-item"
            :style="{
              paddingTop: `${(project.thumbHeight / project.thumbWidth) * 100}%`,
            }"
            @click="handleProject(index)"
          >
            <img v-lazyload :alt="project.title" :src="imageUrl(project.thumb)" />
            <div class="details">
              <span>{{ project.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div id="project-container" class="work-column">
        <Project :currentProjectId="projectId" :isProjectModalOpen="isProjectModalOpen" />
      </div>
    </div>
  </section>
</template>

<script>
import projectData from '../data'
import config from '../config'
import { Project } from '../components/'

export default {
  name: 'WorkView',
  components: {
    Project,
  },
  data() {
    return {
      thumbs: [],
      fakeImage: '',
    }
  },
  props: {
    isLoaded: Boolean,
    isActive: Boolean,
    currentProjectId: String,
    isProjectModalOpen: Boolean,
    cloudinaryUrl: {
      type: String,
      default: config.cloudinaryUrl,
    },
  },
  mounted() {
    this.thumbs = projectData
    this.fakeImage = 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  },
  computed: {
    projectId: function () {
      return this.currentProjectId
    },
    canLoadImage: function () {
      return this.isActive
    },
  },
  methods: {
    imageUrl(thumb) {
      return `${this.cloudinaryUrl}image/upload/f_auto/${thumb}`
    },
    handleProject(id) {
      history.pushState(null, null, `/work/${id}`)
      dispatchEvent(new PopStateEvent('popstate'))
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../styles/settings.scss' as *;
@use '../styles/media-queries.scss' as media;

.work-container {
  @media (min-width: media.$bp-ms) {
    display: flex;
    column-count: 2;
    column-width: 50vw;
    column-gap: 0;
  }
}
.work-column {
  display: inline-block;
  width: 100%;
  @media (min-width: media.$bp-ms) {
    flex: 1;
    max-width: 50vw;
  }
}

#thumb-container {
  cursor: pointer;
  .thumbs-container {
    @media (min-width: media.$bp-ms) {
      column-count: 3;
      column-gap: 5px;
      box-sizing: border-box;
      padding-left: 1rem;
    }
  }

  @media (min-width: media.$bp-ms) {
    margin-bottom: 5px;
  }
  img {
    width: 100%;
  }
}

.v-lazy-image {
  filter: blur(2px);
  opacity: 0;
  transition:
    filter,
    opacity 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
  opacity: 1;
}

.thumb-item {
  position: relative;
  cursor: pointer;
  height: 0;
  overflow: hidden;
  margin-bottom: 5px;
  break-inside: avoid-column;
  border-radius: 5px;
  > img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .details {
    font-family: 'Montserrat', Helvetica, sans-serif;
    pointer-events: none;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    font-weight: 600;
    background: $white-color;
    transition: opacity 0.25s ease-out;
    opacity: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-direction: row;
    & span {
      color: $white-color;
      padding: 5px;
      flex: 1;
      text-indent: 0;
      transition: all 0.5s ease-out;
      transform: translateX(-100%);
    }
  }

  &:hover {
    .details {
      opacity: 1;
      background: color.adjust($white-color, $alpha: -0.2);
      & span {
        color: $gray-color;
        transform: translateX(0);
      }
    }
  }
  .details {
    display: none;
  }
  @media (min-width: media.$bp-ms) {
    & .details {
      display: flex;
      font-size: 1rem;
    }
  }

  @media (min-width: media.$bp-md) {
    & .details {
      font-size: 1rem;
    }
  }

  @media (min-width: media.$bp-lg) {
    & .details {
      font-size: 1.25rem;
    }
  }
}
#project-container {
}

.banner-social-buttons {
  display: flex;
  text-align: center;
  margin: 0 auto;
  flex-direction: column;
  padding: 0;
  li {
    flex: 1;
    display: inline-block;
    margin-bottom: 1rem;
  }
  @media (min-width: media.$bp-ms) {
    flex-direction: row;
    padding: 0 30%;
    margin: 0 auto;
  }

  @media (min-width: media.$bp-lg) {
    padding: 0 35%;
  }
}
</style>
