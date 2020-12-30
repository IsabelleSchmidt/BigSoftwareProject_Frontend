//import {Client} from '@stomp/stompjs'; //Message
import Vue from 'vue'
import { reactive } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import { computed } from 'vue'
import '@/service/Product'
import '@/service/Picture'

/**************************************************/

//const wsurl = "ws:localhost:9090/stompbroker";
//const DEST = "/topic/products";

//const stompclient = new Client( { brokerURL: wsurl})

const state = reactive({
    list: Array<Product>(),
    img: String,
    //errormessage: ""
  })

  const productResponse = reactive({
    product: Array<Product>(),
    message: String
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
    
  async function sendProduct(newProduct: Product){
    console.log(" Sende Produkt mit Namen: "+newProduct.name+" an backend.")
    console.log("Sende: "+'Product '+JSON.stringify(newProduct))
    fetch(`http://localhost:9090/api/product/new`,{
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(newProduct)
    }).then(function(response){
     
      console.log("Antwort",response)
      //Dinge mit der Antwort tun?
    }).catch((fehler) => {
      console.log(fehler);
    });

  }

  //Liste an Bildern
  async function sendPicture(formData: FormData){
    fetch(`http://localhost:9090/api/product/newpicture`,{
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData
    }).then(function(response){
      console.log(response)
      //Dinge mit der Antwort tun?
    }).catch((fehler) => {
      console.log(fehler);
    });
    //Bilderliste abschicken
  }

    export function useProduct() {
        return {
          // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
          list: computed(() => state.list),
          //errormessage: computed(() => state.errormessage),
          update,
        }
      }

    //macht die sendProduct Funktion von außen zugänglich
    export function postProduct(){
      return {
        sendProduct
      }
    }

    //sendPicture funktion nach außen anbieten
    export function postPictures(){
      return{
        sendPicture
      }
    }