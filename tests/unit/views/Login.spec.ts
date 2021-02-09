import Login from "@/views/Login.vue"
import CompResetPw from "@/views/Login.vue"
import CompLogin from "@/views/Login.vue"

import { shallowMount } from "@vue/test-utils"

describe('Login.vue',() => {

    const cmp = shallowMount(Login)

    test('test html and structur with snapshots',() => {
        expect(cmp.html()).toMatchSnapshot()
        expect(cmp).toMatchSnapshot()
    })

    test('Find component CompResetPw CompLogin and test if they exist', () => {

        expect(cmp.getComponent(CompResetPw)).toBeTruthy()
        expect(cmp.getComponent(CompLogin)).toBeTruthy()

        expect(() => cmp.getComponent('.not-there')).toThrowError()
    })
})