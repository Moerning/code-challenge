import { mount , shallowMount} from '@vue/test-utils'
import HomePage from "./Home.vue"

describe('Home', () => {
  let wrapper:any;
  let msg = "Message";
  beforeEach(()=>{
    wrapper = mount(HomePage,{ props: { msg } })
  })



  it('Contains Submit Button', () => {
    const buttonText = "Submit";
    expect(wrapper.find('#submit-button').text()).toEqual(buttonText);
  })

  it('Sets Input Value', async () => {
    const input = wrapper.get('[data-type="title"]')
    const testProduct = "MockName"
    await input.setValue(testProduct)
  
    expect(input.element.value).toBe(testProduct)

    // wrapper.get('[data-type="title"]').setValue('New Product')

  })

  it('Sends Form Successfully', async () => {
    //consider env value
    const rowsPerPage = 3

    const input = wrapper.get('[data-type="title"]')
    const testProduct = "MockName"
    await input.setValue(testProduct)
    const button = wrapper.find('#submit-button')
      // trigger click
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('click')

  })
})
