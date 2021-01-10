<template>
<div id="line">
    <div class ="productobject">
        <div class="picture">
                <img v-bind:src="ppath.path" alt="Picture" id="pic">
        </div>
        <div class="information">
            <ul>
                <li id="prName">{{pname}}</li>
                <li id="prNr">
                    <span>Pnr: {{particlenr}} </span>
                </li>
                <li id="prPrice">
                    <span>{{product[1]}}  x   {{pprice}}€</span>
                </li>
                <!-- <li id="prPrice">{{pprice}} €</li>  -->
                <li id="inTotal"> 
                    <span>{{Math.round((pprice*product[1])*Math.pow(10,2))/Math.pow(10,2)}} €</span>
                </li>
            </ul>
        </div>
    </div>
</div>
    
</template>
<script lang="ts">
import '@/service/Product'
import { defineComponent, ref} from 'vue'
import {useCartStore} from '@/service/CartStore'
import {useProduct} from '@/service/ProductStore'

export default defineComponent({
    name: "CartListObject",
    props: {
        product: Object,
    }, 
     
    setup(props, context) {

        const {getProductByArtNr} = useProduct();

        const ppath = ref("");
        const pname = ref("");
        const pprice = ref(0);
        const particlenr = ref(0);

        let p: Product = {'articlenr': 0, 'version': 0, 'name': "", 'productType': "", 
                                'roomType': "", 'price': 0, 'allPictures': [], 'height': 0,
                                'width': 0, 'depth': 0, 'available': 0, 'description': "", 'information': ""};

        if (props.product) {
            p = getProductByArtNr(props.product[0]) as Product;
            ppath.value =  p.allPictures[0];
            pname.value = p.name;
            pprice.value = p.price;
            particlenr.value = p.articlenr;
        }
     
       return {
           ppath,
           pname,
           pprice,
           particlenr,
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
    padding: 0%;
} 
#prNr{
    font-size: 12px;
    padding-bottom: 0%;
} 
#inTotal{
    font-size: 16px;
    padding-top: 0%;
    padding-right: 0%;
    margin: 0;
    float: right;
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
    width: 100%;
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
    margin-left: 0;
    width: 80%;
} 

.close{
    float: right;
} 
</style>