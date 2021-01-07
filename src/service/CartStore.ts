import Vue, { provide } from 'vue'
import { reactive, ref } from 'vue'

import { computed } from 'vue'

import '@/service/Product'

const state = reactive({
    list: new Map<Product, number>(),
  })
const total = ref(0);

function addProduct(product: Product): void{

    // console.log("Neu hinzugefügtes Produkt: " + JSON.stringify(product));
    // console.log("Liste vor hinzufügen: " + JSON.stringify(Array.from(state.list)));
    // console.log("Keys vor hinzufügen: " + JSON.stringify(Array.from(state.list.keys())));
    // console.log("Key 0: " + JSON.stringify(Array.from(state.list.keys())[0]) + " neues Produkt: " + JSON.stringify(product));
    // console.log("HasProduct?: " + state.list.has(product));
    // console.log("Array an Stelle 0: " + JSON.stringify(Array.from(state.list)[0]));
    // console.log("Array an Stelle 1: " + JSON.stringify(Array.from(state.list)[1]));
    // console.log("Array an Stelle 2: " + JSON.stringify(Array.from(state.list)[2]));

    let has =  false;
    const amount = ref(1);

    for (let i = 0; i < state.list.size; i++) {
        if (Array.from(state.list.keys())[i].articlenr == product.articlenr ) {
            
            const oldproduct = Array.from(state.list.keys())[i];
            has = true;
            amount.value = Array.from(state.list.values())[i];
            // console.log("SCHONMAL DRIN, so oft: " + amount.value);
            amount.value++;
            state.list.set(oldproduct as Product, amount.value);
            break;
        }
    }

    if (!has) {
        // console.log("NOCH NICHT DRIN");
        state.list.set(product, amount.value);
    }

    // if(state.list.has(product)){
        
    //     let amount = state.list.get(product);
    //     if(amount){
    //         amount++;
    //         state.list.set(product, amount);
    //     }

    // }else{
    //     state.list.set(product, number);
    // }

    // console.log("Liste nach hinzufügen: " + JSON.stringify(Array.from(state.list)));
}
function changeAmount(product: Product, amount: number): void{
    state.list.set(product, amount as number);

}
function deleteProduct(product: Product): void{
    state.list.delete(product);
}
function calcTotal(value: number, key: Product, map: any): void{
    const zw = total.value;
    total.value = zw + (key.price*value);
}
function totalPrice(){
    total.value = 0; 
    state.list.forEach(calcTotal);
    return Math.round((total.value)*Math.pow(10,2))/Math.pow(10,2);
}


function checkOneMoreAvailable(product: Product){

    let available = true;

    
        // console.log("SIZE " + state.list.size);
        for (let i = 0; i < state.list.size; i++) {
            // console.log("Artikelnummer in der liste " + Array.from(state.list.keys())[i].articlenr + " ProduktArtikelnummer" + product.articlenr);
            if (Array.from(state.list.keys())[i].articlenr == product.articlenr ) {
                const amount = Array.from(state.list.values())[i];
                // console.log("Check amount: " + amount + " available: " + product.available);
                if(amount >= product.available) {
                    available = false;
                    break;
                }
            }
        }
    
    return available;
}


  export function useCartStore() {
    return {
      // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
      list: computed(() => state.list),
      addProduct,
      changeAmount,
      deleteProduct,
      totalPrice,
      checkOneMoreAvailable
    }
  }

  