<template>
    <div id="productList">
        <ul>
                <ProductListObject id="listOrder" :product="pr" v-for="pr in productlist" :key="pr.id"/> 
        </ul>
        
    </div>
</template>

<script lang="ts">
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import { computed, onMounted } from 'vue';

export default{
    components:{
        ProductListObject
    },
    setup(){

        const{allproductslist,update} = useProduct();

        /**
         * calls update function on initialization of this component
         */
        onMounted(async () => {
            await update();
        });
        /**
         * current list of products
         */
        const productlist = computed(() => {
        
          return allproductslist.value;
        
        });
        const imgage = computed

        return{ productlist}; 
    } 
}
</script>

<style scoped lang="scss">
    #listOrder{
        display: inline;
        float: left;
        width: 27.5%;
        margin-bottom: 20px;

    } 

    #productList{
        float: left;
        max-width: 83%;
        margin-left: 15%;
    } 
</style>