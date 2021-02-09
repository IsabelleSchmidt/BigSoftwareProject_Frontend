import { shallowMount, mount } from "@vue/test-utils"

import CompProduct from "@/components/CompProduct.vue"

describe('CompProduct.vue test', () => {

    const cmp = CompProduct

    test('if expected html structur', () => {
        expect(cmp.element).toMatchSnapshot()
    })

    // test('stubs a component using a custom component, component CartList is mentioned right in html', () => {

    //     const ProductFilterMock = {	
    //         name: 'ProductFilter',
    //         template: 'fakeProductFilter'
    //     }
    //     const wrapper = mount(CompProduct, {
    //         global: {
    //         stubs: { CartList: ProductFilterMock }
    //         }
    //     }) 
    //     expect(wrapper.html()).toContain(`<div class="productFilter"><fakeProductFilter/></div>`) 
    // })
      
})