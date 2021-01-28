import { useCartStore } from '@/service/CartStore'
import { computed, reactive } from 'vue'
import { useProduct } from './ProductStore';
import { useUserStore } from './UserStore';

const { list } = useCartStore();
const { allproductslist, getAvailableByArtNr } = useProduct();
const {jwttokens} = useUserStore();



const state = reactive({
    errormessage: "",
    orderlist: list,
    errormessages: Array<MessageResponse>(),
    ordererrormessages: Array<OrderResponse>(),
    allorders: new Set<number>(),
    orderSuccess: false
})

async function postOrder(userorderreq: UserOrderRequest, order: OrderDT): Promise<boolean> {
    const token = jwttokens.value[0];

    //Fetch -> UserDetails
    await fetch(`/api/user/newOrder/user`, {
        method: 'POST',
        headers: { "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token.accessToken},
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
                   "Authorization" : "Bearer " + token.accessToken },
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