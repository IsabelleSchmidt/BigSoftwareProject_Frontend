<template>
    <div class="sidebar">
        <h4 >Produkte</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Pflanze', name: 'none'  }}">Pflanzen</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Tisch', name: 'none'  }}">Tische</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Stuhl', name: 'none'  }}">Stühle</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Bett', name: 'none'  }}">Betten</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Dekoration', name: 'none'  }}">Deko</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Sofa/Couch', name: 'none'  }}">Sofa/Couch</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'all', productType: 'Schrank/Kommode', name: 'none'  }}">Schränke/Kommoden</router-link></li>
        </ul>

        <br>

        <h4>Räume</h4>
        <ul>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Bad', productType: 'all', name: 'none'  }}">Bad</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Schlafzimmer', productType: 'all', name: 'none'  }}">Schlafzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Kueche', productType: 'all', name: 'none'  }}">Küche</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Wohnzimmer', productType: 'all', name: 'none'  }}">Wohnzimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Esszimmer', productType: 'all', name: 'none'  }}">Esszimmer</router-link></li>
            <li ><router-link id="link" :to="{ path: '/product', query: { room: 'Arbeitszimmer', productType: 'all', name: 'none'  }}">Arbeitszimmer</router-link></li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .sidebar{
        text-align: left;
        color: $color-dark;
        float: left;
        background-color: $color-grey;
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
        color: $color-dark;
        text-decoration: none;
        list-style: none;
        list-style-type: none;
    } 
    #link:hover{
        color: $color-brown;
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