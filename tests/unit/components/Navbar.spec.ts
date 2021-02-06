import { shallowMount } from "@vue/test-utils"
import Navbar from "../../../src/components/Navbar.vue"

describe('Navbar.vue Test', () => {

    const cmp = shallowMount(Navbar)

    test('Has the expected HTML structure', () => {
        expect(cmp.html()).toMatchSnapshot()
    })


    test('html contains products, rooms, cart, search-box, profile', () => {
        expect(cmp.html()).toContain('Produkte')
        expect(cmp.html()).toContain('Räume')
        expect(cmp.html()).toContain('cart')
        expect(cmp.html()).toContain('search')
        expect(cmp.html()).toContain(' <li><router-link to="/profile">')
    })
})