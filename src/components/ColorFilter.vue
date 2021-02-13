<template>
    <div class= "colorfilter">
        <h3>Farben</h3>
        <div class="row1">
            <div class="onecolor">
                <input id="grey" class="inputfields" type="checkbox" value="grau" v-model="grey" @change="checked($event.target.value)"/>
                <label for="grey" class="grey"></label>
            </div>
            <div class="onecolor">
                <input id="beige" class="inputfields" type="checkbox" value="beige" v-model="beige" @change="checked($event.target.value)"/>
                <label for="beige" class="beige"></label>
            </div>
            <div class="onecolor">
                <input id="black" class="inputfields" type="checkbox" value="schwarz" v-model="black" @change="checked($event.target.value)"/>
                <label for="black" class="black"></label>
            </div>
            <div class="onecolor">
                <input id="brown" class="inputfields" type="checkbox" value="braun" v-model="brown" @change="checked($event.target.value)"/>
                <label for="brown" class="brown"></label>
            </div>
        </div>
        <div class="row2">
            <div class="onecolor">
                <input id="green" class="inputfields" type="checkbox" value="grün" v-model="green" @change="checked($event.target.value)"/>
                <label for="green" class="green"></label>
            </div>
            <div class="onecolor">
                <input id="white" class="inputfields" type="checkbox" value="weiss" v-model="white" @change="checked($event.target.value)"/>
                <label for="white" class="white"></label>
            </div>
            <div class="onecolor">
                <input id="blue" class="inputfields" type="checkbox" value="blau" v-model="blue" @change="checked($event.target.value)"/>
                <label for="blue" class="blue"></label>
            </div>
            <div class="onecolor">
                <input id="red" class="inputfields" type="checkbox" value="rot" v-model="red" @change="checked($event.target.value)"/>
                <label for="red" class="red"></label>
            </div>
        </div>
        <div class="row3">
            <div class="onecolor">
                <input id="yellow" class="inputfields" type="checkbox" value="gelb" v-model="yellow" @change="checked($event.target.value)"/>
                <label for="yellow" class="yellow"></label>
            </div>
            <div class="onecolor">
                <input id="orange" class="inputfields" type="checkbox" value="orange" v-model="orange" @change="checked($event.target.value)"/>
                <label for="orange" class="orange"></label>
            </div>
            <div class="onecolor">
                <input id="rosa" class="inputfields" type="checkbox" value="rosa" v-model="rosa" @change="checked($event.target.value)"/>
                <label for="rosa" class="rosa"></label>
            </div>
            <div class="onecolor">
                <input id="purple" class="inputfields" type="checkbox" value="lila" v-model="purple" @change="checked($event.target.value)"/>
                <label for="purple" class="purple"></label>
            </div>
        </div>  
    </div>  
</template>
<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue'
import {useFilterStore} from "../service/FilterStore"
export default defineComponent({
    name: "ColorFilter",

    setup(){

        const grey = ref();
        const black = ref();
        const beige = ref();
        const brown = ref();
        const green = ref();
        const white = ref();
        const blue = ref();
        const red = ref();
        const yellow = ref();
        const orange = ref();
        const rosa = ref();
        const purple = ref();

        const {colorlist, addColorFilter, deleteColorFilter} = useFilterStore();
    
      /**
       * checks whether a colour is missing and adds missing colour to the filterlist
       * @param color color to be checked
       */
        function checked(color: string): void{
            if(colorlist.value.has(color)){
                    deleteColorFilter(color)
                }else{
                    addColorFilter(color)
                }
        }
        /**
         * sets the values of the colour filter colours upon initialization of the component
         */
         onMounted(async()=> {
            for(let i = 0; i< colorlist.value.size; i++){
                const key = Array.from(colorlist.value.keys())[i];
               if(key  == 'grau'){
                   grey.value = true; 
               }
               if(key  == 'schwarz'){
                   black.value = true; 
               }
               if(key  == 'beige'){
                   beige.value = true; 
               }
               if(key  == 'braun'){
                   brown.value = true; 
               }
               if(key  == 'grün'){
                   green.value = true; 
               }
               if(key  == 'weiss'){
                   white.value = true; 
               }
               if(key  == 'blau'){
                   blue.value = true; 
               }
               if(key  == 'rot'){
                   red.value = true; 
               }
               if(key  == 'gelb'){
                   yellow.value = true; 
               }
               if(key  == 'orange'){
                   orange.value = true; 
               }
               if(key  == 'rosa'){
                   rosa.value = true; 
               }
               if(key  == 'lila'){
                   purple.value = true; 
               }
            }
                    
            
        });
       
        return {
            grey,
            black, 
            beige,
            brown, 
            green, 
            white,
            blue,
            red,
            yellow,
            orange, 
            rosa,
            purple,
            checked
        };

    }
    
});
</script>
<style scoped lang="scss">
.colorfilter{
    margin-top: 3%; 
}
label{
    cursor: pointer;
}
.inputfields{
    display: none;
}
.row1{
    float:left;
    width: 800px;
}
.row2{
    float: left;
    width:800px;
}
.row3{
    width: 800px;
    float: left;
    margin-bottom: 3%;
}
.onecolor{
    float:left;
    margin: 15px; 
}
input[type=checkbox]:checked + label.grey::before {
  background: grey;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.beige::before {
  background: beige;
  color: black;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.black::before {
  background: black;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.brown::before {
  background: brown;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.green::before {
  background: green;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.white::before {
  background: white;
  border: 1px solid black;
  color: #333;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.blue::before {
  background: blue;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.red::before {
  background: red;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.yellow::before {
  background: yellow;
  color: black;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.rosa::before {
  background: palevioletred;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.purple::before {
  background: purple;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.orange::before {
  background:orange;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}

input[type=checkbox]+label.red::before{
    border-radius: 100px;
    background: red;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.grey::before{
    border-radius: 100px;
    background: grey;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.beige::before{
    border-radius: 100px;
    background:beige;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.black::before{
    border-radius: 100px;
    background: black;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.brown::before{
    border-radius: 100px;
    background: brown;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.green::before{
    border-radius: 100px;
    background:green;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.white::before{
    border-radius: 100px;
    border: 1px solid black;
    background: white;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.blue::before{
    border-radius: 100px;
    background:blue;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.yellow::before{
    border-radius: 100px;
    background:yellow;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.orange::before{
    border-radius: 100px;
    background:orange;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.rosa::before{
    border-radius: 100px;
    background: palevioletred;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
input[type=checkbox]+label.purple::before{
    border-radius: 100px;
    background:purple;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 30px;
  vertical-align: top;
  width: 30px;
}
</style>