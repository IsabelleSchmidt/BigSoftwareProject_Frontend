<template>
    <div class= "colorfilter">
        <h2>Farben</h2>
        <div class="colum1">
            <div class="onecolor">
                <input id="grey" class="inputfields" type="checkbox" value="grey" v-model="grey" @change="checked($event.target.value)"/>
                <label for="grey" class="grey"></label>
            </div>
            <div class="onecolor">
                <input id="beige" class="inputfields" type="checkbox" value="beige" v-model="beige" @change="checked($event.target.value)"/>
                <label for="beige" class="beige"></label>
            </div>
            <div class="onecolor">
                <input id="black" class="inputfields" type="checkbox" value="black" v-model="black" @change="checked($event.target.value)"/>
                <label for="black" class="black"></label>
            </div>
            <div class="onecolor">
                <input id="brown" class="inputfields" type="checkbox" value="brown" v-model="brown" @change="checked($event.target.value)"/>
                <label for="brown" class="brown"></label>
            </div>
        </div>
        <div class="column2">
            <div class="onecolor">
                <input id="green" class="inputfields" type="checkbox" value="green" v-model="green" @change="checked($event.target.value)"/>
                <label for="green" class="green"></label>
            </div>
            <div class="onecolor">
                <input id="white" class="inputfields" type="checkbox" value="white" v-model="white" @change="checked($event.target.value)"/>
                <label for="white" class="white"></label>
            </div>
            <div class="onecolor">
                <input id="blue" class="inputfields" type="checkbox" value="blue" v-model="blue" @change="checked($event.target.value)"/>
                <label for="blue" class="blue"></label>
            </div>
            <div class="onecolor">
                <input id="red" class="inputfields" type="checkbox" value="red" v-model="red" @change="checked($event.target.value)"/>
                <label for="red" class="red"></label>
            </div>
        </div>
        <div class="colum3">
            <div class="onecolor">
                <input id="yellow" class="inputfields" type="checkbox" value="yellow" v-model="yellow" @change="checked($event.target.value)"/>
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
                <input id="purple" class="inputfields" type="checkbox" value="purple" v-model="purple" @change="checked($event.target.value)"/>
                <label for="purple" class="purple"></label>
            </div>
        </div>  
    </div>  
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "ColorFilter",

    setup(){
        function checked(color: string): void{
            console.log("color" + color)

        }
        return {
            checked
        };

    }
    
});
</script>
<style lang="scss">

.colorfilter{
    margin: 30px; 
}

label{
    cursor: pointer;
}
.inputfields{
    display: none;
}
.column1{
    float:left;
    width: 800px;
}
.column2{
    float: left;
    width:800px;
}
.column3{
    width: 800px;
    float: left;
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
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.beige::before {
  background: beige;
  color: black;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.black::before {
  background: black;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.brown::before {
  background: brown;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.green::before {
  background: green;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.white::before {
  background: white;
  border: 1px solid black;
  color: #333;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.blue::before {
  background: blue;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.red::before {
  background: red;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.yellow::before {
  background: yellow;
  color: black;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.rosa::before {
  background: palevioletred;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.purple::before {
  background: purple;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
input[type=checkbox]:checked + label.orange::before {
  background:orange;
  color: white;
  content: "\2713";
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}

input[type=checkbox]+label.red::before{
    border-radius: 100px;
    background: red;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.grey::before{
    border-radius: 100px;
    background: grey;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.beige::before{
    border-radius: 100px;
    background:beige;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.black::before{
    border-radius: 100px;
    background: black;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.brown::before{
    border-radius: 100px;
    background: brown;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.green::before{
    border-radius: 100px;
    background:green;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.white::before{
    border-radius: 100px;
    border: 1px solid black;
    background: white;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.blue::before{
    border-radius: 100px;
    background:blue;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.yellow::before{
    border-radius: 100px;
    background:yellow;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.orange::before{
    border-radius: 100px;
    background:orange;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.rosa::before{
    border-radius: 100px;
    background: palevioletred;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}
input[type=checkbox]+label.purple::before{
    border-radius: 100px;
    background:purple;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 35px;
  margin: 0 .25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 50px;
}



</style>