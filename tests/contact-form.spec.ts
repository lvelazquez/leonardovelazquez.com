import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Contact from '../src/pages/Contact.vue'

afterEach(() => vi.unstubAllGlobals())

async function fill(wrapper: ReturnType<typeof mount>, email = 'leo@example.com') {
  await wrapper.find('#contact_name').setValue('Leo Velazquez')
  await wrapper.find('#contact_email').setValue(email)
  await wrapper.find('#contact_subject').setValue('Hello')
  await wrapper.find('#contact_message').setValue('Lorem ipsum')
}

describe('Contact page', () => {
  it('renders a labelled field for every input', () => {
    const wrapper = mount(Contact)
    for (const id of ['contact_name', 'contact_email', 'contact_subject', 'contact_message']) {
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.findAll('.banner-social-buttons a')).toHaveLength(2)
  })

  it('requires all fields and marks them invalid', async () => {
    const wrapper = mount(Contact)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.message-container').text()).toBe('All fields are required.')
    expect(wrapper.find('#contact_name').attributes('aria-invalid')).toBe('true')
  })

  it('rejects an invalid email', async () => {
    const wrapper = mount(Contact)
    await fill(wrapper, 'la2')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.message-container').text()).toBe('Please enter a valid email')
    expect(wrapper.find('#contact_email').attributes('aria-invalid')).toBe('true')
  })

  it('posts the form and reports success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    vi.stubGlobal('fetch', fetchMock)
    const wrapper = mount(Contact)
    await fill(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock.mock.calls[0][0]).toMatch(/api\/contact$/)
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).email).toBe('leo@example.com')
    expect(wrapper.find('.message-container').text()).toBe('Successfully sent!')
  })

  it('falls back to the mailto link when the server is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const wrapper = mount(Contact)
    await fill(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.message-container a[href^="mailto:"]').exists()).toBe(true)
  })
})
