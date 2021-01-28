<template>
    <div class="compProduct">
        <div class="columns" id="sidebarBox">
            <Sidebar @click="closeFilter()"/>
        </div>
        <div class="productFilter">
            <ProductFilter />
        </div>
        <div id="productList">
            <ul>          
                <ProductListObject id="listOrder" :product="pr" v-for="pr in productlist" :key="pr.id" @open-prod="openProduct($event)"/>
            </ul>
            <h4 id>{{messageEmpty}}</h4>
        </div>
        
    </div>
</template>

<script lang = "ts">

import Sidebar from "../components/Sidebar.vue"
import ProductFilter from "../components/ProductFilter.vue"
import ProductListObject from "../components/ProductListObject.vue"
import { useProduct } from "../service/ProductStore";
import { useFilterStore } from "../service/FilterStore";
import { useSearchStore } from "../service/SearchStore"
import { useLanguage } from "../service/Language";
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { useRoute } from "vue-router";
import '../service/Product'

export default defineComponent({
    name: "CompProducts",
    components:{
        ProductListObject,
        Sidebar,
        ProductFilter
    }, props: {
        product: Object,
    },
    setup(props, context){
        
        const route = useRoute();
        const roomQuery = ref(route.query.room);
        const productTypeQuery = ref(route.query.productType);
        const nameQuery = ref(route.query.name);
        const queryObject = {room: roomQuery, productType: productTypeQuery, name: nameQuery};
        const filter = reactive(queryObject);

        const { searchword, clearSearch } = useSearchStore();
        const { allproductslist, update } = useProduct();
        const { germanTranslation } = useLanguage();

        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
        queryObject.room.value = route.query.room;
        queryObject.productType.value = route.query.productType;
        queryObject.name.value = "none";
        await update();
        });

        const {setFilterClose, colorlist, getLowestPrice, getHighestPrice, getWidthLow, getWidthHigh, getHeightLow, getHeightHigh, getDepthLow, getDepthHigh} = useFilterStore();

        const lowestPrice = computed(() => {
            return getLowestPrice();
        })
        const highestPrice = computed(() => {
             return getHighestPrice();
        })
        const widthlow = computed(() => {
             return getWidthLow();
        })
        const widthhigh = computed(() => {
             return getWidthHigh();
        })
        const heightlow = computed(() => {
             return getHeightLow();
        })
        const heighthigh = computed(() => {
             return getHeightHigh();
        })
        const depthlow = computed(() => {
             return getDepthLow();
        })
        const depthhigh = computed(() => {
             return getDepthHigh();
        })
        const colorArray = computed(()=>{
            return Array.from(colorlist.value.keys());

        })
        // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
        onMounted(async () => {
            queryObject.room.value = route.query.room;
            queryObject.productType.value = route.query.productType;
            queryObject.name.value = "none";
            await update();
        });
        
        const productlist = computed(() => {

            queryObject.room.value = route.query.room;
            queryObject.productType.value = route.query.productType;
            queryObject.name.value = route.query.name;

            let merklist = allproductslist.value; 
            
            if (filter.room === "all" && filter.productType === "all" ) {
                merklist = allproductslist.value;
            }
             else if (filter.room !== "all" && filter.productType === "all") {
                 merklist =  merklist.filter(p => p.roomType === filter.room?.toString());
            }
            else if (filter.room === "all" && filter.productType !== "all") {
                merklist = merklist.filter(p => p.productType === filter.productType?.toString());
            }
           else{
                queryObject.room.value = route.query.room;
                queryObject.productType.value = route.query.productType;
                merklist =  merklist.filter(p => p.productType === filter.productType?.toString() && p.roomType === filter.room?.toString());
            }

            //Filteroptions
            if(colorArray.value.length != 0){
                const gesamt = merklist;
                const zwlist = ref(merklist);
                const zw = ref(Array<Product>());
                for(let i = 0; i< colorArray.value.length; i++){
                    zwlist.value = gesamt.filter(p=> p.allTags[0].value === colorArray.value[i]);
                    for(let x = 0; x<zwlist.value.length; x++){
                        zw.value.push(zwlist.value[x]);
                    
                    }
                    
                }
                merklist = zw.value;
            }
            if(lowestPrice.value != 1000 && highestPrice.value != 0){
                 merklist = merklist.filter(p => p.price >= lowestPrice.value && p.price <= highestPrice.value);
            }
            if(widthlow.value != 1000 && widthhigh.value != 0){
                 merklist = merklist.filter(p => p.width >= widthlow.value && p.width <= widthhigh.value);
            }
            if(heightlow.value != 1000 && heighthigh.value != 0){
                 merklist = merklist.filter(p => p.height >= heightlow.value && p.height <= heighthigh.value);
            }
            if(depthlow.value != 1000 && depthhigh.value != 0){
                 merklist = merklist.filter(p => p.depth >= depthlow.value && p.depth <= depthhigh.value);
            }
            
            return merklist;
        });

        const sw = computed(() => {
                return searchword.value;
        }); 

        const searchproductList = computed(() => {
            if (sw.value != "") {
                return productlist.value.filter(p => 
                                p.name.toLowerCase().includes(sw.value.toLowerCase()) ||
                                p.productType.toLowerCase() === (sw.value.toLowerCase()) ||
                                germanTranslation.value.get(sw.value.toLowerCase())?.toLowerCase() === (p.productType.toLowerCase()) ||
                                p.roomType.toLowerCase() === (sw.value.toLowerCase()) ||
                                germanTranslation.value.get(sw.value.toLowerCase())?.toLowerCase() === (p.roomType.toLowerCase())
                        );
            }
        });

        function openProduct(p: Product): void {
            //send to component above (Product)
            context.emit("open-prod", p);
        }

        //delete filters and searchinputs
        function closeFilter(){
            setFilterClose(true);
            clearSearch();
        }
        
        return{
            productlist: computed(() => {
                if (sw.value == "") {
                    return productlist.value;
                } else {
                    return searchproductList.value;
                }
            }), 
            // productlist,
            openProduct,
            closeFilter, 
            searchproductList,
            messageEmpty: computed(() => {
                
                if (sw.value == "") {
                    return (productlist.value.length == 0) ? "Für diese Anfrage sind leider keine Artikel vorhanden." : "";
                } else {
                    return (searchproductList.value?.length == 0) ? "Für diese Anfrage sind leider keine Artikel vorhanden: " + sw.value: "";
                }
                
            }),

        };
    } 
    
});
</script>

 <style scoped lang="scss">
    #listOrder{
        display: inline;
        float: left;
        margin-bottom: 20px;
    } 

    #productList{
        float: left;
        max-width: 83%;
        margin-left: 15%;
    } 

    h4{
        padding: 1em 0em 0em 7.7em;
        text-align: center;
    }
</style>