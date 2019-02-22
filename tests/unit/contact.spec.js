import {mount} from '@vue/test-utils'
import {Contact} from '../../src/pages';

describe('Contact.vue', () => {
  it('renders contact container', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    });
    expect(wrapper.contains('section#contact')).toBe(true)
  });

  it('email validation works', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    });
    const emails = {
      incorrect: ['ar', '', ' ', 'lalo@lol', ' leo@amazero.com'],
      correct:['leo@amazero.com', 'lula@lolli.co.so']
    };

    const incorrectEmails = emails.incorrect.every(wrapper.vm.validateEmail);
    expect(incorrectEmails).toBe(false);

    const correctEmails = emails.correct.every(wrapper.vm.validateEmail);
    expect(correctEmails).toBe(true);

  });

  it('validates name', () => {

  });

  it('throws error if email is invalid', () => {

  });

  it('submits form', () => {

  });

});
