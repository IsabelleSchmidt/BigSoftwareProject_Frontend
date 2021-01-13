<template>
    <div class="register">
        <h1 align="center">Registrieren</h1>
        <form @submit.prevent="newUser()" >
            <div class="row">
                <div class="col1"><label for="firstname" class="left"> Vorname&lowast; </label></div>
                <div class="col2"><input v-model="firstname" type="text" name="firstname" size="30" maxlenght="50" class="right" required>
                    <div class="error" > {{firstnameerror}} </div>
                </div>
            </div>  
            <div class="row">
                <div class="col1"><label for="lastname" class="left">Nachname&lowast;</label></div>
                <div class="col2"><input v-model="lastname" type="text" name="lastname" size="30" maxlenght="50" class="right" required>
                   <div class="error" > {{lastnameerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="email" class="left">Email-Adresse&lowast;</label></div>
                <div class="col2"><input v-model="email" type="text" name="email" size="30" maxlenght="50" class="right" required>
                   <div class="error" > {{emailerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="birthdate" class="left">Geburtsdatum&lowast;</label></div>
                <div class="col2"><input v-model="birthdate" type="date" name="birthdate" size="30" maxlenght="50" class="right" required>
                   <div class="error"> {{birthdateerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="gender" class="left">Geschlecht&lowast;</label></div>
                <div class="col2">
                    <select v-model="gender" name="gender" class="right" required>
                        <option value="FEMALE">weiblich</option>
                        <option value="MALE">männlich</option>
                        <option value="DIVERSE">divers</option>
                    </select>
                    <div class="error"> {{gendererror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort&lowast;</label></div>
                <div class="col2"><input id="pw1" v-model="password1" type="password" name="password" size="30" maxlenght="50" class="right" required>
               <div class="correct"> &#10047; Das Passwort muss mindestens 8 Zeichen besitzen</div>
               <div class="correct"> &#10047; Das Passwort muss mindestens ein Sonderzeichen besitzen</div>
               <div class="correct"> &#10047; Das Passwort mus mindestens eine Zahl besitzen</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort wiederholen&lowast;</label></div>
                <div class="col2"><input id="pw2" v-model="password2" type="password" name="password" size="30" maxlenght="50" class="right" required>
                   <div class="error"> {{password2error}}</div>
                   <div class="error"> {{password1error}}</div>
                </div>
            </div>
            <button name="newUser" value="Register" > Registrieren </button>
        </form>
    </div> 
</template>

<!-- <script src="https://cdn.jsdelivr.net/npm/vue"></script>
 <script src="/src/vuelidate.min.js"></script>
 <script src="/src/validators.min.js"></script> --> 
<script lang="ts">
    import {postUser} from '../service/UserStore';
    import{ref, defineComponent, reactive, watch} from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    export default defineComponent({
        name: "register",
    
        setup() {
            
            const firstname = ref("");
            const lastname = ref("");
            const email = ref("");
            const birthdate  = ref(new Date());
            const gender = ref("");
            const password1 = ref("");
            const password2 = ref("");
            const message = ref("");

            const {sendUser, errormessages, check} = postUser();
            const router = useRouter();

            const firstnameerror = ref("");
            const lastnameerror = ref("");
            const emailerror = ref("");
            const birthdateerror = ref("");
            const gendererror = ref("");
            const password1error = ref("");
            const password2error = ref("");

            async function newUser(): Promise<void>{
                console.log("FIRSTNAME " + firstname.value + " LASTNAME " + lastname.value + " EMAIL " + email.value + " PW1 " + password1.value + " PW2 " + password2.value);


                if(password1.value == password2.value){
                    const signUpRequest: SignUpRequest = {'firstName': firstname.value,'lastName': lastname.value, 'email': email.value, 'gender' : gender.value, 'birthdate': birthdate.value, 'password': password1.value};
                    message.value = "";
                    console.log(`SENDE ${signUpRequest}`);


                    firstnameerror.value = "";
                    lastnameerror.value = "";
                    emailerror.value = "";
                    birthdateerror.value = "";
                    gendererror.value = "";
                    password1error.value = "";
                    password2error.value = "";

                    await sendUser(signUpRequest);

                    if(errormessages.value.length > 0){
                        for(const error of errormessages.value){
                            if(error.field == "firstName" ){
                                firstnameerror.value = error.message;
                            }
                            if(error.field == "lastName"){
                                lastnameerror.value = error.message; 
                            }
                            if(error.field == "email"){
                                emailerror.value = error.message;
                            }
                            if(error.field == "birthdate"){
                                birthdateerror.value = error.message;
                            }
                            if(error.field == "gender"){
                                gendererror.value = error.message;
                            }
                            if(error.field == "password"){
                                password1error.value = error.message;
                            }
                        }
                    }else{
                        router.push("/login");
                    }
                }else{
                    password2error.value = "Die Passwörter stimmen nicht überein";
                    password1.value = "";
                    password2.value = "";
                }                        
            }


            // function ruleCheck() {
            // }

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
                check
            };
        }
    });
</script>

<style scoped lang="scss">

form{
    margin: 5% 0% 15% 35%;
}
label{
    padding: 12px 12px 12px 0;
    display: inline-block;
}
.col1{
    float: left;
    width: 25%;
}

.col2{
    float: left;
    width:75%;
}

.row:after{
    content:"";
    display: table;
    clear: both;
}
.row{
    align-content: center;
}
input:focus{
    outline-color: #3BA07C;
}
input[type=text]{
    width: 30%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius:3px;
    resize: vertical;
}
input[type=submit]{
    margin: 5% 0% 0% 15%;
    padding: 1% 5%;
    background-color: black;
    border-style: none;
    color: #fff;
    &:hover{
        background-color: #3BA07C;
    }
    &:focus{
        outline: none;
    }
}
#pw1{
    width: 30%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius:3px;
    resize: vertical;

}

#pw2{
    width: 30%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius:3px;
    resize: vertical;

}

.right{
    margin-top: 0.55em;
}

.error {
    color: red;
    margin: 5px 0px 1px 0px;
    font-size: 0.8em;
}

button{
    margin: 5% 0% 5% 15%;
    padding: 1% 5%;
    background-color: black;
    border-style: none;
    color: #fff;
    &:hover{
        background-color: #3BA07C;
    }
    &:focus{
        outline: none;
    }
}

.correct{
    color: black;
    margin-bottom: 0.15em;
    font-size: 0.55em;
}

</style>