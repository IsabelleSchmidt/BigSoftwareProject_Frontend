<template>
    <div class="roomList">
        <!--BSP:  <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
        <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
        -->
        <router-link :to="{ path: '/product/Bad', query: { room: 'Bad', producttype: 'alle' }}"><Room class="listOrder" name="Bad" link="bathroom.jpg"/></router-link>
        <router-link :to="{ path: '/product/Schlafzimmer', query: { room: 'Schlafzimmer', producttype: 'alle' }}"><Room class="listOrder" name="Schlafzimmer" link="sleepingroom.png"/></router-link>
        <router-link :to="{ path: '/product/Kueche', query: { room: 'Kueche', producttype: 'alle'  }}"><Room class="listOrder" name="Küche" link="cookingroom.jpg"/></router-link>
        <router-link :to="{ path: '/product/Wohnzimmer', query: { room: 'Wohnzimmer', producttype: 'alle'  }}"><Room class="listOrder" name="Wohnzimmer" link="livingroom.jpg"/></router-link>
        <router-link :to="{ path: '/product/Esszimmer', query: { room: 'Esszimmer', producttype: 'alle'  }}"><Room class="listOrder" name="Esszimmer" link="eatingroom.jpg"/></router-link>
        <router-link :to="{ path: '/product/Arbeitszimmer', query: { room: 'Arbeitszimmer', producttype: 'alle'  }}"><Room class="listOrder" name="Arbeitszimmer" link="workingroom.jpg"/></router-link>


        <!--
            

        <Room class="listOrder" name="Bad" link="bathroom.jpg"/>
        <Room class="listOrder" name="Schlafzimmer" link="sleepingroom.png"/>
        <Room class="listOrder" name="Küche" link="cookingroom.jpg"/>
        <Room class="listOrder" name="Wohnzimmer" link="livingroom.jpg"/>
        <Room class="listOrder" name="Esszimmer" link="eatingroom.jpg"/>
        <Room class="listOrder" name="Arbeitszimmer" link="workingroom.jpg"/>

        -->
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