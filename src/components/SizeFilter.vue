<template>
    <div class= "sizefilter">

        <div class="width">
            <h3>Breite</h3>
            <vue-slider class="sizeSlider" :max="sizemax" v-model="width" @drag-end="changeWidth(width)" @click="changeWidth(width)"/>
            <label class="sizeZero"> 0 </label>
            <label class="sizethausend">250+</label>  
        </div>
        <div class="height">
            <h3>Höhe</h3>
            <vue-slider class="sizeSlider" :max="sizemax" v-model="height" @drag-end="changeHeight(height)" @click="changeHeight(height)"/>
            <label class="sizeZero"> 0 </label>
            <label class="sizethausend">250+</label>
        </div>
        <div class="depth">
            <h3>Tiefe</h3>
            <vue-slider class="sizeSlider" :max="sizemax" v-model="depth" @drag-end="changeDepth(depth)" @click="changeDepth(depth)"/>
            <label class="sizeZero"> 0 </label>
            <label class="sizethausend">250+</label>
        </div>
    </div>
</template>
<script lang = "ts">
import {defineComponent, ref} from 'vue';
import {useFilterStore} from '../service/FilterStore'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'


export default defineComponent({
      name: "SizeFilter",
      components:{
        VueSlider
    },
    
    setup(){
        const {widthlow, widthhigh, setWidthHigh, setWidthLow} = useFilterStore();       
        const {heightlow, heighthigh, setHeightLow, setHeightHigh} = useFilterStore();
        const {depthlow, depthhigh, setDepthLow, setDepthHigh} = useFilterStore();

        const sizemax = 250;

        const width = ref(Array<number>())
        width.value = [setWidthLow(widthlow.value), setWidthHigh(widthhigh.value)]
        
        /**
         * Sets the new highest and lowest width 
         */
        function changeWidth(w: Array<number>){
            width.value = [setWidthLow(w[0]), setWidthHigh(w[1])]
        }
        /**
         * sets the new heighest and lowest height
         */
        const height = ref(Array<number>())
        height.value = [setHeightLow(heightlow.value), setHeightHigh(heighthigh.value)]
        
        /**
         * sets the new height filter value
         */
        function changeHeight(h: Array<number>){
            height.value = [setHeightLow(h[0]), setHeightHigh(h[1])]
        }
        /**
         * sets the new depth filter value
         */
        const depth = ref(Array<number>())
        depth.value = [setDepthLow(depthlow.value), setDepthHigh(depthhigh.value)]
        
        /**
         * sets the new depth filter value
         */
        function changeDepth(d: Array<number>){
            depth.value = [setDepthLow(d[0]), setDepthHigh(d[1])]
        }
        return{
            sizemax,
            width,
            changeWidth,
            height,
            changeHeight,
            depth,
            changeDepth,
        }
    }
    
});
</script>
<style scoped lang="scss">
.vue-slider{
    width: 200px !important;
}
.sizethausend{
    float: right;
}
.sizefilter{
    margin-top: .5%;
}
.width{
    width: 200px;
    float: left;
    margin-bottom: 3%;
    margin-right: 1.75em; 
}
.height{
    width: 200px;
    float: left;
    margin-bottom: 3%;
    margin-right: 1.75em;
}
.depth{
    width: 200px;
    float: left;
    margin-bottom: 3%;
}
span{
    float: left; 
    width: 95px;
    font-size: 0.95em;
}
input{
    margin-left: 20px;
}
</style>
