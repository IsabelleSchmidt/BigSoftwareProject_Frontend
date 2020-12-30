<template>
    <div class="PictureUploadListItem">
        <div>hgvhv{{file.fileName}}</div>
        <img src="@/assets/trash.png" alt="trash" id="trash">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name:"PictureUploadListItem",
    props:{
        file: File,
    },
    setup(props){

        return{props}
    }
    
})
</script>

<style lang="scss" scoped>
#trash{
    height: 20px;
}
</style>