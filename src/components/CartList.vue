<template>
    <div class= "cartlist">
        <ul class="list">
         <CartListObject :product="pr" v-for="pr  in productList" :key="pr.id" />
        </ul>
        
        <div class="inTotalDiv">
            <span class="inTotal">Gesamtsumme: {{inTotal}} €</span>
        </div>
    </div>
</template>
<script lang ="ts">
import CartListObject from "../components/CartListObject.vue"
import {computed} from 'vue'; 
import {useCartStore} from '../service/CartStore'

export default {
  components: {
    CartListObject,
  },
  setup() {
    const { list, totalPrice } = useCartStore();
    /**
     * the total price of all products in cart
     */
    const inTotal = computed(() => {
      return totalPrice();
    });
    /**
     * all products in cart
     */
    const productList = computed(() => {
      return Array.from(list.value.entries());
    });

    return { inTotal, productList };
  },
};
</script>
<style lang="scss" scoped>

.list{
    display: inline-grid;
    grid-template-columns: auto;
    margin-right: 2.8rem;
}
.list:after{
    content: "";
    display: block;
}

.inTotal {
    font-size: 1.3em;
}

</style>