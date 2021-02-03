<template>        
        <ul class="productlistline">
            <a @click="openproduct()">
           <div class="productListObject">
                <!-- <img v-bind:src="product.allPictures[0].path" alt="Picture" class="pic"> -->
                 <img v-bind:src="picList.get(product.allPictures[0].id).binary" alt="Picture" class="pic">
                 <!-- <img src="/api/picture/194"> -->
                <div class="bg">
                    <li>{{product.name}}</li>
                    <li>{{product.price}} €</li>
                </div>
            </div>
            </a>
        </ul>
</template>

<script lang="ts">
import '@/service/Product'
import { computed, defineComponent,ref } from 'vue'
import {useProduct} from "../service/ProductStore"

export default defineComponent({
    name: "ProductListObject",
    props: {
        product: Object,
    },
    setup(props, context) {
        
        const{pictureList} = useProduct();
        const picList = computed(() => {
          return pictureList.value;
        });

        function openproduct(): void {
            context.emit("open-prod", props.product);
        }

        return {
            openproduct,picList
        };
    }
});
</script>

<style scoped lang="scss">
    .pic{
        border-radius: 10px 10px 0px 0px;
        width: 300px;
        height: 300px;
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