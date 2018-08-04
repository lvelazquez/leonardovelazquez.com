<template>
  <section id="contact" class="container content-section" :class="{invisible: !isLoaded}">
    <div class="contact-wrapper">
      <div>
        <h2>Contact</h2>
        <div id="contact-container">
          <div class="contact-form">
            <form id="contact_form" @submit.prevent="handleSubmit">
              <div class="input-group contact-name contact-info" :class="{warning: !contact.name && hasSubmit }">
                <input id="contact_name" type="text" class="contact_info input-field" name="name" v-model="contact.name"
                       placeholder="Your Name"
                       autocomplete="true"
                />
              </div>
              <div class="input-group contact-email contact-info has-feedback"
                   :class="{warning: !contact.email && hasSubmit }">
                <input id="contact_email" type="text"
                       class="contact_info input-field"
                       name="email"
                       v-model="contact.email"
                       placeholder="Your Email"
                       autocomplete="true"/>
              </div>
              <div class="input-group contact-info" :class="{warning: !contact.title && hasSubmit }"

              ><input id="contact_subject"
                      type="text"
                      class="contact_info input-field"
                      name="subject"
                      placeholder="Subject" v-model="contact.title"/>
              </div>
              <div class="input-group contact-message contact-info has-feedback"
                   :class="{warning: !contact.message && hasSubmit }">
                <textarea id="contact_message" class="contact_info col-12 input-field"
                          name="message"
                          placeholder="Your Message" v-model="contact.message"></textarea>
              </div>
              <button id="submit" type="submit" class="btn btn-block">
                SUBMIT
              </button>
            </form>
            <div class="warning-text form-text" v-if="!isValid || !isSuccess && hasSubmit">{{errorMessage}}</div>
            <p class="email-text" v-if="!isSuccess && hasSubmit">Please try again later or reach me at <a
              href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>
            </p>
            <div class="form-text" v-if="isSuccess">Successfully sent!</div>
          </div>
        </div>
        <ul class="col-md-12 list-inline banner-social-buttons">
          <li>
            <a href="https://www.linkedin.com/in/leovelazquez" class="btn btn-default btn-lg"><i
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
  import {every} from "lodash";

  export default {
    name: "Contact",
    props: {
      isLoaded: Boolean
    },
    components: {
      Map
    },
    data() {
      return {
        hasSubmit: false,
        isValid: false,
        isSuccess: false,
        errorMessage: "All fields are required.",
        contact: {
          name: "",
          email: "",
          title: "",
          message: ""
        }
      };
    },
    methods: {
      async handleSubmit() {
        this.hasSubmit = true;
        this.isValid = every(this.contact, value => value !== "");
        if (this.isValid) {
          const response = await fetch("/contact", {
            body: JSON.stringify(this.contact), // must match 'Content-Type' header
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, same-origin, *omit
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST" // *GET, POST, PUT, DELETE, etc.
            //mode: "cors", // no-cors, cors, *same-origin
            //redirect: "follow", // manual, *follow, error
            //referrer: "no-referrer" // *client, no-referrer
          });
          const res = JSON.parse(await response.json());
          if (res.ok) {
            this.isSuccess = true;
          } else {
            console.error(res.error);
            this.isSuccess = false;
            this.errorMessage = "There's been a server side error.";
          }
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
    font-family: "Montserrat", Arial, sans-serif;
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

  .form-text {
    color: $blue-color;
    font-family: "Open Sans", Helvetica, sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .warning-text {
    color: $warning-color;
  }

  .email-text {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 1.1rem;
  }
</style>
