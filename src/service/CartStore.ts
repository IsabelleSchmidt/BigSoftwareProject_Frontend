import { reactive, ref } from 'vue'

import { computed } from 'vue'

import '@/service/Product'
import { useProduct } from '@/service/ProductStore'

const state = reactive({
    list: new Map<number, number>(),
    // check : new Boolean(),
})

const total = ref(0);
const { getProductByArtNr } = useProduct();


function addProduct(productartnr: number, am: number): void {

    state.list.has(productartnr) ? state.list.set(productartnr, Number(state.list.get(productartnr))+am) : state.list.set(productartnr,am);
}

function getAmount(productartnr: number) {
    return state.list.get(productartnr);
}
function changeAmount(productartnr: number, amount: number): void {
    state.list.set(productartnr as number, amount as number);
}

function deleteProduct(productartnr: number): void {
    state.list.delete(productartnr);
}
function calcTotal(value: number, key: number, map: any): void {
    const zw = total.value;

    const prod = getProductByArtNr(key);

    if (prod) {
        total.value = zw + (prod.price * value);
    }

}

// function setPreviousView(cartCheck: boolean): any{
//     state.check = cartCheck;

// }

// function getPreviousView(){
//     return state.check;
// }

function clearCart() {
    state.list.clear();
}

function totalPrice() {
    total.value = 0;
    state.list.forEach(calcTotal);
    return Math.round((total.value) * Math.pow(10, 2)) / Math.pow(10, 2);
}


function checkOneMoreAvailable(productartnr: number) {

    let av = true;


    for (let i = 0; i < state.list.size; i++) {

        if (Array.from(state.list.keys())[i] == productartnr) {
            const amount = Array.from(state.list.values())[i];

            const prod = getProductByArtNr(productartnr);
            const available = ref(0);

            if (prod) {
                available.value = prod.available;
            }

            if (amount >= available.value) {
                av = false;
                break;
            }
        }
    }

    return av;
}
function getCartAmount() {
    const cartAmount = ref(0);
    for (let i = 0; i < state.list.size; i++) {
        cartAmount.value = Number(cartAmount.value) + Number(Array.from(state.list.values())[i]);
    }
    return cartAmount.value;

}




export function useCartStore() {
    return {
        // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
        list: computed(() => state.list),
        // check: computed(() => state.check),
        addProduct,
        getAmount,
        getCartAmount,
        changeAmount,
        deleteProduct,
        totalPrice,
        checkOneMoreAvailable,
        clearCart,
        // setPreviousView,
        // getPreviousView,
        
    }
}



