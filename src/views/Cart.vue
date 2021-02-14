<template>
    <div class="cart">
        <div id="carthead">
            <h3>Ihre Produkte</h3>
        </div>
        <div id="list">
            <CartList/>
        </div>
        <div id="order">
            <router-link :to="jwttoken.accessToken.length > 0  ? '/orderform'  : '/cart/login'" append> <button id="checkout"> zur Kasse</button>  </router-link>
        </div>
  </div>
</template>
<script>
import CartList from "@/components/CartList.vue";
import "@/service/Product";
import { useUserStore } from "../service/UserStore";

export default {
  components: {
    CartList,
  },
  setup() {
    const { jwttoken } = useUserStore();
    return { jwttoken };
  },
};
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