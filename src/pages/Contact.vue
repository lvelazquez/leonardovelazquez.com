<template>
  <section id="contact" class="content-section" aria-labelledby="contact-heading">
    <h2 id="contact-heading">Contact</h2>
    <div class="contact-form">
      <form id="contact_form" novalidate @submit.prevent="handleSubmit">
        <div
          v-for="field in fields"
          :key="field.key"
          class="input-group"
          :class="{ warning: hasError(field.key) }"
        >
          <label :for="field.id" class="sr-only">{{ field.label }}</label>
          <textarea
            v-if="field.multiline"
            :id="field.id"
            v-model="contact[field.key]"
            class="input-field"
            :name="field.name"
            :placeholder="field.label"
            required
            :aria-invalid="hasError(field.key)"
            :aria-describedby="hasError(field.key) ? 'contact_status' : undefined"
          ></textarea>
          <input
            v-else
            :id="field.id"
            v-model="contact[field.key]"
            class="input-field"
            :type="field.type"
            :name="field.name"
            :autocomplete="field.autocomplete"
            :placeholder="field.label"
            required
            :aria-invalid="hasError(field.key)"
            :aria-describedby="hasError(field.key) ? 'contact_status' : undefined"
          />
        </div>

        <button id="submit" type="submit" class="submit" :disabled="submitStatus === 'sending'">
          <span v-if="submitStatus === 'sending'" class="bars" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
          <span :class="{ 'sr-only': submitStatus === 'sending' }">{{
            submitStatus === 'sending' ? 'Sending' : 'Submit'
          }}</span>
        </button>
      </form>

      <div id="contact_status" class="message-container" role="status" aria-live="polite">
        <p v-if="errorMessage" class="form-text warning-text">{{ errorMessage }}</p>
        <p v-if="submitStatus === 'serverError'" class="email-text">
          Please try again later or reach me at
          <a href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>
        </p>
        <p v-if="submitStatus === 'success'" class="form-text success-text">Successfully sent!</p>
      </div>
    </div>

    <ul class="banner-social-buttons">
      <li>
        <a href="https://www.linkedin.com/in/leovelazquez" class="btn" rel="noopener">
          <i class="icon-linkedin" aria-hidden="true"></i>
          <span class="network-name">Linked In</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/lvelazquez" class="btn" rel="noopener">
          <i class="icon-github-circled" aria-hidden="true"></i>
          <span class="network-name">Github</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  validateContact,
  CONTACT_ERROR_TEXT,
  validateEmail,
  type ContactForm,
} from '../lib/validate'

type Status = '' | 'sending' | 'error' | 'serverError' | 'success'

const fields: {
  key: keyof ContactForm
  id: string
  name: string
  label: string
  type?: string
  autocomplete?: string
  multiline?: boolean
}[] = [
  {
    key: 'name',
    id: 'contact_name',
    name: 'name',
    label: 'Your Name',
    type: 'text',
    autocomplete: 'name',
  },
  {
    key: 'email',
    id: 'contact_email',
    name: 'email',
    label: 'Your Email',
    type: 'email',
    autocomplete: 'email',
  },
  { key: 'title', id: 'contact_subject', name: 'subject', label: 'Subject', type: 'text' },
  {
    key: 'message',
    id: 'contact_message',
    name: 'message',
    label: 'Your Message',
    multiline: true,
  },
]

const contact = reactive<ContactForm>({ name: '', email: '', title: '', message: '' })
const submitStatus = ref<Status>('')
const errorMessage = ref('')

function hasError(key: keyof ContactForm) {
  if (submitStatus.value !== 'error') return false
  return key === 'email' ? !validateEmail(contact.email) : contact[key].trim() === ''
}

async function handleSubmit() {
  errorMessage.value = ''
  const problem = validateContact(contact)
  if (problem) {
    submitStatus.value = 'error'
    errorMessage.value = CONTACT_ERROR_TEXT[problem]
    return
  }
  submitStatus.value = 'sending'
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}api/contact`, {
      method: 'POST',
      cache: 'no-cache',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
    const res = (await response.json()) as { ok?: boolean }
    if (!response.ok || !res.ok) throw new Error('send failed')
    submitStatus.value = 'success'
    Object.assign(contact, { name: '', email: '', title: '', message: '' })
    setTimeout(() => {
      if (submitStatus.value === 'success') submitStatus.value = ''
    }, 5000)
  } catch {
    submitStatus.value = 'serverError'
    errorMessage.value = "There's been a server side error."
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/media-queries.scss' as media;

#contact {
  color: var(--color-on-surface);
  background-color: var(--color-surface);
  padding-bottom: var(--space-10);
}

.contact-form {
  max-width: 20rem;
  margin: 0 auto;
  text-align: center;
}

.input-field {
  display: block;
  width: 100%;
  margin-bottom: var(--space-4);
  padding: var(--space-2);
  border: 2px solid var(--color-muted);
  border-radius: var(--radius-sm);
  color: var(--color-on-surface);
  background: transparent;
  font: inherit;
  font-size: var(--text-sm);
  resize: none;
  height: auto;

  &::placeholder {
    color: var(--color-muted);
    opacity: 1;
  }
}

textarea.input-field {
  height: 7rem;
}

.warning .input-field {
  border-color: var(--color-danger);
}

.btn,
.submit {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-weight: var(--weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--motion-exit),
    color var(--motion-exit);
}

.btn {
  display: inline-block;
  max-width: 10rem;
  padding: 10px var(--space-4);
  border: var(--space-hairline) solid var(--color-on-surface);
  color: var(--color-on-surface);
  background-color: transparent;
  font-size: var(--text-md);
  line-height: 1.33;
}

.submit {
  position: relative;
  width: 7rem;
  height: 3rem;
  border: 2px solid var(--color-surface-inverse);
  color: var(--color-on-surface-inverse);
  background-color: var(--color-surface-inverse);
  font-weight: var(--weight-semibold);
  font-size: var(--text-md);
}

.btn:hover,
.submit:hover:not(:disabled) {
  color: var(--palette-white);
  background-color: var(--color-accent-strong);
  border-color: var(--color-accent-strong);
  transition-duration: var(--duration-medium-fast);
  transition-timing-function: var(--ease-smooth-out);
}

.submit:disabled {
  cursor: progress;
  color: var(--color-on-surface);
  background-color: transparent;
}

.message-container {
  min-height: 1.5rem;
  margin-top: var(--space-4);
  p {
    margin: 0;
  }
}

.form-text,
.email-text {
  font-weight: var(--weight-bold);
  font-size: var(--text-lg);
}

.success-text {
  color: var(--color-accent-text);
}

.warning-text {
  color: var(--color-danger);
}

.email-text {
  font-family: var(--font-display);
  font-size: var(--text-md);
  margin-top: var(--space-2);
  a {
    text-decoration: underline;
  }
}

.bars {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  height: 1.5rem;
  span {
    width: 0.4rem;
    height: 100%;
    background: var(--color-accent-strong);
    transform-origin: center;
    animation: bar var(--duration-loop) var(--ease-linear) infinite;
    &:nth-child(2) {
      animation-delay: calc(var(--duration-loop) * -0.2);
    }
    &:nth-child(3) {
      animation-delay: calc(var(--duration-loop) * -0.4);
    }
  }
}

@keyframes bar {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
}

.banner-social-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--space-6) auto 0;
  li {
    margin-bottom: var(--space-4);
  }
  @media (min-width: media.$bp-ms) {
    flex-direction: row;
    justify-content: center;
    gap: var(--space-5);
  }
}
</style>
