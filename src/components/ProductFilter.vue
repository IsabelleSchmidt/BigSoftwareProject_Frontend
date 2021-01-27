<template>
    <div class="filter">
        <div class= "articlefilter">
            <ul class="ulFilter">
                <li class="liFilter" id="colorFilt"><button class="buttonFilter" v-on:click="changeComp('PriceFilter')"><span>Preis</span></button></li>
                <li class="liFilter" id="size"><button class="buttonFilter" v-on:click="changeComp('SizeFilter')"><span>Größe</span></button></li>
                <li class="liFilter" id="size"><button class="buttonFilter" v-on:click="changeComp('ColorFilter')"><span>Farbe</span></button></li>
                <li class="liFilter" id="size"><button class="buttonFilter" @click="delFilter()"><span>Filter löschen</span></button></li>
            </ul>
        </div>
        <div class="filteroptions">
          <component v-bind:is="compref"/>     
        </div>
    </div>
</template>
<script lang ="ts">
import PriceFilter from "../components/PriceFilter.vue"
import SizeFilter from "../components/SizeFilter.vue"
import ColorFilter from "../components/ColorFilter.vue"
import {useFilterStore} from "../service/FilterStore"
import { defineComponent, computed, ref, watch, onMounted} from 'vue';

export default defineComponent({
    name: "ProductFilter",
    components:{
        PriceFilter,
        SizeFilter,
        ColorFilter
    },
    setup() {        
        const {deleteFilter, filterclose, setFilterClose} = useFilterStore();
        const component = ref('');

        const compref = computed(() => {
            return component.value; 
        });
        onMounted(async ()=>{
            setFilterClose(false);
        })
        function changeComp(comp: string): void{
            if(component.value == comp){
                component.value = ''
            }else{
                component.value = comp; 
            }
        }
        function delFilter(): void{
            changeComp('');
            deleteFilter();
  
            }
            watch(filterclose, (filterclose, old) => {
                delFilter();
                setFilterClose(false)
            })
        

        return {
            component, 
            compref,
            changeComp,
            delFilter
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
    width: 800px;
    
}

</style>