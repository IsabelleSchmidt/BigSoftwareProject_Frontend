//import {Client} from '@stomp/stompjs'; //Message
import { reactive, computed, ref } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import '@/service/Product'
import '@/service/Picture'
import '@/service/ProductResponse'
import '@/service/PictureResponse'
import '@/service/Validationerror'

/**************************************************/

const state = reactive({
  list: Array<Product>(),
  roomtypes:  {} as Map<string,string>,
  producttypes: {} as Map<string,string>,
  validationerrors: Array<Validationerror>(),
  tags: Array<Tag>()
})

export let articlenr: number;

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
  for(const product of state.list){
    if (product.articlenr == nr) {
      return product;
    }
  }
}

function getAvailableByArtNr(nr: number) {
  for(const product of state.list){
    if (product.articlenr == nr) {
      return product.available;
    }
  }
}
function getHightPrice() {
  const highest = ref(0);
  for(const product of state.list){
    if (highest.value < product.price) {
      highest.value = product.price;
    }
  }
  return highest.value;
}
function getHightWidth() {
  const highest = ref(0);
  for(const product of state.list){
    if (highest.value < product.width) {
      highest.value = product.width;
    }
  }
  return highest.value;
}

function getHightHeigh() {
  const highest = ref(0);
  for(const product of state.list){
    if (highest.value < product.height) {
      highest.value = product.height;
    }
  }
  return highest.value;
}

function getHightDepth() {
  const highest = ref(0);
  for(const product of state.list){
    if (highest.value < product.depth) {
      highest.value = product.depth;
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
    
async function getAllTags() {
  const taglist = new Array<Tag>();
  fetch(`/api/product/tags`,{method:'GET'})
  .then((response)=>{
    if(!response.ok){
      return taglist;
    }
    return response.json();
  })
  .then((jsondata: Array<Tag>)=>{
    for (let i = 0; i < jsondata.length; i++) {
      taglist.push(jsondata[i]);
    }
    state.tags = taglist
  })
  .catch((fehler)=>{
    console.log(fehler)
  })
}


async function sendProduct(newProduct: Product): Promise<void> {
  articlenr = -1;
  console.log(" Sende Produkt mit Namen: " + newProduct.name + " an backend.")
  console.log("Sende: " + 'Product ' + JSON.stringify(newProduct))
  await fetch(`/api/product/product/new`, {
    method: 'POST',
    headers: { "Content-Type": "application/json", access: 'Access-Control-Allow-Origin' },
    body: JSON.stringify(newProduct)
  }).then(function (response) {
    //hier checken ob alles ok gelaufen ist -> falls nein errormessages holen?
    if (response.status == 406) {
      //errormessages holen
      const productResponse = JSON.parse(JSON.stringify(response.body)) as ProductResponse;
      state.validationerrors = productResponse.allErrors;
      console.log("FEHLER: " + state.validationerrors)
    }
    return response.json();
  }).then((jsondata: ProductResponse) => {

    console.log("Response json: " + JSON.stringify(jsondata));
    //wenn alles richtig war, neues Produkt hinzufuegen
    if (jsondata.allErrors.length == 0) {
      state.list.push(jsondata.product);
      state.validationerrors = jsondata.allErrors;
      console.log("neues produkt!");
      articlenr = jsondata.product.articlenr;
      console.log("articlenr", jsondata.product.articlenr);
    }
    else {

      state.validationerrors = jsondata.allErrors;
      console.log("Fehlerliste: " + JSON.stringify(jsondata.allErrors));
    }
  }).catch((error) => {
    console.log(error);
  });

}

//Liste an Bildern
async function sendPicture(formData: FormData, articlenr: number) {
  console.log("Sende Bild an Backend");
  let wassuccessful = false;
  if (articlenr != -1) {
    await fetch(`/api/product/product/${articlenr}/newpicture`, {
      method: 'POST',
      headers: { access: 'Access-Control-Allow-Origin' },
      body: formData
    }).then(function (response) {
      if (!response.ok) {
        console.log("NOT OKKKKKK")
        state.validationerrors.push({ field: "picture", message: "Bild ist zu gross oder nicht vorhanden" })
        console.log("FEHLER: " + JSON.stringify(state.validationerrors))
        wassuccessful = false
        return wassuccessful;
      }
      return response.json();
    }).then((jsondata: PictureResponse) => {
      console.log("Erfolgreiche Bildübertragung? " + JSON.stringify(jsondata));
      if (jsondata.allErrors.length == 0) {
        wassuccessful = true;
      } else {
        state.validationerrors = jsondata.allErrors;
        console.log("Fehlerliste: " + JSON.stringify(jsondata.allErrors));
        wassuccessful = false;
      }
    })
      .catch((fehler) => {
        console.log(fehler);
      });
  }
  return wassuccessful;
}

export function useProduct() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    allproductslist: computed(() => state.list),
    alltags: computed(()=> state.tags),
    //errormessage: computed(() => state.errormessage),
    update,
    getProductByArtNr,
    getAvailableByArtNr,
    getHightPrice,
    getHightDepth,
    getHightHeigh,
    getHightWidth,
    getAllProductTypes,
    getAllRoomTypes,
    allproducttypes: computed(() => state.producttypes),
    allroomtypes: computed(()=> state.roomtypes),
    roomkeys: computed(()=> Object.keys(state.roomtypes)),
    productkeys: computed(()=> Object.keys(state.producttypes)),
    getAllTags
  }
}
//macht die sendProduct Funktion von außen zugänglich
export function postProduct() {
  return {
    sendProduct,
    validationerrors: computed(() => state.validationerrors),
  }
}

//sendPicture funktion nach außen anbieten
export function postPictures() {
  return {
    sendPicture
  }
}