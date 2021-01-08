<template>
<div id="line">
    <div class ="productobject">
        <div class="picture">
                <img v-bind:src="p_path.path" alt="Picture" id="pic">
        </div>
        <div class="information">
            <ul>
                <li id="prName">{{p_name}}</li>
                <li id="prPrice">{{p_price}} €</li> 
                <li id="prNr">
                    <span>Pnr: {{p_articlenr}} </span>
                </li>
                <li id="inTotal"> 
                    <span>Gesamtpreis: {{Math.round((p_price*product[1])*Math.pow(10,2))/Math.pow(10,2)}} €</span>
                </li> 
                <input :value="product[1]" @change="amChange($event.target.value)" min="1" :max="p_available" type="number" id="amount">
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
import { defineComponent, ref} from 'vue'
import {useCartStore} from '@/service/CartStore'
import {useProduct} from '@/service/ProductStore'

export default defineComponent({
    name: "CartListObject",
    props: {
        product: Object,
    }, 
     
    setup(props, context) {

        const {addProduct, changeAmount, deleteProduct, checkOneMoreAvailable} = useCartStore();
        const {getProductByArtNr} = useProduct();


        const p_path = ref("");
        const p_name = ref("");
        const p_price = ref(0);
        const p_articlenr = ref(0);
        const p_available = ref(0);

        let p: Product = {'articlenr': 0, 'version': 0, 'name': "", 'productType': "", 
                                'roomType': "", 'price': 0, 'allPictures': [], 'height': 0,
                                'width': 0, 'depth': 0, 'available': 0, 'description': "", 'information': ""};

        if (props.product) {
            p = getProductByArtNr(props.product[0]) as Product;
            p_path.value =  p.allPictures[0];
            p_name.value = p.name;
            p_price.value = p.price;
            p_articlenr.value = p.articlenr;
            p_available.value = p.available;
        }

        function amChange(am: number): void{
            // console.log("AMCHANGE " +  am);
            if(props.product){
                if(checkOneMoreAvailable(props.product[0])){
                    changeAmount(props.product[0], am);
                }else{
                    changeAmount(props.product[0], props.product[1]);
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
           p_path,
           p_name,
           p_price,
           p_articlenr,
           p_available
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