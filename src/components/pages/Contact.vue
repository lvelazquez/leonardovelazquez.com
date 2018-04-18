<template>
    <section id="contact" class="container content-section text-center col-sm-12 invisible">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>Contact</h2>

                <div id="contact-container"></div>
                <ul class="col-md-12 list-inline banner-social-buttons">
                    <li>
                        <a href="http://www.linkedin.com/in/leovelazquez" class="btn btn-default btn-lg"><i
                                class="fa fa-linkedin fa-fw"></i> <span class="network-name">Linked In</span></a>
                    </li>
                    <li>
                        <a href="https://github.com/lvelazquez" class="btn btn-default btn-lg"><i
                                class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                    </li>
                    <li>
                        <a href="https://plus.google.com/111568277509717571535" class="btn btn-default btn-lg"><i
                                class="fa fa-google-plus fa-fw"></i> <span class="network-name">Google+</span></a>
                    </li>
                </ul>
            </div>
        </div>

        <div id="map" class="col-lg-12"></div>

    </section>
</template>

<script>
export default {
  name: "Contact",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/settings.scss";

.banner-social-buttons {
  display: flex;
  text-align: center;
  margin: 0 auto;
  min-width: 30rem;
  flex-direction: column;
  li {
    flex: 1;
    display: inline-block;
    margin-bottom: 1rem;
  }
}

.btn {
  max-width: 10rem;
  margin-right: 1rem;
  font-family: "Montserrat", Arial;
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
  border: solid $light-gray-color 1px;
  border-radius: 6px;
  color: $black-color;
  background-color: transparent;
  transition: all 0.1s ease-in-out;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  i {
    color: $black-color;
  }
}

.btn:hover {
  color: $white-color;
  background-color: $black-color;
  i {
    color: $white-color;
  }
}

#contact {
  color: $black-color;
  background-color: $white-color;
}
</style>
