<template>
  <div class="product">
    <!-- <button @click="toggle()">Toggle</button> -->
    <component
      v-bind:is="compref"
      @open-prod="changeComp($event)"
      @open-all="toggle()"
      :productObject="prodref"
    />
  </div>
</template>

<script lang="ts">
import CompProduct from "../components/CompProduct.vue"
import CompSingle from "../components/CompSingle.vue"
import { defineComponent, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import '../service/Product'

export default defineComponent({
    name: "Product",
    components:{
        CompProduct,
        CompSingle
    },
    setup() {
        const router = useRouter();
        /**
         * possible components
         */
        const COMPONENTS = ["CompProduct", "CompSingle"];
        const prod: Product = {'articlenr': 0, 'version': 0, 'name': "", 'productType': "", 
                                'roomType': "", 'price': 0, 'allPictures': [], 'height': 0,
                                'width': 0, 'depth': 0, 'allTags': [], 'available': 0, 'description': "", 'information': ""};
        const prodref = ref(prod);
        
        const component = COMPONENTS[0];
        const compref = ref(component);

        function toggle(): void {
            if (compref.value === COMPONENTS[0]) {
                compref.value = COMPONENTS[1];
            } else {
                compref.value = COMPONENTS[0];
            }
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
            toggle,
        };
    }
});
</script>