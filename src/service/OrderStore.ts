import { useCartStore } from '@/service/CartStore'
import { computed, reactive } from 'vue'
import { useProduct } from './ProductStore';
import { useUserStore } from './UserStore';

const { list } = useCartStore();
const { allproductslist, getAvailableByArtNr } = useProduct();
const {jwttoken} = useUserStore();



const state = reactive({
    /**
     * map of products in the cart key:articlenumber, value:amount of times a product is in the cart
     */
    errormessage: "",
      /**
     * messages of possible mistakes after updating a user for placing an order
     */
    orderlist: list,
    /**
     * messages of possible mistakes after placing an order
     */
    errormessages: Array<MessageResponse>(),
    /**
     * list of errors that occured while saving a new order
     */
    ordererrormessages: Array<OrderResponse>(),
    /**
     * a set of all order identifiers of orders placed by the user in this session 
     */
    allorders: new Set<number>(),
    /**
     * whether an order was successfully saved 
     */
    orderSuccess: false
})
/**
   * sends requests to the server to save new userinformation and place an order
   * @param userorderreq new user information needed to place an order
   * @param order order to be placed
   */
async function postOrder(userorderreq: UserOrderRequest, order: OrderDT): Promise<boolean> {
    const token = jwttoken;

    //Fetch -> UserDetails
    await fetch(`/api/user/newOrder/user`, {
        method: 'POST',
        headers: { "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token.value.accessToken},
        body: JSON.stringify(userorderreq)
    }).then((response) => {
        if (!response.ok) {
            state.orderSuccess = false;
            throw new Error(state.errormessage);

        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) => {
        state.errormessages = jsondata;
        if (state.errormessages.length > 0) {
            state.orderSuccess = false;
        } else {
            state.orderSuccess = true;
        }
    }).catch((exception) => {
        console.log(exception)
    });

    if (!state.orderSuccess) {
        return false;
    }
    //Fetch -> ordered Articles
    await fetch(`/api/order/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json",
                   "Authorization" : "Bearer " + token.value.accessToken },
        body: JSON.stringify(order)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<OrderResponse>) => {

        if (!(jsondata.length == 1 && jsondata[0].orderid != -1)) {
            state.ordererrormessages = jsondata;
            state.orderSuccess = false;
        } else {
            state.allorders.add(jsondata[0].orderid);
            state.orderSuccess = true;
        }
    }).catch((exception) => {
        console.log(exception)
    });
    return state.orderSuccess;
}
/**
 * checks whether all items in the cart are still available
 */
function checkAllItemsStillAvailable() {
    for (let i = 0; i < state.orderlist.size; i++) {
        const artnr = Array.from(state.orderlist.keys())[i];
        const available = getAvailableByArtNr(artnr) as number;
        const needtobeavailable = Array.from(state.orderlist.values())[i]
        if (needtobeavailable > available) {
            return false;
        }
    }
    return true;
}


export function usePostOrder() {
    return {
        postOrder,
        errormessages: computed(() => state.errormessages),
        ordererrormessages: computed(() => state.ordererrormessages),
        allorders: state.allorders,
        checkAllItemsStillAvailable
    }
}