<template>
  <div class="project-wrapper mobileModal" :class="{modalOpen: modalOpen}">
    <div class="project-header">
      <h2 class="title">{{currentProject.title}}</h2>
      <button @click="handleClose" class="close-btn">X</button>
    </div>
    <div class="carousel">
      <div class="carousel-wrapper" :style="`backgroundColor: ${hexToRGB(currentProject.backgroundColor)}`">
        <div id={{index}} class="item" v-for="(image, index) in currentProject.images"
             :class="{active: currentImageIndex === index && !isLoading, past: previousImageIndex === index}">
          <img v-on:load="handleLoader" :src="loadImage(image.image_url)"/>
        </div>
        <div :class="{loading: isLoading, loader: true}">
          <Loader/>
        </div>
        <div class="controls">
          <div @click="handleUpdate(1)" class="overlay-btn"></div>
          <button class="carousel-control carousel-left" @click="handleUpdate(-1)">
            <span class="icon-left-open"></span>
          </button>
          <button class="carousel-control carousel-right" @click="handleUpdate(1)">
            <span class="icon-right-open"></span>
          </button>
        </div>
      </div>
      <div class="carousel-details">
        <ol class="carousel-indicators">
          <li v-for="(image, index) in currentProject.images" :class="{active: currentImageIndex === index}"
              @click="previousImageIndex = currentImageIndex; currentImageIndex = index; isLoading = true"/>
        </ol>
        <div class="carousel-caption">{{currentProject.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import projectData from "../data";
import { find, get } from "lodash";
import config from "../config";
import EventBus from "../EventBus";
import Loader from "./Loader";

export default {
  name: "Project",
  components: { Loader },
  data() {
    return {
      currentImageIndex: 0,
      previousImageIndex: null,
      isLoading: true
    };
  },
  props: {
    currentProjectId: {
      type: String,
      default: Object.keys(projectData)[0]
    },
    isProjectModalOpen: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    currentProject: {
      get: function() {
        return projectData[this.currentProjectId];
      },
      set: function(newValue) {
        this.getProject(this.currentProjectId);
        this.currentProject = newValue;
      }
    },
    modalOpen: function() {
      return this.isProjectModalOpen;
    }
  },
  mounted() {
    this.handleLoader = this.handleLoader.bind(this);
    this.getProject = this.getProject.bind(this);
    EventBus.$on("project.changed", id => this.getProject(id));
  },
  methods: {
    loadImage(item) {
      return `${config.cloudinaryUrl}q_auto/${item}`;
    },
    getProject(id) {
      if (!projectData[id]) return;
      this.isLoading = true;
      this.currentImageIndex = 0;
      this.isLoading = false;
    },
    handleLoader() {
      this.isLoading = false;
    },
    handleUpdate(dir) {
      let index = this.currentImageIndex + dir;
      const imagesLength = get(this.currentProject, "images.length");
      if (index > imagesLength - 1) {
        index = 0;
      }
      if (index < 0) {
        index = imagesLength - 1;
      }
      this.previousImageIndex = this.currentImageIndex;
      this.currentImageIndex = index;
    },
    handleClose() {
      this.isProjectModalOpen = false;
    },
    hexToRGB(hex, opacity = 0.65) {
      hex = hex.replace("#", "");
      return `rgba(${parseInt(hex.substring(0, 2), 16)},${parseInt(
        hex.substring(2, 4),
        16
      )},${parseInt(hex.substring(4, 6), 16)}, ${opacity})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/media-queries";

.project-wrapper {
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  @media (min-width: $bp-ms) {
    position: relative;
    top: 0;
    box-sizing: border-box;
    padding: 0 1rem;
  }
}
.mobileModal {
  display: none;
  @media (min-width: $bp-ms) {
    display: block;
  }
}

.modalOpen {
  display: block !important;
}

.project-header {
  position: relative;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  background-color: rgba($black-color, 0.95);
  padding: 1.5rem 1rem 1.5rem;
  & .title {
    text-align: left;
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
    display: inline-block;
    width: 90%;
  }
  @media (min-width: $bp-ms) {
    & .title {
      white-space: nowrap;
      width: 90%;
      font-size: 2rem;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    background-color: transparent;
    max-width: calc(50vw - 2rem);
    padding: 3rem 0 0;
    margin: 0 0 35px;
  }
}

.close-btn {
  position: relative;
  background: none;
  border: none;
  width: 10%;
  top: 50%;
  color: white;
  transform: translateY(-50%);
  @media (min-width: $bp-ms) {
    display: none;
  }
}

.project-container a,
.project-container a:hover {
  text-decoration: underline;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.25s ease-out;
  &.loading {
    opacity: 1;
  }
}

.carousel {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 70vh;
  background-color: rgba($white-color, 0.6);
  transition: background-color 0.75s ease-out;
  overflow: hidden;
  align-items: center;
}

.controls {
  width: 100%;
  transition: opacity 0.5s ease-out;
  opacity: 1;
  height: 100%;
  .overlay-btn {
    width: inherit;
    height: inherit;
    cursor: pointer;
  }
  @media (min-width: $bp-ms) {
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
}

.item {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transform: translate(200%, 0);
  left: 50%;
  transition: transform 0.45s ease-out;
  width: calc(100% - 3rem);
  height: 100%;
  &.active {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  &.past {
    transform: translate(-50%, 0);
    transition: opacity 0.45s ease-out;
    opacity: 0;
  }
  img {
    display: inline-block;
    width: 100%;
    object-fit: contain;
    height: 100%;
    position: relative;
  }
}

.carousel-right,
.carousel-left {
  opacity: 1;
  @media (min-width: $bp-ms) {
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}

.carousel-right {
  right: 0;
}

.carousel-left {
  left: 0;
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
  font-family: Roboto, Helvetica, Arial, serif;
  padding: 1rem;
  letter-spacing: 1px;
  color: $white-color;
  font-weight: 400;
  font-size: 1.3rem;
}

.link {
  font-family: "Montserrat", Helvetica, sans-serif;
}

.project h2 {
  text-transform: capitalize;
  font-weight: 400;
  text-align: left;
  position: absolute;
  top: -9rem;
}
</style>
