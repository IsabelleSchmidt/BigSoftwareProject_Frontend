import { shallowMount, mount } from "@vue/test-utils"

import CompProduct from "@/components/CompProduct.vue"

describe('CompProduct.vue test', () => {

    const cmp = CompProduct

    test('if expected html structur', () => {
        expect(cmp.element).toMatchSnapshot()
    }) 
})