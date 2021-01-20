<template>
    <div class="vertical">
        <div class="center">
            <h1>Vielen Dank für Ihre<br>
                 Bestellung!</h1>
        </div>
        <div class="center">
            <router-link to="/" id="link">Zurück zur Startseite</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .center{
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
    }
    .vertical{
        height: 300px;
        width:100%;
        text-align: center;
        //padding-top: 100px;
        vertical-align: middle;
        margin-top: 120px;
    }
    h1{
        color: $color-green;
        text-align: center;
    }
    #link{
        text-decoration: none;
        color: black;
    }
    #link:hover{
        color: $color-brown;
    }
    
</style>