<template>
    <div class="compresetpw">
        <h1 align="center">Passwort zurücksetzen</h1>
        <p id="error" align="center">{{ errormessage }}</p>
        <p align="center">{{ message }}</p>
        <form @submit.prevent="reset()">
            <div class="row">    
                <a @click="back()" id="link" v-if="!isHidden"> &laquo; zurück</a>
            </div>
            <div class="row" v-if="!isHidden">
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
            <div v-if="!isHidden">
                <input type="submit" name="resetPw" value="Passwort zurücksetzen" >
            </div>
            <div v-if="isHidden">
                <button @click="toLogin()" > Zurück zum Login</button>
            </div>
        </form>
    </div>
</template>

<script lang = "ts">
import { defineComponent, computed, ref } from "vue";
import { useUserStore } from "../service/UserStore"
import { useEmailStore } from "../service/EmailStore"
import "@/service/Product";

export default defineComponent({
  name: "CompProducts",
  components: {},
  props: {
      mailadress: String,
  },
  setup(props, context) {

    const COLORS = ["red", "#ccc"];
    const email = ref(props.mailadress);

    const userExists = ref(true);
    const error = ref(false);

    const errormessage = ref("");
    const message = ref("");

    const { checkIfEmailExists } = useUserStore();
    const { sendEmail } = useEmailStore();

    const isHidden = ref(false);

    //Callback
    function back(): void {
      context.emit("toggle-comp");
    }

    function toLogin() {
        back();
    }

    async function reset() {

        isHidden.value = false;

        if (email.value) {
            const exists = await checkIfEmailExists(email.value);
            userExists.value = exists;
            console.log("User existiert? " + userExists.value);
            if (!exists) {
                errormessage.value = "Diese E-Mail Adresse ist nicht bei uns Registriert.";
                message.value = "";
            } else {
                errormessage.value = "";
                message.value = "Ihnen wurde eine Email zum Passwort zurücksetzen gesendet.";
                isHidden.value = true;
                
                sendEmail(email.value);
            }
        }
    }
    

    return {
        back,
        colorEmail: computed(() => {
            if (userExists.value) {
                return COLORS[1];
            } else {
                return COLORS[0];
            }
            
        }),
        email,
        reset,
        errormessage,
        message,
        toLogin,
        isHidden
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
}

#error {
    color: red;
}
</style>