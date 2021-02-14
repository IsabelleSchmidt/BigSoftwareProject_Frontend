
<template>
  <div class="orderForm">
    <h1>Bestellübersicht</h1>
    <form>
      <div class="adress">
        <h2>Versandadresse</h2>
        <div v-if="!isHidden">
          <label class="col1">Adresse auswählen: </label>
          <select v-model="selectedadr"
            name="adress"
            @change="adrChange($event.target.value)"
            
          >
            <option
              
              v-for="item in adresses"
              :value="[
                item.streetName,
                item.houseNumber,
                item.postCode,
                item.city,
              ]"
              :key="item.id"
            >
              {{ item.streetName }} {{ item.houseNumber }}, {{ item.postCode }}
              {{ item.city }}
            </option>
          </select>
        </div>
        <div class="row">
          <label for="street" class="col7">Straße</label>
        </div>
        <div class="row">
          <div class="error">{{ streetnameerror }}</div>
          <input
            id="street"
            v-model="streetName"
            type="text"
            class="col6"
            required
          />
        </div>
        <div class="row">
          <label for="num" class="col1">Hausnummer</label>
        </div>
        <div class="row">
          <div class="error">{{ housenumbererror }}</div>
          <input
            id="num"
            v-model="houseNumber"
            type="text"
            class="col1"
            required
          />
        </div>
        <div class="row">
          <label for="num" class="col1">Postleitzahl</label>
        </div>
        <div class="row">
          <div class="error">{{ postcodeerror }}</div>
          <input
            id="num"
            v-model="postCode"
            type="text"
            class="col1"
            required
          />
        </div>
        <div class="row">
          <label for="street" class="col7">Stadt</label>
        </div>
        <div class="row">
          <div class="error">{{ cityerror }}</div>
          <input id="street" v-model="city" type="text" class="col6" required />
        </div>
      </div>

      <h2>Zahlungsart</h2>
      <div class="payment">
        <div class="row">
          <p class="error">{{ paymenterror }}</p>
          <input
            id="creditcard"
            type="radio"
            value="creditcard"
            v-model="payment"
          /><label for="creditcard">Kredit- oder Debitkarte</label>
        </div>
        <div class="creditC">
          <div class="row">
            <label for="cardnumber" class="col3">Kartennummer</label
            ><input v-model="creditcardnumber" type="number" />
          </div>
          <div class="error">{{ creditcardnumbererror }}</div>
          <div class="row">
            <label for="cardholder" class="col3">Name des Karteninhabers</label
            ><input v-model="creditcardOwner" type="text" />
          </div>
          <div class="error">{{ creditcardownererror }}</div>
          <div class="row">
            <label for="expires" class="col3">Ablaufdatum</label>
            <select v-model="dateOfExpiryMonth">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select v-model="dateOfExpiryYear">
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
            </select>
            <div class="error">{{ dateofexpiryerror }}</div>
          </div>
        </div>

        <div class="row">
          <input
            id="bankcard"
            type="radio"
            value="bankcard"
            v-model="payment"
          /><label for="bankcard">Bankkarte</label>
        </div>
        <div class="bankC">
          <div class="row">
            <label for="iban" class="col3">IBAN</label
            ><input v-model="iban" id="iban" type="text" />
          </div>
          <div class="error">{{ ibanerror }}</div>
          <div class="row">
            <label for="bank" class="col3">Bank</label
            ><input v-model="bank" id="bank" type="text" />
          </div>
          <div class="error">{{ bankerror }}</div>
          <div class="row">
            <label for="cardholder" class="col3">Name des Karteninhabers</label
            ><input v-model="bankcardOwner" type="text" />
          </div>
          <div class="error">{{ bankcardownererror }}</div>
        </div>
      </div>
    </form>

    <h2>Vorausichtliches Lieferdatum: {{deliveryDate}}</h2>
    <div class="error">{{ notavailableerrorempty }}</div>
    <div class="error">{{ notavailableerror }}</div>
    <div class="row">
      <OrderListObject :product="pr" v-for="pr in productList" :key="pr.id" />
    </div>
    <div class="row">
      <hr />
    </div>
    <div class="row">
      <p class="price">{{ inTotal }}€</p>
    </div>
    <br />
    <div class="row">
      <input type="submit" @click="sendOrder()" value="Bestellen" />
    </div>
  </div>
</template>

<script lang="ts">
import OrderListObject from "../components/OrderListObject.vue";
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { useCartStore } from "../service/CartStore";
import { usePostOrder } from "../service/OrderStore";
import { useUserStore } from "../service/UserStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "OrderForm",
  components: {
    OrderListObject,
  },
  setup(context) {
    const {
      list,
      deleteProduct,
      totalPrice,
      clearCart,
      changeAmount,
    } = useCartStore();

    const { postOrder, errormessages, ordererrormessages } = usePostOrder();

    const {getUser, adresses } = useUserStore();
    const router = useRouter();
    /**
     * the value of the form field payment
     */
    const payment = ref("");
   
    
    const selectedadr = ref("");

    //adress
    const streetName = ref("");
    const houseNumber = ref("");
    const postCode = ref("");
    const city = ref("");

    //bankcard
    const iban = ref("");
    const bankcardOwner = ref("");
    const bank = ref("");

    //creditcard
    const creditcardOwner = ref("");
    const creditcardnumber = ref("");
    const dateOfExpiryMonth = ref(Number(1))
    const dateOfExpiryYear = ref(Number(2021));
    let dateOfExpiry;

    //errors
    
    /**
     * holds the error that occured in the payment field during the placement of an order
     */
    const paymenterror = ref("");
    /**
     * holds the error that occured in the street field during the placement of an order
     */
    const streetnameerror = ref("");
    /**
     * holds the error that occured in the house number field during the placement of an order
     */
    const housenumbererror = ref("");
    /**
     * holds the error that occured in the zipcode field during the placement of an order
     */
    const postcodeerror = ref("");
    /**
     * holds the error that occured in the city field during the placement of an order
     */
    const cityerror = ref("");
    /**
     * holds the error that occured in the iban field during the placement of an order
     */
    const ibanerror = ref("");
    /**
     * holds the error that occured in the bankcard field during the placement of an order
     */
    const bankcardownererror = ref("");
    /**
     * holds the error that occured in the bankname field during the placement of an order
     */
    const bankerror = ref("");
    /**
     * holds the error that occured in the creditcardowner field during the placement of an order
     */
    const creditcardownererror = ref("");
    /**
     * holds the error that occured in the creditcardnumber field during the placement of an order
     */
    const creditcardnumbererror = ref("");
    /**
     * holds the error that occured in the date of expiry field during the placement of an order
     */
    const dateofexpiryerror = ref("");
    /**
     * holds the error that occured during the placement of an order, if an item is not available anymore
     */
    const notavailableerror = ref("");
    /**
     * holds the error that occures if an item is not available anymore
     */
    const notavailableerrorempty = ref("");

    //delivery date
    /**
     * computes the total price of the order
     */
    const inTotal = computed(() => {
      return totalPrice();
    });
    /**
     * computes the list of all products of the order
     */
    const productList = computed(() => {
      return Array.from(list.value.entries());
    });
    /**
     * calculates the estimate delivery date
     */
    const deliveryDate = computed(() => {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      return date.toLocaleDateString();
    })

    /**
     * gets the user's information upon initialization of the component
     */
    onMounted(async () => {
      await getUser();
      
    });
    /**
     * changes the values of the adress form fields
     */
    function adrChange(event: string) {
      const a: Adress = {
        streetName: event.split(",")[0],
        houseNumber: event.split(",")[1],
        postCode: event.split(",")[2],
        city: event.split(",")[3],
      };
      streetName.value = a.streetName;
      houseNumber.value = a.houseNumber;
      postCode.value = a.postCode;
      city.value = a.city;
    }
    /**
     * sends a new order to the server
     */
    async function sendOrder(): Promise<void> {
      notavailableerror.value = "";
      notavailableerrorempty.value = "";

      if (payment.value !== "") {
        paymenterror.value = "";
        const adr: Adress = {
          streetName: streetName.value,
          houseNumber: houseNumber.value,
          postCode: postCode.value,
          city: city.value,
        };
        const bc: Bankcard = {
          iban: iban.value,
          owner: bankcardOwner.value,
          bank: bank.value,
        };

        dateOfExpiry = new Date(dateOfExpiryYear.value, dateOfExpiryMonth.value, 1);
        
        const cc: Creditcard = {
          cowner: creditcardOwner.value,
          creditcardnumber: creditcardnumber.value,
          dateOfExpiry: dateOfExpiry,
        };

        const uor: UserOrderRequest = {
          adress: adr,
          bankCard: bc,
          creditcard: cc,
        };

        const orderList = [];
        for (const product of productList.value) {
          const p: ProductDTO = {
            articleNR: product[0],
            amount: product[1],
          };
          orderList.push(p);
        }

        const order: OrderDT = {
          priceTotal: inTotal.value,
          allProductsOrdered: orderList,
          
        };

        streetnameerror.value = "";
        housenumbererror.value = "";
        postcodeerror.value = "";
        cityerror.value = "";
        ibanerror.value = "";
        bankcardownererror.value = "";
        bankerror.value = "";
        creditcardownererror.value = "";
        creditcardnumbererror.value = "";
        dateofexpiryerror.value = "";

        const orderSuccess = await postOrder(uor, order);

        if (orderSuccess) {
          clearCart();
          router.push("/orderConf");
        } else {
          for (const error of errormessages.value) {
            if (error.field == "adress.streetName") {
              streetnameerror.value = error.message;
            }
            if (error.field == "adress.houseNumber") {
              housenumbererror.value = error.message;
            }
            if (error.field == "adress.postCode") {
              postcodeerror.value = error.message;
            }
            if (error.field == "adress.city") {
              cityerror.value = error.message;
            }
            if (error.field == "bankCard.iban") {
              ibanerror.value = error.message;
            }

            if (error.field == "bankCard.owner") {
              bankcardownererror.value = error.message;
            }

            if (error.field == "bankCard.bank") {
              bankerror.value = error.message;
            }

            if (error.field == "creditcard.cowner") {
              creditcardownererror.value = error.message;
            }
            if (error.field == "creditcard.creditcardnumber") {
              creditcardnumbererror.value = error.message;
            }
            if (error.field == "creditcard.dateOfExpiry") {
              dateofexpiryerror.value = error.message;
            }
          }

          if (payment.value == "bankcard") {
            dateofexpiryerror.value = "";
            creditcardnumbererror.value = "";
            creditcardownererror.value = "";
          } else if (payment.value == "creditcard") {
            bankcardownererror.value = "";
            ibanerror.value = "";
            bankerror.value = "";
          }

          for (const ordererror of ordererrormessages.value) {
            const deletedstring =
              "Folgende Artikel wurden aus dem Warenkorb entfernt, da sie inzwischen ausverkauft sind: ";
            const amountchangestring =
              "Bei folgenden Artikeln musst die Menge aufgrund der Verfügbarkeit angepasst werden: ";
            const messages = ordererror.message.split("//");
            const pnr = [];
            const amount = [];
            for (let m = 0; m < messages.length; m++) {
              if (messages[m].split("--")[1] != null) {
                const p = messages[m].split("--")[1] as any;
                pnr.push(Number(p));
                const a = messages[m].split("--")[3] as any;
                amount.push(Number(a));
              }
            }

            if (pnr.length > 0) {
              for (let i = 0; i < pnr.length; i++) {
                //change amount of product
                if (amount[i] > 0) {
                  notavailableerror.value += i == 0 ? amountchangestring : "";
                  notavailableerror.value += " " + pnr[i];
                  notavailableerror.value += i + 1 == pnr.length ? "" : ", ";
                  changeAmount(Number(pnr[i]), amount[i]);
                  //delete product
                } else {
                  notavailableerror.value += i == 0 ? deletedstring : "";
                  notavailableerrorempty.value += " " + pnr[i];
                  notavailableerror.value += i + 1 == pnr.length ? "" : ", ";
                  deleteProduct(pnr[i]);
                }
              }
            }
          }
        }
      } else {
        paymenterror.value = "Sie müssen eine Zahlungsmethode angeben.";
      }
    }
    /**
     * listenes, whether the payment method is changed
     * clears the previous filled-out paymentmethod form inputs
     */
    watch(payment, (payment) => {
        if(payment === "creditcard") {
          //delete bankcard input
          iban.value = "";
          bank.value = "";
          bankcardOwner.value = "";
        } else {
          //delete creditcard input
          creditcardnumber.value = "";
          creditcardOwner.value = "";
          dateOfExpiryMonth.value = 1;
          dateOfExpiryYear.value = 2021;
        }
    });

    return {
      inTotal,
      productList,
      sendOrder,
      streetName,
      houseNumber,
      postCode,
      city,
      iban,
      bankcardOwner,
      bank,
      creditcardOwner,
      creditcardnumber,
      dateOfExpiryMonth,
      dateOfExpiryYear,
      dateOfExpiry,
      payment,
      paymenterror,
      adrChange,
      streetnameerror,
      housenumbererror,
      postcodeerror,
      cityerror,
      ibanerror,
      bankcardownererror,
      bankerror,
      creditcardownererror,
      creditcardnumbererror,
      dateofexpiryerror,
      notavailableerror,
      notavailableerrorempty,
      adresses,
      selectedadr,
      isHidden: computed(() => {
            if (adresses.value.length == 0) {
                return true;
            } else {
                return false;
            } 
      }),
      deliveryDate
    };
  },
});
</script>

<style scoped lang="scss">
    .error{
        font-size: 10px;
        color: red;
    }
    .orderForm{
        margin: 1em 2em 2em 2em;
    } 
    .adress{
        margin-bottom: 6em;
    }
    .payment{
        margin: 1em 0em 2em 2em;
    } 
    .creditC, .bankC{
        margin-left: 5em;
    } 
    .product{
        text-align: left;
        margin-top: 3%;
    }
    .price{
        float: right;
        margin: 2.5em 7em 1em 0em;
    } 
    label{
        margin-top: .5em;
        display: inline-block;
    } 
    input:focus{
        outline-color: $color-green;
        outline-style: solid;
        outline-width: 1px;
    } 
    input[type=text]{
        padding: .25em;
        border: 1px solid $color-grey3;
        border-radius: 3px;
    }  
    /* Chrome, Safari, Edge, Opera remove arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox remove arrows*/
    input[type=number]{
        padding: .25em;
        border: 1px solid $color-grey3;
        border-radius: 3px;
        appearance: none;
    } 

    input[type=submit]{
        display: block;
        padding: 1% 5%;
        margin: 0 auto;
    }
    select{
        display: inline;
        padding: .25em;
        border: 1px solid $color-grey3;
        border-radius: 5px;
        background-color: white;
        box-sizing: border-box;
        margin-right: 2em;
    } 
    select:focus{
        outline-color: $color-green;
        outline-style: solid;
        outline-width: 1px;
    } 
    hr{
        width: 20%;
        float: right;
        background-color: black;
        color: black;
    }
    ul{
        list-style: none;
        float: left;
        position: relative;
    } 
    img{
        margin: .5em 0em .5em 0em;
        float: left;
        width: 10%;
    } 
    h2{
        margin-top: 2em;
    } 
    .row{
        width: 100%;
        height: 15%;
        margin-top: 1em;
        clear: both;    
    } 
    .row:after{
        content: "";
        display: table;
    } 
    .col1{
        float: left;
        width: 15%;
        margin-right: 14%;
    } 
    .col3{
        float: left;
        width: 30%;
    } 
    .col4{
        float: left;
        width: 35%;
        margin-right: 14%;
    } 
    .col5{ 
        float: left;
        width: 50%;
    } 
    .col6{
        float: left;
        width: 55%;
        margin-right: 14%;
    } 
    .col7{
        float: left;
        width: 70%;
    } 
</style>