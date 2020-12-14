<template>
    <div class="roomList">

        <Room class="listOrder" name="Bad" link="bathroom.jpg"/>
        <Room class="listOrder" name="Schlafzimmer" link="sleepingroom.png"/>
        <Room class="listOrder" name="Küche" link="cookingroom.jpg"/>
        <Room class="listOrder" name="Wohnzimmer" link="livingroom.jpg"/>
        <Room class="listOrder" name="Esszimmer" link="eatingroom.jpg"/>
        <Room class="listOrder" name="Arbeitszimmer" link="workingroom.jpg"/>

    </div>
</template>

 <script>
import Room from '@/components/Room.vue';

export default {
    components:{Room}
}
</script>

<style scoped>
.roomList{
    padding-left: 1.5em;
}

.listOrder{
    float: left;
}


</style>