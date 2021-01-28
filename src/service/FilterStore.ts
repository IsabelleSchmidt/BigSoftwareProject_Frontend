import {reactive, ref } from 'vue'

import { computed } from 'vue'
import {useProduct} from '../service/ProductStore'

const state = reactive({
    pricelist: new Map<string, boolean>(),
    widthlist: new Map<string, boolean>(),
    heightlist: new Map<string, boolean>(),
    depthlist: new Map<string, boolean>(),
    colorlist: new Map<string, boolean>(),
    filterclose: false,
});
const {getHightPrice} = useProduct();

function setFilterClose(close: boolean){
    state.filterclose = close;
}
function addPiceFilter(price: string): void{
    state.pricelist.set(price, true)
}
function deletePriceFilter(price: string): void{
    state.pricelist.delete(price);
}
function getLowestPrice(){
    const lowest = ref(1000);
    for(let i = 0; i < state.pricelist.size; i++){
        const priceValues = Array.from(state.pricelist.keys())[i].split('%');
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
    }
    if(list == h){
        state.heightlist.set(size, true)
    }
    if(list == d){
        state.depthlist.set(size, true)
    }

}
function deleteSizeFilter(size: string, list: string): void{
    const w = 'w'
    const h = 'h'
    const d = 'd'

    if(list == w){
        state.widthlist.delete(size)
    }
    if(list == h){
        state.heightlist.delete(size)
    }
    if(list == d){
        state.depthlist.delete(size)
    }
}
function getWidthLow(){
        const widthlow = ref(1000);
        for(let i = 0; i < state.widthlist.size; i++){
            const widthValues = Array.from(state.widthlist.keys())[i].split('%');
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
            if(widthValues[2] == '+'){
                widthhigh.value = 1000;
            }
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
        if(values[2] == '+'){
            high.value = 1000;
        }
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
        if(values[2] == '+'){
            high.value = 1000;
        }   
        if(parseInt(values[2]) > high.value){
            high.value = parseInt(values[2]);
        }
    }
    return high.value; 
}
function addColorFilter(color: string): void{
    state.colorlist.set(color, true)
}
function deleteColorFilter(color: string): void{
    state.colorlist.delete(color)
}
function deleteFilter(): void{
    state.pricelist.clear();
    state.widthlist.clear(); 
    state.heightlist.clear(); 
    state.depthlist.clear();
    state.colorlist.clear();
}

export function useFilterStore() {
    return {
      // computed(): reactive but read-only-Version
      pricelist: computed(() => state.pricelist),
      widthlist: computed(() => state.widthlist),
      heightlist: computed(() => state.heightlist),
      depthlist: computed(() => state.depthlist),
      colorlist: computed(() => state.colorlist),
      filterclose: computed(() => state.filterclose),

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
      deleteFilter,
      addColorFilter,
      deleteColorFilter,
      setFilterClose
    }
  }
