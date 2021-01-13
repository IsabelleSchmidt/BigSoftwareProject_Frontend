import {useCartStore} from '@/service/CartStore'
import { computed,reactive} from 'vue'

const {list} = useCartStore();

const state = reactive({
    errormessage: "",
    orderlist: list,
    errormessages: Array<MessageResponse>(),
    ordererrormessages: Array<OrderResponse>(),
    allorders: new Set<number>()
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
        console.log("ERRORS bei sende UserOrderRequests : " + JSON.stringify(state.errormessages));
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
    }).then((jsondata: Array<OrderResponse>) =>{

        if(!(jsondata.length == 1 && jsondata[0].orderid != -1)){
            state.ordererrormessages = jsondata;
            console.log("ERRORS bei sende bestellte Artikel: " + JSON.stringify(jsondata));
        }else{
            state.allorders.add(jsondata[0].orderid);
            console.log("Bestellung erfolgreich!");
            //TODO: Bestaetigung anzeigen und auf Bestelluebersicht weiterleiten
        }
        
        
    }).catch((exception) => {
        console.log(exception)
    });
}
    

export function usePostOrder() {
    return {
        postOrder,
        errormessages: computed(() => state.errormessages),
        ordererrrormessages: computed(() => state.ordererrormessages),
        allorders: state.allorders
        
    }
}