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
                <li>
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
import {useCartStore} from "../service/CartStore" 
import {useRouter, useRoute} from 'vue-router'


export default defineComponent({
    name: "CompProducts",
    components:{
    }, props: {
        tst: {
             type: Object as PropType<Product>, required: true
        }
    }, setup(props, context) {

        const {list, addProduct, deleteProduct, checkOneMoreAvailable} = useCartStore(); 
        const alert = ref(false); 
        const success = ref(false); 

        const router = useRouter();
        const route = useRoute();
        const ro = ref(route.query.room);
        const pr = ref(route.query.productType);

        //Callback
        function openproductlist(): void { 
            router.push({ path: '/product', query: { room: ro.value, productType: pr.value, name: "none" }});
            context.emit("open-all");
        }

        onMounted(async () => {

            router.push({ path: '/product', query: { room: ro.value, productType: pr.value, name: props.tst.name }});

            //when back button in browser is pressed
            window.onpopstate = function(event: any) {
                openproductlist();
            };
        });

        function add(): void{
            //not allowed
            if(!checkOneMoreAvailable(props.tst.articlenr) || props.tst.available <=0){
                alert.value = true;
                setTimeout(()=>{
                    alert.value=false
                 },3000)
            } else{ //allowed
                success.value = true;
                setTimeout(()=>{
                    success.value=false
                 },3000)
                addProduct(props.tst.articlenr);
            }
        }


        const COLORS = [
            "red",
            "#FFBF00",
            "green",
        ];        


        return {
            alert,
            success,
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

<style lang="scss" scoped>

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
    background-color: $color-grey;
    color: $color-grey;
    
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
    color: $color-green;
    margin-right: 4em;
    transition: all 0.5s;


} 
details[open] summary::after{
    content: '-';
    color:$color-green;
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
    color: $color-green;
}

ul {
    list-style: none;
}

.price {
    float: right;
    font-size: 1.5em;
}
.alert {
    color: red;
    margin-bottom: 3%;
    margin-top: 3%;
}
.success {
    color:$color-green;
    margin-bottom: 3%;
    margin-top: 3%;
}
.buttoncart {
    margin: 60px 0px 0px 0px;
    padding: 3% 9%;
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



</style>