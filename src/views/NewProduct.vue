<template>
    <div class="newProduct">
        <h1>Neues Produkt anlegen</h1>

        <form  @submit.prevent="sendeProd()">
            <div class="row">
                <div class="col1"><label for="name">Produktname</label></div>
                <div class="col2"><input type="text" v-model="name" placeholder="Produktname" name="name" size="30" maxlength="50" ></div>
            </div>
                  
            <div class="row">
                <div class="col1"><label for="productType">Produktart</label></div>
                <div class="col2"><input type ="text" v-model="productType" placeholder="Produktart" name="productType" size="30" maxlength="50"></div>
            </div>
            
            <div class="row">
                <div class="col1"><label for="roomType" >Raumart</label></div>
                <div class="col2"><input type="text" v-model="roomType" placeholder="Raumart" name="roomType" size="30" maxlength="50"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="information" >Information</label></div>
                <div class="col2"><input type="text" v-model="information" placeholder="Information" name="information" size="30" maxlength="50"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="description" >Beschreibung</label></div>
                <div class="col2"><input type="text" v-model="description" placeholder="Beschreibung" name="description" size="30" maxlength="50"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="price" >Preis</label></div>
                <div class="col2"><input type="number" v-model="price" placeholder="Preis" name="price" min="0.00" step="0.01"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="dimensions">Maße in cm</label><label id="klein">Breite x Höhe x Tiefe</label></div>
                <div class="col2"><input type="number" v-model="width" name="width" min="0.00" step="0.01"> x <input v-model="height" type="number" name="height" min="0.00" step="0.01"> x <input v-model="depth" type="number" name="depth" min="0.00" step="0.01"></div>
            </div>

            <div class="row">
                <div class="col1"><label for="nrAvailableItems" >Stückzahl</label></div>
                <div class="col2"><input type="number" v-model="nrAvailableItems" name="nrAvailableItems" min="0" step="1" ></div>
            </div>

            <div class="row">
                <div class="col1"><label for="picture">Bild und Name</label></div>
                <div class="col2"><input  type="file" name="picture" multiple accept="image/*"></div>
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
  import {postProduct,postPictures} from '../service/ProductStore'
  import {ref,defineComponent} from 'vue'
  export default defineComponent ({
        name:"newProduct",
   
    setup(){
        //TODO: werte werden noch nicht richtig gespeichert 
    const name = ref("");
    const roomType = ref("");
    const productType = ref("");
    const information = ref("");
    const description = ref("");
    const nrAvailableItems = ref(0);
    const width = ref(0);
    const height = ref(0);
    const depth = ref(0);
    const price = ref(0);
    const picturename = ref("");
    const {sendProduct} = postProduct();
    const product: Product = {'name':name.value, 'roomType':roomType.value, 'productType':productType.value, 'available':nrAvailableItems.value, 
    'width':width.value, 'height':height.value, 'depth':depth.value, 'price':price.value, 'information':information.value ,'description': description.value, articlenr:null, allPictures:[], version:0 };

    async function sendeProd(): Promise<void>{
        console.log("Naaame",name.value);
        product.name = name.value;
        product.productType = productType.value;
        product.roomType = roomType.value;
        product.price = price.value;
        product.information = information.value;
        product.description = description.value;
        console.log('ProduuuukT:',product);
        console.log("Methodenaufruf yay ")
        sendProduct(product)
    }
    
    return {sendeProd,product,name,roomType,productType,information,description,nrAvailableItems,width,height,depth,price,picturename};
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
#klein{
    font-size: 9px;
    color: #3BA07C;
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