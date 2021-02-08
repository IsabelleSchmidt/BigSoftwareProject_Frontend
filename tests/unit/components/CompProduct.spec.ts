import CompProduct from "@/components/CompProduct.vue"
import { shallowMount, mount } from "@vue/test-utils"

describe('CompProduct.vue test', () => {

    const cmp = mount(CompProduct)

    test('test messagempty',() => {
        const messageEmpty = "Empty"
        const wrapper = mount(CompProduct,{
        props: {
            msg: messageEmpty
        }
        })

        expect(wrapper.find("h4").text()).toBe("Empty")
    })


    // test('Snapshot test', () => {
    //     expect(cmp.html()).toMatchSnapshot()
    //     //expect(cmp).toMatchSnapshot()
    // })
})