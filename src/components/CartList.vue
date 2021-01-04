<template>
    <div class= "cartlist">
        <ul>
            <CartListObject :product="pr" v-for="pr in productList" :key="pr.articlenr" @delete-product="trashRow($event)"  @amount-change="newPrice($event)" />
        </ul>
        <div class="inTotalDiv">
            <span class="inTotal">Gesamtsumme: {{inTotal}} €</span>
        </div>
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
        const Tprice= ref(0); 
        const umrechnungsfaktor = Math.pow(10,2);


           const inTotal = computed(() =>{
               
                const list = localStorage.getItem('cartItems');
                const alist = localStorage.getItem('amount');

                        if(list&&alist){
                            pList = JSON.parse(list);  
                            const al = JSON.parse(alist); 
                            for(let i = 0; i< pList.length; i++){
                                const zw = Tprice.value;
                                Tprice.value = zw + (pList[i].price * al[i].menge);
                            }
                            console.log("tprice" + Tprice.value);
                        } 
                        return Math.round(Tprice.value*umrechnungsfaktor)/umrechnungsfaktor;

           });

           const productList = computed(() =>{

                const list = localStorage.getItem('cartItems');

                        if(list){
                            pList = JSON.parse(list); 
                            leng.value = pList.length;
                            console.log("länge" + leng.value);
                        } 
 
                return pList;
           });

        function newPrice(am: number): void {
                Tprice.value =0;                                   
        }
            
        function trashRow(p: Product): void {
            Tprice.value =0; 

            const aList = localStorage.getItem('amount');
             if(aList){
                const liste = JSON.parse(aList); 
              
            for(let i = 0; i< pList.length; i++){
                if(pList[i].name == p.name){
                   pList.splice(i, 1);
                   liste.splice(i, 1);
                   break;
                }

              } localStorage.setItem('amount', JSON.stringify(liste));
            }
              
            leng.value = pList.length;
            localStorage.setItem('cartItems', JSON.stringify(pList)); 
            location.reload();
        } 
        return{productList, trashRow, inTotal, newPrice};
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