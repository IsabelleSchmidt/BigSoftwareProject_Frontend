//import {Client} from '@stomp/stompjs'; //Message
import { reactive, computed, ref } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import '@/service/Product'

/**************************************************/

const state = reactive({
  list: Array<Product>(),
  roomtypes:  {} as Map<string,string>,
  producttypes: {} as Map<string,string>
})

async function update(): Promise<void> {
  const productlist = new Array<Product>();
 await fetch(`/api/product/products`, {
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        return productlist;
      }
     
      return response.json();
    })
    .then((jsondata: Array<Product>) => { 
      for (let i = 0; i < jsondata.length; i++) {
        productlist.push(jsondata[i]);
      }
      state.list = productlist;

    })
    .catch((fehler) => {
      console.log(fehler);
    });

}

function getProductByArtNr(nr: number) {
  for (let i = 0; i < state.list.length; i++) {
    if (state.list[i].articlenr == nr) {
      return state.list[i];
    }
  }
}

function getAvailableByArtNr(nr: number) {
  for (let i = 0; i < state.list.length; i++) {
    if (state.list[i].articlenr == nr) {
      return state.list[i].available;
    }
  }
}
function getHightPrice(){
  const highest = ref(0);
  for (let i = 0; i < state.list.length; i++) {
    if (highest.value < state.list[i].price) {
      highest.value = state.list[i].price;

    }
  }
  return highest.value;

}

async function getAllProductTypes(){
  console.log("GET ALL PRODUCTTYPES");
  await fetch('/api/product/all/producttypes', {method: 'GET'})
    .then((response) =>{
      if(!response.ok){
        console.log("FEHLER BEIM HOLEN DER PRODUKTTYPEN");
      }
      else{
        return response.json();
      }

  }).then((jsondata: Map<string,string>) =>{
   state.producttypes = jsondata;

    
  }).catch((error) => {
    console.log(error);
  });
}

async function getAllRoomTypes(){
  console.log("GET ALL ROOMTYPES");
 await fetch('/api/product/all/roomtypes', {method: 'GET'})
  .then((response) =>{
    if(!response.ok){
      console.log("FEHLER BEIM HOLEN DER RAUMTYPEN");
    }
    else{
      return response.json();
    }

}).then((jsondata: Map<string,string>) =>{
  state.roomtypes = jsondata;
 

}).catch((error) => {
  console.log(error);
});
}
    

export function useProduct() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    allproductslist: computed(() => state.list),
    //errormessage: computed(() => state.errormessage),
    update,
    getProductByArtNr,
    getAvailableByArtNr,
    getHightPrice,
    getAllProductTypes,
    getAllRoomTypes,
    allproducttypes: computed(() => state.producttypes),
    allroomtypes: computed(()=> state.roomtypes),
    roomkeys: computed(()=> Object.keys(state.roomtypes)),
    productkeys: computed(()=> Object.keys(state.producttypes))
  }
}
