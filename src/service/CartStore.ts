import Vue, { provide } from 'vue'
import { reactive } from 'vue'

import { computed } from 'vue'

import '@/service/Product'

const state = reactive({
    list: new Map<Product, number>(),
  })

function addProduct(product: Product): void{
    const number = 1; 

    if(state.list.has(product)){
        
        let amount = state.list.get(product);
        if(amount){
            amount++;
            state.list.set(product, amount);
        }

    }else{
        state.list.set(product, number);
    } 
}
function changeAmount(product: Product, amount: number): void{
    state.list.set(product, amount);

}
function deleteProduct(product: Product): void{
    state.list.delete(product);
}


  export function useCartStore() {
    return {
      // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
      list: computed(() => state.list),
      addProduct,
      changeAmount,
      deleteProduct,
    }
  }

  