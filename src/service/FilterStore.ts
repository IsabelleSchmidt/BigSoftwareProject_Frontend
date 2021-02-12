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
    /**
     * current values of the filter
     */
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
/**
 * sets and return the value of pricelow
 * @param value whether the slider are being used 
 */
function setPriceLow(value: number){
    state.pricelow = value;
    return state.pricelow
}
/**
 * sets and return the value of pricehigh
 * @param value whether the slider are being used 
 */
function setPriceHigh(value: number){
    state.pricehigh = value;
    return state.pricehigh
}
/**
 * sets the value of pricelow and pricehigh
 * to the default/start values
 * whether the filteroptions are deleted 
 */
function deletePriceFilter(): void{
    state.pricelow = 0; 
    state.pricehigh  = 1000;
}/**
 * sets and return the value of widthlow
 * @param value whether the slider are being used 
 */
function setWidthLow(value: number){
    state.widthlow = value;
    return state.widthlow
}
/**
 * sets and return the value of widthhigh
 * @param value whether the slider are being used 
 */
function setWidthHigh(value: number){
    state.widthhigh = value;
    return state.widthhigh
}
/**
 * sets the value of widthlow and widthhigh
 * to the default/start values
 * whether the filteroptions are deleted 
 */
function deleteWidthFilter(): void{
    state.widthlow = 0; 
    state.widthhigh  = 250;
}
/**
 * sets and return the value of heightlow
 * @param value whether the slider are being used 
 */
function setHeightLow(value: number){
    state.heightlow = value;
    return state.heightlow
}
/**
 * sets and return the value of heighthigh
 * @param value whether the slider are being used 
 */
function setHeightHigh(value: number){
    state.heighthigh = value;
    return state.heighthigh
}
/**
 * sets the value of heightlow and heighthigh
 * to the default/start values
 * whether the filteroptions are deleted 
 */
function deleteHighFilter(): void{
    state.heightlow = 0; 
    state.heighthigh  = 250;
}
/**
 * sets and return the value of depthlow
 * @param value whether the slider are being used 
 */
function setDepthLow(value: number){
    state.depthlow = value;
    return state.depthlow
}
/**
 * sets and return the value of depthhigh
 * @param value whether the slider are being used 
 */
function setDepthHigh(value: number){
    state.depthhigh = value;
    return state.depthhigh
}
/**
 * sets the value of depthlow and depthhigh
 * to the default/start values
 * whether the filteroptions are deleted 
 */
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
