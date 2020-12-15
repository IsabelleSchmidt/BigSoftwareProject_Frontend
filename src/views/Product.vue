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
        const prod = "default"
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
            prodref.value = p.name;
        }


        return {

            component,
            compref,
            changeComp,
            prodref,
            toggle
        }
    }

    /*
    data() {
        return {
            // component: CompSingleProduct
            component: "CompProduct"
        }
    },
    methods: {
        toggle(){
            // if (this.component === CompProducts) {
            //     this.component = CompSingleProduct;
            // } else {
            //     this.component = CompProducts;
            // }
            if (this.component === "CompProduct") {
                this.component = "CompSingle";
            } else {
                this.component = "CompProduct";
            }
        }
        
    }*/
});
</script>
