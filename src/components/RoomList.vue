<template>
  <div class="roomList">
    <!--BSP:  <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
        <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
        -->
    <router-link
      :to="{
        path: '/product',
        query: { room: 'BATHROOM', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Bad" link="bathroom.jpg"
    /></router-link>
    <router-link
      :to="{
        path: '/product',
        query: { room: 'BEDROOM', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Schlafzimmer" link="sleepingroom.png"
    /></router-link>
    <router-link
      :to="{
        path: '/product',
        query: { room: 'KITCHEN', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Küche" link="cookingroom.jpg"
    /></router-link>
    <router-link
      :to="{
        path: '/product',
        query: { room: 'LIVINGROOM', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Wohnzimmer" link="livingroom.jpg"
    /></router-link>
    <router-link
      :to="{
        path: '/product',
        query: { room: 'DININGROOM', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Esszimmer" link="eatingroom.jpg"
    /></router-link>
    <router-link
      :to="{
        path: '/product',
        query: { room: 'BUREAU', productType: 'all', name: 'none' },
      }"
      ><Room class="listOrder" name="Arbeitszimmer" link="workingroom.jpg"
    /></router-link>
  </div>
</template>

 <script>
import Room from "@/components/Room.vue";

export default {
  components: { Room },
};
</script>

<style scoped lang="scss">
.roomList{
    padding-left: 1.5em;
}

.listOrder {
  float: left;
}
</style>