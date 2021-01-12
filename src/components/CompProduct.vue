<template>
    <div class="compProduct">
        <div class="columns" id="sidebarBox">
            <Sidebar/>
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
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import {useRoute} from "vue-router";
import '../service/Product'

export default defineComponent({
    name: "CompProducts",
    components:{
        ProductListObject,
        Sidebar
    }, props: {
        product: Object,
    },
    setup(props, context){

        const route = useRoute();
        const ro = ref(route.query.room);
        const pr = ref(route.query.producttype);
        const n = ref(route.query.name);
        const q = {room: ro, producttype: pr, name: n};
        const filter = reactive(q);

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            q.room.value = route.query.room;
            q.producttype.value = route.query.producttype;
            q.name.value = "none";
            await update();
        });

        const productlist = computed(() => {
            q.room.value = route.query.room;
            q.producttype.value = route.query.producttype;
            q.name.value = route.query.name;
            
            if (filter.room === "all" && filter.producttype === "all") {
                return list.value;
            } else if (filter.room !== "all" && filter.producttype === "all") {
                return list.value.filter(p => p.roomType === filter.room?.toString());
            } else if (filter.room === "all" && filter.producttype !== "all") {
                return list.value.filter(p => p.productType === filter.producttype?.toString());
            } else {
                q.room.value = route.query.room;
                q.producttype.value = route.query.producttype;
                // console.log("nach beidem filtern");

                return list.value.filter(p => p.productType === filter.producttype?.toString() && p.roomType === filter.room?.toString());
            }
            
        });

        function openProduct(p: Product): void {
            //send to component above (Product)
            console.log(p);
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