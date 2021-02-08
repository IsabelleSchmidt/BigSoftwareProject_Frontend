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
        <div class="filteroptionsclicked">
            <button id="filoptButton" v-for="item in filterlist" :value="[item]" :key="item.id" @click="delFilItem(item)">
               {{ item }}  
               <img :value="item" id="closeFilImg" src="../assets/closeImg.png"/>
            </button>
              
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
        const {deleteFilter, filterclose, setFilterClose, pricelist, deletePriceFilter, colorlist, widthlist, heightlist, depthlist, deleteColorFilter, deleteSizeFilter} = useFilterStore();
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
            const filterlist = computed(() => {
                const list = ref(Array<string>());
                for(let i = 0; i< pricelist.value.size; i++){
                   list.value.push("Preis: " + Array.from(pricelist.value.keys())[i].replace("%", "-"))
                }
                for(let i = 0; i< widthlist.value.size; i++){
                   list.value.push("Breite: " + Array.from(widthlist.value.keys())[i].replace("w%", "").replace("%","-"))
                }
                for(let i = 0; i< heightlist.value.size; i++){
                   list.value.push("Höhe: " + Array.from(heightlist.value.keys())[i].replace("h%", "").replace("%","-"))
                }
                for(let i = 0; i< depthlist.value.size; i++){
                   list.value.push("Tiefe: " + Array.from(depthlist.value.keys())[i].replace("d%", "").replace("%","-"))
                }
                for(let i = 0; i< colorlist.value.size; i++){
                   list.value.push("Farbe: " + Array.from(colorlist.value.keys())[i])
                }
                return list.value
            });

        function delFilItem(item: string){
            if(item[0] == 'P')
                deletePriceFilter(item.replace("-","%").replace("Preis: ",""))
            if(item[0] == 'F')
                deleteColorFilter(item.replace("Farbe: ",""))
            if(item[0] == 'B')
                deleteSizeFilter(item.replace("Breite: ", "w%").replace("-", "%"), 'w')
            if(item[0] == 'H')
                deleteSizeFilter(item.replace("Höhe: ", "h%").replace("-", "%"), 'h')
            if(item[0] == 'T')
                deleteSizeFilter(item.replace("Tiefe: ", "d%").replace("-", "%"), 'd')
            changeComp('')
        }
        

        return {
            component, 
            compref,
            changeComp,
            delFilter,
            filterlist,
            delFilItem
        };

    }
});
</script>
<style scoped lang="scss">
.filter{
    float:left;
    position: relative;
    left: 18%;
    max-width: 800px; 
}
.ulFilter{
    list-style-type: none;
}
.liFilter{
    float:left;
    margin: 0 5px;
}
.buttonFilter{
    padding: 0.625rem 1.25rem;
    background-color: transparent;
    color: black;
    border: 1px solid $color-grey3; 
    border-radius: 2em;
    outline-style: none;
    &:hover{
        background-color: $color-grey;
    }
     /*&:focus{
            background-color: #f3f3f3;

        }   */
}
.filteroptionsclicked{
    margin-left: 5%;
    float: left;
    width: 800px;
    
}
.filteroptions{
    float: left; 
    width: 800px;
    margin-left: 7%;
}
#filoptButton{
    margin: 5px 10px;
    padding: 0.5rem 1.2rem;
    background-color: lightgrey;
    color: black;
    text-align: center;
    white-space: nowrap;
    border-radius: 2em;
    align-items: center;
    display: flex;
     &:hover{
        background-color: $color-green;
        cursor: pointer;
        //color: white;
    } 
    &:focus{
        outline: none;
    }
}
#closeFilImg{
    width: 18px;
    padding-left: .5rem;   
}

</style>