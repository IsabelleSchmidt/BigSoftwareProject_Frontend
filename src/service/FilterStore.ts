import { h, reactive, ref } from 'vue'

import { computed } from 'vue'
import {useProduct} from '../service/ProductStore'

const state = reactive({
    pricelist: new Map<string, boolean>(),
    widthlist: new Map<string, boolean>(),
    heightlist: new Map<string, boolean>(),
    depthlist: new Map<string, boolean>(),
});
const {getHightPrice} = useProduct();

function addPiceFilter(price: string): void{
    state.pricelist.set(price, true)
    console.log("Liste add" + JSON.stringify(Array.from(state.pricelist)))
}
function deletePriceFilter(price: string): void{
    state.pricelist.delete(price);
    console.log("Liste delete" + JSON.stringify(Array.from(state.pricelist)))

}
function getLowestPrice(){
    const lowest = ref(1000);
    for(let i = 0; i < state.pricelist.size; i++){
        const priceValues = Array.from(state.pricelist.keys())[i].split('%');
        console.log("lowestValue "+ lowest.value)
        if(parseInt(priceValues[0]) < lowest.value){
            lowest.value = parseInt(priceValues[0]);
        }
    }
    return lowest.value; 

}
function getHighestPrice(){
    const highest = ref(0);
    for(let i = 0; i < state.pricelist.size; i++){
        const priceValues = Array.from(state.pricelist.keys())[i].split('%');
        console.log("highestValue "+ highest.value)
        if(priceValues[1] == '+'){
            const is = getHightPrice();
            if(is)
            highest.value = is; 
        }
        if(parseInt(priceValues[1]) > highest.value){
            highest.value = parseInt(priceValues[1]);
        }
    }
    return highest.value; 

}

function addSizeFilter(size: string, list: string): void{
    const w = 'w'
    const h = 'h'
    const d = 'd'

    if(list == w){
        state.widthlist.set(size, true)
        console.log("WidthListe add" + JSON.stringify(Array.from(state.widthlist)))
    }
    if(list == h){
        state.heightlist.set(size, true)
        console.log("Heightlist add" + JSON.stringify(Array.from(state.heightlist)))
    }
    if(list == d){
        state.depthlist.set(size, true)
        console.log("depthlist add" + JSON.stringify(Array.from(state.depthlist)))
    }

}
function deleteSizeFilter(size: string, list: string): void{
    const w = 'w'
    const h = 'h'
    const d = 'd'

    if(list == w){
        state.widthlist.delete(size)
        console.log("WidthListe del" + JSON.stringify(Array.from(state.widthlist)))
    }
    if(list == h){
        state.heightlist.delete(size)
        console.log("Heightlist del" + JSON.stringify(Array.from(state.heightlist)))
    }
    if(list == d){
        state.depthlist.delete(size)
        console.log("depthlist del" + JSON.stringify(Array.from(state.depthlist)))
    }

}
function getWidthLow(){
        const widthlow = ref(1000);
        for(let i = 0; i < state.widthlist.size; i++){
            const widthValues = Array.from(state.widthlist.keys())[i].split('%');
            console.log("WlowestValue "+ widthlow.value)
            if(parseInt(widthValues[1]) < widthlow.value){
                widthlow.value = parseInt(widthValues[1]);
            }
        }
        return widthlow.value; 
}
function getWidthHigh(){
    const widthhigh = ref(0)
        for(let i = 0; i < state.widthlist.size; i++){
            const widthValues = Array.from(state.widthlist.keys())[i].split('%');
            console.log("WhighestValue "+ widthhigh.value)
            
            if(parseInt(widthValues[2]) > widthhigh.value){
                widthhigh.value = parseInt(widthValues[2]);
            }
        }
        return widthhigh.value; 
}
function getHeightLow(){
    const low = ref(1000);
    for(let i = 0; i < state.heightlist.size; i++){
        const values = Array.from(state.heightlist.keys())[i].split('%');
        console.log("hlowestValue "+ low.value)
        if(parseInt(values[1]) < low.value){
            low.value = parseInt(values[1]);
        }
    }
    return low.value; 
}
function getHeightHigh(){
const high = ref(0)
    for(let i = 0; i < state.heightlist.size; i++){
        const values = Array.from(state.heightlist.keys())[i].split('%');
        console.log("hhighestValue "+ high.value)
        
        if(parseInt(values[2]) > high.value){
            high.value = parseInt(values[2]);
        }
    }
    return high.value; 
}
function getDepthLow(){
    const low = ref(1000);
    for(let i = 0; i < state.depthlist.size; i++){
        const values = Array.from(state.depthlist.keys())[i].split('%');
        console.log("dlowestValue "+ low.value)
        if(parseInt(values[1]) < low.value){
            low.value = parseInt(values[1]);
        }
    }
    return low.value; 
}
function getDepthHigh(){
const high = ref(0)
    for(let i = 0; i < state.depthlist.size; i++){
        const values = Array.from(state.depthlist.keys())[i].split('%');
        console.log("dhighestValue "+ high.value)
        
        if(parseInt(values[2]) > high.value){
            high.value = parseInt(values[2]);
        }
    }
    return high.value; 
}
function deleteFilter(): void{
    state.pricelist.clear();
    state.widthlist.clear(); 
    state.heightlist.clear(); 
    state.depthlist.clear();
}

export function useFilterStore() {
    return {
      // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
      pricelist: computed(() => state.pricelist),
      widthlist: computed(() => state.widthlist),
      heightlist: computed(() => state.heightlist),
      depthlist: computed(() => state.depthlist),
      addPiceFilter,
      deletePriceFilter,
      getLowestPrice,
      getHighestPrice,
      addSizeFilter,
      deleteSizeFilter,
      getWidthLow,
      getWidthHigh,
      getHeightLow,
      getHeightHigh,
      getDepthHigh,
      getDepthLow,
      deleteFilter
    }
  }
