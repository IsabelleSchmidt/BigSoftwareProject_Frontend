<template>
    <div id="productList">
        <!-- <p>Vom Router: {{$route.params.room}}</p>
        <p>Als prop: {{ room }}</p> -->
        <ul>
                <ProductListObject id="listOrder" :product="pr" v-for="pr in productlist" :key="pr.id"/> <!-- v-for="product in products"-->
                <!--Platzhalter 
                <ProductListObject id="listOrder"/> 
                <ProductListObject id="listOrder"/>
                <ProductListObject id="listOrder"/>-->
        </ul>
        
    </div>
</template>

<script lang="ts">
//import {defineComponent} from "@vue/composition-api";
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import { defineComponent, computed, onMounted } from 'vue';
import {useRoute} from "vue-router";

export default defineComponent({
    name: "ProductList", 
    components:{
        ProductListObject
    },
    // props: {
    //     room: String
    // },
    setup(){

        const route = useRoute();
        const room = route.query.room;
        // console.log(room);

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            await update();
        });

        const productlist = computed(() => {
            if (room === "alle") {
                console.log("alle");
                return list.value;
            } else {
                console.log("nicht alle");
                return list.value.filter(p => p.roomType === room?.toString());
            }
          
        });


        return{ productlist, room}; //, errormessage 
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