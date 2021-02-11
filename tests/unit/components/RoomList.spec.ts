import { mount, RouterLinkStub } from "@vue/test-utils"
	
import RoomList from "@/components/RoomList.vue"
import Room from "@/components/RoomList.vue"
	
describe('Test room.vue', () => {
    const cmp = mount(RoomList)
	
    test('has the expected html structur', () => {
        expect(cmp.html()).toMatchSnapshot()
    })
	
    test('props test, class contains exactly 2 props', () => {
        expect(cmp.findComponent(Room)).toBeTruthy()
    })

    test('if roomlist is complete(HTML)', () => {
        expect(cmp.html()).toContain('Bad')
        expect(cmp.html()).toContain('Schlafzimmer')
        expect(cmp.html()).toContain('Küche')
        expect(cmp.html()).toContain('Wohnzimmer')
        expect(cmp.html()).toContain('Esszimmer')
        expect(cmp.html()).toContain('Arbeitszimmer')
    })
})