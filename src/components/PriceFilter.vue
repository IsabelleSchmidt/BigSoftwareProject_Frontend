<template>
    <div class= "pricefilter">
        <h3>Preis</h3>
          <vue-slider :max="pricemax" v-model="price" @drag-end="changePrice(price)" @click="changePrice(price)"/>
          <label class="pricezero"> 0 </label>
          <label class="pricethausend">1000+</label>
    </div>
</template>
<script lang = "ts">
import { defineComponent, ref} from 'vue';
import {useFilterStore} from '@/service/FilterStore'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default defineComponent({
    name: "PriceFilter",
    components:{
        VueSlider
    },
    
    setup(){
        const {pricelow, pricehigh, setPriceHigh, setPriceLow} = useFilterStore();
        const pricemax = 1000;

        const price = ref(Array<number>())
        price.value = [setPriceLow(pricelow.value), setPriceHigh(pricehigh.value)]
        
        function changePrice(p: Array<number>){
            price.value = [setPriceLow(p[0]), setPriceHigh(p[1])]
        }
     
        return{
            price,
            pricemax,
            changePrice
        }
    }
    
});
</script>
<style scoped lang="scss">
.pricethausend{
    float: right;
}
.pricefilter{
    margin-top: 3%;
    margin-bottom: 3%; 
    width: 200px;
}
span{
    float: left;
    width: 120px;
    font-size: 0.95em;
}
input{
    margin-left: 20px;
}
</style>