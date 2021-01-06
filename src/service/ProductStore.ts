//import {Client} from '@stomp/stompjs'; //Message
import { reactive } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import { computed } from 'vue'

import '@/service/Product'

/**************************************************/

//const wsurl = "ws:localhost:9090/stompbroker";
//const DEST = "/topic/products";

//const stompclient = new Client( { brokerURL: wsurl})

const state = reactive({
    list: Array<Product>(),
    img: String,
    //errormessage: ""
  })

  async function update(): Promise<void> {
    const productlist = new Array<Product>();
    fetch(`http://localhost:8080/api/products`, {
        method: 'GET'
    })
      .then((response) => {
        if (!response.ok) {
          return productlist;
        }
        //state.errormessage = "";

        return response.json();
      })
      .then((jsondata: Array<Product>)=>{
        // console.log("yiiiha");
        // console.log(jsondata);
        for(let i = 0; i < jsondata.length; i++){
          productlist.push(jsondata[i]);
        }
        state.list = productlist;
  
      })
      .catch((fehler) => {
        //fehler.state.errormessage("Fehler bei der Serverkommunikation");
        //state.liste = alt;
        console.log(fehler);
      });      

  } 
    

    export function useProduct() {
        return {
          // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
          list: computed(() => state.list),
          //errormessage: computed(() => state.errormessage),
          update,
        }
      }