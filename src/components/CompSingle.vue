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
                <li class="priceLi"><p class="price">{{tst.price}} €</p></li>
                <li>                    
                    <label>Menge:</label>
                    <input :value="pamount" @change="amChange($event.target.value)" min="1" :max="pavailable" type="number" id="am">
                </li>
                <li class="buttons">
                    <button class="buttoncart" @click="add()">In den Warenkorb</button>
                </li>
                <li class="success"><v-alert type="success" v-if="success" >Artikel wurde zum Warenkorb hinzugefügt
                </v-alert></li>
                <li class="alert"><v-alert type="success" v-if="alert" >Artikel ist nicht mehr verfügbar
                </v-alert></li>
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

import { defineComponent, computed, ref, PropType, onMounted} from 'vue';


import '@/service/Product'
import {useCartStore} from '@/service/CartStore' 
import {useRouter} from 'vue-router'


export default defineComponent({
    name: "CompProducts",
    components:{
    }, props: {
        tst: {
             type: Object as PropType<Product>, required: true
        }
    }, setup(props, context) {

        const {list, addProduct, deleteProduct, checkOneMoreAvailable, getAmount, changeAmount, getCartAmount} = useCartStore(); 
        const alert = ref(false); 
        const success = ref(false); 
        const amount = ref(1);


        const router = useRouter();

        const pavailable = computed(() => {
            return props.tst.available;

        });

         const pamount = computed(()=>{
             return amount.value; 
            
            });

        //Callback
        function openproductlist(): void { 
            context.emit("open-all");
        }


        function add(): void{
            const am = ref(getAmount(props.tst.articlenr));

            if(!checkOneMoreAvailable(props.tst.articlenr) || props.tst.available <=0 ){
                alert.value = true;
                setTimeout(()=>{
                    alert.value=false
                 },1000)
            
            }else if(am.value){
                if(((Number(am.value))+(Number(amount.value))) > props.tst.available){
                    alert.value = true;
                    setTimeout(()=>{
                        alert.value=false
                     },1000)
                
                }else{
                    success.value = true;
                    setTimeout(()=>{
                        success.value=false
                    },1000)
                    addProduct(props.tst.articlenr, amount.value);
                }    
            }else{ 
                success.value = true;
                setTimeout(()=>{
                    success.value=false
                 },1000)
                addProduct(props.tst.articlenr, amount.value);
            }
            amount.value = 1; 
        }
        function amChange(am: number): void{    
            amount.value = am; 
        }

        onMounted(async () => {
            console.log(props.tst.roomType);
            router.push({ path: '/product', query: { room: props.tst.roomType, productType: props.tst.productType, name: props.tst.name }});

            //when back button in browser is pressed
            window.onpopstate = function(event: any) {
                openproductlist();
                // router.go(-1);
            };
        });

        const COLORS = [
            "red",
            "#FFBF00",
            "green",
        ];        


        return {
            alert,
            success,
            pamount,
            pavailable,
            amChange, 
            add,
            openproductlist,
            color: computed(() => {
                if (props.tst.available <= 0) {
                    return COLORS[0];
                } else if (props.tst.available < 20) {
                    return COLORS[1];
                } else {
                    return COLORS[2];
                }
            }),
        };
    },
});  
 </script>

<style scoped>

.availablepoint {
    float:left;
    font-size: 2.5em;
    margin: 6px 10px;
    width: 5%;
    color: v-bind('color');
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
    font-size: 1.5em;
}
.priceLi{
    float: right;
}
.alert {
    color: red;
    margin-bottom: 3%;
    margin-top: 3%;
}
.success {
    color:#3BA07C;
    margin-bottom: 3%;
    margin-top: 3%;
}
.buttoncart {
    margin: 60px 0px 0px 0px;
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
.icontruck {
    width: 25px;
    margin: 10px 10px 15px 10px;
    float: left;
}
.availabletxt {
    float:left;
    margin-bottom: 0px;
    margin-top: 18px;
}
#am{
    margin-left: 10px;
}


</style>