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
                    <span>Pnr: {{product.articlenr}} </span>
                </li>
                <li id="inTotal"> 
                    <span>Gesamtpreis: {{p}} €</span>
                </li> 
                <input :value="amount" @change="amChange($event.target.value)" min="1" max="20" type="number" id="amount">
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
import { defineComponent, onMounted, ref, computed} from 'vue'

export default defineComponent({
    name: "CartListObject",
    props: {
        product:{
            type: Object,
            default: ()=> ({}),
        }
        
    }, 
     
    setup(props, context) {
        const amount = ref(1);
        const Pprice = ref(props.product.price);
        const umrechnungsfaktor = Math.pow(10,2);


        const p = computed(() => {
            return Pprice.value;
        }); 
        
         onMounted(async () => {

             const aList = localStorage.getItem('amount');
             if(aList){
                const list = JSON.parse(aList);  

                for(let i = 0; i< aList.length; i++){
                    if(list[i].name == props.product.name ){
                        amount.value =  list[i].menge ; 
                        break;
                    } 
                } 
                Pprice.value = Math.round((amount.value * props.product.price)*umrechnungsfaktor)/umrechnungsfaktor; 
                console.log("Gesamt: " + Pprice.value);
             }
                   
        });
        function amChange(am: number): void{

            const aList = localStorage.getItem('amount');
             if(aList){
                const list = JSON.parse(aList); 

                for(let i = 0; i< aList.length; i++){
                    if(list[i].name == props.product.name ){
                        amount.value = am; 
                        list[i].menge = amount.value;
                        break; 
                    } 
                }

                Pprice.value=Math.round((amount.value * props.product.price)*umrechnungsfaktor)/umrechnungsfaktor; 
                localStorage.setItem('amount', JSON.stringify(list));

            }    
            context.emit("amount-change", am);
        } 

       function trash(): void {
           context.emit("delete-product", props.product);
       } 
       return {
           amount,
           p,
           amChange,
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
    }  

    .information{
        float: left;
        margin-left: 5%;
    } 

    .close{
        float: right;
    } 
</style>