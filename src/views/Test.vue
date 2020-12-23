<template>
  <div class="test">
    <input type="text" v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
export default defineComponent ({
    name:"newProduct",

    setup(){
        const message = ref("");

        return {message};
    }
})

</script>