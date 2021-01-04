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
import { defineComponent, computed, onMounted, ref, watch, reactive} from 'vue';
import { useRouter, useRoute } from 'vue-router'

import '@/service/Product'

export default defineComponent({
    name: "CompSingle",
    components:{
    }, props: {
        tst: {
            type: Object,
            default: () => ({}),
        }
    }, setup(props, context) {

        const router = useRouter();


        // const route = useRoute();
        // const ro = ref(route.query.room);
        // const pr = ref(route.query.producttype);
        // const n = ref(route.query.name);
        // const q = {room: ro, producttype: pr, name: n};
        // const filter = reactive(q);

        //Callback
        function openproductlist(): void { 
            // context.emit("open-all");
            router.go(-1);
        }


        onMounted(async () => {

            router.push({ path: '/product', query: { room: props.tst.roomType, productType: props.tst.productType, name: props.tst.name }});
            // router.afterEach((to, from, failure) => {
            //     console.log("--------" + to.query.name);
            // })

            // q.room.value = route.query.room;
            // console.log(q.room.value);
            // q.producttype.value = route.query.productType;
            // console.log(q.producttype.value);
            // q.name.value = route.query.name;
            // console.log(q.name.value);

            // console.log(filter.room + " " + filter.producttype + " " + filter.name);

            //when back button in browser is pressed
            window.onpopstate = function(event: any) {
                context.emit("open-all");
                // openproductlist();
                // router.go(-1);
            };
        });

        const COLORS = [
            "red",
            "#FFBF00",
            "green",
        ];   

        return {
            openproductlist,
            color: computed(() => {
                if (props.tst.nrAvailableItems <= 0) {
                    return COLORS[0];
                } else if (props.tst.nrAvailableItems < 20) {
                    return COLORS[1];
                } else {
                    return COLORS[2];
                }
            }),
        };
    }
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
    float: right;
    font-size: 1.5em;
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

.buttonfav {
    border-style: none;
    background: none;
    margin: 0% 5%;
}

.buttons {
    margin: 10% 0% 0% 0%;
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