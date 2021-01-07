<template>
    <div class="cart">
        <div id="carthead">
            <h3>Ihre Produkte</h3>
        </div>
        <div>
            <CartList/>
        </div>
        <div id="order">
            <button id="orderB">Zur Kasse</button>
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
<style lang="scss">
    .cart{
        display: flex;
        flex-direction: column;
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
   #orderB{
       margin: 5%;
       padding: 1.5% 10%;
       //width: 100%; 
       background-color: black;
       border-style: none;
       color: #fff;
       text-align: center;
      &:hover{
          background-color: #3BA07C;
          
      } 
      &:focus{
          outline: none;
      } 
   } 

</style>