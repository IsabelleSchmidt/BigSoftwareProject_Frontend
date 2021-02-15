<template>
  <div class="rooms">
    <RoomList />
  </div>
</template>

<script>
import RoomList from "@/components/RoomList.vue";

export default {
  name: "Rooms",
  components: { RoomList },
};
</script>