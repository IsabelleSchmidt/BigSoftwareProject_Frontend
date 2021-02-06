import { shallowMount, VueWrapper } from "@vue/test-utils"
	
import CartList from "@/components/CartList.vue"
import CartListObject from "@/components/CartListObject.vue"
	
describe('Test CartList.vue', () => {
		
    let cmp: VueWrapper<any>

    beforeEach(() => {
        cmp = shallowMount(CartList)
    })

	
    test('has the expected html structur', () => {
        expect(cmp.element).toMatchSnapshot()
    })
    
    
    test('find out if Component CartListobject exists ', () => {
	
        const wrapper = shallowMount(CartList)
       // wrapper.findComponent({ components: 'CartListObject' }) // returns a VueWrapper
        wrapper.findComponent(CartListObject) // returns a VueWrapper
	
        expect(() => wrapper.getComponent('.not-there')).toThrowError()
    })
})