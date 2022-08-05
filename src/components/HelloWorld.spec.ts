import { mount } from '@vue/test-utils'
import lat from './lat.vue'

describe('HelloWorld', () => {
  it('should display header text', () => {
    const msg = 'Hello Vue 3'
    const wrapper = mount(lat, { props: { msg } })

    expect(wrapper.find('h1').text()).toEqual(msg)
  })
})