<template>
  <div id="app">
    <div id="content">
    <Navbar  />
    <router-view/>
    </div>
    <div id="footer">
      <Footer/>
    </div>
  </div>
</template>



<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {useProduct} from './service/ProductStore'
import {onMounted} from 'vue';

export default {
  components: {
    Navbar,
    Footer,
  },setup(){
    const {getAllProductTypes, getAllRoomTypes} = useProduct();
     onMounted(async ()=>{
        await getAllProductTypes();
        await getAllRoomTypes(); 
      });
  }
};
</script>



<style lang="scss">

*{
  font-family: Helvetica, sans-serif !important;
}

#content{
  min-height: calc(100vh - 80px);
}


input[type=submit]{
    margin: 5% 0% 0% 0%;
    padding: 1% 5%; 
    background-color: black;
    border-style: none;
    color: white;
    border-radius: 3px;
    &:hover{
        background-color: $color-green;
        cursor: pointer;
    } 
    &:focus{
        outline: none;
    } 
}

button{
    margin: 0% 0% 20% 0%;
    padding: 1.5% 9%;
    background-color: black;
    border-style: none;
    color: white;
    text-align: center;
    display: inline-block;
    white-space: nowrap;
    border-radius: 3px;
    &:hover{
        background-color: $color-green;
        cursor: pointer;
    } 
    &:focus{
        outline: none;
    } 
}


</style>
