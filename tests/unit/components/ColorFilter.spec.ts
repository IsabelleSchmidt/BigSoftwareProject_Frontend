jest.mock('checked', () => ({
    get: jest.fn()
  }))

import { shallowMount } from "@vue/test-utils"

import ColorFilter from "@/components/ColorFilter.vue"

describe('Colorfilter test', () => {
    
    const cmp = shallowMount(ColorFilter)
    
    
    test('trigger demo', async () => {
        
        const checked = cmp.find('checked')
        checked.element.textContent = "grey"
        checked.trigger('change')

  
        await cmp.trigger('change')

        expect(checked).toBeCalledWith('grey')
    })

    // test('if checked exists and is called', () => {
        
    //     expect(checked).toBeCalledWith('grey')

    // })

    // test('negative test --> is not allowed to trigger with the wrong input', () => {
    //     checked.trigger('checked')
    //     expect(cmp.emitted().checked).toBeFalsy()
    // })

    test('Snapshot match test ', () => {
        expect(cmp.html()).toMatchSnapshot()
        expect(cmp).toMatchSnapshot()
    })
})