<template>
    <div class= "cartlist">
        <ul>
            <CartListObject/>
            <CartListObject/>
            <CartListObject/>
            <CartListObject/>
        </ul>

    </div>
</template>
<script lang ="ts">
import CartListObject from "../components/CartListObject.vue"
export default {
    components:{
        CartListObject
    }
}
</script>
<style lang="scss">
    

</style>