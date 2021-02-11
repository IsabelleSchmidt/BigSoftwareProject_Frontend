import { mount } from "@vue/test-utils"
	
import ProductList from "@/components/ProductList.vue"
import ProductListObject from "@/components/ProductList.vue"
	
describe('ProductList.vue Test ', () => {
	
    const cmp = mount(ProductList)
	
    test('has the expected html structur', () => {
        expect(cmp.html()).toMatchSnapshot()
    })
	
    test('test if fakeproductlistobject ist used', () => {

        const ProductListObjectMock = {	
            name: 'ProductListObject',
            template: 'fakeProductListObject'
        }
        const wrapper = mount(ProductList, {
            global: {
            stubs: { productListObject: ProductListObjectMock }
            }
        }) 
        expect(wrapper.find('fakeProductListObject')).toBeTruthy() 
    })
})