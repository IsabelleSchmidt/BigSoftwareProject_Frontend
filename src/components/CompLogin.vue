<template>
  <div class="complogin">
    <h1 align="center">Login</h1>
    <p id="error" align="center">{{ errormessage }}</p>
    <form @submit.prevent="loginUser()">
      <div class="row">
        <div class="col1">
          <label for="email" class="left">E-Mail Adresse</label>
        </div>
        <div class="col2">
          <input
            v-model="email"
            id="email"
            type="text"
            name="email"
            size="30"
            maxlenght="50"
            class="right"
          />
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="password" class="left">Passwort</label>
        </div>
        <div class="col2">
          <input
            v-model="password"
            id="pw"
            type="password"
            name="password"
            size="20"
            maxlenght="50"
            class="right"
          />
        </div>
      </div>
      <input type="submit" name="loginUser" value="Login" >
        <div class="row">    
            Noch kein Kunde? <router-link id="link" to="/register">Hier registrieren</router-link>
        </div>
        <div class="row">    
            Passwort vergessen? <a id="link" @click="toResetPw()" >Hier zurücksetzen</a>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { postLoginUser, useUserStore } from "../service/UserStore";
import {
  ref,
  defineComponent,
  computed,
  reactive,
  watch,
  onMounted,
} from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "CompLogin",

  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const loginRequest: LoginRequest = {
      email: email.value,
      password: password.value,
    };
    const { sendLogin, errormessage} = postLoginUser();
    const { reseterrormessage } = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const COLORS = ["red", "#ccc"];

    onMounted(async () => {
      reseterrormessage();
    });

    async function loginUser() {
      loginRequest.email = email.value;
      loginRequest.password = password.value;
      const loginSuccess = await sendLogin(loginRequest);
      const path = route.fullPath;
      console.log(path);

      if (loginSuccess && path.includes("cart")) {
        router.push("/orderform");
      }else if(loginSuccess && path.includes("profile")){
        router.push("/profile");
      }
    }

    function toResetPw() {
        context.emit("toggle-comp", email.value);
    }

    return {
      loginUser,
      loginRequest,
      email,
      password,
      errormessage,
      colorEmail: computed(() => {
        if (errormessage.value != "") {
          return COLORS[0];
        } else {
          return COLORS[1];
        }
      }),
      toResetPw
    };
  },
});
</script>

<style scoped lang="scss">
form {
  margin: 5% 0% 15% 35%;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.col1 {
  float: left;
  width: 25%;
}

.col2 {
  float: left;
  width: 75%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
input:focus{
    outline-color: $color-green;
}
input[type=text]{
    width: 30%;
    padding: 0.25em;
    border: 1px solid $color-grey3;
    border-radius:3px;
    resize: vertical;
}
input[type=submit]{
    margin: 5% 0% 5% 15%;
    padding: 1% 5%;
}

#pw {
  width: 30%;
  padding: 0.25em;
  border: 1px solid v-bind("colorEmail");
  border-radius: 3px;
  resize: vertical;
}

#email {
  width: 30%;
  padding: 0.25em;
  border: 1px solid v-bind("colorEmail");
  border-radius: 3px;
  resize: vertical;
}

#link {
    text-decoration: none;
    list-style: none;
    list-style-type: none;
    color: $color-green;
    &:hover{
        cursor: pointer;
    } 
}
</style>