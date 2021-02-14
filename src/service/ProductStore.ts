//import {Client} from '@stomp/stompjs'; //Message
import { reactive, computed, readonly } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import '@/service/Product'
import '@/service/Picture'
import '@/service/Response'

/**************************************************/

const producttype = new Map<string, string>();

const roomtype = new Map <string, string>();

const state = reactive({
  /**
   * all existing products 
   */
  list: Array<Product>(), 
  /**
   * all existing roomtypes
   */
  roomtypes:  roomtype,
  /**
   * all existing producttypes
   */
  producttypes: producttype,
  /**
   * validation errors that are caused when an invalid order is placed
   */
  validationerrors: Array<MessageResponse>(),
  /**
   * all existing tags
   */
  tags: Array<Tag>()
})
/**
 * articlenr/identifier of a product
 */
export let articlenr: number;

/**
 * updates the available products
 */
async function update(): Promise<void> {
 await fetch(`/api/product/products`, {
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        return state.list;
      }
     
      return response.json();
    })
    .then((jsondata: Array<Product>) => { 
      jsondata.forEach(product => {
        state.list.push(product);
      })
    })
    .catch((fehler) => {
      console.log(fehler);
    });
}


/**
 * Finds and returns a product with a given articlenr
 * @param nr articlenumber of the product 
 */
function getProductByArtNr(nr: number) {
  for(const product of state.list){
    if (product.articlenr == nr) {
      return product;
    }
  }
}

/**
 * Returns the amount of times a product is available
 * @param nr Articlenumber of the product
 */
function getAvailableByArtNr(nr: number) {
  for(const product of state.list){
    if (product.articlenr == nr) {
      return product.available;
    }
  }
}

/**
 * Finds the highest price of all available products
 */
function getHightPrice() {
  return Math.max(...state.list.map(function(product){return product.price}))
}
/**
 * Finds the highest width of all available products
 */
function getHightWidth() {
  return Math.max(...state.list.map(function(product){return product.width}))
}
/**
 * Finds the highest height of all available products
 */
function getHightHeigh() {
  return Math.max(...state.list.map(function(product){return product.height}))
}
/**
 * Finds the highest depth of all available products
 */
function getHightDepth() {
  return Math.max(...state.list.map(function(product){return product.depth}))
}

/**
 * Fetches all existing Producttypes from the server
 */
async function getAllProductTypes(){
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

/**
 * Fetches all existing Roomtypes from the server
 */
async function getAllRoomTypes(){
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

/**
 * Fetches all existing tags from the server
 */
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

/**
 * Sends a newly created product to the server.
 * The new product will be saved into the database.
 * @param newProduct the product that's to be saved into the database
 */
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

/**
 * Sends a Picture to the server, the picture will be saved in the database
 * @param formData picture information
 * @param articlenr articlenumber of the product to which the picture belongs
 */
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


/**
 * exports important functions and attributes
 */
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
    getAllTags,
    state: readonly(state)
  }
}
/**
 * exports a function to send a product to the server
 * exports the list of errors that might have been thrown during the saving process
 */
export function postProduct() {
  return {
    sendProduct,
    validationerrors: computed(() => state.validationerrors),
  }
}

/**
 * exports a function to send pictures to the server
 */
export function postPictures() {
  return {
    sendPicture
  }
}