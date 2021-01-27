<template>
  <div id="line">
    <div class="productobject">
      <div class="picture">
        <img v-bind:src="ppath.path" alt="Picture" id="pic" />
      </div>
      <div class="information">
        <ul>
          <li id="prName">{{ pname }}</li>
          <li id="prPrice">{{ pprice }} €</li>
          <li id="prNr">
            <span>Pnr: {{ particlenr }} </span>
          </li>
          <li id="inTotal">
            <span>Gesamtpreis: {{ ptotal }} €</span>
          </li>
          <select
            :value="pamount"
            name="pamount"
            id="amount"
            @change="amChange($event.target.value)"
          >
            <option
              v-for="item in pavailable"
               :value="[
               item
              ]"
              :key="item.id"
            >
            {{ item }}
             </option>
          </select>
        </ul>
      </div>
      <div class="close">
        <button id="delete" @click="trash()">
          <img src="../assets/closeImg.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "@/service/Product";
import { defineComponent, computed } from "vue";
import { useCartStore } from "../service/CartStore";
import { useProduct } from "../service/ProductStore";

export default defineComponent({
  name: "CartListObject",
  props: {
    product: Object,
  },

  setup(props) {
    const {
      getAmount,
      changeAmount,
      deleteProduct,
    } = useCartStore();
    const { getProductByArtNr } = useProduct();

    const ppath = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).allPictures[0];
    });
    const pname = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).name;
    });
    const pprice = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).price;
    });
    const particlenr = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).articlenr;
    });
    const pavailable = computed(() => {
      if (props.product)
        return (getProductByArtNr(props.product[0]) as Product).available;
    });
    const pamount = computed(() => {
      if (props.product) return getAmount(props.product[0]);
    });
    const ptotal = computed(() => {
      if (props.product) {
        const t = getAmount(props.product[0]);
        if (t) {
          return (
            Math.round(
              (getProductByArtNr(props.product[0]) as Product).price *
                t *
                Math.pow(10, 2)
            ) / Math.pow(10, 2)
          );
        }
      }
    });
    function amChange(am: number): void {
      if (props.product) {
      /*  const a = getAmount(props.product[0]);
        if (a) {
          if (am < a) {
            changeAmount(props.product[0], Number(am));
          } else if (checkOneMoreAvailable(props.product[0])) {
            changeAmount(props.product[0], Number(am));
          } else {
            changeAmount(props.product[0], a);
          }
        }*/
          changeAmount(props.product[0], Number(am));

      }
    }

    function trash(): void {
      if (props.product) deleteProduct(props.product[0]);
    }

    return {
      amChange,
      trash,
      ppath,
      pname,
      pprice,
      particlenr,
      pavailable,
      pamount,
      ptotal,
    };
  },
});
</script>

<style lang = "scss" scoped>
ul{
    list-style: none;
} 
.information li{
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    text-align: left;
} 
#prName{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 0%;
} 
#prPrice{
    font-size: 16px;
    padding-top: 0%;
} 
#prNr{
    font-size: 12px;
    padding-bottom: 0%;
} 
#inTotal{
    font-size: 12px;
    padding-top: 0%;
} 
#amount{
    float: left;
    font-size: 14px;
} 
.productobject{
    margin-left: 2em;
    margin-right: 2em;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    min-width: 35em;
    float: left;
} 
#delete{
    border-style: none;
    background: none;
    &:focus{
        outline: none;
    } 
} 

#pic{
    float: left;
    width: 5em;
} 
#line{
    border-bottom: 2px solid $color-grey2;
}  

.information{
    float: left;
    margin-left: 5%;
} 

.close{
    float: right;
} 
</style>