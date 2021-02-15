<template>
  <div id="line">
    <div class="productobject">
      <div class="picture">
        <img v-bind:src="'/api/product/picture/'+ppath.id" alt="Picture" id="pic" />
      </div>
      <div class="information">
        <ul>
          <li id="prName">{{ pname }}</li>
          <li id="prNr">
            <span>Pnr: {{ particlenr }} </span>
          </li>
          <li id="prPrice">
            <span>{{ product[1] }} x {{ pprice }}€</span>
          </li>
          <li id="inTotal">
            <span
              >{{
                Math.round(pprice * product[1] * Math.pow(10, 2)) /
                Math.pow(10, 2)
              }}
              €</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "@/service/Product";
import { defineComponent, ref, computed } from "vue";
import { useProduct } from "../service/ProductStore";

export default defineComponent({
  name: "CartListObject",
  props: {
    product: Object,
  },

  setup(props) {
    const { getProductByArtNr } = useProduct();

    /**
     * finds the first picture of a product
     */
    const ppath = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).allPictures[0];
    });
    /**
     * name of the product
     */
    const pname = ref("");
    /**
     * price of the product
     */
    const pprice = ref(0);
    /**
     * articlenumber of the product
     */
    const particlenr = ref(0);
    /**
     * product
     */
    let p: Product = {
      articlenr: 0,
      version: 0,
      name: "",
      productType: "",
      roomType: "",
      price: 0,
      allPictures: [],
      height: 0,
      width: 0,
      depth: 0,
      allTags: [],
      available: 0,
      description: "",
      information: "",
    };

    /**
     * finds product and sets values
     */
    if (props.product) {
      p = getProductByArtNr(props.product[0]) as Product;
      pname.value = p.name;
      pprice.value = p.price;
      particlenr.value = p.articlenr;
    }

    return {
      ppath,
      pname,
      pprice,
      particlenr,
    };
  },
});
</script>
<style lang = "scss">
ul {
  list-style: none;
}
.information li {
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  text-align: left;
}
#prName {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 0%;
}
#prPrice {
  font-size: 16px;
  padding: 0%;
}
#prNr {
  font-size: 12px;
  padding-bottom: 0%;
}
#inTotal {
  font-size: 16px;
  padding-top: 0%;
  padding-right: 0%;
  margin: 0;
  float: right;
}
#amount {
  float: left;
  font-size: 14px;
}
.productobject {
  margin-left: 2em;
  margin-right: 2em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  min-width: 35em;
  width: 100%;
  float: left;
}
#delete {
  border-style: none;
  background: none;
  &:focus {
    outline: none;
  }
}

#pic {
  float: left;
  width: 5em;
}
#line {
  border-bottom: 2px solid $color-grey2;
}

.information {
  float: left;
  margin-left: 0;
  width: 80%;
}

.close {
  float: right;
}
</style>