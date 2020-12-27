<template>
    <div class="compSingle">
        <div class="top">
            <a @click="openproductlist()">  &laquo; zurück zur Übersicht</a>
        </div>
        <div class="top2">
        <div class="left"> 
            <!-- v-for="(i,p) in tst.allPictures.path" :key="p" -->
            <div v-for="i in tst.allPictures" :key="i">
                <img class="pic" v-bind:src="i.path"  alt="Picture"/>
            </div>    
        </div>
        <div class="right"> 
            <ul>
                <li><h3 class="name">{{tst.name}}</h3></li>
                <li><p class="description">{{tst.description}}</p></li>
                <li><p class="price">{{tst.price}} €</p></li>
                <li class="buttons">
                    <button class="buttoncart" @click="addProduct()">In den Warenkorb</button>
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
                <p class="p1">  {{tst.information}}</p>
            </details>
            <hr>
            <details>
                <summary>Produktgröße</summary>
                <p class="p1">{{tst.width}} (Breite) x {{tst.depth}} (Länge) x {{tst.height}} (Höhe) </p>
            </details> 
            <hr>
        </div>
    </div>
</template>

<script lang = "ts">
import { defineComponent, computed} from 'vue';

import '@/service/Product'

export default defineComponent({
    name: "CompProducts",
    components:{
    }, props: {
        tst: {
            type: Object,
            default: () => ({}),
        }
    }, setup(props, context) {
        const FARBEN = [
            "red",
            "yellow",
            "green",
        ];


        console.log("TETS--- " + props.tst.name);

        function openproductlist(): void {
            context.emit("open-all");
        }
        return {
            openproductlist,
            farbe: computed(() => {
                if (props.tst.available <= 0) {
                    console.log("leer");
                    return FARBEN[0];
                } else if (props.tst.available < 20) {
                    console.log("weniger 20" + props.tst.available);
                    return FARBEN[1];
                } else {
                    console.log("mehr als 20" + props.tst.available);
                    return FARBEN[2];
                }
            }),
        };
    },
    methods:{
        addProduct(): void{
            let productList;
            let amountList;
            const amount = {name: "", menge: 0};
            let yes = false; 
            
            const st = localStorage.getItem('cartItems'); 
            const am = localStorage.getItem('amount');

            if(!st){
                productList = []; 
                amountList = []; 
                 
                amount.name = this.tst.name; 
                amount.menge = 1; 

                amountList.push(amount);
                productList.push(this.tst);
                localStorage.setItem('cartItems', JSON.stringify(productList));
                localStorage.setItem('amount', JSON.stringify(amountList));
        
            } else{
                //überpruefe ob schon gibt
                productList = JSON.parse(st);
                if(am){
                    amountList = JSON.parse(am);
                }
                for(let i = 0; i< amountList.length; i++){
                    if(amountList[i].name == this.tst.name){
                        amountList[i].menge++; 
                        yes = true; 
                        break; 
                    } 
                } 
                if(!yes){
                    amount.name = this.tst.name; 
                    amount.menge = 1; 
                    amountList.push(amount);
                    productList.push(this.tst);

                }  
                localStorage.setItem('amount', JSON.stringify(amountList));
                localStorage.setItem('cartItems', JSON.stringify(productList));        
            } 
    
        } 
    } 
});  
 </script>

<style scoped>

.availablepoint {
    float:left;
    font-size: 1.4em;
    margin: 0% 2%;
    width: 5%;
    color: v-bind('farbe');
}

.pic {
    width: 250px;
    height: 300px;
    object-fit:cover;
    object-position: bottom center;
    margin: 0.5em;
    float: left;
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
}

.back:hover{
    color: #3BA07C;
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
    border-radius: 40px;
}

.buttoncart:hover {
    background-color: #87E1A6;
}

.buttoncart:focus {
    outline: none;
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



</style>