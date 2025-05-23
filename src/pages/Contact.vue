<template>
  <section id="contact" class="container content-section" :class="{ invisible: !isLoaded }">
    <div class="contact-wrapper">
      <div>
        <h2>Contact</h2>
        <div id="contact-container">
          <div class="contact-form">
            <form id="contact_form" @submit.prevent="handleSubmit($event)">
              <div
                class="input-group contact-name contact-info"
                :class="{ warning: !contact.name && submitStatus === 'error' }"
              >
                <input
                  id="contact_name"
                  type="text"
                  class="input-field"
                  name="name"
                  v-model="contact.name"
                  placeholder="Your Name"
                  autocomplete="true"
                  aria-required="true"
                />
              </div>
              <div
                class="input-group contact-email contact-info has-feedback"
                :class="{
                  warning:
                    (!contact.email || !validateEmail(contact.email)) && submitStatus === 'error',
                }"
              >
                <input
                  id="contact_email"
                  type="text"
                  class="input-field"
                  name="email"
                  v-model="contact.email"
                  placeholder="Your Email"
                  autocomplete="true"
                  aria-required="true"
                  ref="contactEmail"
                />
              </div>
              <div
                class="input-group contact-info"
                :class="{ warning: !contact.title && submitStatus === 'error' }"
              >
                <input
                  id="contact_subject"
                  type="text"
                  class="input-field"
                  name="subject"
                  placeholder="Subject"
                  v-model="contact.title"
                  aria-required="true"
                  ref="contactSubject"
                />
              </div>
              <div
                class="input-group contact-message contact-info has-feedback"
                :class="{
                  warning: !contact.message && submitStatus === 'error',
                }"
              >
                <textarea
                  id="contact_message"
                  class="input-field"
                  name="message"
                  aria-required="true"
                  placeholder="Your Message"
                  v-model="contact.message"
                ></textarea>
              </div>

              <button
                role="button"
                id="submit"
                name="Submit Contact Form"
                :disabled="submitStatus === 'sending'"
                type="submit"
                :class="{ btn: true, sending: submitStatus === 'sending' }"
              >
                <transition name="fade">
                  <div class="loader" v-if="submitStatus === 'sending'">
                    <div class="loader-container">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </transition>
                <span v-if="submitStatus !== 'sending'">
                  {{ submitStatus !== 'sending' ? 'SUBMIT' : '' }}
                </span>
              </button>
            </form>
            <div class="message-container" :class="{ warning: !isValid && submitStatus !== '' }">
              <transition name="fade">
                <div
                  v-if="errorMessage !== '' && submitStatus === 'error'"
                  class="warning-text form-text"
                >
                  {{ errorMessage }}
                </div>
              </transition>
              <transition name="fade">
                <p v-if="submitStatus === 'serverError'" class="email-text">
                  Please try again later or reach me at
                  <a href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>
                </p>
              </transition>
              <transition name="fade">
                <div v-if="submitStatus === 'success'" class="form-text success-text">
                  Successfully sent!
                </div>
              </transition>
            </div>
          </div>
        </div>
        <ul class="banner-social-buttons">
          <li>
            <a href="https://www.linkedin.com/in/leovelazquez" class="btn">
              <i class="icon-linkedin"></i>
              <span class="network-name">Linked In</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/lvelazquez" class="btn">
              <i class="icon-github-circled"></i>
              <span class="network-name">Github</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <MapComponent v-if="renderMap" />
  </section>
</template>

<script>
import { Map as MapComponent } from '../components/'
import { every } from 'lodash'
import 'whatwg-fetch'

export default {
  name: 'ContactPage',
  props: {
    isLoaded: Boolean,
    renderMap: Boolean,
  },
  components: {
    MapComponent,
  },
  data() {
    return {
      isValid: false,
      submitStatus: '',
      errorMessage: '',
      contact: {
        name: '',
        email: '',
        title: '',
        message: '',
      },
    }
  },

  methods: {
    validateForm() {
      let isValid = every(this.contact, value => value !== '')
      if (isValid) {
        isValid = this.validateEmail(this.contact.email)
        this.$refs.contactEmail.setAttribute('aria-invalid', isValid)
        if (!isValid) {
          this.errorMessage = 'Please enter a valid email'
          this.submitStatus = 'error'
        }
      } else {
        this.errorMessage = 'All fields are required.'
        this.submitStatus = 'error'
      }
      return isValid
    },
    validateEmail(email) {
      const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      return re.test(String(email).toLowerCase())
    },
    async handleSubmit(event) {
      if (event) event.preventDefault()
      if (event) event.stopPropagation()
      this.errorMessage = ''
      this.submitStatus = 'sending'
      this.isValid = this.validateForm()
      if (this.isValid) {
        const response = await fetch('/contact', {
          body: JSON.stringify(this.contact),
          cache: 'no-cache',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const res = JSON.parse(await response.json())
        if (res.ok) {
          this.submitStatus = 'success'
          setTimeout(() => (this.submitStatus = ''), 2000)
        } else {
          this.submitStatus = 'serverError'
          this.errorMessage = "There's been a server side error."
        }
      } else {
        this.submitStatus = 'error'
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use 'sass:color';
@use '../styles/settings.scss' as *;
@use '../styles/content.scss' as content;
@use '../styles/media-queries.scss' as media;

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
  @media (min-width: media.$bp-ms) {
    flex-direction: row;
    padding: 0 30%;
    margin: 0 auto;
  }

  @media (min-width: media.$bp-lg) {
    padding: 0 35%;
  }
}

.btn {
  font-family: 'Montserrat', Arial, sans-serif;
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
  background-color: color.adjust($blue-color, $lightness: -25%);
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
  @media (min-width: media.$bp-sm) {
    padding: 0 3rem 0;
  }
  @media (min-width: media.$bp-md) {
    padding: 0 10rem 0;
  }
}

.contact-wrapper {
  padding-bottom: 6rem;
  @media (min-width: media.$bp-sm) {
    padding-bottom: 7rem;
  }
  @media (min-width: media.$bp-md) {
    padding-bottom: 6rem;
  }
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
    background-color: color.adjust($blue-color, $lightness: -25%);
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

.input-field {
  width: 100%;
  border: solid $light-gray-color 2px;
  border-radius: 5px;
  margin-bottom: 1rem;
  outline: none;
  font-family: 'Open Sans', Helvetica, sans-serif;
  padding: 0.5rem;
  box-shadow: none;
  background: none;
  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 100px white inset;
    z-index: -1;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus {
  border: 2px solid $blue-color;
  -webkit-text-fill-color: $gray-color;
  -webkit-box-shadow: 0 0 0px 1000px color.adjust($light-gray-color, $lightness: 0.5%) inset;
  transition: background-color 5000s ease-in-out 0s;
  input:-webkit-autofill {
    -webkit-text-fill-color: transparent !important;
    background-color: transparent;
  }
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  -webkit-text-fill-color: #333;
}

.warning .input-field {
  border: solid $warning-color 2px !important;
}

.message-container.warning {
  padding: 2rem 0 2rem;
}

.form-text {
  color: $blue-color;
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  white-space: nowrap;
}

.message-container {
  width: 100%;
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
  pointer-events: none;
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

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
