<template>
  <div class="profil">
    <div class="profilhead">
      <h1>Dein Profil</h1>
    </div>
    <form @submit.prevent="logout()">
      <div class="row"> 
         <input id="logout" type="submit" name="logoutUser" value="Logout"/>
      </div>
      <div class="row">
        <div class="col1">
          <label for="firstname" class="left"> Vorname </label>
        </div>
        <div class="col2">{{ firstName }}</div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="lastname" class="left"> Nachname </label>
        </div>
        <div class="col2">{{ lastName }}</div>
      </div>
      <div class="row">
        <div class="col1"><label for="email" class="left"> E-Mail </label></div>
        <div class="col2">{{ email }}</div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="birthdate" class="left"> Geburtsdatum </label>
        </div>
        <div class="col2">{{ birthdate }}</div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="adress" class="left">Adresse</label>
        </div>
        <div class="col2">
          <select v-model="selectedadr" name="adress">
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
      </div>
      <div class="row">
      <div class="col1">
          <label for="bankcard" class="left">Bankkarten</label>
        </div>
        <div class="col2">
          <select v-model="selectedbankcard" name="bankcard">
            <option
              v-for="item in bankcards"
              :value="[
                item.iban,
                item.bankcardOwner,
                item.bank,
              ]"
              :key="item.id"
            >
              {{ item.bank }}, {{ item.iban }}, {{ item.owner }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="creditcard" class="left">Kreditkarten</label>
        </div>
        <div class="col2">
          <select v-model="selectedcreditcard" name="creditcard">
            <option
              v-for="item in creditcards"
              :value="[
                item.creditcardnumber,
                item.creditcardOwner,
                item.dateOfExpiry,
              ]"
              :key="item.id"
            >
              {{ item.cowner }}, {{ item.creditcardnumber }}, {{ item.dateOfExpiry }}
            </option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useUserStore, getLogoutUser } from "../service/UserStore";
import "../service/User";
import { useRouter} from "vue-router";

export default defineComponent({
  name: "Profile",

  setup() {
    const { getUser, user, adresses, bankcards, creditcards } = useUserStore();
    const {logoutUser, jwttokens, errormessage} = getLogoutUser();

    //user
    const email = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const birthdate = ref(new Date());
    const router = useRouter();
    const token = jwttokens.value[0];
    let accessToken = "";

    function userInformation() { 

      //FirstName
      firstName.value = user.value[0].firstName;

      //Lastname
      lastName.value = user.value[0].lastName;

      //Email
      email.value = user.value[0].email;

      //Geburtstag
      birthdate.value = user.value[0].birthdate;

    }

    async function logout(): Promise<void>{
      accessToken = token.accessToken;
      const lr: LogoutRequest = {"token" : accessToken};
      await logoutUser(lr);

      if(errormessage.value.length > 0 ){
        console.log("Loggout not successful.");
      }else{
        router.push("/");
      }
    }

    onMounted(async () => {
      await getUser();
      userInformation();
    });

    return {
      firstName,
      lastName,
      birthdate,
      email,
      adresses,
      userInformation,
      bankcards, 
      creditcards,
      logout
    };
  },
});
</script>

<style scoped lang="scss">
form {
  margin: 5% 0% 15% 35%;
}
label {
  padding: 12px 12px 12px 0px;
  display: inline-block;
}
.col1 {
  float: left;
  width: 25%;
  font-weight: bold;
}

.col2 {
  float: left;
  width: 45%;
  padding: 12px 0px 0px 0px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
.row {
  align-content: center;
}
.profilhead {
  text-align: center;
}

#logout{
  margin: -4% 10% 0% 0%;
  float: right;
  padding: .5% 2%;
}

</style>