<template>
    <div class="orderForm"> 
        <h1>Bestellübersicht</h1>

        <form>
            <div class="adress">
                <h2>Versandadresse</h2>
                <div class="row">
                    <label for="street" class="col7">Straße</label>
                    <label for="num" class="col1">Hausnummer</label>
                </div>
                <div class="row">
                    <input id="street" type="text" class="col6" required>
                    <input id="num" type="text" class="col1" required>
                </div>
              
                <div class="row">
                    <label for="zipCode" class="col3">PLZ</label>
                    <label for="city" class="col7">Stadt</label>
                </div>
                <div>
                    <input id="zipCode" type="number" class="col1" required>
                    <input id="city" type="text" class="col6" required>
                </div>
            </div>
           
            <h2>Zahlungsart</h2>
            <div class="payment">

                <div class="row"><input id="creditcard" type="radio">
                <label for="creditcard">Kredit- oder Debitkarte</label></div>
                <div class="creditC"> 
                    <div class="row"><label for="cardnumber" class="col3">Kartennummer</label><input id="cardnumber" type="number"></div>
                    <div class="row"><label for="cardholder" class="col3">Name des Karteninhabers</label><input id="cardholder" type="text"></div>
                    <div class="row"><label for="expires" class="col3">Ablaufdatum</label>
                        <select id="expires">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        <select id="expires">
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                            <option>2031</option>
                        </select>
                    </div>
                </div>

                <div class="row"><input id="bankcard" type="radio">
                <label for="bankcard">Bankkarte</label></div>
                <div class="bankC"> 
                    <div class="row"><label for="iban" class="col3">IBAN</label><input id="iban" type="text"></div>
                    <div class="row"><label for="bank" class="col3">Bank</label><input id="bank" type="text"></div>
                    <div class="row"><label for="cardholder" class="col3">Name des Karteninhabers</label><input id="cardholder" type="text"></div>
                </div>
                
            </div>
        </form>

        <h2>Lieferung 18.02.2021</h2>
        <div class="row">
            <img src="../assets/monstera.jpg">
            <ul class="product">
                <li>Produktname</li>
                <li>Produktnummer</li>
                <li>Beschreibung</li>
            </ul>
            <p class="price">Preis</p>
        </div>
        <div class="row">
            <img src="../assets/monstera.jpg">
            <ul class="product">
                <li>Produktname</li>
                <li>Produktnummer</li>
                <li>Beschreibung</li>
            </ul>
            <p class="price">Preis</p>
        </div>
        <div class="row">
            <hr>    
        </div>
        <div class="row">
            <p class="price">Gesamt</p>
        </div>
        <br>
        <div class="row">
            <input type="submit" name="order" value="Bestellen">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default{
    name: 'OrderForm'
} 
</script>

<style scoped lang="scss">
    .orderForm{
        margin: 1em 2em 2em 2em;
    } 
    .adress{
        margin-bottom: 6em;
    }
    .payment{
        margin: 1em 0em 2em 2em;
    } 
    .creditC, .bankC{
        margin-left: 5em;
    } 
    .product{
        text-align: left;
        margin-top: 3%;
    }
    .price{
        float: right;
        margin: 2.5em 7em 1em 0em;
    } 
    label{
        margin-top: .5em;
        display: inline-block;
    } 
    input:focus{
        outline-color: #3BA07C;
        outline-style: solid;
        outline-width: 1px;
    } 
    input[type=text]{
        padding: .25em;
        border: 1px solid #ccc;
        border-radius: 3px;
    }  
    /* Chrome, Safari, Edge, Opera remove arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox remove arrows*/
    input[type=number]{
        padding: .25em;
        border: 1px solid #ccc;
        border-radius: 3px;
        appearance: none;
    } 

    input[type=submit]{
        display: block;
        padding: 1% 5%;
        margin: 0 auto;
        background-color: black;
        border-style: none;
        color: #fff;
        border-radius: 3px;
        &:hover{
            background-color: #3BA07C;
        } 
        &:focus{
            outline: none;
        }
    }
    select{
        display: inline;
        padding: .25em;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #ffffff;
        box-sizing: border-box;
        margin-right: 2em;
    } 
    select:focus{
        outline-color: #3BA07C;
        outline-style: solid;
        outline-width: 1px;
    } 
    hr{
        width: 20%;
        float: right;
        background-color: black;
        color: black;
    }
    ul{
        list-style: none;
        float: left;
        position: relative;
    } 
    img{
        margin: .5em 0em .5em 0em;
        float: left;
        width: 10%;
    } 
    h2{
        margin-top: 2em;
    } 
    .row{
        width: 100%;
        height: 15%;
        margin-top: 1em;
        clear: both;    
    } 
    .row:after{
        content: "";
        display: table;
    } 
    .col1{
        float: left;
        width: 15%;
        margin-right: 14%;
    } 
    .col3{
        float: left;
        width: 30%;
    } 
    .col4{
        float: left;
        width: 35%;
        margin-right: 14%;
    } 
    .col5{ 
        float: left;
        width: 50%;
    } 
    .col6{
        float: left;
        width: 55%;
        margin-right: 14%;
    } 
    .col7{
        float: left;
        width: 70%;
    } 
</style>
