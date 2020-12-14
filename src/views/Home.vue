<template>
  <div class="home">

    <h1>Herzlich Wilkommen im PflaMoeHus</h1> 
    <RoomList/>
    
  </div>
</template>

<script>
import RoomList from '@/components/RoomList.vue';

export default {
  name: 'Home',
  components: {RoomList}
}
</script>

<style scoped>
h1{
  padding: 1.7em;
  text-align: center;

}

</style>


