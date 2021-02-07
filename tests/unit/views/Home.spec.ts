import { shallowMount } from "@vue/test-utils"
import Home from "../../../src/views/Home.vue"

describe('Test for the Homepage',() => {

    const cmp = shallowMount(Home)

    test('If HTML structur is right', () => {
        expect(cmp.html()).toMatchSnapshot()
    })


    test('stubs a component, component RoomList is used in Home.vue + contained in html', () => {

        const RoomListMock = {	
            name: 'RoomList',
            template: 'fakeRoomList'
        }
        const wrapper = shallowMount(Home, {
            global: {
            stubs: { RoomList: RoomListMock }
            }
        }) 
        expect(wrapper.html()).toContain(`fakeRoomList`) 
        wrapper.findComponent(RoomListMock)
    })
})