import Rooms from "@/views/Rooms.vue"
import RoomList from "@/views/Rooms.vue"

import { mount, shallowMount } from "@vue/test-utils"

describe('Rooms.vue test',() => {
    const cmp = shallowMount(Rooms)

    test('if component roomlist is used correctly',() => {
        const RoomListMock = {	
            name: 'RoomList',
            template: 'fakeRoomList'
        }
        const wrapper = mount(Rooms, {
            global: {
            stubs: { RoomList: RoomListMock }
            }
        }) 
        expect(wrapper.html()).toContain(`<div class=\"rooms\">fakeRoomList</div>`)
    })

})