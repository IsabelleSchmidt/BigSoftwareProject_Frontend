<template>
    <div class= "pricefilter">
        <h2>Preis</h2>
        <label>
            <span>0,00 - 200,00€</span>
            <div>
                <input type="checkbox" value="0%200" v-model="price02" @change="checked($event.target.value)"/>
            </div>
        </label>
        <label>
            <span>200,00 - 400,00€</span>
            <div>
                <input type="checkbox" value="200%400" v-model="price24" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>400,00 - 600,00€</span>
            <div>
                <input type="checkbox" value="400%600" v-model="price46" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>600,00 - 800,00€</span>
            <div>
                <input type="checkbox" value="600%800" v-model="price68" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>800,00+ €</span>
            <div>
                <input type="checkbox" value="800%+" v-model="price8" @change="checked($event.target.value)" />
            </div>
        </label>
    </div>
</template>
<script lang = "ts">
import { defineComponent, ref, onMounted} from 'vue';
import {useFilterStore} from '@/service/FilterStore'

export default defineComponent({
    name: "PriceFilter",
    
    setup(){
        const {pricelist, addPiceFilter, deletePriceFilter} = useFilterStore();

        const price02 = ref();
        const price24 = ref();
        const price46 = ref();
        const price68 = ref();
        const price8 = ref();
    

        function checked(price: string): void{                                    
                if(pricelist.value.has(price)){
                    deletePriceFilter(price)
                }else{
                    addPiceFilter(price)
                }
        }
        onMounted(async()=> {
            for(let i = 0; i< pricelist.value.size; i++){
                const key = Array.from(pricelist.value.keys())[i];
               if(key  == '0%200'){
                   price02.value = true; 
               }
               if(key  == '200%400'){
                   price24.value = true; 
               }
               if(key  == '400%600'){
                   price46.value = true; 
               }
               if(key  == '600%800'){
                   price68.value = true; 
               }
               if(key  == '800%+'){
                   price8.value = true; 
               }
            }
                    
            
        });
     
        return{
            price02,
            price24,
            price46,
            price68,
            price8,
            checked  
        }
    }
    
});
</script>
<style lang="scss">
.pricefilter{
    margin: 30px; 
}
span{
    float: left;
}
input{
    margin-left: 20px;
}
</style>