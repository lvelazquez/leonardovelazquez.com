<template>
  <section id="contact" class="container content-section" :class="{invisible: !isLoaded}">
    <div class="contact-wrapper">
      <div>
        <h2>Contact</h2>
        <div id="contact-container">
          <div class="contact-form">
            <form id="contact_form" @submit.prevent="handleSubmit">
              <div class="input-group contact-name contact-info"
                   :class="{warning: !contact.name && submitStatus === 'error' }">
                <input id="contact_name" type="text" class="input-field" name="name" v-model="contact.name"
                       placeholder="Your Name"
                       autocomplete="true"
                />
              </div>
              <div class="input-group contact-email contact-info has-feedback"
                   :class="{warning: (!contact.email || !validateEmail(contact.email)) && submitStatus === 'error' }">
                <input id="contact_email" type="text"
                       class="input-field"
                       name="email"
                       v-model="contact.email"
                       placeholder="Your Email"
                       autocomplete="true"/>
              </div>
              <div class="input-group contact-info" :class="{warning: !contact.title && submitStatus === 'error' }"

              ><input id="contact_subject"
                      type="text"
                      class="input-field"
                      name="subject"
                      placeholder="Subject" v-model="contact.title"/>
              </div>
              <div class="input-group contact-message contact-info has-feedback"
                   :class="{warning: !contact.message && submitStatus === 'error' }">
                <textarea id="contact_message" class="input-field"
                          name="message"
                          placeholder="Your Message" v-model="contact.message"></textarea>
              </div>

              <button id="submit" :disabled="submitStatus === 'sending'" type="submit" :class="{btn:true, sending: submitStatus === 'sending'}">
                <transition name="fade">
                  <div class="loader" v-if="submitStatus === 'sending'">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span v-if="submitStatus !== 'sending'">{{submitStatus !== 'sending' ? 'SUBMIT' : ''}}</span>
                </transition>
              </button>
            </form>
            <div class="message-container">
              <transition name="fade">
                <div class="warning-text form-text" v-if="errorMessage !== '' && submitStatus === 'error'">
                  {{errorMessage}}
                </div>
                <p class="email-text" v-if="submitStatus === 'serverError'">Please try again later or reach me at <a
                  href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>
                </p>
                <div class="form-text success-text" v-if="submitStatus === 'success'">Successfully sent!</div>
              </transition>
            </div>
          </div>

        </div>
        <ul class="banner-social-buttons">
          <li>
            <a href="https://www.linkedin.com/in/leovelazquez" class="btn"><i
              class="fa fa-linkedin fa-fw"></i> <span class="network-name">Linked In</span></a>
          </li>
          <li>
            <a href="https://github.com/lvelazquez" class="btn"><i
              class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
          </li>
          <li>
            <a href="https://plus.google.com/111568277509717571535" class="btn"><i
              class="fa fa-google-plus fa-fw"></i> <span class="network-name">Google+</span></a>
          </li>
        </ul>
      </div>
    </div>
    <Map/>
  </section>

</template>

<script>
import { Map } from "../components/";
import { every } from "lodash";

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
      isValid: false,
      submitStatus: "",
      errorMessage: "",
      contact: {
        name: "",
        email: "",
        title: "",
        message: ""
      }
    };
  },

  methods: {
    validateForm() {
      let isValid = every(this.contact, value => value !== "");
      if (isValid) {
        isValid = this.validateEmail(this.contact.email);
        if (!isValid) {
          this.errorMessage = "Please enter a valid email";
          this.submitStatus = "error";
        }
      } else {
        this.errorMessage = "All fields are required.";
        this.submitStatus = "error";
      }
      return isValid;
    },
    validateEmail(email) {
      const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return re.test(String(email).toLowerCase());
    },
    async handleSubmit() {
      this.errorMessage = "";
      this.submitStatus = "sending";
      this.isValid = this.validateForm();
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
          this.submitStatus = "success";
          setTimeout(() => (this.submitStatus = ""), 2000);
        } else {
          this.submitStatus = "serverError";
          this.errorMessage = "There's been a server side error.";
        }
      } else {
        this.submitStatus = "error";
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
  padding: 0;
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
  border: solid $black-color 1px;
  border-radius: 6px;
  color: $black-color;
  background-color: transparent;
  transition: all 0.1s ease-in-out;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  font-weight: 500;
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
  form {
    margin-bottom: 0;
  }
}

.contact-form {
  max-width: 15rem;
  margin: 0 auto 0;
  text-align: center;
  padding: 0 2rem 0;
  @media (min-width: $bp-sm) {
    padding: 0 3rem 0;
  }
  @media (min-width: $bp-md) {
    padding: 0 10rem 0;
  }
}

.contact-wrapper {
  padding-bottom: 3rem;
}

#submit {
  position: relative;
  width: 7rem;
  height: 3rem;
  font-weight: 600;
  background-color: $gray-color;
  border: solid $gray-color 2px;
  color: $white-color;
  cursor: pointer;
  transition: background-color 0.15s ease-out;
  &.sending {
    background-color: $white-color;
  }
  &:hover {
    background-color: darken($blue-color, 25%);
    color: $white-color;
  }
  &[disabled]:hover {
    cursor: auto;
    background-color: $white-color !important;
    color: $black-color !important;
  }

  span {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
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

.message-container {
  width: 100%;
  padding: 2rem 0 2rem;
  min-height: 1.5rem;
}

.warning-text {
  color: $warning-color;
}

.email-text {
  font-family: Montserrat;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0;
}

@keyframes loader_1 {
  0% {
    top: 36px;
    height: 128px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

@-webkit-keyframes loader_1 {
  0% {
    top: 36px;
    height: 128px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

@keyframes loader_2 {
  0% {
    top: 41.99999999999999px;
    height: 116.00000000000001px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

@-webkit-keyframes loader_2 {
  0% {
    top: 41.99999999999999px;
    height: 116.00000000000001px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

@keyframes loader_3 {
  0% {
    top: 48px;
    height: 104px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

@-webkit-keyframes loader_3 {
  0% {
    top: 48px;
    height: 104px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
}

.loader {
  position: relative;
  margin-top: -10px;
}

.loader div {
  position: absolute;
  width: 30px;
}

.loader div:nth-child(1) {
  left: 35px;
  background: #dce4eb;
  animation: loader_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.2s;
}

.loader div:nth-child(2) {
  left: 85px;
  background: #bbcedd;
  animation: loader_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.1s;
}

.loader div:nth-child(3) {
  left: 135px;
  background: #85a2b6;
  animation: loader_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.loader {
  transform: translate(-31px, -31px) scale(0.31) translate(31px, 31px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
