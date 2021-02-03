<template>
    <div class="compresetpw">
        <h1 align="center">Passwort zurücksetzen</h1>
        <p id="error" align="center">{{ errormessage }}</p>
        <h5 align="center">Ihre Email-Adresse: {{ $route.params.email }}</h5>
        <p align="center">{{ message }}</p>
        <form @submit.prevent="resetPassword()">
            <div class="row" v-if="!isHidden">
                <div class="col1">
                    <label for="password1" class="left">neues Passwort</label>
                </div>
                <div class="col2">
                    <input
                        v-model="password1"
                        id="pw1"
                        type="password"
                        name="pw"
                        size="30"
                        maxlenght="50"
                        class="right"
                    />
                </div>
            </div>
            <div class="row" v-if="!isHidden">
                <div class="col1">
                    <label for="password2" class="left">Passwort bestätigen</label>
                </div>
                <div class="col2">
                    <input
                        v-model="password2"
                        id="pw2"
                        type="password"
                        name="pw"
                        size="30"
                        maxlenght="50"
                        class="right"
                    />
                </div>
            </div>
            <div v-if="!isHidden">
                <input type="submit" name="resetPw" value="Passwort zurücksetzen" >
            </div>
        </form>
    </div>
</template>

<script lang = "ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useUserStore } from "../service/UserStore"
import { useEmailStore } from "../service/EmailStore"
import "@/service/Product";

export default defineComponent({
  name: "CompProducts",
  props: {
      email: String,
      code: String
  },
  setup(props) {

    const password1 = ref("");
    const password2 = ref("");

    const isHidden = ref(false);
    const COLORS = ["red", "#ccc"];

    const errormessage = ref("");
    const message = ref("");

    const { changePassword, checkIfEmailExists } = useUserStore();
    const { getCode } = useEmailStore();

    async function resetPassword() {

        errormessage.value = "";
        let exists = false;
        let allowed = false;

        const actualTime = new Date().getTime();
        const alloweddelay = 600000; //10min delay

        if (props.email) {
            exists = await checkIfEmailExists(props.email);
            const codebackend = await getCode(props.email);
            if (props.code) {
                const splitted = codebackend.split("$");
                const backendcode = splitted[0];
                const backendtimecode = Number(splitted[1]);
                 
                if (backendcode && (backendcode === props.code.split("$")[0])) {
                    if (actualTime <= (backendtimecode + alloweddelay)) {
                        allowed = true;
                    }
                }
            }
        }
        
        if (!exists) {
            errormessage.value = "Diese EmailAdresse ist ungültig."
        } else if (!allowed) {
            errormessage.value = "Ihr Zugang ist ungültig."
        } else {
            if (password1.value !== password2.value) {
                errormessage.value = "Die Passwörter stimmen nicht überein."
            } else {
                if (props.email) {
                    const npr: NewPasswordRequest = {
                        email: props.email,
                        password: password1.value,
                    };
                    if (await changePassword(npr)) {
                        message.value = "Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können das Fenster nun schließen."
                        isHidden.value =  true;
                    } else {
                        errormessage.value = "Das Passwort muss mindestens aus 8 Zeichen bestehen. Davon mindestens 1 Sonderzeichen und eine Zahl."
                    }
                }
            }
        }       

    }
    

    return {
        password1,
        password2,
        colorEmail: computed(() => {
            return COLORS[1];
        }),
        resetPassword,
        isHidden,
        message,
        errormessage
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

#pw1 {
  width: 30%;
  padding: 0.25em;
  border: 1px solid v-bind("colorEmail");
  border-radius: 3px;
  resize: vertical;
}

#pw2 {
  width: 30%;
  padding: 0.25em;
  border: 1px solid v-bind("colorEmail");
  border-radius: 3px;
  resize: vertical;
}
</style>