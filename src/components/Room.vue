<template>
  <div class="room">
    <img v-bind:src="require(`../assets/${link}`)" class="pic" alt="Picture" />
    <div class="roomName">{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Room",
  props: {
    name: String,
    link: String,
  },
});
</script>

<style scoped lang="scss">
img {
  border-radius: 10px 10px 0px 0px;
  width: 400px;
  height: 300px;
  object-fit: cover;
  object-position: bottom center;
}

.roomName{
    font-size: 1.5em;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    background-color: $color-grey;
    width:400px;
    text-align: center;
    border-radius: 0px 0px 10px 10px;
    color: black;
}
.room {
  display: table;
  padding: 2em;
  /* float: left; */
}
</style>