<template>
  <div class="project-wrapper">
    <h2 class="title">{{currentProject.title}}</h2>
    <div class="carousel">
      <!-- Wrapper for slides -->
      <div class="carousel-wrapper" :style="`backgroundColor: ${hexToRGB(currentProject.backgroundColor)}`">
        <div class="item" v-for="(image, index) in currentProject.images" :class="{active: currentImageIndex === index}">
          <img :src="loadImage(image.image_url)"/>
        </div>
        <div class="controls">
          <button class="carousel-control carousel-left" @click="handleUpdate(1)">
            <span class="glyphicon glyphicon-chevron-left"> < </span>
          </button>
          <button class="carousel-control carousel-right" @click="handleUpdate(1)">
            <span class="glyphicon glyphicon-chevron-right"> > </span>
          </button>
        </div>
      </div>
      <div class="carousel-details">
        <ol class="carousel-indicators">
          <li v-for="(image, index) in currentProject.images" :class="{active: currentImageIndex === index}"
              @click="currentImageIndex = index"/>
        </ol>
        <div class="carousel-caption">{{currentProject.description}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import projectData from '../data';
import { find, get } from 'lodash';
import config from '../config';
import EventBus from '../EventBus';

export default {
  name: 'Project',
  data() {
    return {
      currentProject: projectData[0],
      currentImageIndex: 0
    };
  },
  props: {
    projectId: {
      type: String
    }
  },
  mounted() {
    EventBus.$on('project.changed', id => this.getProject(id));
  },
  methods: {
    loadImage(item) {
      return `${config.cloudinaryUrl}${item}`;
    },
    getProject(id) {
      this.currentProject = find(projectData, { id });
    },
    handleUpdate(dir) {
      let index = this.currentImageIndex + dir;
      const imagesLength = get(this.currentProject, 'images.length');
      if (index > imagesLength - 1) {
        index = 0;
      }
      if (index < 0) {
        index = imagesLength - 1;
      }
      console.log(index, imagesLength, dir);
      this.currentImageIndex = index;
    },
    hexToRGB(hex, opacity = 0.65) {
      hex = hex.replace('#', '');
      return `rgba(${parseInt(hex.substring(0, 2), 16)},${parseInt(
        hex.substring(2, 4),
        16
      )},${parseInt(hex.substring(4, 6), 16)}, ${opacity})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/settings';
@import '../styles/media-queries';

.project-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  @media (min-width: $bp-ms) {
    position: relative;
  }
}

.title {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-container a,
.project-container a:hover {
  text-decoration: underline;
}

.carousel {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba($white-color, 0.6);
  @media (min-width: $bp-ms) {
    height: 70vh;
  }
}

.controls {
  height: 100%;
}

.item {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -100%);
  left: 50%;
  transition: transform 0.45s ease-out;
  &.active {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  img {
    display: inline-block;
    width: 100%;
    object-fit: contain;
    height: 100%;
    position: relative;
  }
}

.carousel-right {
  right: 0;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}

.carousel-left {
  left: 0;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}

.carousel-control {
  position: absolute;
  top: calc(50% - 2.5rem);
  border: none;
  outline: none;
  width: 3rem;
  height: 5rem;
  background-color: rgba($white-color, 0.85);
  cursor: pointer;
  transition: opacity 0.25s ease-out;
}

.carousel-indicators {
  display: table;
  padding: 1rem 0 0;
  margin: 0 auto 0;
  z-index: 1000;
  li {
    background-color: $white-color;
    margin-left: 5px;
    cursor: pointer;
    list-style: none;
    border-radius: 20px;
    width: 0.75rem;
    height: 0.75rem;
    float: left;
    border: solid $blue-color 1px;
    &.active {
      background-color: $blue-color;
    }
  }
}

.carousel-caption {
  font-family: 'Open Sans', Helvetica;
  padding: 1rem;
  letter-spacing: 0.01rem;
  color: $white-color;
  font-weight: 500;
  font-size: 1.3rem;
}

.link {
  font-family: 'Montserrat', Helvetica;
}

.project h2 {
  text-transform: capitalize;
  font-weight: 400;
  text-align: left;
  position: absolute;
  top: -9rem;
}
</style>
