<template>
  <div class="compSingle">
    <div class="top">
      <a @click="openproductlist()"> &laquo; zurück zur Übersicht</a>
    </div>
    <div class="top2">
      <div class="left">
        <div v-for="i in productObject.allPictures" :key="i">
          <img class="pic" v-bind:src="'/api/product/picture/'+i.id" alt="Picture" />
        </div>
      </div>
      <div class="right">
        <ul>
          <li>
            <h3 class="name">{{ productObject.name }}</h3>
          </li>
          <li>
            <p class="description">{{ productObject.description }}</p>
          </li>
          <li class="priceLi">
            <p class="price">{{ productObject.price }} €</p>
          </li>
          <li>
            <label>Menge:</label>
            <select
              :value="pamount"
              name="pamount"
              id="am"
              @change="amChange($event.target.value)"
            >
              <option v-for="item in pavailable" :value="[item]" :key="item.id">
                {{ item }}
              </option>
            </select>
          </li>
          <li class="buttons">
            <button class="buttoncart" @click="add()">In den Warenkorb</button>
          </li>
          <li class="success">
            <v-alert type="success" v-if="success"
              >Artikel wurde zum Warenkorb hinzugefügt
            </v-alert>
          </li>
          <li class="alert">
            <v-alert type="success" v-if="alert"
              >Artikel ist in dieser Menge nicht mehr verfügbar
            </v-alert>
          </li>
          <li class="available">
            <img
              class="icontruck"
              src="../assets/truckicon.png"
              alt="Picture"
            />
            <p class="availabletxt">verfügbar</p>
            <p class="availablepoint">&bull;</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <hr />
      <details>
        <summary>Produktinformationen</summary>
        <p class="p1">{{ productObject.information }}</p>
      </details>
      <hr />
      <details>
        <summary>Produktgröße</summary>
        <p class="p1">
          {{ productObject.width }} (Breite) x {{ productObject.depth }} (Länge) x
          {{ productObject.height }} (Höhe)
        </p>
      </details>
      <hr />
    </div>
  </div>
</template>

<script lang = "ts">
import { defineComponent, computed, ref, PropType, onMounted, reactive } from "vue";

import "@/service/Product";
import { useCartStore } from "../service/CartStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CompProducts",
  components: {},
  props: {
    productObject: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props, context) {
    const {
      addProduct,
      checkOneMoreAvailable,
      getAmount,
    } = useCartStore();
    const alert = ref(false);
    const success = ref(false);
    const amount = ref(1);
    const timer = ref();

    const router = useRouter();

    const pavailable = computed(() => {
      return props.productObject.available;
    });

    const pamount = computed(() => {
      return amount.value;
    });

    //Callback
    function openproductlist(): void {
      context.emit("open-all");
    }

    function add(): void {
      const am = ref(getAmount(props.productObject.articlenr));
      success.value = false
      if (
        !checkOneMoreAvailable(props.productObject.articlenr) ||
        props.productObject.available <= 0
      ) {
        if(timer.value){
            clearTimeout(timer.value)
            alert.value = false
            success.value = false
            timer.value = setTimeout(()=>{
              alert.value = true;
              }, 200)    
          }
        timer.value = setTimeout(()=>{
            alert.value = false;
        }, 10000) 
      } else if (am.value) {
        if (Number(am.value) + Number(amount.value) > props.productObject.available) {
          if(timer.value){
            clearTimeout(timer.value)
            alert.value = false
            success.value = false
            timer.value = setTimeout(()=>{
              alert.value = true;
              }, 200)    
          }
        timer.value = setTimeout(()=>{
            alert.value = false;
        }, 10000);
        } else {
          if(timer.value){
            clearTimeout(timer.value)
            success.value = false
            alert.value = false
            timer.value = setTimeout(()=>{
              success.value = true;
              }, 200)    
          }
        timer.value = setTimeout(()=>{
            success.value = false;
        }, 10000)    
          addProduct(props.productObject.articlenr, amount.value);
        }
      } else {
        if(timer.value){
          clearTimeout(timer.value)
          success.value = false;
        }
        success.value = true;
        timer.value = setTimeout(()=>{
            success.value = false;
        }, 10000)        
        addProduct(props.productObject.articlenr, amount.value);
      }
      amount.value = 1;
    }
    function amChange(am: number): void {
      amount.value = am;
    }

    onMounted(async () => {
      router.push({
        path: "/product",
        query: {
          room: props.productObject.roomType,
          productType: props.productObject.productType,
          name: props.productObject.name,
        },
      });

      //when back button in browser is pressed
      window.onpopstate = function (event: any) {
        openproductlist();
      };
    });

    const COLORS = ["red", "#FFBF00", "green"];

    return {
      alert,
      success,
      pamount,
      pavailable,
      amChange,
      add,
      openproductlist,
      color: computed(() => {
        if (props.productObject.available <= 0) {
          return COLORS[0];
        } else if (props.productObject.available < 20) {
          return COLORS[1];
        } else {
          return COLORS[2];
        }
      }),
    };
  },
});
</script>

<style lang="scss" scoped>

.availablepoint {
  float: left;
  font-size: 2.5em;
  margin: 6px 10px;
  width: 5%;
  color: v-bind("color");
}

.pic {
  width: 250px;
  height: 300px;
  object-fit: cover;
  object-position: bottom center;
  margin: 0.5em;
  float: left;
}

.top {
  margin: 1em 1em 0em 3em;
}

.top2 {
  height: 400px;
}

.left {
  width: 40%;
  height: 75%;
  margin: 1em 3em 3em 3em;
  float: left;
}

.right {
  margin: 1em 0em;
  float: left;
  width: 40%;
  height: 75%;
}

.bottom {
  width: 95%;
  position: relative;
  height: 350px;
  margin-top: 350px;
  margin-left: 3.5em;
}

hr {
  width: 95%;
  height: 0.15em;
  background-color: $color-grey;
  color: $color-grey;
}

summary {
  list-style: none;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 1.3em;
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "+";
  position: absolute;
  right: 1em;
  color: $color-green;
  margin-right: 4em;
  transition: all 0.5s;
}
details[open] summary::after {
  content: "-";
  color: $color-green;
  margin-right: 4em;
}

.p1 {
  padding-top: 1em;
}

.p1 {
  padding-top: 1em;
}

.back {
  text-decoration: none;
  color: black;
}

.back:hover {
  color: $color-green;
}

ul {
  list-style: none;
}

.price {
  font-size: 1.5em;
}
.priceLi {
  float: right;
}
.alert {
  color: red;
  margin-bottom: 3%;
  margin-top: 3%;
}
.success {
  color: $color-green;
  margin-bottom: 3%;
  margin-top: 3%;
}
.buttoncart {
  margin: 60px 0px 0px 0px;
  padding: 3% 9%;
}
.icontruck {
  width: 25px;
  margin: 10px 10px 15px 10px;
  float: left;
}
.availabletxt {
  float: left;
  margin-bottom: 0px;
  margin-top: 18px;
}
#am {
  margin-left: 10px;
}
</style>