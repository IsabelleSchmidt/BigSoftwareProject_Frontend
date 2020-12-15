<template>
    <div id="productList">
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
import { computed, onMounted } from 'vue';

export default /*defineComponent*/{
    //name: "ProductList", 
    components:{
        ProductListObject
    },
    setup(){

        const {list, update}  = useProduct(); //, errormessage

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            await update();
        });

        const productlist = computed(() => {
        
          return list.value;
        
        });
        const imgage = computed

        return{ productlist}; //, errormessage 
    } 
}
</script>

<style scoped lang="scss">
    #listOrder{
        display: inline;
        float: left;
        width: 27.5%;
        margin-bottom: 20px;
        //margin: 0px 0px 20px 10px;

    } 

    #productList{
        float: left;
        max-width: 83%;
        margin-left: 15%;
    } 
</style>