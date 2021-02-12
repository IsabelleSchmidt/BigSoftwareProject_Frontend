import {reactive } from 'vue'

import { computed } from 'vue'
/**
 * holds reactive data
 */
const state = reactive({
     /**
     * map that matches a color filter option to whether or not it's filter was set
     */
    colorlist: new Map<string, boolean>(),
     /**
     * whether the filters are being used
     */
    filterclose: false,
    pricelow: 0,
    pricehigh: 1000,
    widthlow: 0,
    widthhigh: 250,
    heightlow: 0,
    heighthigh: 250,
    depthlow: 0,
    depthhigh: 250,
});
/**
 * sets the value of filterclose
 * @param close whether the filters are being used 
 */
function setFilterClose(close: boolean){
    state.filterclose = close;
}
function setPriceLow(close: number){
    state.pricelow = close;
    return state.pricelow
}
function setPriceHigh(close: number){
    state.pricehigh = close;
    return state.pricehigh
}
function deletePriceFilter(): void{
    state.pricelow = 0; 
    state.pricehigh  = 1000;
}
function setWidthLow(close: number){
    state.widthlow = close;
    return state.widthlow
}
function setWidthHigh(close: number){
    state.widthhigh = close;
    return state.widthhigh
}
function deleteWidthFilter(): void{
    state.widthlow = 0; 
    state.widthhigh  = 250;
}
function setHeightLow(close: number){
    state.heightlow = close;
    return state.heightlow
}
function setHeightHigh(close: number){
    state.heighthigh = close;
    return state.heighthigh
}
function deleteHighFilter(): void{
    state.heightlow = 0; 
    state.heighthigh  = 250;
}
function setDepthLow(close: number){
    state.depthlow = close;
    return state.depthlow
}
function setDepthHigh(close: number){
    state.depthhigh = close;
    return state.depthhigh
}
function deleteDepthFilter(): void{
    state.depthlow = 0; 
    state.depthhigh  = 250;
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
    deleteDepthFilter();
    deleteHighFilter();
    deleteWidthFilter();
    deletePriceFilter();
    state.colorlist.clear();
}

export function useFilterStore() {
    return {
      // computed(): reactive but read-only-Version
      colorlist: computed(() => state.colorlist),
      filterclose: computed(() => state.filterclose),
      pricelow: computed(() => state.pricelow),
      pricehigh: computed(() => state.pricehigh),
      widthlow: computed(() => state.widthlow),
      widthhigh: computed(() => state.widthhigh),
      depthlow: computed(() => state.depthlow),
      depthhigh: computed(() => state.depthhigh),
      heighthigh: computed(() => state.heighthigh),
      heightlow: computed(() => state.heightlow),

      deletePriceFilter,
      deleteFilter,
      addColorFilter,
      deleteColorFilter,
      setFilterClose,
      setPriceHigh, 
      setPriceLow,
      setWidthHigh, 
      setWidthLow,
      deleteWidthFilter,
      setHeightHigh, 
      setHeightLow,
      deleteHighFilter,
      setDepthLow, 
      setDepthHigh,
      deleteDepthFilter,
    }
  }
