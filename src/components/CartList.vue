<template>
    <div class= "cartlist">
        <ul>
            <CartListObject :product="pr" v-for="pr in productList" :key="pr.artikelnr" @delete-product="trashRow($event)" />
        </ul>

    </div>
</template>
<script lang ="ts">
import CartListObject from "../components/CartListObject.vue"
import {computed, onMounted, reactive, ref} from 'vue'; 

export default {
    components:{
        CartListObject
    },
    setup(){
      
           let pList = reactive(Array<Product>());
           let leng = 0;
           const list = localStorage.getItem('cartItems');
                if(list){
                    pList = JSON.parse(list); 
                    leng = pList.length;
                 } 

           const productList = computed(() =>{
               if(pList.length != leng){
                     return pList;


                } 
                return pList;
           });

            
        function trashRow(artnr: number): void {
            console.log("ich bin die artn" + artnr);

            for(let i = 0; i<= pList.length; i++){
                if(pList[i].articlenr == artnr){
                    pList.splice(i, 1);
                }
            }
         
            localStorage.setItem('cartItems', JSON.stringify(pList)); 
        } 
        return{productList, trashRow};
    }   
}
</script>
<style lang="scss">
    

</style>