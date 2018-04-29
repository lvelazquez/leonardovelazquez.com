<template>
    <div class="project">
        <h2 class="title">{{currentProject.title}}</h2>
        <a href="#/work/" id="close-btn" class="close-project">&times</a>
        <div id="carousel-example-generic" class="carousel slide wht-frame" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <li>
                </li>

            </ol>
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <div class="item">
                    <img :src="loadImage(currentProject.images[0].image_url)"/>
                </div>
            </div>
            <div class="carousel-caption"></div>
            <a class="carousel-control">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="carousel-control">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </div>
        <div class="detail">
            <div class="description"></div>
        </div>
        <div id="project-bg" class="close-project"></div>
    </div>
</template>

<script>

  import projectData from '../data';
  import {find} from 'lodash';
  import config from '../config';
  import EventBus from "../EventBus";

  export default {
    name: "Project",
    data() {
      return {
        currentProject: projectData[0]
      }
    },
    props: {
      projectId: {
        type: String,
      },
    },
    mounted() {
      this.currentProject = find(projectData, {id: this.projectId});
      EventBus.$on('project.changed', id => {
        this.currentProject = find(projectData, {id});
      });
    },
    methods: {
      loadImage(item) {
        return `${config.cloudinaryUrl}${item}`;
      }
    }
  };
</script>

<style lang="scss" scoped>

    .project-container {
        display: block;
        background-color: #FFF;
        position: relative;
    }

    .project-container a, .project-container a:hover {
        text-decoration: underline;
    }

    .images-controller li {
        list-style: none;
        border: solid black;
        width: 10px;
        height: 10px;
        border-radius: 20px;
        float: left;
        margin-left: 5px;
    }

    .project {
    }

    .link {
        font-family: "Montserrat", Helvetica;
    }

    .project h2 {
        text-transform: capitalize;
        font-weight: 400;
        text-left: left;
    }

    .item {
        img {
            object-fit: contain;
            width: 100%;
            max-height: 50vh;
            position: relative;
        }
    }

    #thumb-container {
        position: relative;
    }

    .thumbs img {
        padding: 0;
        width: 100%;
        height: auto;
    }

    .thumbs {
        padding: 0;
        position: relative;

    }

    .thumbs-col {
        padding: 0;
        margin: 0;
    }

    .thumbs .caption {
        font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: solid rgba(0, 0, 0, 0) 0px;
        -webkit-transition-property: opacity, border-width;
        -webkit-transition-duration: .4s;
        overflow: hidden;

    }

    .thumbs:hover .caption {
        opacity: 1;
        pointer-events: none;

    }

    .thumbs:hover .caption span {
        font-size: 115%;
        border-bottom: solid rgba(52, 86, 137, 0.75) 10px;
    }

    .thumbs .caption-wrapper {
        display: table;
        width: 100%;
        height: 100%;
        position: relative;
        color: #243c60;
        font-weight: bold;
    }

    .thumbs .caption-wrapper span {
        border-bottom: solid rgba(52, 86, 137, 0.5) 100px;
        padding: 5%;
        background-color: rgba(255, 255, 255, .9);
        text-transform: uppercase;
        line-height: 1.1;
        font-size: 110%;
        text-align: left;
        vertical-align: middle;
        display: table-cell;
        -webkit-transition-property: all;
        -webkit-transition-duration: .7s;
    }

    .thumb .project-sml {
        display: none;
    }

    .item img {
        width: 100%;
    }

    .project-sml-container {
        font-size: 100%;
        position: absolute;
        padding: 20% 3%;
        background-color: rgba(0, 0, 0, .75);
        width: 100%;
        height: 32%;
        display: none;
    }

    .project-sml-container p {
        vertical-align: middle;
        text-align: left;
        display: table-cell;
    }

    .project #close-btn {
        display: none;
        text-decoration: none;
    }

    .content-section {
        padding-top: 150px;
    }
</style>
