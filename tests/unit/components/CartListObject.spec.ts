import { mount, shallowMount, VueWrapper} from '@vue/test-utils'
	
import CartListObject from '@/components/CartListObject.vue'
	
describe('CartListObject', () => {
	
       const cmp = shallowMount(CartListObject)

       
    test('find pname',() => {
        const information = cmp.find('.information')
        expect(information.text()).toBe("Lisa")
    })
})