import NotFound from "@/components/NotFound.vue"
import { mount } from "@vue/test-utils"

describe('notfound.vue test', () => {
    const cmp = mount(NotFound)

    test('does the picture exist', () => {
        expect(cmp.html()).toContain('img')
    })
})