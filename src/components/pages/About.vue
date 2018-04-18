<template>
    <section id="about" class="container content-section text-left col-sm-12 invisible">
        <div class="row">
            <div class="col-sm-12">
                <h2>About me</h2>

                <div class="content-wrapper">
                    <img class="leo lazy wht-frame" width="100%" height="auto" data-original="images/leo2.jpg"/>
                    <p>
                        I'm a freelance Senior Front End developer currently based in Seattle, Washington. With ample experience
                        in every facet of the web design and development process, I strive to meet the needs of every new
                        project while using the latest technology trends and standards,
                        always taking pride in creating work that both functions efficiently and looks beautiful inside and
                        out.
                    </p>

                    <p>
                        <!-- My philosophy is to think and articulate the needs of the project first, then code with scalability and re-usability in mind.-->
                        Lately, I'm very excited to develop applications using Vue.js, as well as to furthering my growth of Web Application Architecture, patterns and best practices.
                    </p>

                    <p>
                        When I’m not fixing bugs for Internet Explorer, I like to listen to records, make vegan food &
                        treats, play the accordion or escape to the mountains.
                    </p>

                    <dl>
                        <dt>Skills:</dt>
                        <dd>React/Redux</dd>
                        <dd>Vue.js</dd>
                        <dd>Node.js</dd>
                        <dd>AngularJS</dd>
                        <dd>Meteor</dd>
                        <dd>D3.js</dd>
                        <dd>Backbone</dd>
                        <dd>Javascript</dd>
                        <dd>HTML5</dd>
                        <dd>CSS3</dd>
                        <dd>NPM</dd>
                        <dd>Gulp/Grunt</dd>
                        <dd>Bootstrap</dd>
                        <dd>Git</dd>
                        <dd>SASS/LESS</dd>
                        <dd>SVN</dd>
                        <dd>Actionscript</dd>
                        <dd>PHP</dd>
                        <dd>Web & App Development for iOS/iPad/iPhone or Mobile/Tablet</dd>
                        <dd>Motion Graphics in After Effects</dd>
                        <dd>Analog and digital 2D illustration & animation techniques</dd>
                    </dl>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
  name: "About",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/content.scss";

#about {
  dd:after {
    content: ", ";
  }
}
</style>
