<template>
    <div class="cart">
        <div id="carthead">
            <h3>Ihre Produkte</h3>
        </div>
        <div id="cartlist">
            <CartList/>
        </div>
        <div id="order">
            <button id="orderB">Zur Kasse</button>
        </div>
    </div>
</template>
<script>
import CartList from "@/components/CartList.vue"
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
        //float: left;
    } 

   #cartlist{
      /* max-width: 70%;
       margin-left: auto;
       margin-right: auto;
       */

       
   }  
   #carthead{
       /*max-width: 70%;
       margin-left: auto;
       margin-right: auto;*/
   } 
  #carthead h3{
       margin-top: 5%;
   
  } 
   #order{
       text-align: center;
   } 
   #orderB{
       margin: 5%;
       padding: 1.5% 10%; 
       background-color: black;
       border-style: none;
       color: #fff;
      &:hover{
          background-color: #3BA07C;
          
      } 
      &:focus{
          outline: none;
      } 
   } 

</style>