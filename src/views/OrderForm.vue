
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
          <div class="error">{{FieldErrors.streetName.value}}</div>
          <input
            id="street"
            v-model="Field.streetName.value"
            type="text"
            class="col6"
            required
          />
        </div>
        <div class="row">
          <label for="num" class="col1">Hausnummer</label>
        </div>
        <div class="row">
          <div class="error">{{FieldErrors.houseNumber.value}}</div>
          <input
            id="num"
            v-model="Field.houseNumber.value" type="text"
            class="col1"
            required
          />
        </div>
        <div class="row">
          <label for="num" class="col1">Postleitzahl</label>
        </div>
        <div class="row">
          <div class="error">{{FieldErrors.postCode.value}}</div>
          <input
            id="num"
            v-model="Field.postCode.value" type="text"
            class="col1"
            required/>
        </div>
        <div class="row">
          <label for="street" class="col7">Stadt</label>
        </div>
        <div class="row">
          <div class="error">{{FieldErrors.city.value}}</div>
          <input id="street" v-model="Field.city.value" type="text" class="col6" required />
        </div>
      </div>
      <h2>Zahlungsart</h2>
      <div class="payment">
        <div class="row">
          <p class="error"> {{ paymenterror }} </p>
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
            ><input v-model="Field.creditcardnumber.value" type="number" />
          </div>
          <div class="error">{{FieldErrors.creditcardnumber.value}}</div>
          <div class="row">
            <label for="cardholder" class="col3">Name des Karteninhabers</label
            ><input v-model="Field.cowner.value" type="text" />
          </div>
          <div class="error">{{FieldErrors.cowner.value}}</div>
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
            <div class="error">{{FieldErrors.dateOfExpiry.value}}</div>
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
            ><input v-model="Field.iban.value" id="iban" type="text" />
          </div>
          <div class="error">{{FieldErrors.iban.value}}</div>
          <div class="row">
            <label for="bank" class="col3">Bank</label
            ><input v-model="Field.bank.value" id="bank" type="text" />
          </div>
          <div class="error">{{FieldErrors.bank.value}}</div>
          <div class="row">
            <label for="cardholder" class="col3">Name des Karteninhabers</label
            ><input v-model="Field.owner.value" type="text" />
          </div>
          <div class="error">{{FieldErrors.owner.value}}</div>
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
      <div id="other" class="error">{{FieldErrors.other.value}}</div>
      <input v-if="!orderwassent" type="submit" @click="sendOrder()" value="Bestellen" />
      <div id="loading-div" v-else-if="orderwassent">
        <div id="loading-text">Lade..</div>
        <div id="loading-content"></div>
      </div>
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
  setup() {
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
 
    type Fieldnames = "streetName" | "houseNumber" | "postCode" | "city" | "iban" | "owner" | "bank" | "cowner" | "creditcardnumber" | "dateOfExpiry";
  
    //dateofexpiry
    const dateOfExpiryMonth = ref(Number(1));
    const dateOfExpiryYear = ref(Number(2021));
    const payment = ref("");
    const selectedadr = ref("");
    let dateOfExpiry;

    const orderwassent = ref(false);

  /**
   * Object that contains all Fieldinput information of the Form
   * property names are of type Fieldnames
   */
    const Field = {
      streetName: ref("") ,
      houseNumber: ref("") ,
      postCode: ref(""),
      city: ref("") ,
      iban: ref(""),
      owner: ref("") ,
      bank: ref(""),
      cowner: ref(""),
      creditcardnumber: ref(""),
      dateOfExpiry: ref(""),
    }
    /**
     * Object that contains all errors belonging to a Field
     * values are of type Fieldnames
     */
     const FieldErrors = {
       
      streetName: ref("") ,
      houseNumber: ref("") ,
      postCode: ref(""),
      city: ref("") ,
      iban: ref(""),
      owner: ref("") ,
      bank: ref(""),
      cowner: ref(""),
      creditcardnumber: ref(""),
      dateOfExpiry: ref(""),
      other: ref(""),
    };

    /**
     * holds the error that occured in the payment field during the placement of an order
     */
    const paymenterror = ref("");
 
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
     * calculates the estimated delivery date
     */
    const deliveryDate = computed(() => {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      return date.toLocaleDateString();
    });

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

      Field.streetName.value = a.streetName;
      Field.houseNumber.value = a.houseNumber;
      Field.postCode.value = a.postCode;
      Field.city.value = a.city;
    }

  /**
   * fills a UserOrderRequest Object with information 
   * @returns a filled UserOrderRequest Object
   */
    function fillRequestInfo(): UserOrderRequest{
           const adr: Adress = {
          streetName: Field.streetName.value,
          houseNumber: Field.houseNumber.value,
          postCode: Field.postCode.value,
          city: Field.city.value,
        };
        const bc: Bankcard = {
          iban: Field.iban.value,
          owner: Field.owner.value,
          bank: Field.bank.value,
        };

        dateOfExpiry = new Date(dateOfExpiryYear.value, dateOfExpiryMonth.value, 1);
        
        const cc: Creditcard = {
          cowner: Field.cowner.value,
          creditcardnumber: Field.creditcardnumber.value,
          dateOfExpiry: dateOfExpiry,
        };

        const uor: UserOrderRequest = {
          adress: adr,
          bankCard: bc,
          creditcard: cc,
        };

        return uor;
    }
    /**
     * sends a new order to the server
     */
    async function sendOrder(): Promise<void> {
      notavailableerror.value = "";
      notavailableerrorempty.value = "";

      if (payment.value !== "") {
        paymenterror.value = "";

        const userOrderRequest = fillRequestInfo();

        const orderList: ProductDTO[] = [];
        //adds a new ProductDTO to the orderlist for every product in the productlist
        productList.value.forEach(product => orderList.push({articleNR: product[0], amount: product[1]} as ProductDTO));
       
       //set all fielderror values to an empty string
        Object.values(FieldErrors).forEach(entry => entry.value = "");

        //sends a new Order transfer object to the server and waits for the response
        orderwassent.value = true;
        const orderSuccess = await postOrder(userOrderRequest,{priceTotal: inTotal.value, allProductsOrdered: orderList} as OrderDT);
       
        if (orderSuccess) {
          clearCart();
          router.push("/orderConf");
        } 
        else {
          //sets every errormessage that exists in fieldnames 
          errormessages.value.map(entry =>({entry, field: entry.field.split(".").length > 1 ? entry.field.split(".")[1] as Fieldnames : undefined}))
          .filter((obj)=> obj.field != null && FieldErrors[obj.field] != null)
          .forEach((obj)=> FieldErrors[obj.field!].value = obj.entry.message);

          FieldErrors.other.value =  errormessages.value.find(entry => entry.field.split(".").length == 1)?.message as string;
          
      
          if (payment.value == "bankcard") {
            FieldErrors.dateOfExpiry.value = "";
            FieldErrors.creditcardnumber.value = "";
            FieldErrors.cowner.value = "";
          } else if (payment.value == "creditcard") {
            FieldErrors.owner.value = "";
            FieldErrors.iban.value = "";
            FieldErrors.bank.value = "";
          }

          for (const ordererror of ordererrormessages.value) {
            const deletedstring =
              "Folgende Artikel wurden aus dem Warenkorb entfernt, da sie inzwischen ausverkauft sind: ";
            const amountchangestring =
              "Bei folgenden Artikeln musst die Menge aufgrund der Verfügbarkeit angepasst werden: ";
            const messages = ordererror.message.split("//");
            const pnr: number[] = [];
            const amount: number[] = [];
            
            for (let m = 0; m < messages.length; m++) {
              if (messages[m].split("--")[1] != null) {
                const p: string = messages[m].split("--")[1];
                pnr.push(Number(p));
                const a: string = messages[m].split("--")[3];
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
        orderwassent.value = false;
      }
      else {
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
          Field.iban.value = "";
          Field.bank.value = "";
          Field.owner.value = "";
        } else {
          //delete creditcard input
          Field.creditcardnumber.value = "";
          Field.cowner.value = "";
          dateOfExpiryMonth.value = 1;
          dateOfExpiryYear.value = 2021;
        }
    });

    return {
      inTotal,
      productList,
      sendOrder,
      dateOfExpiryMonth,
      dateOfExpiryYear,
      dateOfExpiry,
      payment,
      paymenterror,
      adrChange,
      FieldErrors,
      Field,
      notavailableerror,
      notavailableerrorempty,
      adresses,
      selectedadr,
      orderwassent,
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

      #loading-div {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #loading-text {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    color: rgb(20, 121, 60);
    width: 100px;
    height: 30px;
    margin: -7px 0 0 -45px;
    text-align: center;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 20px;
  }

  #loading-content {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 170px;
    height: 170px;
    margin: -85px 0 0 -85px;
    border: 3px solid #F00;
  }

  #loading-content {
    border: 3px solid transparent;
    border-top-color: $color-green;
    border-bottom-color: $color-green;
    border-radius: 50%;
    -webkit-animation: loader 2s linear infinite;
    -moz-animation: loader 2s linear infinite;
    -o-animation: loader 2s linear infinite;
    animation: loader 2s linear infinite;
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>