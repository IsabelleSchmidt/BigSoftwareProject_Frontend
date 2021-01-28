import { reactive, computed } from 'vue'
import '@/service/Product'

const state = reactive({
    searchword: "",
    searchaktive: false
})

function setSearchword(word: string){
    state.searchword = word;
}

function setSearchactive(value: boolean){
    state.searchaktive = value;
}

function clearSearch() {
    state.searchword = "";
    state.searchaktive = false;
    console.log("clear");
}

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