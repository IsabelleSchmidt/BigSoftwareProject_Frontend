import { shallowMount } from "@vue/test-utils"

import Product from "@/views/Product.vue"
import CompProduct from "@/views/Product.vue"
import CompSingle from "@/views/Product.vue"

describe('Product.vue test',() => {
    const cmp = shallowMount(Product)

    test('Snapshot test',() => {
        expect(cmp.html()).toMatchSnapshot()
        expect(cmp).toMatchSnapshot()
    })

    test('If components  Compproduct and compsingle exist', () => {
        cmp.findComponent(CompProduct)
        cmp.findComponent(CompSingle)

        expect(() => cmp.getComponent('.not-there')).toThrowError()
    })
})