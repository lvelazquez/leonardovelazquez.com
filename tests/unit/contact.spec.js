import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { Contact } from '../../src/pages'

const errorMessage = {
  email: 'Please enter a valid email',
  general: 'All fields are required.',
  submit:
    'Please try again later or reach me at <a href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>'
}

const submitStatus = {
  sending: 'sending',
  success: 'success',
  serverError: 'serverError'
}

describe('Contact.vue', () => {
  it('renders contact container', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    })
    expect(wrapper.contains('section#contact')).toBe(true)
  })

  it('validate email method works', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    })
    const emails = {
      incorrect: ['ar', '', ' ', 'lalo@lol', ' leo@amazero.com'],
      correct: ['leo@amazero.com', 'lula@lolli.co.so']
    }

    const incorrectEmails = emails.incorrect.every(wrapper.vm.validateEmail)
    expect(incorrectEmails).toBe(false)

    const correctEmails = emails.correct.every(wrapper.vm.validateEmail)
    expect(correctEmails).toBe(true)
  })

  it('has contact page markup', () => {
    const wrapper = mount(Contact)
    expect(
      wrapper.findAll('.banner-social-buttons .network-name').length
    ).toEqual(2)
    expect(wrapper.findAll('#submit').length).toEqual(1)
    expect(wrapper.findAll('#contact_message').length).toEqual(1)
    expect(wrapper.findAll('#contact_email').length).toEqual(1)
    expect(wrapper.findAll('#contact_name').length).toEqual(1)
  })

  it(`submit throws "${
    errorMessage.general
  }" error if fields are empty`, done => {
    const wrapper = mount(Contact)
    const form = wrapper.find('form')
    form.trigger('submit')
    Vue.nextTick(() => {
      expect(wrapper.vm.errorMessage).toBe(errorMessage.general)
      done()
    })
  })

  it(`submit throws "${
    errorMessage.email
  }" error if email is invalid`, function (done) {
    const wrapper = mount(Contact)
    const formData = {
      name: 'Leo Velazquez',
      email: 'la2',
      subject: 'write back',
      content: 'bla blab'
    }

    const form = wrapper.find('form')
    const nameInput = wrapper.find('#contact_name')
    const emailInput = wrapper.find('#contact_email')
    const subjectInput = wrapper.find('#contact_subject')
    const contactText = wrapper.find('#contact_message')

    nameInput.setValue(formData.name)
    emailInput.setValue(formData.email)
    subjectInput.setValue(formData.subject)
    contactText.setValue(formData.content)

    form.trigger('submit')

    Vue.nextTick(() => {
      expect(wrapper.vm.errorMessage).toBe(errorMessage.email)
      done()
    })
  })

  it('submit successful', async function (done) {
    const wrapper = mount(Contact)
    const formData = {
      name: 'Leonardo Velazquez',
      email: 'leo@leonardovelazquez.com',
      subject: 'Test Form Submit',
      content: 'Lorem Ipsum dolor'
    }

    const form = wrapper.find('form')
    const nameInput = wrapper.find('#contact_name')
    const emailInput = wrapper.find('#contact_email')
    const subjectInput = wrapper.find('#contact_subject')
    const contactText = wrapper.find('#contact_message')

    nameInput.setValue(formData.name)
    emailInput.setValue(formData.email)
    subjectInput.setValue(formData.subject)
    contactText.setValue(formData.content)

    await form.trigger('submit')

    await Vue.nextTick(() => {
      expect(wrapper.vm.errorMessage).toBe('')
      expect(wrapper.vm.submitStatus).toBe(submitStatus.sending)
    })

    await done()
  })
})
