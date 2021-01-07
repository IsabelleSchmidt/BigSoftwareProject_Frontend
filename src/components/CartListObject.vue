<template>
<div id="line">
    <div class ="productobject">
        <div class="picture">
                <img v-bind:src="product[0].allPictures[0].path" alt="Picture" id="pic">
        </div>
        <div class="information">
            <ul>
                <li id="prName">{{product[0].name}}</li>
                <li id="prPrice">{{product[0].price}} €</li> 
                <li id="prNr">
                    <span>Pnr: {{product[0].articlenr}} </span>
                </li>
                <li id="inTotal"> 
                    <span>Gesamtpreis: {{Math.round((product[0].price*product[1])*Math.pow(10,2))/Math.pow(10,2)}} €</span>
                </li> 
                <input :value="product[1]" @change="amChange($event.target.value)" min="1" max="20" type="number" id="amount">
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
import { defineComponent} from 'vue'
import {useCartStore} from '@/service/CartStore'

export default defineComponent({
    name: "CartListObject",
    props: {
        product: Object,           
    }, 
     
    setup(props, context) {

        const {addProduct, changeAmount, deleteProduct} = useCartStore();

        function amChange(am: number): void{
            if(props.product){
                if(am <= 20 && am >=1){
                    changeAmount(props.product[0], am);
                }else{
                    console.log("elseFALL")
                }
            }

        }
        function trash(): void{
           if(props.product)
            deleteProduct(props.product[0]);
        }
     
       return {
           amChange,
           trash,
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
    }  

    .information{
        float: left;
        margin-left: 5%;
    } 

    .close{
        float: right;
    } 
</style>