<template>
  <div class="login">
    <component v-bind:is="compref" @toggle-comp="toggle($event)" :mailadress="email"/>
  </div>
</template>

<script lang="ts">
import CompLogin from "../components/CompLogin.vue"
import CompResetPw from "../components/CompResetPw.vue"
import { defineComponent, ref } from "vue"
import '../service/Product'

export default defineComponent({
    name: "Product",
    components:{
        CompLogin,
        CompResetPw
    },
    setup() {

        const COMPONENTS = ["CompLogin", "CompResetPw"];
        const component = COMPONENTS[0];
        const compref = ref(component);

        const email = ref("");

        function toggle(e: string): void {
            email.value = e;
            if (compref.value === COMPONENTS[0]) {
                compref.value = COMPONENTS[1];
            } else {
                compref.value = COMPONENTS[0];
            }
        }

        return {
            component,
            compref,
            toggle,
            email
        };
    }
});
</script>