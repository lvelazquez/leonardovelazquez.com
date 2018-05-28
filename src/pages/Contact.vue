<template>
  <section id="contact" class="container content-section invisible">
    <div class="contact-wrapper">
      <div>
        <h2>Contact</h2>
        <div id="contact-container">
          <div class="contact-form">
            <form id="contact_form" @submit.prevent="handleSubmit">
              <div class="input-group contact-name contact-info" :class="{warning: !contact.name && hasSubmit }"
                   v-model="contact.name">
                <input id="contact_name" type="text" class="contact_info input-field" name="name"
                       placeholder="Your Name"
                />
              </div>
              <div class="input-group contact-email contact-info has-feedback"
                   :class="{warning: !contact.email && hasSubmit }"
              >
                <input id="contact_email" type="text"
                       class="contact_info input-field"
                       name="email"
                       v-model="contact.email"
                       placeholder="Your Email"/>
              </div>
              <div class="input-group contact-info" :class="{warning: !contact.title && hasSubmit }"
                   v-model="contact.title"
              ><input id="contact_subject"
                      type="text"

                      class="contact_info input-field"
                      name="subject"
                      placeholder="Subject"/>
              </div>
              <div class="input-group contact-message contact-info has-feedback"
                   :class="{warning: !contact.message && hasSubmit }" v-model="contact.message">
                <textarea id="contact_message" class="contact_info col-12 input-field"
                          name="message"
                          placeholder="Your Message"></textarea>
              </div>
              <button id="submit" type="submit" class="btn btn-block">
                SUBMIT
              </button>
            </form>
            <div id="statusMsg" style="display:none"></div>
          </div>
        </div>
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
    <Map/>
  </section>

</template>

<script>
import Map from "../components/Map";
import { each } from "lodash";

export default {
  name: "Contact",
  props: {},
  components: {
    Map
  },
  data() {
    return {
      hasSubmit: false,
      contact: {
        name: "",
        email: "",
        title: "",
        message: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.hasSubmit = true;
      // validate fields
      // show message
      each(this.contact, fields => {
        if (fields === "") {
          this.isValid = false;
          return false;
        }
      });
      if (this.isValid) {
        // submit data
        console.log("submit!", this.contact);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/settings";
@import "../styles/content";
@import "../styles/media-queries";

.banner-social-buttons {
  display: flex;
  text-align: center;
  margin: 0 auto;
  flex-direction: column;
  li {
    flex: 1;
    display: inline-block;
    margin-bottom: 1rem;
  }
  @media (min-width: $bp-ms) {
    flex-direction: row;
    max-width: 30rem;
    margin: 0 auto;
  }
}

.btn {
  font-family: "Montserrat", Arial;
  max-width: 10rem;
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
  padding: 0;
}

.contact-form {
  max-width: 15rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem 4rem;
  @media (min-width: $bp-sm) {
    padding: 0 3rem 4rem;
  }
  @media (min-width: $bp-md) {
    padding: 0 10rem 4rem;
  }
}

.contact-wrapper {
  padding-bottom: 3rem;
}

#submit {
  font-weight: 600;
  background-color: $blue-color;
  color: $white-color;
  cursor: pointer;
  transition: background-color 0.25s ease-out;
  &:hover {
    background-color: darken($blue-color, 25%);
  }
}

.input-group {
  width: 100%;
  border: solid $light-gray-color 2px;
  border-radius: 5px;
  margin-bottom: 1rem;
  outline: none;
}

.input-field {
  font-family: "Open Sans", Helvetica, sans-serif;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  box-shadow: none;
  background: none;
  border: none;
}

.warning {
  border: solid $warning-color 2px;
}
</style>
