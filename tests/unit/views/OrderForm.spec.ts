import { mount, shallowMount } from "@vue/test-utils"

import OrderForm from "@/views/OrderForm.vue"
import OrderListObject from "@/views/OrderForm.vue"

describe('Orderform.vue test',() => {

    const cmp = shallowMount(OrderForm)

    test('HTML + structur snapshot test',() => {
        expect(cmp.html()).toMatchSnapshot()
        expect(cmp).toMatchSnapshot()
    })

    test('if adresses, credit-/bankcards  exist',() => {
        expect(cmp.html()).toContain('adress')
        expect(cmp.html()).toContain('bankcard')
        expect(cmp.html()).toContain('creditcard')
    })

    test('if component orderlistobject exist + is used',() => {
        expect(cmp.findComponent(OrderListObject)).toBeTruthy()
        expect(() => cmp.getComponent('.not-there')).toThrowError()
    })

    test('Test if error works (there should not be one)',() => {
        const wrapper = mount(OrderForm)
        expect(wrapper.html()).not.toContain(`streetnameerror`)
    })
    
})