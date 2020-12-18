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
        tst: String
    },
    setup(props, context){

        const route = useRoute();
        const ro = ref(route.query.room);
        const pr= ref(route.query.producttype);
        const q = {room: ro, producttype: pr};
        const filter = reactive(q);

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            // ro.value = route.query.room;
            // pr.value = route.query.producttype;
            await update();
        });

        const productlist = computed(() => {
            
            if (filter.room === "alle" && filter.producttype === "alle") {
                q.room.value = route.query.room;
                q.producttype.value = route.query.producttype;
                // console.log("alles");
                return list.value;
            } else if (filter.room !== "alle" && filter.producttype === "alle") {
                q.room.value = route.query.room;
                q.producttype.value = route.query.producttype;
                // console.log("nach raum filtern");
                return list.value.filter(p => p.roomType === filter.room?.toString());
            } else if (filter.room === "alle" && filter.producttype !== "alle") {
                q.room.value = route.query.room;
                q.producttype.value = route.query.producttype;
                // console.log("nach produktart filtern");
                return list.value.filter(p => p.productType === filter.producttype?.toString());
            } else {
                q.room.value = route.query.room;
                q.producttype.value = route.query.producttype;
                console.log("nach beidem filtern");
                return list.value.filter(p => p.productType === filter.producttype?.toString() && p.roomType === filter.room?.toString());
            }
            
        });

        // watch(q,
        //     (neu, alt) => {
        //         console.log("RELOAD1");
        //         update();
        //     }
        // );

        // watch(p,
        //     (neu, alt) => {
        //         console.log("RELOAD2");
        //         update();
        //     }
        // );

        function openProduct(p: Product): void {
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