import { shallowMount } from "@vue/test-utils"

import Sidebar from "../../../src/components/Sidebar.vue"

describe('Sidebar.vue Test', () => {

    const cmp = shallowMount(Sidebar)

    test('If the HTML structur is right', () => {
        expect(cmp.html()).toMatchSnapshot()
    })

    test('If HTML contains product and rooms', () => {
        expect(cmp.html()).toContain('Produkte')
        expect(cmp.html()).toContain('Räume')
    })
})
