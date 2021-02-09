import CompSingle from "@/components/CompSingle.vue"
import { mount } from "@vue/test-utils"

describe('CompSingle Test',() => {
    const cmp = mount(CompSingle)

    test('HTML and Structur snapshot test',() => {
        expect(cmp.html).toContain('name')
        expect(cmp.html).toContain('description')
        expect(cmp.html).toContain('price')
    })
})