<template>
    <div class="project-wrapper">
        <h2 class="title">{{currentProject.title}}</h2>
        <div class="carousel">
            <!-- Wrapper for slides -->
            <div class="carousel-wrapper">
                <div class="item">
                    <img :src="loadImage(currentProject.images[this.currentImageIndex].image_url)"/>
                </div>
            </div>
            <div class="carousel-details">
                <ol class="carousel-indicators">
                    <li v-for="(image, index) in currentProject.images" :class="{active: currentImageIndex === index}"
                        @click="currentImageIndex = index"/>
                </ol>
                <div class="carousel-caption">{{currentProject.description}}</div>
            </div>
            <button class="carousel-control carousel-left" @click="handleUpdate(1)">
                <span class="glyphicon glyphicon-chevron-left"> < </span>
            </button>
            <button class="carousel-control carousel-right" @click="handleUpdate(1)">
                <span class="glyphicon glyphicon-chevron-right"> > </span>
            </button>
        </div>
    </div>
</template>

<script>

  import projectData from '../data';
  import {find, get} from 'lodash';
  import config from '../config';
  import EventBus from "../EventBus";

  export default {
    name: "Project",
    data() {
      return {
        currentProject: projectData[0],
        currentImageIndex: 0
      }
    },
    props: {
      projectId: {
        type: String,
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
        this.currentProject = find(projectData, {id});
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

    .project-container a, .project-container a:hover {
        text-decoration: underline;
    }

    .carousel {
        position: relative;
        background-color: rgba($white-color, .45);
    }

    .carousel-wrapper {
        width: 100%;
        @media (min-width: $bp-ms) {
            height: auto;
        }
    }

    .item {
        max-height: 70vh;
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
        background-color: rgba($white-color, .85);
        cursor: pointer;
    }

    .carousel-details {
        background-color: $white-color;
    }

    .carousel-indicators {
        display: table;
        padding: 1rem 0 0;
        margin: 1rem auto 0;
        z-index: 1000;
        li {
            background-color: $white-color;
            margin-left: 5px;
            cursor: pointer;
            list-style: none;
            border: solid $blue-color;
            border-radius: 20px;
            width: 10px;
            height: 10px;
            float: left;
            &.active {
                background-color: $blue-color;
            }
        }
    }

    .carousel-caption {

        font-family: 'Open Sans', Helvetica;
        padding: 1rem;
        letter-spacing: .01rem;
        color: $black-color;
        font-weight: 500;
        font-size: 1.3rem;
    }

    .link {
        font-family: "Montserrat", Helvetica;
    }

    .project h2 {
        text-transform: capitalize;
        font-weight: 400;
        text-align: left;
        position: absolute;
        top: -9rem;
    }


</style>
