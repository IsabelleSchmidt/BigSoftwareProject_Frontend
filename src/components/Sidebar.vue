<template>
    <div class="sidebar">
        <h4 >Produkte</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Pflanze'  }}">Pflanzen</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Tisch'  }}">Tische</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Stuhl'  }}">Stühle</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Bett'  }}">Betten</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Dekoration'  }}">Deko</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Sofa/Couch'  }}">Sofa/Couch</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'alle', producttype: 'Schrank/Kommode'  }}">Schränke/Kommoden</router-link></li>
        </ul>

        <br>

        <h4>Räume</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Bad', producttype: 'alle'  }}">Bad</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Schlafzimmer', producttype: 'alle'  }}">Schlafzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Kueche', producttype: 'alle'  }}">Küche</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Wohnzimmer', producttype: 'alle'  }}">Wohnzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Esszimmer', producttype: 'alle'  }}">Esszimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Arbeitszimmer', producttype: 'alle'  }}">Arbeitszimmer</router-link></li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .sidebar{
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
    ul{
        list-style-type: none;
        margin: 0px;
    } 
    #link{
        color: black;
        text-decoration: none;
        list-style: none;
        list-style-type: none;
    } 
    #link:hover{
        color: #6F492D;
        text-decoration: none;
    } 
    li{
        font-size: 1.25vw;
    } 
    h4{
        font-size: 1.5vw;
        margin: 10px;
    } 
</style>