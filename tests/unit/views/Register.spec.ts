import Register from "@/views/Register.vue"

import { shallowMount } from "@vue/test-utils"

describe('Register.vue test',() => {
    const cmp = shallowMount(Register)

    test('Snapshot test',() => {
        expect(cmp.html()).toMatchSnapshot()
    })

    test('if path to login exists',() => {
        expect(cmp.html()).toContain('to="/login"')
    })
})