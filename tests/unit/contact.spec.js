import {mount} from '@vue/test-utils'
import {Contact} from '../../src/pages';

describe('Contact.vue', () => {
  it('renders contact container', () => {
    const wrapper = mount(Contact, {
      attachToDocument: true
    });
    expect(wrapper.contains('section#contact')).toBe(true)
  });


});
