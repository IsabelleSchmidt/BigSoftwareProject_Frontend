<template>
    <div class="orderForm"> 
        <h1>Bestellübersicht</h1>
        <form >
            <div class="adress">
                <h2>Versandadresse</h2>
                <div>
                    <select v-model="selectedadr" name="adress" @change="adrChange($event.target.value)">
                        <option v-for="item in options" :value="item" :key="item.id">{{item[0]}} {{item[1]}}, {{item[2]}} {{item[3]}}</option>
                    </select>
                </div>
                <div class="row">
                    <label for="street" class="col7">Straße</label>
                </div>
                <div class="row">
                    <div class="error">{{streetnameerror}}</div>
                    <input id="street" v-model="streetName" type="text" class="col6" required>
                </div>
                <div class="row">
                    <label for="num" class="col1">Hausnummer</label>
                </div>
                <div class="row">
                    <div class="error">{{housenumbererror}}</div>
                    <input id="num" v-model="houseNumber" type="text" class="col1" required>
                </div>
               <div class="row">
                    <label for="num" class="col1">Postleitzahl</label>
                </div>
                <div class="row">
                    <div class="error">{{postcodeerror}}</div>
                    <input id="num" v-model="postCode" type="text" class="col1" required>
                </div>
                <div class="row">
                    <label for="street" class="col7">Stadt</label>
                </div>
                <div class="row">
                    <div class="error">{{cityerror}}</div>
                    <input id="street" v-model="city" type="text" class="col6" required>
                </div>
            </div>
           
            <h2>Zahlungsart</h2>
            <div class="payment">

                <div class="row">
                <p class="error">{{paymenterror}}</p>
                <input id="creditcard" type="radio" value="creditcard" v-model="payment"><label for="creditcard">Kredit- oder Debitkarte</label></div>
                <div class="creditC"> 
                    <div class="row"><label for="cardnumber" class="col3">Kartennummer</label><input v-model="creditcardnumber" type="number"></div>
                    <div class="error">{{creditcardnumbererror}}</div>
                    <div class="row"><label for="cardholder" class="col3">Name des Karteninhabers</label><input v-model="creditcardOwner" type="text"></div>
                    <div class="error">{{creditcardownererror}}</div>
                    <div class="row"><label for="expires" class="col3">Ablaufdatum</label>
                        <select v-model="dateOfExpiryMonth">
                            <option value=1 >1</option>
                            <option value=2 >2</option>
                            <option value=3 >3</option>
                            <option value=4 >4</option>
                            <option value=5 >5</option>
                            <option value=6 >6</option>
                            <option value=7 >7</option>
                            <option value=8 >8</option>
                            <option value=9 >9</option>
                            <option value=10 >10</option>
                            <option value=11 >11</option>
                            <option value=12 >12</option>
                        </select>
                        <select v-model="dateOfExpiryYear">
                            <option value=2021 >2021</option>
                            <option value=2022 >2022</option>
                            <option value=2023 >2023</option>
                            <option value=2024 >2024</option>
                            <option value=2025 >2025</option>
                            <option value=2026 >2026</option>
                            <option value=2027 >2027</option>
                            <option value=2028 >2028</option>
                            <option value=2029 >2029</option>
                            <option value=2030 >2030</option>
                            <option value=2031 >2031</option>
                        </select>
                        <div class="error">{{dateofexpiryerror}}</div>
                    </div>
                </div>

                <div class="row">
                <input id="bankcard" type="radio" value="bankcard" v-model="payment"><label for="bankcard">Bankkarte</label></div>
                <div class="bankC"> 
                    <div class="row"><label for="iban" class="col3">IBAN</label><input v-model="iban" id="iban" type="text"></div>
                        <div class="error">{{ibanerror}}</div>
                    <div class="row"><label for="bank" class="col3">Bank</label><input v-model="bank" id="bank" type="text"></div>
                        <div class="error">{{bankerror}}</div>
                    <div class="row"><label for="cardholder" class="col3">Name des Karteninhabers</label><input v-model="bankcardOwner" type="text"></div>
                        <div class="error">{{bankcardownererror}}</div>
                </div>
                
            </div>
        </form>

        <h2>Lieferung 18.02.2021</h2>
        <div class="row">
            <OrderListObject :product="pr" v-for="pr  in productList" :key="pr.id" />
        </div>
        <div class="row">
            <hr>    
        </div>
        <div class="row">
            <p class="price">{{inTotal}}</p>
        </div>
        <br>
        <div class="row">
            <input type="submit" @click="sendOrder()" value="Bestellen">
        </div>
    </div>
</template>

<script lang="ts">
import OrderListObject from "../components/OrderListObject.vue"
import {defineComponent, computed, ref, reactive } from 'vue'
import {useCartStore} from '../service/CartStore'
import {usePostOrder} from '../service/OrderStore'
import {useUserStore} from '../service/UserStore'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
    name: 'OrderForm',
    components:{
        OrderListObject,
        // Multiselect,
    },
    setup(context){
        const {list, addProduct, deleteProduct, totalPrice, clearCart} = useCartStore();

        const {postOrder, errormessages} = usePostOrder();
        const {jwttokens, getAdresses} = useUserStore();
        const router = useRouter();


        const payment = ref("");
        const paymenterror = ref("");

        //Adress
        const streetName = ref("");
        const houseNumber = ref("");
        const postCode = ref("");
        const city = ref("");

        //Bankcard
        const iban = ref("");
        const bankcardOwner = ref("");
        const bank = ref("");

        //Creditcard
        const creditcardOwner = ref("");
        const creditcardnumber = ref("");
        const dateOfExpiryMonth = ref(1);
        const dateOfExpiryYear = ref(2021);
        const dateOfExpiry = ref(new Date(dateOfExpiryYear.value, dateOfExpiryMonth.value, 1));

        //Errors
        const streetnameerror = ref("");
        const housenumbererror = ref("");
        const postcodeerror = ref("");
        const cityerror = ref("");
        const ibanerror = ref("");
        const bankcardownererror = ref("");
        const bankerror = ref("");
        const creditcardownererror = ref("");
        const creditcardnumbererror = ref("");
        const dateofexpiryerror = ref("");

        //UserOrderRequest
        
        const token = jwttokens.value[0];

        console.log("TOKEN: " + JSON.stringify(token));

        const inTotal = computed(()=> {
            return totalPrice();
        });
        
        const productList = computed(() =>{
            return Array.from(list.value.entries());
        });

        const options = getAdresses();      

        function adrChange(event: string) {
            const a: Adress = {'streetName': event.split(',')[0], 'houseNumber': event.split(',')[1], 'postCode': event.split(',')[2], 'city': event.split(',')[3]};
            streetName.value = a.streetName;
            houseNumber.value = a.houseNumber;
            postCode.value = a.postCode;
            city.value = a.city;
        }

        async function sendOrder(): Promise<void>{
            console.log("sendOrder   " + payment.value);
            if (payment.value !== "") {
                paymenterror.value = "";
                const adr: Adress = {'streetName': streetName.value, 'houseNumber': houseNumber.value, 'postCode': postCode.value, 'city': city.value};
                const bc: Bankcard = {'iban': iban.value, 'owner': bankcardOwner.value, 'bank': bank.value};
                const cc: Creditcard = {'cowner': creditcardOwner.value, 'creditcardnumber': creditcardnumber.value, 'dateOfExpiry':dateOfExpiry.value};
                const uor: UserOrderRequest = {'adress': adr, 'bankCard': bc, 'creditcard':cc, 'token': token};
                
                const orderList = [];
                for (let i=0; i<productList.value.length; i++){
                    const p: ProductDTO = {'articleNR': productList.value[i][0], 'amount': productList.value[i][1]};
                    orderList.push(p);
                }

                const order: OrderDT = {'priceTotal': inTotal.value, 'allProductsOrdered': orderList, 'jwtToken': token};
                console.log("USER: " + JSON.stringify(uor));

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
               console.log("Order success vue: "+orderSuccess);
                if(orderSuccess){
                    clearCart();
                    router.push("/orderConf");
                }

                else{
                    //kann man liste nach speziellem error filtern oder so? oder zu switch switchen haha
                    for(const error of errormessages.value){
                     
                    
                        if(error.field == "adress.streetName"){
                            streetnameerror.value = error.message;
                        }
                        if(error.field == "adress.houseNumber"){
                            housenumbererror.value = error.message;
                        }
                        if(error.field == "adress.postCode"){
                            postcodeerror.value = error.message;
                        }
                        if(error.field == "adress.city"){
                            cityerror.value = error.message;
                        }
                        if(error.field == "bankCard.iban"){
                           
                            ibanerror.value = error.message;    
                        }
                                            
                        if(error.field == "bankCard.owner"){
                           
                            bankcardownererror.value = error.message;
                        }
                            
                        
                        if(error.field == "bankCard.bank"){
                            
                             bankerror.value = error.message;
                        }
                        
                        if(error.field == "creditcard.cowner"){
                           
                            creditcardownererror.value = error.message;
                        }
                        if(error.field =="creditcard.creditcardnumber"){
                                creditcardnumbererror.value = error.message;
                        }
                        if(error.field =="creditcard.dateOfExpiry"){
                            dateofexpiryerror.value = error.message;
                            
                        }
                    }
                    if(payment.value == "bankcard"){
                        dateofexpiryerror.value = "";
                        creditcardnumbererror.value = "";
                        creditcardownererror.value = "";

                    }else if(payment.value =="creditcard"){
                        bankcardownererror.value = "";
                        ibanerror.value = "";
                        bankerror.value = "";

                    }
                  
                }
            } else {
                paymenterror.value = "Sie müssen eine Zahlungsmethode angeben.";
            }
            
        }

        return{
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
            token,
            payment,
            paymenterror,
            options,
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
            dateofexpiryerror
        };
    }   
})
</script>

<style scoped lang="scss">
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
        outline-color: #3BA07C;
        outline-style: solid;
        outline-width: 1px;
    } 
    input[type=text]{
        padding: .25em;
        border: 1px solid #ccc;
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
        border: 1px solid #ccc;
        border-radius: 3px;
        appearance: none;
    } 

    input[type=submit]{
        display: block;
        padding: 1% 5%;
        margin: 0 auto;
        background-color: black;
        border-style: none;
        color: #fff;
        border-radius: 3px;
        &:hover{
            background-color: #3BA07C;
        } 
        &:focus{
            outline: none;
        }
    }
    select{
        display: inline;
        padding: .25em;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #ffffff;
        box-sizing: border-box;
        margin-right: 2em;
    } 
    select:focus{
        outline-color: #3BA07C;
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
    .error{
        color: red;
        margin: 5px 0px 1px 0px;
        font-size: 0.8em;
    }
</style>
