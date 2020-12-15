<template>        
        <ul class="productlistline">

           <div class="productListObject">
                <img v-bind:src="product.allPictures[0].path" alt="Picture" class="pic">
                <div class="bg">
                    <li>{{product.name}}</li>
                    <li>{{product.price}} €</li>
                </div>
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
        border-radius: 0px 0px 10px 10px;
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        background-color: #f3f3f3;
        width: 300px;
        text-align: center;
    } 

    ul{
        list-style-type: none;
    } 
</style>