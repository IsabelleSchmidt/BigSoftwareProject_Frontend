<template>
<div id="line">
    <div class ="productobject">
        <div class="picture">
                <img v-bind:src="product.allPictures[0].path" alt="Picture" id="pic">
        </div>
        <div class="information">
            <ul>
                <li id="prName">{{product.name}}</li>
                <li id="prPrice">{{product.price}} €</li> 
                <li id="prNr">
                    <span>Pnr:</span>
                    <span>{{product.artikelnr}} </span>
                </li>
                <li id="inTotal"> 
                    <span>Gesamtpreis:</span>
                    <span> 25,99€</span>
                </li> 

                <select name="amount" id="amount">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </ul>
        </div>
        <div class="close">
            <button id="delete" @click="trash()">
                <img src="../assets/closeImg.png">
            </button>
        </div>
    </div>
</div>
    
</template>
<script lang="ts">
import '@/service/Product'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CartListObject",
    props: {
        product:{
            type: Object,
            default: ()=> ({}),
        } ,
    },
   setup(props, context) {

       function trash(): void {
           //console.log("da" + props.product.artikelnr);
           context.emit("delete-product", props.product);
       } 
       return {
           trash
       };
    },
});
</script>
<style lang = "scss">
ul{
    list-style: none;
} 
.information li{
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    text-align: left;
} 
#prName{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 0%;
} 
#prPrice{
    font-size: 16px;
    padding-top: 0%;
} 
#prNr{
    font-size: 12px;
    padding-bottom: 0%;
} 
#inTotal{
    font-size: 12px;
    padding-top: 0%;
} 
#amount{
    float: left;
    font-size: 14px;
} 
    .productobject{
        margin-left: 2em;
        margin-right: 2em;
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        min-width: 35em;
        float: left;
    } 
    #delete{
        border-style: none;
        background: none;
        &:focus{
            outline: none;
        } 
    } 
   
    #pic{
        float: left;
        width: 5em;
    } 
    #line{
        border-bottom: 2px solid #d4d4d4;
        float: left;
    } 

    .information{
        float: left;
        margin-left: 5%;
    } 

    .close{
        float: right;
    } 
</style>