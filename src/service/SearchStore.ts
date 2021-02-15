import { reactive, computed } from 'vue'
import '@/service/Product'

const state = reactive({
    /**
     * word that's searched for 
     */
    searchword: "",
    /**
     * whether the search is currently active
     */
    searchaktive: false
})
/**
 * sets the value of the searched word to word
 * @param word that's currently searched for
 */
function setSearchword(word: string){
    state.searchword = word;
}
/**
 * Sets the value of searchaktive
 * @param value the new value for searchaktive
 */
function setSearchactive(value: boolean){
    state.searchaktive = value;
}

/**
 * clears the current search
 */
function clearSearch() {
    state.searchword = "";
    state.searchaktive = false;
}

/**
 * exports important functions and attributes
 */
export function useSearchStore() {
    return {
      // computed(): reactive but read-only-Version of searchword
      searchword: computed(() => state.searchword),
      searchaktive: computed(() => state.searchaktive),
      setSearchword,
      setSearchactive,
      clearSearch
      
    }
  }