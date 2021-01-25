<template>
    <div class= "sizefilter">

        <div class="width">
            <h2>Breite</h2>
            <label>
                <span>0 - 50cm </span>
                <div>
                    <input type="checkbox" value="w%0%50" v-model="width05" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>50 - 100cm </span>
                <div>
                    <input type="checkbox" value="w%50%100" v-model="width51" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>100 - 150cm </span>
                <div>
                    <input type="checkbox" value="w%100%150" v-model="width115" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>150 - 200cm </span>
                <div>
                    <input type="checkbox" value="w%150%200" v-model="width152" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>200 - 250cm </span>
                <div>
                    <input type="checkbox" value="w%200%250" v-model="width225" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>250cm + </span>
                <div>
                    <input type="checkbox" value="w%250%+" v-model="width25" @change="checked($event.target.value)"/>
                </div>
            </label>   
        </div>
        <div class="height">
            <h2>Höhe</h2>
            <label>
                <span>0 - 50cm </span>
                <div>
                    <input type="checkbox" value="h%0%50" v-model="height05" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>50 - 100cm </span>
                <div>
                    <input type="checkbox" value="h%50%100" v-model="height51" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>100 - 150cm </span>
                <div>
                    <input type="checkbox" value="h%100%150" v-model="height115" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>150 - 200cm </span>
                <div>
                    <input type="checkbox" value="h%150%200" v-model="height152" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>200 - 250cm </span>
                <div>
                    <input type="checkbox" value="h%200%250" v-model="height225" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>250cm + </span>
                <div>
                    <input type="checkbox" value="h%250%+" v-model="height25" @change="checked($event.target.value)"/>
                </div>
            </label>   
        </div>
        <div class="depth">
            <h2>Tiefe</h2>
            <label>
                <span>0 - 50cm </span>
                <div>
                    <input type="checkbox" value="d%0%50" v-model="depth05" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>50 - 100cm </span>
                <div>
                    <input type="checkbox" value="d%50%100" v-model="depth51" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>100 - 150cm </span>
                <div>
                    <input type="checkbox" value="d%100%150" v-model="depth115" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>150 - 200cm </span>
                <div>
                    <input type="checkbox" value="d%150%200" v-model="depth152" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>200 - 250cm </span>
                <div>
                    <input type="checkbox" value="d%200%250" v-model="depth225" @change="checked($event.target.value)"/>
                </div>
            </label>
            <label>
                <span>250cm + </span>
                <div>
                    <input type="checkbox" value="d%250%+" v-model="depth25" @change="checked($event.target.value)"/>
                </div>
            </label>   
        </div>
    </div>
</template>
<script lang = "ts">
import { onMounted, defineComponent, ref} from 'vue';
import {useFilterStore} from '../service/FilterStore'

export default defineComponent({
      name: "SizeFilter",
    
    setup(){
        const {widthlist, heightlist, depthlist, addSizeFilter, deleteSizeFilter} = useFilterStore();

        const width05 = ref();
        const width51 = ref();
        const width115 = ref();
        const width152 = ref();
        const width225 = ref();
        const width25 = ref();

        
        const height05 = ref();
        const height51 = ref();
        const height115 = ref();
        const height152 = ref();
        const height225 = ref();
        const height25 = ref();
        
        const depth05 = ref();
        const depth51 = ref();
        const depth115 = ref();
        const depth152 = ref();
        const depth225 = ref();
        const depth25 = ref();

        const w = 'w'; 
        const h = 'h';
        const d = 'd';


        function checked(size: string): void{
            const x = size.split('%');

            if(x[0] == w){
                 if(widthlist.value.has(size)){
                    deleteSizeFilter(size, w)
                }else{
                    addSizeFilter(size, w)
                }
            }
            if(x[0] == h){
                 if(heightlist.value.has(size)){
                    deleteSizeFilter(size, h)
                }else{
                    addSizeFilter(size, h)
                }
            }
            if(x[0] == d){
                 if(depthlist.value.has(size)){
                    deleteSizeFilter(size, d)
                }else{
                    addSizeFilter(size, d)
                }
            }
                                    
               
        }
        onMounted(async()=> {
            for(let i = 0; i< widthlist.value.size; i++){
                const key = Array.from(widthlist.value.keys())[i];
               if(key  == 'w%0%50'){
                   width05.value = true; 
               }
               if(key  == 'w%50%100'){
                   width51.value = true; 
               }
               if(key  == 'w%100%150'){
                   width115.value = true; 
               }
               if(key  == 'w%150%200'){
                   width152.value = true; 
               }
               if(key  == 'w%200%250'){
                   width225.value = true; 
               }
               if(key  == 'w%250%+'){
                   width25.value = true; 
               }
            }
            for(let i = 0; i< heightlist.value.size; i++){
                const key = Array.from(heightlist.value.keys())[i];
               if(key  == 'h%0%50'){
                   height05.value = true; 
               }
               if(key  == 'h%50%100'){
                   height51.value = true; 
               }
               if(key  == 'h%100%150'){
                   height115.value = true; 
               }
               if(key  == 'h%150%200'){
                   height152.value = true; 
               }
               if(key  == 'h%200%250'){
                   height225.value = true; 
               }
               if(key  == 'h%250%+'){
                   height25.value = true; 
               }
            }

            for(let i = 0; i< depthlist.value.size; i++){
                const key = Array.from(depthlist.value.keys())[i];
               if(key  == 'd%0%50'){
                   depth05.value = true; 
               }
               if(key  == 'd%50%100'){
                   depth51.value = true; 
               }
               if(key  == 'd%100%150'){
                   depth115.value = true; 
               }
               if(key  == 'd%150%200'){
                   depth152.value = true; 
               }
               if(key  == 'd%200%250'){
                   depth225.value = true; 
               }
               if(key  == 'd%250%+'){
                   depth25.value = true; 
               }
            }
                    
            
        });
        

     
        return{
            width05,
            width51,
            width115,
            width152,
            width225,
            width25,
            height05,
            height51,
            height115,
            height152,
            height225,
            height25,
            depth05,
            depth51,
            depth115,
            depth152,
            depth225,
            depth25,
            checked  
        }
    }
    
});
</script>
<style lang="scss">
.width{
    width: 200px;
    float: left;
    margin: 30px; 
}
.height{
    width: 200px;
    float: left;
    margin: 30px; 
}
.depth{
    width: 200px;
    float: left;
    margin: 30px; 
}
span{
    float: left; 
}
input{
    margin-left: 20px;
}
</style>
