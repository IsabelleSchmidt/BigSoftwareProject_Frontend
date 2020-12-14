<template>        
        <ul class="productlistline">

           <div class="bg">
                <img v-bind:src="product.picture" alt="Picture" class="pic">
                <li>{{product.name}}</li>
                <li>{{product.price}}</li>
            </div>
        </ul>
</template>

<script lang="ts">
import '@/service/Product'
import { defineComponent } from 'vue'
export default defineComponent({
    name: "ProductListObject",
    props: {
        product: Object,
    },
})
</script>

<style scoped lang="scss">
    .pic{
        border-radius: 10px 10px 0px 0px;
        width: 300px;
        height: 400px;
        object-fit:cover;
        object-position: bottom center;
    }
    .bg{
        border-radius: 10px 10px 10px 10px;
        background-color: #f3f3f3;
        width: 300px;
        
    } 

    ul{
        list-style-type: none;
    } 
</style>