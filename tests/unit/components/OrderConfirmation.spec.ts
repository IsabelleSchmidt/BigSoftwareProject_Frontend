import OrderConfirmation from "@/components/OrderConfirmation.vue"
import { mount } from "@vue/test-utils"

describe('orderconfirmation.vue test', () => {

    const cmp = mount(OrderConfirmation)

    test('if message exists', () => {
        expect(cmp.html()).toContain('Vielen Dank für Ihre<br> Bestellung!')
    })
})