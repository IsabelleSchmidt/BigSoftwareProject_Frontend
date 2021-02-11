import { reactive, ref } from 'vue'

import { computed } from 'vue'

import '@/service/Product'
import { useProduct } from '@/service/ProductStore'

const state = reactive({
    /**
     * all products that are currently in the cart
     */
    list: new Map<number, number>(),
})

const total = ref(0);
const { getProductByArtNr } = useProduct();

/**
 * adds a product to the current cart
 * @param productartnr articlenumber of the product that's been added
 * @param am the amount of times this product was put into the cart
 */
function addProduct(productartnr: number, am: number): void {

    state.list.has(productartnr) ? state.list.set(productartnr, Number(state.list.get(productartnr))+am) : state.list.set(productartnr,am);
}
/**
 * Returns the amount of times a given product was placed into the cart
 * @param productartnr articlenumber of given product
 */
function getAmount(productartnr: number) {
    return state.list.get(productartnr);
}
/**
 * changes the amount of a given product in the cart
 * @param productartnr product which's amount is changed
 * @param amount new amount of the product
 */
function changeAmount(productartnr: number, amount: number): void {
    state.list.set(productartnr as number, amount as number);
}
/**
 * deletes a product out of the cart
 * @param productartnr articlenumber of the product that's supposed to be deleted from the cart
 */
function deleteProduct(productartnr: number): void {
    state.list.delete(productartnr);
}
/**
 * calculates the total price of a product in the cart
 * @param value amount of times a product was put into the cart
 * @param key articlenumber of the product
 * @param map the map that stores articlenumber to amount of all products in the cart
 */
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

/**
 * deletes all products from the cart
 */
function clearCart() {
    state.list.clear();
}

/**
 * calculates the total price of the whole cart
 */
function totalPrice() {
    total.value = 0;
    state.list.forEach(calcTotal);
    return Math.round((total.value) * Math.pow(10, 2)) / Math.pow(10, 2);
}

/**
 * checks whether a product is still available
 * @param productartnr articlenumber of the product that's to be checked
 */
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
/**
 * returns the total amount of products that are currently in the cart
 */
function getCartAmount() {
    const cartAmount = ref(0);
    for (let i = 0; i < state.list.size; i++) {
        cartAmount.value = Number(cartAmount.value) + Number(Array.from(state.list.values())[i]);
    }
    return cartAmount.value;

}



/**
 * exports important functions and attributes
 */
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



