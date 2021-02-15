import Footer from "@/components/Footer.vue"
import { shallowMount } from "@vue/test-utils"

describe('Footer.vue test',() => {
    const cmp = shallowMount(Footer)

    test('snapshot test',() => {
        expect(cmp.html).toMatchSnapshot()
    })
})