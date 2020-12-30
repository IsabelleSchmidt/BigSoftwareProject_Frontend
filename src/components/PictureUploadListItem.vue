<template>
    <div class="PictureUploadListItem">
        <div>{{filename}}</div>
        <img src="@/assets/trash.png" alt="trash" id="trash">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name:"PictureUploadListItem",
    setup(){
        const filename = ref("")
        
        return{filename}
    } 
})
</script>

<style lang="scss" scoped>
#trash{
    height: 50px;
}
</style>