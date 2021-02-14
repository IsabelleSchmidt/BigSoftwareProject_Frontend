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
    orderlist: list,
    /**
     * messages of possible mistakes after updating a user for placing an order
     */
    errormessages: Array<MessageResponse>(),
    /**
     * messages of possible mistakes after placing an order
     */
    ordererrormessages: Array<OrderResponse>(),
    /**
     * whether an order was successfully saved 
     */
  
})
  let orderSuccess = false;
  const errormessage= "Fehler beim aktualisieren des Users.";

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
            orderSuccess = false;
            throw new Error(errormessage);

        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) => {
        state.errormessages = jsondata;
        if (state.errormessages.length > 0) {
            orderSuccess = false;
        } else {
            orderSuccess = true;
        }
    }).catch((error) => {
        console.error(error)
    });

    if (!orderSuccess) {
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
            throw new Error(errormessage);
        }
        return response.json();
    }).then((jsondata: Array<OrderResponse>) => {
      
        if (jsondata.length != 1 && jsondata[0].orderid == -1) {
            state.ordererrormessages = jsondata;
            orderSuccess = false;
        } else {
            orderSuccess = true;
        }
    }).catch((error) => {
        console.error(error)
    });
    return orderSuccess;
}

/**
 * checks whether all items in the cart are still available
 */
function checkAllItemsStillAvailable() {
    //orderlist holds an articlenumber and the number of times this article is still available
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
        checkAllItemsStillAvailable
    }
}