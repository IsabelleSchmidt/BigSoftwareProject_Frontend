<template>
    <div class= "cartlist">
        <ul>
            <CartListObject :product="pr" v-for="pr in productList" :key="pr.articlenr" @delete-product="trashRow($event)" />
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
           const leng = ref(0);
 
           const productList = computed(() =>{
               console.log("Länge: " + leng.value);
                const list = localStorage.getItem('cartItems');
                        if(list){
                            pList = JSON.parse(list); 
                            leng.value = pList.length;
                        } 
 
                return pList;
           });

            
        function trashRow(p: Product): void {

            for(let i = 0; i<= pList.length; i++){
                if(pList[i].name == p.name){
                   pList.splice(i, 1);
                   break;
                } 

            }
            leng.value = pList.length;
            localStorage.setItem('cartItems', JSON.stringify(pList)); 

         
        } 
        return{productList, trashRow};
    }   
}
</script>
<style lang="scss">
    

</style>