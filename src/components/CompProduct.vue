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
        const f = ref(route.query.filters)
        const q = {room: ro, productType: pr, name: n, filters: f};
        const filter = reactive(q);

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            q.room.value = route.query.room;
            q.productType.value = route.query.productType;
            q.name.value = "none";
            q.filters.value = "none";
            await update();
        });

        const productlist = computed(() => {
            q.room.value = route.query.room;
            q.productType.value = route.query.productType;
            q.name.value = route.query.name;
            q.filters.value = route.query.filters;

            if(filter.filters != "none"){
                const x = filter.filters?.toString().split("%")
                if(x){
                    let highest = x[x.length-1];
                    const lowest = x[1];
                    if(highest == '+'){
                        highest = '50000';
                    }
                    console.log("PREiIIIS" + JSON.stringify(x) + "Highest:" + highest + "lowest: "+ lowest)
                    return list.value.filter(p=> p.price >= parseInt(lowest) && p.price <= parseInt(highest))
                    }

                }
            
            if (filter.room === "all" && filter.productType === "all") {
                return list.value;
            } else if (filter.room !== "all" && filter.productType === "all") {
                return list.value.filter(p => p.roomType === filter.room?.toString());
            } else if (filter.room === "all" && filter.productType !== "all") {
                return list.value.filter(p => p.productType === filter.productType?.toString());
            } 
            else if(filter.filters != "none"){
                filter.filters?.toString().search("price")                
                
                return list.value.filter(p => p.price)

            }else{
                q.room.value = route.query.room;
                q.productType.value = route.query.productType;
                // console.log("nach beidem filtern");
                return list.value.filter(p => p.productType === filter.productType?.toString() && p.roomType === filter.room?.toString());
            }
            
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