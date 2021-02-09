import Profile from "@/views/Profile.vue"

import { shallowMount } from "@vue/test-utils"

describe('Profile.vue test',() => {
    const cmp = shallowMount(Profile)
    
    test('If firstname, lastname, emil...exist',() =>{

        expect(cmp.html()).toContain('firstname')
        expect(cmp.html()).toContain('lastname')
        expect(cmp.html()).toContain('email')
        expect(cmp.html()).toContain('adress')
        expect(cmp.html()).toContain('creditcard')
        expect(cmp.html()).toContain('bankcard')
    })

})