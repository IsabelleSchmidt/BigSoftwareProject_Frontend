<template>
  <div class="profil">
    <div class="profilhead">
      <h1>Dein Profil</h1>
    </div>
    <form @submit.prevent="logout()">
      <div class="row">
        <input id="logout" type="submit" name="logoutUser" value="Logout" />
        <div v-if="loggoutmessage.length > 0">{{loggoutmessage}} </div>
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
              :value="[item.iban, item.bankcardOwner, item.bank]"
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
              {{ item.cowner }}, {{ item.creditcardnumber }},
              {{ item.dateOfExpiry }}
            </option>
          </select>
        </div>
      </div>
      <div class="row" id="but" v-if="edit.length>0">
        <router-link to="/newProduct"><button id="newProduct">Neus Produkt anlegen</button></router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useUserStore, getLogoutUser } from "../service/UserStore";
import "../service/User";
import { useRouter } from "vue-router";
import {routerHistory} from "../service/RouterStore";

export default defineComponent({
  name: "Profile",

  setup() {
    const { getUser, user, adresses, bankcards, creditcards, jwttoken, resetUser } = useUserStore();
    const { logoutUser, errormessages } = getLogoutUser();
   

    //user
    /**
     * a user's email adress
     */
    const email = ref("");
    /**
     * a user's firstname
     */
    const firstName = ref("");
    /**
     * a user's surname
     */
    const lastName = ref("");
    /**
     * a user's birthdate
     */
    const birthdate = ref(new Date());
    const router = useRouter();
    routerHistory.add("/profile");
    /**
     * error that occured while logging out
     */
    const loggoutmessage = ref("");
    const edit = ref("");

  /**
   * sets the user's information
   */
    function userInformation() {
      //Clear first
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      birthdate.value = new Date();

      //FirstName
      firstName.value = user.value[0].firstName;

      //Lastname
      lastName.value = user.value[0].lastName;

      //Email
      email.value = user.value[0].email;

      //Geburtstag
      birthdate.value = user.value[0].birthdate;

      for(const role in user.value[0].roles){
        if(user.value[0].roles[role].name === "WAREHOUSE"|| user.value[0].roles[role].name ==="ADMIN"||user.value[0].roles[role].name==="STAFF"){
          edit.value = "true";
        }
      }
    }

  /**
   * logs out the user
   */
    async function logout(){
      await logoutUser();
      if (errormessages.value.length <= 0) {
        resetUser();
          loggoutmessage.value = "";
          router.push("/");
      } else {
        loggoutmessage.value = "Fehler beim Ausloggen. Bitte loggen Sie sich zunächst ein.";
      }
    }
  /**
   * fills out the profile info with the user's information upon initialization of the component
   */
    onMounted(async () => {
      if(jwttoken.value.accessToken.length > 0){
        await getUser();
        userInformation();
      }else{
        router.push("/login");
      }
      
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
      logout,
      loggoutmessage,
      edit
    };
  },
});
</script>

<style scoped lang="scss">
#but{
  margin-top: 4%;
}
#newProduct{
   padding: 1% 5%;
}
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

#logout {
  margin: -4% 10% 0% 0%;
  float: right;
  padding: 0.5% 2%;
}
</style>