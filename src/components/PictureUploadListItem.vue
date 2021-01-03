<template>
    <tr class="PictureUploadListItem">
        <td>hgvhv{{file.fileName}}</td>
        <td><img src="@/assets/trash.png" alt="trash" id="trash"></td>
    </tr>
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