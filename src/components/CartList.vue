<template>
    <div class= "cartlist">
        <ul>
         <CartListObject :product="pr" v-for="pr  in productList" :key="pr.id" />

        </ul>
        <div class="inTotalDiv">
            <span class="inTotal">Gesamtsumme: {{inTotal}} €</span>
        </div>
    </div>
</template>
<script lang ="ts">
import CartListObject from "../components/CartListObject.vue"
import {computed, reactive, ref} from 'vue'; 
import {useCartStore} from '@/service/CartStore'

export default {
    components:{
        CartListObject
    },
    setup(){
        const {list, addProduct, deleteProduct, totalPrice} = useCartStore();

        const inTotal = computed(()=> {
            return totalPrice();
        });
        
        const productList = computed(() =>{
            console.log("CARTCHANGE" + JSON.stringify(Array.from(list.value)));
            return Array.from(list.value.entries());
        });

        return{inTotal, productList};
    }   
}
</script>
<style lang="scss">

    
    .cartlist--center{
        display:flex;
    justify-content: center;
    } 

    .cartlist{
        display: inline-grid;
        grid-template-columns: auto;
        margin-right: 2.8rem;
    } 
    .inTotalDiv{
        float:right;
    }
    .inTotal {
        font-size: 1.3em;
    }


</style>