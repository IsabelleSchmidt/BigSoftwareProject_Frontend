<template>
    <div class="newProduct">
     
        <h1>Neues Produkt anlegen</h1>

        <form  @submit.prevent="sendeProd()">
            <div class="row">
                <div class="col1"><label for="name">Produktname</label></div>
                <div class="col2"><input type="text" id="name" v-model="name" placeholder="Produktname" name="name" size="30" maxlength="50"><div class="error" v-if="nameerror.length>0"> {{nameerror}} </div></div>
            </div>
                  
            <div class="row">
                <div class="col1"><label for="productType">Produktart</label></div>
                <div class="col2"><select v-model="productType" id="productType" name="productType" placeholder="Produktart">
                                    <option value="Plant">Pflanze</option>
                                    <option value="Table">Tisch</option>
                                    <option value="Chair">Stuhl</option>
                                    <option value="Bed">Bett</option>
                                    <option value="Decoration">Dekoration</option>
                                    <option value="Closet">Schrank/Kommode</option>
                                    <option value="Couch">Sofa/Couch</option>
                                </select>
                    <div class="error" v-if="producterror.length>0"> {{producterror}} </div></div>
            </div>
            
            <div class="row">
                <div class="col1"><label for="roomType" >Raumart</label></div>
                <div class="col2"><select type="text" v-model="roomType" id="roomType" placeholder="Raumart">
                                    <option value="Bathroom">Bad</option>
                                    <option value="Bedroom">Schlafzimmer</option>
                                    <option value="Kitchen">Küche</option>
                                    <option value="Livingroom">Wohnzimmer</option>
                                    <option value="Eatingroom">Esszimmer</option>
                                    <option value="Bureau">Arbeitszimmer</option>
                                    <option value="null">kein passender Raum</option>
                                </select>
                    <div class="error" v-if="roomerror.length>0">{{roomType}} {{roomerror}} </div></div>
            </div>

            <div class="row">
                <div class="col1"><label for="information" >Information</label></div>
                <div class="col2"><input type="text" v-model="information" id="information" placeholder="Information" name="information" size="30" maxlength="50"><div class="error" v-if="infoerror.length>0"> {{infoerror}} </div></div>
            </div>
            
            <div class="row">
                <div class="col1"><label for="description" >Beschreibung</label></div>
                <div class="col2"><input type="text" v-model="description" id="description" placeholder="Beschreibung" name="description" size="30" maxlength="50"><div class="error" v-if="descriptionerror.length>0"> {{descriptionerror}} </div></div>
            </div>

        
            <div class="row">
                <div class="col1"><label for="price">Preis</label></div>
                <div class="col2"><input type="number" v-model="price" id="price" placeholder="Preis" name="price" min="0.00" step="0.01"><div class="error" v-if="priceerror.length>0"> {{priceerror}} </div></div>
            </div>

            <div class="row">
                <div class="col1"><label for="dimensions">Maße in cm</label><label id="klein">Breite x Höhe x Tiefe</label></div>
                <div class="col2"><input type="number" v-model="width" id = "width" name="width" min="0.00" step="0.01"> x <input v-model="height" id="height" type="number" name="height" min="0.00" step="0.01"> x <input v-model="depth" id="depth" type="number" name="depth" min="0.00" step="0.01"><div class="error" v-if="sizeerror.length>0"> {{sizeerror}} </div></div>
            </div>

            <div class="row">
                <div class="col1"><label for="nrAvailableItems" >Stückzahl</label></div>
                <div class="col2"><input type="number" id="available" v-model="nrAvailableItems" name="nrAvailableItems" min="0" step="1" ></div>
            </div>

            <div class="row">
                <div class="col1"><label for="picture">Bild und Name</label></div>
                <div class="col2"><input ref="fileInput" class="file-input" type="file" name="picture" multiple accept="image/*" @change="onFileChange($event.target.files)"></div>
                <div class="col2"><p v-for="(file,i) in filesref" :key="file.name">{{file.name}} <img src="@/assets/trash.png" id="trash" alt="trash" @click="deleteFile(i)"></p></div>
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
  import {postProduct,postPictures,articlenr} from '../service/ProductStore'
  import '../service/Picture'
  import {ref,defineComponent} from 'vue'
  import Swal from "sweetalert2"
  import router from "../router"
  import '../service/Validationerror'
  export default defineComponent ({
        name:"newProduct",
   
    setup(){
        const files = Array<File>();
        const filesref= ref(files);
        const {sendPicture} = postPictures();
        const formData = new FormData;
        let lang = 0;

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
        const {sendProduct, validationerrors} = postProduct();
        let click = "";
        
        const nameerror = ref("");
        const producterror = ref("");
        const roomerror = ref("");
        const infoerror = ref("");
        const descriptionerror = ref("");
        const priceerror = ref("");
        const sizeerror = ref("");
        
        const product: Product = {'name':name.value, 'roomType':roomType.value, 'productType':productType.value, 'nrAvailableItems':nrAvailableItems.value, 
        'width':width.value, 'height':height.value, 'depth':depth.value, 'price':price.value, 'information':information.value ,'description': description.value, articlenr:null, allPictures:[], version:0 };

        async function sendeProd(): Promise<void>{
            console.log("Naaame",name.value);
            product.name = name.value;
            product.productType = productType.value;
            product.roomType = roomType.value;
            product.price = price.value;
            product.information = information.value;
            product.description = description.value;
            product.width = width.value;
            product.height = height.value;
            product.depth = depth.value;
            product.nrAvailableItems = nrAvailableItems.value;
            console.log('ProduuuukT:',product);
            click = "geclicked"
            // producterror.value = "";
            // priceerror.value = "";
            // roomerror.value = "";
            // nameerror.value = "";
            // infoerror.value = "";
            // descriptionerror.value = "";

            await sendProduct(product);
                
                // Validation Messages
                if(validationerrors.value.length > 0){
                    for(const error of validationerrors.value){
                        if(error.field == "price"){
                            priceerror.value = error.message;
                        }
                        if(error.field == "roomType"){
                            roomerror.value = error.message;
                        }
                        if(error.field == "productType"){
                            producterror.value = error.message;
                        }
                        if(error.field == "name"){
                            nameerror.value = error.message;
                        }
                        if(error.field == "information"){
                            infoerror.value = error.message;
                        }
                        if(error.field == "description"){
                            descriptionerror.value = error.message;
                        }
                        if(error.field == "width"||error.field=="height"||error.field=="depth"){
                            sizeerror.value = error.message;
                        }
                    
                    }
                }else{
                    console.log("ohne errors")
                    producterror.value = "";
                    priceerror.value = "";
                    roomerror.value = "";
                    nameerror.value = "";
                    infoerror.value = "";
                    descriptionerror.value = "";

                    console.log("File",formData.get('pictures'))
                    for(let i = 0; i < filesref.value.length; i++){
                        // const filename = name.value + i + '.' +filesref.value[i].type.substring(6,filesref.value[i].type.length)
                        // console.log(filename);
                        formData.append("picture",filesref.value[i],filesref.value[i].name);
                        console.log("File",formData.get('picture'))
                    }

                    console.log("articlnr im newProd",articlenr);

                    if(sendPicture(formData,articlenr)){
                        // Pop UP
                        Swal.fire({
                            title: 'neues Produkt angelegt!',
                            text: 'weiteres Produkt anlegen...',
                            icon: 'success',
                            confirmButtonText: 'weiter',
                            confirmButtonColor: '#3BA07C',
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    // router.push("/newProducts")
                                    location.reload();
                                }
                        })
                    }
                    
                }      
        }

        function onFileChange(files: File[]): void{
            if(filesref.value.length == 0){
                for(let i = 0; i <files.length; i++){
                    filesref.value[i] = files[i];
                }
                lang = filesref.value.length;
            }else{
                let k = 0
                for(let j = lang; j < lang+files.length; j++){
                    filesref.value[j] = files[k];
                    k++;
                }
                lang = filesref.value.length;
            }  
            console.log("Bild",filesref.value);
        }

        function deleteFile(index: number): void{
            filesref.value.splice(index,1);
            console.log(filesref.value);
        }

        return {click,deleteFile,sizeerror,nameerror,producterror,roomerror,infoerror,descriptionerror,priceerror,sendPicture,validationerrors,sendeProd,product,name,roomType,productType,information,description,nrAvailableItems,width,height,depth,price,picturename,onFileChange,filesref};
        }
   });
</script>

<style scoped lang="scss">
.error{
    font-size: 10px;
    color: red;
}

#inputerror{

    border-color: red;
    border-width: 2px;
   

}

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
select{
    border: 1px solid #ccc;
    resize: vertical; 
    padding: 0.25em;
    border-radius: 3px;
    width: 31%;
}
input{
    border: 1px solid #ccc;
    resize: vertical; 
    padding: 0.25em;
    border-radius: 3px;
}
input:focus{
    outline-color: #3BA07C;
}
input[type=text]{
  width: 30%;
}
input[type=number]{
  width: 8%; 
}
input[type=file]{
    width: 30%;
    cursor: pointer;
    border: none;
    color: transparent;
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
#trash{
    height: 13px;
}
p{
    font-size: 12px;
}
</style>