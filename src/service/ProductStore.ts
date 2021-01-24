
import { reactive } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import { computed } from 'vue'

import '@/service/Product'

/**************************************************/

const state = reactive({
  list: Array<Product>(),
})

async function update(): Promise<void> {
  const productlist = new Array<Product>();
  fetch(`http://localhost:8080/api/products`, {
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        return productlist;
      }

      return response.json();
    })
    .then((jsondata: Array<Product>) => {
      for (let i = 0; i < jsondata.length; i++) {
        productlist.push(jsondata[i]);
      }
      state.list = productlist;

    })
    .catch((fehler) => {
      console.log(fehler);
    });

}

function getProductByArtNr(nr: number) {
  for (let i = 0; i < state.list.length; i++) {
    if (state.list[i].articlenr == nr) {
      return state.list[i];
    }
  }
}

function getAvailableByArtNr(nr: number) {
  for (let i = 0; i < state.list.length; i++) {
    if (state.list[i].articlenr == nr) {
      return state.list[i].available;
    }
  }
}


export function useProduct() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    allproductslist: computed(() => state.list),
    update,
    getProductByArtNr,
    getAvailableByArtNr
  }
}