<template>
  <div class="login">
    <component v-bind:is="compref" @toggle-comp="toggle($event)" :mailadress="email"/>
  </div>
</template>

<script lang="ts">
import CompLogin from "../components/CompLogin.vue"
import CompResetPw from "../components/CompResetPw.vue"
import { defineComponent, ref, onMounted } from "vue"
import '../service/Product'

export default defineComponent({
    name: "Login",
    components:{
        CompLogin,
        CompResetPw
    },
    setup() {
        /**
         * options of visible components
         */
        const COMPONENTS = ["CompLogin", "CompResetPw"];
        /**
         * default component is login
         */
        const component = COMPONENTS[0];
        /**
         * currently visible component
         */
        const compref = ref(component);

        /**
         * a user's email adress
         */
        const email = ref("");

        onMounted(async () => {
        //when back button in browser is pressed
        window.onpopstate = function (event: any) {
            console.log("back");
        };
    });
        /**
         * changes the currently visible component between login and password reset
         * @param e a user's entered email adress
         */
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