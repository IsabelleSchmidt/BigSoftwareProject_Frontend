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
        const {list, addProduct, deleteProduct} = useCartStore();
        const price = ref(0);
        
        function calcTotal(value: number, key: Product, map: any): void{
            const zw = price.value;
            price.value = zw + (key.price*value);
        }
        
        const inTotal = computed(()=> {
            price.value = 0;
            list.value.forEach(calcTotal);
            return Math.round((price.value)*Math.pow(10,2))/Math.pow(10,2);
        });
        
        const productList = computed(() =>{
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