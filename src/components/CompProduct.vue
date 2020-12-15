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

import Sidebar from "@/components/Sidebar.vue"
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import { defineComponent, computed, onMounted } from 'vue';
import {useRoute} from "vue-router";
import '@/service/Product'

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
        const room = route.query.room;

        const producttype = route.query.producttype;
        //console.log(room);
        //console.log(producttype);

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            await update();
        });

        const productlist = computed(() => {
            if (room === "alle" && producttype === "alle") {
                // console.log("alles");
                return list.value;
            } else if (room !== "alle" && producttype === "alle") {
                // console.log("nach raum filtern");
                return list.value.filter(p => p.roomType === room?.toString());
            } else if (room === "alle" && producttype !== "alle") {
                // console.log("nach produktart filtern");
                return list.value.filter(p => p.productType === producttype?.toString());
            } else {
                // console.log("nach beidem filtern");
                return list.value.filter(p => p.productType === producttype?.toString() && p.roomType === room?.toString());
            }
        });

        function openProduct(p: Product): void {
            console.log(p);
            context.emit("open-prod", p);
        }

        return{ productlist, room, openProduct}; //, errormessage 
    } 
});
 </script>

 <style scoped lang="scss">
    #listOrder{
        display: inline;
        float: left;
        width: 33%;
        margin-bottom: 20px;
        //margin: 0px 0px 20px 10px;

    } 

    #productList{
        float: left;
        max-width: 83%;
        margin-left: 20%;
    } 
</style>