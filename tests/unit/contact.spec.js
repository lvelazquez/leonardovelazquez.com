import {mount} from '@vue/test-utils';
import Vue from 'vue';
import {Contact} from '../../src/pages';

const errorMessage = {email: "Please enter a valid email", general: 'All fields are required.', submit: 'Please try again later or reach me at <a href="mailto:leo@leonardovelazquez.com">leo@leonardovelazquez.com</a>'};
const submitStatus = {sending: 'sending', success: 'success', serverError: 'serverError'};

describe('Contact.vue', () => {
  it('renders contact container', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    });
    expect(wrapper.contains('section#contact')).toBe(true)
  });

  it('validateEmail method works', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    });
    const emails = {
      incorrect: ['ar', '', ' ', 'lalo@lol', ' leo@amazero.com'],
      correct: ['leo@amazero.com', 'lula@lolli.co.so']
    };

    const incorrectEmails = emails.incorrect.every(wrapper.vm.validateEmail);
    expect(incorrectEmails).toBe(false);

    const correctEmails = emails.correct.every(wrapper.vm.validateEmail);
    expect(correctEmails).toBe(true);

  });

  it('has necessary contact markup', () => {
    const wrapper = mount(Contact);
    expect(wrapper.html()).toContain('<section id=\"contact\" class=\"container content-section invisible\"><div class=\"contact-wrapper\"><div><h2>Contact</h2> <div id=\"contact-container\"><div class=\"contact-form\"><form id=\"contact_form\"><div class=\"input-group contact-name contact-info\"><input id=\"contact_name\" type=\"text\" name=\"name\" placeholder=\"Your Name\" autocomplete=\"true\" class=\"input-field\"></div> <div class=\"input-group contact-email contact-info has-feedback\"><input id=\"contact_email\" type=\"text\" name=\"email\" placeholder=\"Your Email\" autocomplete=\"true\" class=\"input-field\"></div> <div class=\"input-group contact-info\"><input id=\"contact_subject\" type=\"text\" name=\"subject\" placeholder=\"Subject\" class=\"input-field\"></div> <div class=\"input-group contact-message contact-info has-feedback\"><textarea id=\"contact_message\" name=\"message\" placeholder=\"Your Message\" class=\"input-field\"></textarea></div> <button id=\"submit\" name=\"Submit Contact Form\" type=\"submit\" class=\"btn\"><span name=\"fade\">SUBMIT</span></button></form> <div class=\"message-container\"><!----></div></div></div> <ul class=\"banner-social-buttons\"><li><a href=\"https://www.linkedin.com/in/leovelazquez\" class=\"btn\"><i class=\"icon-linkedin\"></i> <span class=\"network-name\">Linked In</span></a></li> <li><a href=\"https://github.com/lvelazquez\" class=\"btn\"><i class=\"icon-github-circled\"></i> <span class=\"network-name\">Github</span></a></li> <li><a href=\"https://plus.google.com/111568277509717571535\" class=\"btn\"><i class=\"icon-gplus-squared\"></i> <span class=\"network-name\">Google+</span></a></li></ul></div></div> <div id=\"map\"></div></section>')

  });

  it('on submit throws error if fields are empty', done => {
    const wrapper = mount(Contact);
    const form = wrapper.find('form');
    form.trigger('submit');
    Vue.nextTick(() => {
      expect(wrapper.vm.errorMessage).toBe(errorMessage.general);
      done();
    })
  });

  it('on submit throws error if email is invalid', function(done) {
    const wrapper = mount(Contact);
    const formData = {
      name: 'Leo Velazquez',
      email: 'la2',
      subject: 'write back',
      content: 'bla blab'
    };

    const form = wrapper.find('form');
    const nameInput = wrapper.find('#contact_name');
    const emailInput = wrapper.find('#contact_email');
    const subjectInput = wrapper.find('#contact_subject');
    const contactText = wrapper.find('#contact_message');

    nameInput.element.value = formData.name;
    nameInput.trigger('input');
    emailInput.element.value = formData.email;
    emailInput.trigger('input');
    subjectInput.element.value = formData.subject;
    subjectInput.trigger('input');
    contactText.element.value = formData.content;
    contactText.trigger('input');

    form.trigger('submit');

    Vue.nextTick(() => {
      console.log(Object.values(wrapper.vm.contact));
      expect(wrapper.vm.errorMessage).toBe(errorMessage.email);
      done();
    })
  });

  it('successful submit', function(done) {
    const wrapper = mount(Contact);
    const formData = {
      name: 'Leo Velazquez',
      email: 'leo@leonardovelazquez.com',
      subject: 'write back',
      content: 'bla blab'
    };

    const form = wrapper.find('form');
    const nameInput = wrapper.find('#contact_name');
    const emailInput = wrapper.find('#contact_email');
    const subjectInput = wrapper.find('#contact_subject');
    const contactText = wrapper.find('#contact_message');

    nameInput.element.value = formData.name;
    nameInput.trigger('input');
    emailInput.element.value = formData.email;
    emailInput.trigger('input');
    subjectInput.element.value = formData.subject;
    subjectInput.trigger('input');
    contactText.element.value = formData.content;
    contactText.trigger('input');

    form.trigger('submit');
expect
    // Vue.nextTick(() => {
    //   expect(wrapper.vm.errorMessage).toBe(false);
    //   expect(wrapper.vm.submitStatus).toBe(submitStatus.sending);
    //
    //   done();
    // })
  });

});
