<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>



<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>



<style lang="scss">

*{
  font-family: Helvetica, sans-serif !important;
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
