<template>
    <div class= "pricefilter">
        <ul class="ulFilter">
            <li><span>Ich bin PriceFilter</span></li>

        </ul>
        <label>
            <span>0,00 - 200,00€</span>
            <div>
                <input type="checkbox" value="PRICE02" v-model="price02" @change="checked($event.target.value)" @click="$router.push({ path: '/product', query: { room: 'alle', producttype: 'Pflanze'  }})"/>
            </div>
        </label>
        <label>
            <span>200,00 - 400,00€</span>
            <div>
                <input type="checkbox" value="PRICE24" v-model="price24" @click="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>400,00 - 600,00€</span>
            <div>
                <input type="checkbox" value="PRICE46" v-model="price46" @click="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>600,00 - 800,00€</span>
            <div>
                <input type="checkbox" value="PRICE68" v-model="price68" @click="checked($event.target.value)" />
            </div>
        </label>
        <label>
            <span>800,00+ €</span>
            <div>
                <input type="checkbox" value="PRICE8" v-model="price8" @click="checked($event.target.value)" />
            </div>
        </label>
    </div>
</template>
<script lang = "ts">
import { defineComponent, computed, ref, reactive} from 'vue';

export default defineComponent({
    name: "PriceFilter",
    components:{
    },
    setup(context){

        const price02 = ref(false);
        const price24 = ref(false);
        const price46 = ref(false);
        const price68 = ref(false);
        const price8 = ref(false);

        function checked(p: string): void{
            console.log("ich bin checked "+ p);


        }

        return{
            price02,
            price24,
            price46,
            price68,
            price8,
            checked,
        }
    }

});
</script>
<style lang="scss">
</style>