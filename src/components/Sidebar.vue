<template>
    <div class="sidebar">
        <h4 >Produkte</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product/Pflanzen', query: { room: 'alle', producttype: 'Pflanze'  }}">Pflanzen</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Tische', query: { room: 'alle', producttype: 'Tisch'  }}">Tische</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Stuehle', query: { room: 'alle', producttype: 'Stuhl'  }}">Stühle</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Betten', query: { room: 'alle', producttype: 'Bett'  }}">Betten</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Deko', query: { room: 'alle', producttype: 'Dekoration'  }}">Deko</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/SofaCouch', query: { room: 'alle', producttype: 'Sofa/Couch'  }}">Sofa/Couch</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/SchrankKommode', query: { room: 'alle', producttype: 'Schrank/Kommode'  }}">Schränke/Kommoden</router-link></li>
        </ul>

        <br>

        <h4>Räume</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product/Bad', query: { room: 'Bad', producttype: 'alle'  }}">Bad</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Schlafzimmer', query: { room: 'Schlafzimmer', producttype: 'alle'  }}">Schlafzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Kueche', query: { room: 'Kueche', producttype: 'alle'  }}">Küche</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Wohnzimmer', query: { room: 'Wohnzimmer', producttype: 'alle'  }}">Wohnzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Esszimmer', query: { room: 'Esszimmer', producttype: 'alle'  }}">Esszimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product/Arbeitszimmer', query: { room: 'Arbeitszimmer', producttype: 'alle'  }}">Arbeitszimmer</router-link></li>
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
        border-radius: 5px;
        position: fixed;
    } 
    ul{
        list-style-type: none;
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
        font-size: 2vw;
    } 
</style>