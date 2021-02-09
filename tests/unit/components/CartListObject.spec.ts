import { shallowMount, VueWrapper} from '@vue/test-utils'
	
import CartListObject from '@/components/CartListObject.vue'
	
describe('CartListObject', () => {
	
    let cmp: VueWrapper<any>
	
	
    beforeEach(() => {
	
        cmp = shallowMount(CartListObject)
	
    })
    test('has the expected structur', () => {
        expect(cmp).toMatchSnapshot()
    })

    // test('If html contains the productobject, picture and all important informations', () => {
    //     expect(cmp.html()).toContain('productobject')
    //     expect(cmp.html()).toContain('picture')
    //     expect(cmp.html()).toContain('information')
    //     expect(cmp.html()).toContain('prName')
    //     expect(cmp.html()).toContain('prPrice')
    //     expect(cmp.html()).toContain('prNr')
    //     expect(cmp.html()).toContain('inTotal')
    //     expect(cmp.html()).toContain('amount')
    // })
})