<template>
    <div class= "cartlist">
        <ul>
            <CartListObject :product="pr" v-for="pr in productList" :key="pr.articlenr" @delete-product="trashRow($event)" />
        </ul>
    </div>
</template>
<script lang ="ts">
import CartListObject from "../components/CartListObject.vue"
import {computed, reactive, ref} from 'vue'; 

export default {
    components:{
        CartListObject
    },
    setup(){
           let pList = reactive(Array<Product>());
           const leng = ref();

           const productList = computed(() =>{

                const list = localStorage.getItem('cartItems');

                        if(list){
                            pList = JSON.parse(list);  
                            leng.value = pList.length;
                            console.log("länge" + leng.value);
                        } 
 
                return pList;
           });

            
        function trashRow(p: Product): void {
            const aList = localStorage.getItem('amount');
             if(aList){
                const liste = JSON.parse(aList); 
              
            for(let i = 0; i<= pList.length; i++){
                if(pList[i].name == p.name){
                   pList.splice(i, 1);
                   liste.splice(i, 1);
                   break;
                } 

              } localStorage.setItem('amount', JSON.stringify(liste));
            }
              
            leng.value = pList.length;
            localStorage.setItem('cartItems', JSON.stringify(pList)); 

         
        } 
        return{productList, trashRow};
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
    


</style>