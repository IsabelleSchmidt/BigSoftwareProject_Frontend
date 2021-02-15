import { shallowMount, mount, VueWrapper, RouterLinkStub } from "@vue/test-utils"
	
import Cart from "@/views/Cart.vue"
import CartList from "@/views/Cart.vue"
	
describe('Test CartList.vue', () => {
	
    let cmp: VueWrapper<any>
	
    beforeEach(() => {
        cmp = shallowMount(Cart)
    })
	
    test('has the expected html structur', () => {
        expect(cmp.element).toMatchSnapshot()
    })
	
	
    test('stubs a component using a custom component, component CartList is mentioned right in html', () => {

        const CartListMock = {	
            name: 'CartList',
            template: 'fakeCartList'
        }
        const wrapper = mount(Cart, {
            global: {
            stubs: { CartList: CartListMock }
            }
        }) 
        expect(wrapper.html()).toContain(`<div id=\"list\">fakeCartList</div>`) 
    })


    test('find out if Component CartList exists ', () => {
	
        const wrapper = shallowMount(Cart)
	
        wrapper.findComponent(CartList) // returns a VueWrapper
	
        expect(() => wrapper.getComponent('.not-there')).toThrowError()
    })
})