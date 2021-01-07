import Vue, { provide } from 'vue'
import { reactive, ref } from 'vue'

import { computed } from 'vue'

import '@/service/Product'

const state = reactive({
    list: new Map<Product, number>(),
  })
const total = ref(0);

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
function calcTotal(value: number, key: Product, map: any): void{
    const zw = total.value;
    total.value = zw + (key.price*value);
}
function totalPrice(){
    total.value = 0; 
    state.list.forEach(calcTotal);
    return Math.round((total.value)*Math.pow(10,2))/Math.pow(10,2);
}


  export function useCartStore() {
    return {
      // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
      list: computed(() => state.list),
      addProduct,
      changeAmount,
      deleteProduct,
      totalPrice
    }
  }

  