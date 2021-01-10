import { reactive, ref } from 'vue'

import { computed } from 'vue'

import '@/service/Product'
import {useProduct} from '@/service/ProductStore'

const state = reactive({
    list: new Map<number, number>(),
  })

const total = ref(0);
const {getProductByArtNr} =  useProduct();

function addProduct(productArtnr: number): void{
    
    let has =  false;
    const amount = ref(1);

    for (let i = 0; i < state.list.size; i++) {
        if (Array.from(state.list.keys())[i] == productArtnr ) {
            
            const oldproductArtnr = Array.from(state.list.keys())[i];
            has = true;
            amount.value = Array.from(state.list.values())[i];
            // console.log("SCHONMAL DRIN, so oft: " + amount.value);
            amount.value++;
            state.list.set(oldproductArtnr, amount.value);
            break;
        }
    }

    if (!has) {
        // console.log("NOCH NICHT DRIN");
        state.list.set(productArtnr, amount.value);
    }
}

function changeAmount(productArtnr: number, amount: number): void{
    state.list.set(productArtnr, amount as number);

}
function deleteProduct(productArtnr: number): void{
    state.list.delete(productArtnr);
}
function calcTotal(value: number, key: number, map: any): void{
    const zw = total.value;

    const prod = getProductByArtNr(key);

    if(prod) {
        total.value = zw + (prod.price*value);
    }

}
function totalPrice(){
    total.value = 0; 
    state.list.forEach(calcTotal);
    return Math.round((total.value)*Math.pow(10,2))/Math.pow(10,2);
}


function checkOneMoreAvailable(productArtnr: number){

    let av = true;

    
        // console.log("SIZE " + state.list.size);
        for (let i = 0; i < state.list.size; i++) {
            // console.log("Artikelnummer in der liste " + Array.from(state.list.keys())[i].articlenr + " ProduktArtikelnummer" + product.articlenr);
            if (Array.from(state.list.keys())[i] == productArtnr ) {
                const amount = Array.from(state.list.values())[i];

                const prod = getProductByArtNr(productArtnr);
                const available = ref(0);

                if (prod) {
                    available.value = prod.available;
                }

                // console.log("Check amount: " + amount + " available: " + product.available);
                if(amount >= available.value) {
                    av = false;
                    break;
                }
            }
        }
    
    return av;
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

  

  