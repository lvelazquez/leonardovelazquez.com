<template>

<! -- BEGIN TEMPLATES -->

<script id="work-template" type="text/template">
    <div data-key="{{id}}" class="thumbs">
        <div class="caption">
            <div class="caption-wrapper">
                <span class="title">{{{title}}}</span>
            </div>
        </div>
        <a href="#/work/{{id}}"><img class="lazy" data-original="assets/thumbs/{{thumb}}"/></a>
    </div>
</script>

<script id="project-template" type="text/template">

    <div class="project" data-key="{{id}}">

        <h2 class="title">{{{title}}}</h2>
        <a href="#/work/" id="close-btn" class="close-project">&times</a>

        <div id="carousel-example-generic{{id}}" class="carousel slide wht-frame" data-ride="carousel">
            <!-- Indicators -->

            <ol class="carousel-indicators">

                {{#each images}}
                <li data-target="#carousel-example-generic{{../id}}" data-slide-to="{{@index}}"
                    {{#ifZero @index}} class="active" {{/ifZero}}>
                </li>
                {{/each}}
            </ol>

            <!-- Wrapper for slides -->
            <div class="carousel-inner">

                {{#each images}}
                <div class="item {{#ifZero @index}}active{{/ifZero}}"><img src="assets/{{image_url}}"/></div>
                {{/each}}

            </div>
            <div class="carousel-caption"></div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic{{id}}" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic{{id}}" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </div>

        <div class="detail">

            {{#if description}}
            <div class="description">{{description}}</div>
            {{/if}}
            {{#if url}}
            <div class="link"><a href="{{url}}">View Project</a></div>
            {{/if}}
        </div>
        <div id="project-bg" class="close-project"></div>
    </div>

</script>

<script id="contact-template" type="text/template">

    <div class="contact-form">

        <form id="contact_form" class="input-lg form-group">

            <span class="form-group contact-name contact-info has-feedback">
                <input id="contact_name" type="text" class="contact_info form-control" name="name"
                       placeholder="Your Name"/>
            </span>
            <span class="form-group contact-email contact-info has-feedback">
                <input id="contact_email" type="text"
                       class="contact_info form-control"
                       name="email"
                       placeholder="Your Email"/>
            </span>
            <span class="form-group contact-subject contact-info has-feedback"><input id="contact_subject" type="text"
                                                                                      class="contact_info form-control"
                                                                                      name="subject"
                                                                                      placeholder="Subject"/>
            </span>
            <span class="form-group contact-message contact-info has-feedback">
                <textarea id="contact_message" class="contact_info col-12 form-control"
                          name="message"
                          placeholder="Your Message"></textarea>
            </span>
            <button id="submit" type="submit" class="btn btn-block">
                SUBMIT
            </button>
        </form>
        <div id="statusMsg" style="display:none"></div>
    </div>
</script>

<! -- END TEMPLATES -->
</template>

<script>
export default {
  name: "Gallery.vue"
};
</script>

<style lang="scss" scoped>
    /* ==========================================================================
 GALLERY
 ========================================================================== */

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
        position: absolute;
        text-align: left;
    }

    .project h2 {
        height: 32px;
        font-size: 190%;
        text-transform: uppercase;
        text-align: left;
        font-weight: 200;
        line-height: 1.1;
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
        position:relative;

    }

    .thumbs-col {
        padding: 0;
        margin: 0;
    }

    .thumbs .caption {
        font-family: Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border:solid rgba(0,0,0,0) 0px;
        -webkit-transition-property: opacity, border-width;
        -webkit-transition-duration: .4s;
        overflow: hidden;

    }
    .thumbs:hover .caption {
        opacity: 1;
        pointer-events:none;

    }

    .thumbs:hover .caption span {
        font-size:115%;
        border-bottom:solid rgba(52, 86, 137, 0.75) 10px;
    }

    .thumbs .caption-wrapper {
        display: table;
        width:100%;
        height:100%;
        position:relative;
        color: #243c60;
        font-weight: bold;
    }

    .thumbs .caption-wrapper span {
        border-bottom:solid rgba(52, 86, 137, 0.5) 100px;
        padding:5%;
        background-color:rgba(255,255,255,.9);
        text-transform: uppercase;
        line-height: 1.1;
        font-size:110%;
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
        display:none;
        text-decoration: none;
    }

    .content-section {
        padding-top: 150px;
    }
</style>
