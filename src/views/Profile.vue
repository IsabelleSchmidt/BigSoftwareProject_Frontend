<template>
    <div class="profil">
        <div class="profilhead">
        <h1>Dein Profil</h1>
        </div>
        <form>
            <div class="row">
                <div class="col1"><label for="firstname" class="left" > Vorname </label></div>
                <div class="col2"> {{ firstname }} </div>
            </div>  
            <div class="row">
                <div class="col1"><label for="lastname" class="left"> Nachname </label></div>
                <div class="col2"> {{ lastname }} </div>
            </div>
            <div class="row">    
                <div class="col1"><label for="email" class="left"> E-Mail </label></div>
                <div class="col2"> {{ email}} </div>            
            </div>
            <div class="row">
                <div class="col1"><label for="birthdate" class="left"> Geburtsdatum </label></div>
                <div class="col2"> {{ birthdate }} </div>
            </div>
            <div>
                <select v-model="selectedadr" name="adress">
                    <option v-for="item in adr" :value="[item.streetName,item.houseNumber,item.postCode,item.city]" :key="item.id">{{item.streetName}} {{item.houseNumber}}, {{item.postCode}} {{item.city}}</option>
                </select>
            </div>
            <div class="row">
                <div class="col1"><label for="bankcards" class="left"> Bankkarten </label></div>
                <div class="col2"> Mastercard hallo </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useUserStore } from '../service/UserStore'
import '../service/User'

export default defineComponent ({
    name: 'Profile',
    
    setup(){

        const {getUser, user} = useUserStore();

        //user
        const email = ref("");
        const firstname = ref("");
        const lastName = ref("");
        const birthdate = ref(new Date());
        const gender = ref("");

        //adress
        const adr = new Array<Adress>();

        //Bankcard
        const bankcards = new Array<Bankcard>();

        //Creditcards
        const creditcards = new Array<Creditcard>();

        //Creditcard
        const creditcardOwner = ref("");
        const creditcardnumber = ref("");
        const dateOfExpiryMonth = ref(1);
        const dateOfExpiryYear = ref(2021);
        const dateOfExpiry = ref(new Date(dateOfExpiryYear.value, dateOfExpiryMonth.value, 1));
        
        
        function userInformation() {

            //Adressen
             for (let i = 0; i < Array.from(user.value[0].allAdresses).length; i++) {
              adr.push(Array.from(user.value[0].allAdresses)[i] as Adress);
            }

            //Bankkarten holen

            //Creditcards

            //FirstName
            firstname.value = user.value[0].firstName;
            
            //Lastname

            //Email

            //Gender

            //Geburtstag

        }

        onMounted(async () => {
            await getUser();
            userInformation();
        });

        return{
            firstname,
            lastName,
            birthdate,
            gender,
            adr,
            bankcards,
            creditcards,
            userInformation,
            creditcardOwner,
            creditcardnumber,
            dateOfExpiryMonth,
            dateOfExpiryYear,
            dateOfExpiry,
        };
    }
})
            

</script>

<style scoped lang="scss">

form{
    margin: 5% 0% 15% 35%;
}
label{
    padding: 12px 12px 12px 0px;
    display: inline-block;
}
.col1{
    float: left;
    width: 25%;
}

.col2{
    float: left;
    width: 45%;
    padding:  12px 0px 0px 0px;
    border: 1px solid $color-grey3;
    
}

.row:after{
    content:"";
    display: table;
    clear: both;
}
.row{
    align-content: center;
}
.profilhead{
    text-align: center;
}


</style>