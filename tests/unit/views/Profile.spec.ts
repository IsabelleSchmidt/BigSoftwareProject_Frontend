import Profile from "@/views/Profile.vue"

import { mount, shallowMount } from "@vue/test-utils"

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

    test('test router.push()', async () => {
        const mockRoute = {
            params: {
              id: 1
            }
          }
          const mockRouter = {
            push: jest.fn()
          }
          const wrapper = mount(Profile, {
            props: {
              errormessages: 1
            },
            global: {
              mocks: {
                $route: mockRoute,
                $router: mockRouter
              }
            }
          })
      
          await wrapper.find('form').trigger('submit.prevent')
      
          expect(mockRouter.push).not.toHaveBeenCalledWith('/')
    })

})