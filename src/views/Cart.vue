<template>
    <div class="cart">
        <div id="carthead">
            <h3>Ihre Produkte</h3>
        </div>
        <div id="list">
            <CartList/>
        </div>
        <div id="order">
            <router-link to="/login"><button value="zur Kasse" id="checkout"> zur Kasse </button></router-link>
        </div>
    </div>
</template>
<script>
import CartList from "@/components/CartList.vue"
import '@/service/Product'

export default {
    components:{
        CartList
    }
}
</script>
<style scoped lang="scss">
.cart{
    display: flex;
    flex-direction: column;
} 
#list{
    display: flex;
    justify-content: center;
}

#carthead{
    display: flex;
    justify-content: center;
} 
#carthead h3{
    margin-top: 5%;
    text-align: center;
        
} 
#order{
    display:flex;
    justify-content: center;
} 

#checkout{
    padding: 20% 100%;
}

</style>