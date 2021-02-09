import { mount, shallowMount } from "@vue/test-utils"

import CompLogin from "@/components/CompLogin.vue"


describe('CompLogin Test', () => {

    const cmp = shallowMount(CompLogin)

    test(' if errormessages are printed and used in html', () => {
        expect(cmp.html()).toContain('error')
    })


    test('snapshot test', () => {
        expect(cmp.html()).toMatchSnapshot()
        expect(cmp).toMatchSnapshot()
    })


    test('contains password and email',() => {

        const wrapper = mount(CompLogin)
        
        expect(wrapper.html()).toContain('type="password"')
        expect(wrapper.html()).toContain('name="email"')
    })
    
    test('if <a> is found and click ist triggered', async () => {
        const wrapper = mount(CompLogin)

        // trigger the element
        await wrapper.find('a').trigger('click')
        expect(wrapper.emitted()).toBeCalled
      })
      
      test(' context is emitted ', async () => {
        const wrapper = mount(CompLogin)
        wrapper.vm.$emit('context')

        expect(wrapper.emitted().context).toBeTruthy()

      })
})