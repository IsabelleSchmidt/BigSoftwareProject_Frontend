import {reactive, ref } from 'vue'

import { computed } from 'vue'
import {useProduct} from '../service/ProductStore'
/**
 * holds reactive data
 */
const state = reactive({
    /**
     * map that matches a price filter option to whether or not it's filter was set
     */
    pricelist: new Map<string, boolean>(),
     /**
     * map that matches a width filter option to whether or not it's filter was set
     */
    widthlist: new Map<string, boolean>(),
     /**
     * map that matches a height filter option to whether or not it's filter was set
     */
    heightlist: new Map<string, boolean>(),
     /**
     * map that matches a depth filter option to whether or not it's filter was set
     */
    depthlist: new Map<string, boolean>(),
     /**
     * map that matches a color filter option to whether or not it's filter was set
     */
    colorlist: new Map<string, boolean>(),
     /**
     * whether the filters are being used
     */
    filterclose: false,
});

const {getHightPrice} = useProduct();

/**
 * sets the value of filterclose
 * @param close whether the filters are being used 
 */
function setFilterClose(close: boolean){
    state.filterclose = close;
}
/**
 * adds a filter for a price option to the active filters
 * @param price the chosen price option
 */
function addPiceFilter(price: string): void{
    state.pricelist.set(price, true)
}
/**
 * deletes a prive filter option from active filters
 * @param price the price option that's not being used anymore
 */
function deletePriceFilter(price: string): void{
    state.pricelist.delete(price);
}
/**
 * gets the lowest price of all available products
 * @returns the lowest price
 */
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
/**
 * finds the hightest price of all products
 * @returns the highest price 
 */
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
/**
 * adds size filters to active filters
 * @param size a size consiting of width, height and depth
 * @param list list of filters to be added
 */
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
/**
 * deletes a sizefilter from active filters
 * @param size  a size consiting of width, height and depth
 * @param list list of filters to be deleted
 */
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
/**
 * finds the smallest width of all products
 * @returns the smallest width
 */
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
/**
 * finds the greatest width of all products' dimensions
 * @returns the greatest width
 */
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
/**
 * finds the smallest height of all products' dimensions
 * @returns the greatest height
 */
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
/**
 * finds the greatest height of all products' dimensions
 * @returns the greatest height
 */
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
/**
 * finds the smallest depth of all products' dimensions
 * @returns the smallest depth
 */
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
/**
 * finds the greatest depth of all products' dimensions
 * @returns the greatest depth
 */
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
/**
 * adds a colourfilter to all active filters
 * @param color new active filter
 */
function addColorFilter(color: string): void{
    state.colorlist.set(color, true)
}
/**
 * deletes a colourfilter from all active filters
 * @param color unused filter
 */
function deleteColorFilter(color: string): void{
    state.colorlist.delete(color)
}
/**
 * deletes all active filters
 */
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
