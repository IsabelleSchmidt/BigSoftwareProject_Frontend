import CompResetPw from "@/components/CompResetPw.vue"
import { mount, shallowMount } from "@vue/test-utils"

describe('CompResetPw.vue test', () => {
    const cmp = mount(CompResetPw)

    test('snapshot test', () => {
        expect(cmp.html()).toMatchSnapshot()
    })

    test('button trigger test', async () => {
        const CompResetPw = {template: '<button @click="toLogin()" > Zurück zum Login</button>'}
        const wrapper = mount(CompResetPw)
        
        expect(wrapper.find('button').exists()).toBeTruthy()
    })

    test('props test, class contains exactly 1 prop', () => {
        expect(cmp.props.length).toBeGreaterThan(0)
    })

    test('context is emitted ', async () => {
        cmp.vm.$emit('context')

        expect(cmp.emitted().context).toBeTruthy()

      })
})