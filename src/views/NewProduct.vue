<template>
    <div class="newProduct">
        <h1>Neues Produkt anlegen</h1>

        <form  @submit.prevent='sendeProd'>
            <div class="row">
                <div class="col1"><label for="name" class="left">Produktname</label></div>
                <div class="col2"><input v-model="name" type="text" name="name" size="30" maxlength="50" class="right"></div>
            </div>
            
            
            <div class="row">
                <div class="col1"><label for="productType" class="left">Produktart</label></div>
                <div class="col2"><input v-model="productType" type ="text" name="productType" size="30" maxlength="50" class="right"></div>
            </div>
            
            <div class="row">
                <div class="col1"><label for="roomType" class="left">Raumart</label></div>
                <div class="col2"><input v-model="roomType" type="text" name="roomType" size="30" maxlength="50" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="price" class="left">Preis</label></div>
                <div class="col2"><input v-model="price" type="number" name="price" step="0.01" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="dimensions" class="left">Maße in cm (bxhxt)</label></div>
                <div class="col2"><input v-model="width" type="number" name="width" step="0.01" class="right"> x <input v-model="height" type="number" name="height" step="0.01"> x <input v-model="depth" type="number" name="depth" step="0.01"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="nrAvailableItems" class="left">Stückzahl</label></div>
                <div class="col2"><input v-model="nrAvailableItems" type="number" name="nrAvailableItems" step="1" class="right"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="picture">Bild und Name</label></div>
                <div class="col2"><input  type="file" name="picture" accept="image/png, image/jpg, image/jpeg"><input v-model="picturename" type="text" name="picturename">.jpg/.jpeg/.png</div>
            </div>

            <input type="submit" name="safeProduct" value="Produkt speichern">
        </form>
    </div>
</template>

<script lang="ts">
//Bilder als Liste von Picture uebergeben, Product ohne Bilder -> wird im Backend zsmgefuegt 
//Produktinfos auslesen, store ans backend uebergeben
//auf antwort warten
//Bild (erstmal eins nach dem anderen) nach antwort(wir brauchen die neue produkt id) an POST api/product/{articleNr}/newpicture senden und picturename: String
//mitgeben: speicherort und dateiname zB. /chairs/chair9.jpg
  import {postProduct,postPictures} from '@/service/ProductStore'
  import {ref,defineComponent} from 'vue'
  export default defineComponent ({
        name:"newProduct",
   
    setup(){
        //TODO: werte werden noch nicht richtig gespeichert 
    const name = ref("");
    const roomType = ref("");
    const productType = ref("");
    const nrAvailableItems = ref(1);
    const width = ref(1);
    const height = ref(1);
    const depth = ref(1);
    const price = ref(1);
    const picturename = ref("");
    const {sendProduct} = postProduct();
    const product: Product = {'name':name.value, 'roomType':roomType.value, 'productType':productType.value, 'available':nrAvailableItems.value, 
    'width':width.value, 'height':height.value, 'depth':depth.value, 'price':price.value, 'information':'Beschreibung jo','description': 'Info', articlenr:null, allPictures:[], version:0 };

    async function sendeProd(): Promise<void>{
        console.log("Methodenaufruf yay ")
        sendProduct(product)
    }
    
    return {sendeProd,product};
    }
   });
</script>

<style scoped lang="scss">
h1{
    text-align: center;
}
form{
    margin: 5% 0% 15% 20%;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.col1{
    float: left;
    width: 25%;

}
.col2{
    float: left;
    width: 75%;

}
.row:after{
    content: "";
    display: table;
    clear: both;
}

input:focus{
    outline-color: #3BA07C;
}
input[type=text]{
  width: 30%;
  padding: 0.25em;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
}
input[type=number]{
  width: 8%;
  padding: 0.25em;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
}
input[type=image]{
    width: 20%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius: 3px;
    resize: vertical;
}
input[type=submit]{
    margin: 5% 0% 0% 0%;
    padding: 1% 5%; 
    background-color: black;
    border-style: none;
    color: #fff;
    &:hover{
        background-color: #3BA07C;
    } 
    &:focus{
        outline: none;
    } 
} 
</style>