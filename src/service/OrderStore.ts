import {useCartStore} from '@/service/CartStore'
import { reactive} from 'vue'

const {list} = useCartStore();

const state = reactive({
    errormessage: "",
    orderlist: list,
    errormessages: Array<MessageResponse>(),
})

async function postOrder(userorderreq: UserOrderRequest, order: OrderDT): Promise<void> {

    console.log("User Order Request" + JSON.stringify(userorderreq));
    console.log("postOrder - Liste Warenkorb: " + JSON.stringify(Array.from(state.orderlist)));
    console.log("Liste der Bestellten Produkte: " + JSON.stringify(order));
    
    //Fetch -> UserDetails
    await fetch(`http://localhost:9090/api/user/newOrder/user`,{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userorderreq)
    }).then((response) => {
        if(!response.ok){
            console.log("Error");
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) =>{
        state.errormessages = jsondata;
        console.log("ERRORS bei sende UserOrderRequests : " + state.errormessages.length);
    }).catch((exception) => {
        console.log(exception)
    });

   //Fetch -> ordered Articles
    await fetch(`http://localhost:9090/api/order/new`,{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(order)
    }).then((response) => {
        if(!response.ok){
            console.log("Error");
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) =>{
        state.errormessages = jsondata;
        console.log("ERRORS bei sende bestellte Artikel: " + state.errormessages.length);
    }).catch((exception) => {
        console.log(exception)
    });
}
    

export function usePostOrder() {
    return {
        postOrder
    }
}