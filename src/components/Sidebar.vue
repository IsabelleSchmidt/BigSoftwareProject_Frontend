<template>
  <div class="sidebar">
    <h4>Produkte</h4>
    <ul>
      <li v-for="productkey in productkeys" :key="productkey">
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: 'all', productType: productkey, name: 'none' },
          }"
          >{{products[productkey]}}</router-link>
     
      </li>
    </ul>

    <br />

    <h4>Räume</h4>
    <ul>
      <li v-for="roomkey in roomkeys" :key="roomkey">
        <router-link
          id="link"
          :to="{
            path: '/product',
            query: { room: roomkey, productType: 'all', name: 'none' },
          }"
          >{{rooms[roomkey]}}</router-link>
     
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import {useProduct} from '../service/ProductStore';

export default defineComponent({
    name: "sidebar",
    setup(){
      const {allproducttypes, allroomtypes, getAllProductTypes, getAllRoomTypes} = useProduct();
      const products = ref(allproducttypes.value);
      const rooms = ref(allroomtypes.value); //lieber mit ref arbeiten -> reagiert imo nicht direkt auf backend Änderungen
     
      onMounted(async ()=>{
        await getAllProductTypes();
        await getAllRoomTypes(); 

      });

    
      
      const productkeys = Object.keys(allproducttypes.value);
      const roomkeys = Object.keys(allroomtypes.value);


      return{products, rooms, roomkeys, productkeys};
    }
});
</script>

<style scoped lang="scss">
.sidebar {
  text-align: left;
  color: black;
  float: left;
  background-color: #f3f3f3;
  padding: 1.5%;
  max-width: 15%;
  margin-left: 20px;
  margin-right: 30px;
  margin-top: 15px;
  border-radius: 5px;
  position: fixed;
}
ul {
  list-style-type: none;
  margin: 0px;
}
#link {
  color: black;
  text-decoration: none;
  list-style: none;
  list-style-type: none;
}
#link:hover {
  color: #6f492d;
  text-decoration: none;
}
li {
  font-size: 1.25vw;
}
h4 {
  font-size: 1.5vw;
  margin: 10px;
}
</style>