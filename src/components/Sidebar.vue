<template>
    <div class="sidebar">
        <h4 >Produkte</h4>
        <ul>
            <li><a href="#">Pflanzen</a></li>
            <li><a href="#">Tische</a></li>
            <li><a href="#">Stühle</a></li>
            <li><a href="#">Bett</a></li>
            <li><a href="#">Deko</a></li>
            <li><a href="#">Sofa/Couch</a></li>
            <li><a href="#">Schränke/Kommoden</a></li>
        </ul>

        <br>

        <h4>Räume</h4>
        <ul>
            <li><a href="#">Badezimmer</a></li>
            <li><a href="#">Schlafzimmer</a></li>
            <li><a href="#">Küche</a></li>
            <li><a href="#">Wohnzimmer</a></li>
            <li><a href="#">Esszimmer</a></li>
            <li><a href="#">Arbeitszimmer</a></li>
            
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
    ul li a{
        color: black;
        text-decoration: none;
        list-style: none;
    } 
    a:hover{
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