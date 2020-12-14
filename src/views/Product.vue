<template>
    <div class="product">
        
        <div class="columns" id="sidebarBox">
            <Sidebar/>
        </div>
        <div id="productList">
            <ProductList/>
        </div>
        
    </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue"
import Sidebar from "@/components/Sidebar.vue"


export default {
    components:{
        ProductList,
        Sidebar
    }
}
</script>
