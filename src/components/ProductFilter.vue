<template>
    <div class="filter">
        <div class= "articlefilter">
            <ul class="ulFilter">
                <li class="liFilter" id="colorFilt"><button class="buttonFilter" v-on:click="changeComp('PriceFilter')"><span>Preis</span></button></li>
                <li class="liFilter" id="size"><button class="buttonFilter" v-on:click="changeComp('SizeFilter')"><span>Größe</span></button></li>
            </ul>
        </div>
        <div class="filteroptions">
          <component v-bind:is="compref" />     
        </div>
    </div>
</template>
<script lang ="ts">
import PriceFilter from "../components/PriceFilter.vue"
import SizeFilter from "../components/SizeFilter.vue"

import { defineComponent, computed, onMounted, ref, watch, reactive } from 'vue';

export default defineComponent({
    name: "Product",
    components:{
        PriceFilter,
        SizeFilter,
    },
    setup(context) {
        
        const component = ref('');

        const compref = computed(() => {
            return component.value; 
        });

        function changeComp(comp: string): void{
            if(component.value == comp){
                component.value = ''
            }else{
                component.value = comp; 
            }
        }


        return {
            component, 
            compref,
            changeComp,
             
        };
    }
});
</script>
<style lang="scss">
.filter{
    float:left;
    position: relative;
    left: 18%;
    width: 800px; 
}
.ulFilter{
    list-style-type: none;
}
.liFilter{
    float:left;
    margin: 0 5px;
}
.buttonFilter{
    padding: 10px 20px;
}
.filteroptions{
    float: left; 
    width: 800px;;
    
}

</style>