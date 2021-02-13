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
import { defineComponent, computed, onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
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
        const router = useRouter();
        const roomQuery = ref(route.query.room);
        const productTypeQuery = ref(route.query.productType);
        const nameQuery = ref(route.query.name);
        const queryObject = {room: roomQuery, productType: productTypeQuery, name: nameQuery};
        const filter = reactive(queryObject);

        const { searchword, clearSearch } = useSearchStore();
        const { allproductslist, update, getHightPrice, getHightHeigh, getHightWidth, getHightDepth, state } = useProduct();

        /**
         * fills the list of actively shown products upon initialization
         */
        onMounted(async () => {

            router.push({
                path: "/product",
                query: {
                room: route.query.room,
                productType: route.query.productType,
                name: "none",
                },
            });
            
            queryObject.room.value = route.query.room;
            queryObject.productType.value = route.query.productType;
            queryObject.name.value = route.query.name;
            await update();
        });

        const {setFilterClose, colorlist, pricelow, pricehigh, widthlow, widthhigh, heighthigh, heightlow, depthlow, depthhigh} = useFilterStore();
        /**
         * array of colours
         */
        const colorArray = computed(()=>{
            return Array.from(colorlist.value.keys());
        })
        
        /**
         * list of shown products
         */
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
                    zwlist.value = gesamt.filter(p=> p.allTags[0] && p.allTags[0].value === colorArray.value[i]);
                    for(let x = 0; x<zwlist.value.length; x++){
                        zw.value.push(zwlist.value[x]);
                    
                    }
                    
                }
                merklist = zw.value;
            }
              if(pricehigh.value == 1000)
                merklist = merklist.filter(p => p.price >= pricelow.value && p.price <= getHightPrice());
                else
                merklist = merklist.filter(p => p.price >= pricelow.value && p.price <= pricehigh.value);
                
              if(widthhigh.value == 250)
                merklist = merklist.filter(p => p.width >= widthlow.value && p.width <= getHightWidth());
                else
                merklist = merklist.filter(p => p.width >= widthlow.value && p.width <= widthhigh.value);
                
              if(heighthigh.value == 250)
                merklist = merklist.filter(p => p.height >= heightlow.value && p.height <= getHightHeigh());
                else
                merklist = merklist.filter(p => p.height >= heightlow.value && p.height <= heighthigh.value);
                
              if(depthhigh.value == 250)
                merklist = merklist.filter(p => p.depth >= depthlow.value && p.depth <= getHightDepth());
                else
                merklist = merklist.filter(p => p.depth >= depthlow.value && p.depth <= depthhigh.value);
            
            return merklist;
        });

        /**
         * word that is currently searched for
         */
        const sw = computed(() => {
                return searchword.value;
        }); 

        /**
         * filtered list of products
         */
        const searchproductList = computed(() => {

            if (sw.value != "") {
                return productlist.value.filter(p => 
                                p.name.toLowerCase().includes(sw.value.toLowerCase()) ||
                                p.productType.toLowerCase() === (sw.value.toLowerCase()) ||
                                sw.value.toLowerCase() === (state.producttypes as any)[p.productType]?.toLowerCase() ||
                                p.roomType.toLowerCase() === (sw.value.toLowerCase()) ||
                                sw.value.toLowerCase() === (state.roomtypes as any)[p.roomType]?.toLowerCase()
                        );
            }
        });
        /**
         * opens the single product page for a given product
         * @param p chosen product
         */
        function openProduct(p: Product): void {
            //send to component above (Product)
            context.emit("open-prod", p);
        }

        /**
         * clears filters and searchinput
         */
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