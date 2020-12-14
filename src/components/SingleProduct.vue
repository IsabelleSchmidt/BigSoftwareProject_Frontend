<template>
    <div class="product">
        <div class="top">
            <router-link class="back" to="/products"> &laquo; zurück zur Übersicht</router-link>
        </div>
        <div class="top2">
        <div class="left"> 
            <img class="pic" src="../assets/sleepingroom.png"  alt="Picture"/>
            <img class="pic" src="../assets/sleepingroom.png"  alt="Picture"/>
            <img class="pic" src="../assets/sleepingroom.png"  alt="Picture"/>
            <img class="pic" src="../assets/sleepingroom.png"  alt="Picture"/>
        </div>
        <div class="right"> 
            <ul>
                <li><h3 class="name">ProduktName</h3></li>
                <li><p class="description">Beschreibung bli bla blub</p></li>
                <li><p class="size">Größe</p></li>
                <li><p class="price">Preis</p></li>
                <li class="buttons">
                    <button class="buttoncart">In den Warenkorb</button>
                    <button class="buttonfav">
                        <img src="../assets/fav.png" alt="Wunschzettel" height="24px" />
                    </button>
                </li>
                <li class="available">
                    <img class="icontruck" src="../assets/truckicon.png"  alt="Picture"/>
                    <p class="availabletxt">verfügbar</p>
                    <p class="availablepoint">&bull;</p>
                </li>
            </ul>
        </div>
        </div>
        <div class="bottom"> 
            <hr>
            <details>
                <summary>Produktinformationen</summary>
                <p class="p1">  Test Test Hier kommen alle infos aus der Datenbank hfehuhferfeh
                    fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                    hhhhhhhhhhhhhhhhhhhhhhhh
                    hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh   
                    hhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhh</p>
            </details>
            <hr>
            <details>
                <summary>Produktgröße</summary>
                <p class="p1"> Höhe</p>
                <p> Breite </p>
                <p> Tiefe </p>
            </details> 
            <hr>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pic {
    width: 280px;
    margin: 0.5em;
}

.top {
    margin: 1em 1em 0em 3em;
}

.top2{
    height: 400px;
}

.left {
    width: 40%;
    height: 75%;
    margin: 1em 3em 3em 3em;
    float:left;
} 

.right {
    margin: 1em 0em;
    float:left;
    width: 40%;
    height: 75%;
}

.bottom {
    width: 95%;
    position: relative;
    height: 350px;
    // margin: 0 auto;
    margin-top: 350px;
    margin-left: 3.5em;
    
      
} 

hr {
    width: 95%;
    height: 0.15em;
    background-color: #f3f3f3;
    color: #f3f3f3;
    
}

summary {
    list-style: none;
    //height: 4.5em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 1.3em;
    
}  

summary::-webkit-details-marker {
    display: none;
}

summary::after{
    content: '+';
    position: absolute;
    right: 1em;
    color: #3BA07C;
    margin-right: 4em;
    transition: all 0.5s;


} 
details[open] summary::after{
    content: '-';
    color:#3BA07C;
    margin-right: 4em;
} 

.p1{
    padding-top: 1em;
} 


.back{
    text-decoration: none;
    color: black;
    &:hover {
        color: #3BA07C;
    }
}

ul {
    list-style: none;
}

.price {
    float: right;
    font-size: 1.5em;
}

.buttoncart {
    margin: 5% 0%;
    padding: 3% 9%;
    background-color: #3BA07C;
    border-style: none;
    color: white;
    &:hover {
        background-color: #87E1A6;
    }
    &:focus {
        outline: none;
    }
    border-radius: 40px;
}

.buttonfav {
    border-style: none;
    background: none;
    margin: 0% 5%;
}

.buttons {
    margin: 10% 0% 0% 0%;
}

.icontruck {
    width: 6%;
    margin: 0% 3%;
    float: left;
}
.availabletxt {
    float:left;
    margin-bottom: 0px;
    margin-top: 0.8%;
}

.availablepoint {
    float:left;
    font-size: 1.4em;
    margin: 0% 2%;
    width: 5%;
    color: green;
}

</style>