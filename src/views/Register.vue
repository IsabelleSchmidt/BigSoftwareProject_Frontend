<template>
  <div class="register">
    <h1 align="center">Registrieren</h1>
    <form @submit.prevent="newUser()">
      <div class="row">
        <div class="col1">
          <label for="firstname" class="left"> Vorname&lowast; </label>
        </div>
        <div class="col2">
          <input
            v-model="firstname"
            type="text"
            name="firstname"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="error">{{ firstnameerror }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="lastname" class="left">Nachname&lowast;</label>
        </div>
        <div class="col2">
          <input
            v-model="lastname"
            type="text"
            name="lastname"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="error">{{ lastnameerror }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="email" class="left">Email-Adresse&lowast;</label>
        </div>
        <div class="col2">
          <input
            v-model="email"
            type="text"
            name="email"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="error">{{ emailerror }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="birthdate" class="left">Geburtsdatum&lowast;</label>
        </div>
        <div class="col2">
          <input
            v-model="birthdate"
            type="date"
            name="birthdate"
            :min="minDate"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="error">{{ birthdateerror }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="gender" class="left">Geschlecht&lowast;</label>
        </div>
        <div class="col2">
          <select v-model="gender" name="gender" required>
            <option value="FEMALE">weiblich</option>
            <option value="MALE">männlich</option>
            <option value="DIVERSE">divers</option>
          </select>
          <div class="error">{{ gendererror }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="password" class="left">Passwort&lowast;</label>
        </div>
        <div class="col2">
          <input
            id="pw1"
            v-model="password1"
            type="password"
            name="password"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="correct">
            &#10047; Das Passwort muss mindestens 8 Zeichen besitzen.
          </div>
          <div class="correct">
            &#10047; Das Passwort muss mindestens ein Sonderzeichen besitzen.
          </div>
          <div class="correct">
            &#10047; Das Passwort muss mindestens eine Zahl besitzen.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col1">
          <label for="password" class="left"
            >Passwort wiederholen&lowast;</label
          >
        </div>
        <div class="col2">
          <input
            id="pw2"
            v-model="password2"
            type="password"
            name="password"
            size="30"
            maxlenght="50"
            class="right"
            required
          />
          <div class="error">{{ password2error }}</div>
          <div class="error">{{ password1error }}</div>
        </div>
      </div>
      <div class="row"> 
         <input type="submit" name="registerUser" value="Registrieren" />
      </div>
      <div class="row">    
          Bereits regestriert? <router-link id="link" to="/login">Hier einloggen</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { postUser } from "../service/UserStore";
import { ref, defineComponent} from "vue";
import { useRouter} from "vue-router";

export default defineComponent({
  name: "register",

  setup() {
    /**
     * a user's email adress
     */
    const email = ref("");
    /**
     * a user's firstname
     */
    const firstname = ref("");
    /**
     * a user's surname
     */
    const lastname = ref("");
    /**
     * a user's birthdate
     */
    const birthdate = ref(new Date());
    /**
     * the user's gender
     */
    const gender = ref("");
    /**
     * the user's new password
     */
    const password1 = ref("");
    /**
     * confirmation of the new password
     */
    const password2 = ref("");
    /**
     * error that might've occured while trying to register
     */
    const message = ref("");
    const minDate = "1921-02-12"

    const { sendUser, errormessages, check } = postUser();
    const router = useRouter();
    /**
     * error that occured in the firstname field of the form
     */
    const firstnameerror = ref("");
     /**
     * error that occured in the lastname field of the form
     */
    const lastnameerror = ref("");
     /**
     * error that occured in the email field of the form
     */
    const emailerror = ref("");
     /**
     * error that occured in the birthdate field of the form
     */
    const birthdateerror = ref("");
     /**
     * error that occured in the gender field of the form
     */
    const gendererror = ref("");
     /**
     * error that occured in the new password field of the form
     */
    const password1error = ref("");
     /**
     * error that occured in the password confirmation field of the form
     */
    const password2error = ref("");

  /**
   * sends a registrationrequest to the server
   * and fills out the errorfields with errors if they occured
   */
    async function newUser(): Promise<void> {


      if (password1.value == password2.value) {
        const signUpRequest: SignUpRequest = {
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value,
          gender: gender.value,
          birthdate: birthdate.value,
          password: password1.value,
        };
        message.value = "";

        firstnameerror.value = "";
        lastnameerror.value = "";
        emailerror.value = "";
        birthdateerror.value = "";
        gendererror.value = "";
        password1error.value = "";
        password2error.value = "";

        const wasregistered = await sendUser(signUpRequest);
        if(!wasregistered){
          if (errormessages.value.length > 0) {
            for (const error of errormessages.value) {
              if (error.field == "firstName") {
                firstnameerror.value = error.message;
              }
              if (error.field == "lastName") {
                lastnameerror.value = error.message;
              }
              if (error.field == "email") {
                emailerror.value = error.message;
              }
              if (error.field == "birthdate") {
                birthdateerror.value = error.message;
              }
              if (error.field == "gender") {
                gendererror.value = error.message;
              }
              if (error.field == "password") {
                password1error.value = error.message;
              }
            }
          }
        }else{
          router.push("/login");
        }
      } 
      else {
        password2error.value = "Die Passwörter stimmen nicht überein";
        password1.value = "";
        password2.value = "";
      }
    }

    return {
      newUser,
      firstname,
      lastname,
      email,
      birthdate,
      gender,
      password1,
      password2,
      message,
      errormessages,
      firstnameerror,
      lastnameerror,
      emailerror,
      gendererror,
      birthdateerror,
      password1error,
      password2error,
      check,
      minDate
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
    margin: 5% 0% 2.5% 15%;
}
#pw1{
    width: 30%;
    padding: 0.25em;
    border: 1px solid $color-grey3;
    border-radius:3px;
    resize: vertical;

}

#pw2{
    width: 30%;
    padding: 0.25em;
    border: 1px solid $color-grey3;
    border-radius:3px;
    resize: vertical;
}

.right {
  margin-top: 0.55em;
}

.error {
  color: red;
  margin: 5px 0px 1px 0px;
  font-size: 0.8em;
}

#registerB{
    padding: 0%;
    visibility: hidden;
}

#link {
    text-decoration: none;
    list-style: none;
    list-style-type: none;
    color: $color-green;
}

.correct{
    color: black;
    margin-bottom: 0.15em;
    font-size: 0.55em;
}

</style>