<template>
    <div class= "pricefilter">
        <ul class="ulFilter">
            <li><span>Ich bin PriceFilter</span></li>

        </ul>
        <label>
            <span>0,00 - 200,00€</span>
            <div>
                <input type="checkbox" :value="pr02" v-model="price02" @change="checked($event.target.value)"/>
            </div>
        </label>
        <label>
            <span>200,00 - 400,00€</span>
            <div>
                <input type="checkbox" :value="pr24" v-model="price24" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>400,00 - 600,00€</span>
            <div>
                <input type="checkbox" :value="pr46" v-model="price46" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>600,00 - 800,00€</span>
            <div>
                <input type="checkbox" :value="pr68" v-model="price68" @change="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>800,00+ €</span>
            <div>
                <input type="checkbox" :value="pr8" v-model="price8" @change="checked($event.target.value)" />
            </div>
        </label>
    </div>
</template>
<script lang = "ts">
import { defineComponent, computed, ref, reactive, onMounted} from 'vue';
import { useRouter , useRoute} from 'vue-router';

export default defineComponent({
    name: "PriceFilter",
    components:{
    },
    setup(context){

        const state = reactive({
            list: new Map<string, boolean>(),
         })
        const router = useRouter(); 
        const route = useRoute();

        const price02 = ref();
        const price24 = ref();
        const price46 = ref();
        const price68 = ref();
        const price8 = ref();

        const pr02 = computed(() =>{
            console.log("Jetzt11" + price02.value)
            return state.list.set("0%200", price02.value)
        })
        const pr24 = computed(() =>{
            console.log("Jetzt2" + price24.value)
            return state.list.set("200%400", price24.value);
        })
        const pr46 = computed(() =>{
            console.log("Jetzt3" + price46.value)
            return state.list.set("400%600", price46.value);
        })
        const pr68 = computed(() =>{
            console.log("Jetzt4" + price68.value)
            return state.list.set("600%800", price68.value);
        })
        const pr8 = computed(() =>{
            console.log("Jetzt5" + price8.value)
            return state.list.set("800%+", price8.value);
        })

        const priceList = computed(()=> {
            return state.list
        })

        //Abfragwe wenn andere Filter gesetzt fehlt hier und in checked
        onMounted(async () => {
          //  console.log("bin hier")
            if(route.query.filters != 'none'){
                const x = route.query.filters?.toString().split("%")
                if(x){
                    let y = 1;
                        for(let z = 0; z< x.length; z++){
                            const v = x[y]+ "%" + x[y+1];
                                for(let i = 0; i < state.list.size; i++){
                                    if(Array.from(state.list.keys())[i] == v){
                                     //   console.log("Hier too")
                                        if(i == 0)
                                            price02.value = true;
                                        if(i == 1)
                                            price24.value = true;
                                        if(i == 2)
                                            price46.value = true;
                                        if(i == 3)
                                            price68.value = true;
                                        if(i == 4)
                                            price8.value = true;
                                    }
                                }
                        y +=2;
                        console.log("y" + y)
                        }
                }
            }

        });


        console.log("Liste vorher " + JSON.stringify(Array.from(priceList.value)));
        


        function checked(p: string): void{
            let priceString = "price";
            let yes = false;
           // console.log("ich bin checked "+ JSON.stringify(p));
           // console.log("Liste danach" + JSON.stringify(Array.from(priceList.value)));
            //noch machen: wenn price 1x gesett dann wieder nicht price nicht in router
           for(let i = 0; i< state.list.size; i++){
                if(Array.from(state.list.values())[i]){
                    yes = true;
                    priceString += "%"
                    priceString += Array.from(state.list.keys())[i];
                }
            }
            if(yes){
                router.push({ path: '/product', query: { room: 'alle', producttype: 'Pflanze', name: 'none', filters: priceString}})
            }else{
                router.push({ path: '/product', query: { room: 'alle', producttype: 'Pflanze', name: 'none', filters: 'none'}})
            }
            //console.log("String: " + priceString )
            

        }

        return{
            price02,
            price24,
            price46,
            price68,
            price8,
            checked,
            pr02,
            pr24,
            pr46,
            pr68,
            pr8,
            priceList
            
        }
    }

});
</script>
<style lang="scss">
</style>