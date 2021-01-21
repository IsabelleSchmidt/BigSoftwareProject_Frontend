<template>
    <div class="compProduct">
        <div class="columns" id="sidebarBox">
            <Sidebar/>
        </div>
        <div class="productFilter">
            <ProductFilter/>
        </div>
        <div id="productList">
            <ul>           
                <ProductListObject id="listOrder" :product="pr" v-for="pr in productlist" :key="pr.id" @open-prod="openProduct($event)"/>
            </ul>
        </div>
        
    </div>
</template>

<script lang = "ts">

import Sidebar from "../components/Sidebar.vue"
import ProductFilter from "../components/ProductFilter.vue"
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import {useFilterStore} from "../service/FilterStore";
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import {useRoute} from "vue-router";
import '../service/Product'

export default defineComponent({
    name: "CompProducts",
    components:{
        ProductListObject,
        Sidebar,
        ProductFilter
    }, props: {
        product: Object,
    },
    setup(props, context){

        const route = useRoute();
        const ro = ref(route.query.room);
        const pr = ref(route.query.productType);
        const n = ref(route.query.name);
        const q = {room: ro, productType: pr, name: n};
        const filter = reactive(q);

        const {list, update}  = useProduct(); //, errormessage

        const {getLowestPrice, getHighestPrice, getWidthLow, getWidthHigh, getHeightLow, getHeightHigh, getDepthLow, getDepthHigh} = useFilterStore();

        const lowestPrice = computed(() => {
            console.log("compjtetlowest")
            return getLowestPrice();
        })
        const highestPrice = computed(() => {
            console.log("highestcomp")
             return getHighestPrice();
        })
        
        const widthlow = computed(() => {
            console.log("width")
             return getWidthLow();
        })
        const widthhigh = computed(() => {
            console.log("width")
             return getWidthHigh();
        })
        const heightlow = computed(() => {
            console.log("height")
             return getHeightLow();
        })
        
        const heighthigh = computed(() => {
            console.log("height")
             return getHeightHigh();
        })
        const depthlow = computed(() => {
            console.log("depth")
             return getDepthLow();
        })
        const depthhigh = computed(() => {
            console.log("depth")
             return getDepthHigh();
        })
        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            q.room.value = route.query.room;
            q.productType.value = route.query.productType;
            q.name.value = "none";
            await update();
        });
        
        const productlist = computed(() => {
            console.log("lowest" + lowestPrice.value);
            console.log("highest" + highestPrice.value);
            console.log("widhtcomputed" + widthlow.value);
            q.room.value = route.query.room;
            q.productType.value = route.query.productType;
            q.name.value = route.query.name;

            let merklist = list.value; 
            
            if (filter.room === "all" && filter.productType === "all" ) {
                merklist = list.value;
            }
             else if (filter.room !== "all" && filter.productType === "all") {
                 merklist =  merklist.filter(p => p.roomType === filter.room?.toString());
            }
            else if (filter.room === "all" && filter.productType !== "all") {
                merklist = merklist.filter(p => p.productType === filter.productType?.toString());
            }
           else{
                q.room.value = route.query.room;
                q.productType.value = route.query.productType;
                // console.log("nach beidem filtern");
                merklist =  merklist.filter(p => p.productType === filter.productType?.toString() && p.roomType === filter.room?.toString());
            }

            //Filteroptions
            if(lowestPrice.value != 1000 && highestPrice.value != 0){
                 merklist = merklist.filter(p => p.price > lowestPrice.value && p.price < highestPrice.value);
            }
            if(widthlow.value != 1000 && widthhigh.value != 0){
                 merklist = merklist.filter(p => p.width > widthlow.value && p.width < widthhigh.value);
            }
            if(heightlow.value != 1000 && heighthigh.value != 0){
                 merklist = merklist.filter(p => p.height > heightlow.value && p.height < heighthigh.value);
            }
            if(depthlow.value != 1000 && depthhigh.value != 0){
                 merklist = merklist.filter(p => p.depth > depthlow.value && p.depth < depthhigh.value);
            }
            return merklist;
        });


        function openProduct(p: Product): void {
            //send to component above (Product)
            context.emit("open-prod", p);
        }

        return{ productlist, openProduct}; //, errormessage 
    } 
});
 </script>

 <style scoped lang="scss">
    #listOrder{
        display: inline;
        float: left;
        margin-bottom: 20px;
        //margin: 0px 0px 20px 10px;

    } 

    #productList{
        float: left;
        max-width: 83%;
        margin-left: 15%;
    } 
</style>