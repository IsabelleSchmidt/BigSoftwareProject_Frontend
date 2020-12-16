<template>
    <div class="product">
        <!-- <button @click="toggle()">Toggle</button> -->
        <component v-bind:is="compref" @open-prod="changeComp($event)" @open-all="toggle()" :tst="prodref"/>
        
    </div>
</template>

<script lang="ts">
import CompProduct from "../components/CompProduct.vue"
import CompSingle from "../components/CompSingle.vue"
import { defineComponent, ref } from "vue"
import '../service/Product'

export default defineComponent({
    name: "Product",
    components:{
        CompProduct,
        CompSingle
    },
    setup() {
        const component = "CompProduct";
        const compref = ref(component);
        const prod: Product = {'articlenr': 0, 'version': 0, 'name': "", 'productType': "", 
                                'roomType': "", 'price': 0, 'allPictures': [], 'height': 0,
                                'width': 0, 'depth': 0, 'available': 0, 'description': "", 'information': ""};
        const prodref = ref(prod);

        function toggle(): void {

            if (compref.value === "CompProduct") {
                // component = "CompSingle";
                compref.value = "CompSingle";
            } else {
                // component = "CompProduct";
                compref.value = "CompProduct";
            }
            console.log("TOGGLE" + compref.value);
        }

        function changeComp(p: Product): void {
            toggle();
            prodref.value = p;
        }


        return {

            component,
            compref,
            changeComp,
            prodref,
            toggle
        }
    }
});
</script>
