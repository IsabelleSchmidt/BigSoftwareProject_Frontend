import { shallowMount } from '@vue/test-utils'
import NewProduct from '@/views/NewProduct.vue'

const factory  = (values={}) => {
    return shallowMount(NewProduct,{
        data(){
            return{
                ...values
            }
        }

    })
}


describe('NewProduct.vue',()=>{
    it('Name without Errors', ()=>{
        let wrapper = factory({name:'Lachlan'})
        expect(wrapper.find('nameerror').exists()).toBeFalsy()
        wrapper.find("input[type=submit]").trigger("click");
        // wrapper = factory({name:'Bjoern'})
        // expect(wrapper.vm.nameerror).toBeTruthy()
    })

    it('add existing Name', ()=>{
        const wrapper = factory({name:'Bjoern'})
        // wrapper.find("form").trigger("submit.prevent")
        wrapper.vm.sendeProd()
        expect(wrapper.vm.click).toBe('geclicked')
    })
})