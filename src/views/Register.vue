<template>
    <div class="register">
        <h1 align="center">Registrieren</h1>
         <!--<p id="error" align="center">{{errormessages}}</p> -->
       <!-- <p id="error" align="center">{{errormessages}}</p>-->
        <form @submit.prevent="newUser()">
            <div class="row">
                <div class="col1"><label for="firstname" class="left"> Vorname </label></div>
                <div class="col2"><input v-model="firstname" type="text" name="firstname" size="30" maxlenght="50" class="right">
                   <div class="error"> {{firstnameerror}}</div>
                </div>
            </div>  
            <div class="row">
                <div class="col1"><label for="lastname" class="left">Nachname</label></div>
                <div class="col2"><input v-model="lastname" type="text" name="lastname" size="30" maxlenght="50" class="right">
                    <div class="error"> {{lastnameerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="email" class="left">Email-Adresse</label></div>
                <div class="col2"><input v-model="email" type="text" name="email" size="30" maxlenght="50" class="right">
                   <div class="error"> {{emailerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="birthdate" class="left">Geburtsdatum</label></div>
                <div class="col2"><input v-model="birthdate" type="date" name="birthdate" size="30" maxlenght="50" class="right">
                    <div class="error"> {{birthdateerror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="gender" class="left">Geschlecht</label></div>
                <div class="col2">
                    <select v-model="gender" name="gender" class="right">
                        <option value="FEMALE">weiblich</option>
                        <option value="MALE">männlich</option>
                        <option value="DIVERSE">diverse</option>
                    </select></div>
                    <div class="error"> {{gendererror}}</div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort</label></div>
                <div class="col2"><input id="pw1" v-model="password1" type="password" name="password" size="30" maxlenght="50" class="right">
                    <div class="error"> {{firstpassworderror}}</div>
                </div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort wiederholen</label></div>
                <div class="col2"><input id="pw2" v-model="password2" type="password" name="password" size="30" maxlenght="50" class="right">
                    <div class="error"> {{secondpassworderror}}</div> 
                </div>
            </div>
            <button id="registrierenB" onclick="check()"> </button>
            <!--<component v-bind:is="compref" @open-reg="changeComp($event)" @open-ord="toggle()" :tst="compref" />-->
             <router-link id="link" :to="{ path: '/orderform'}" > <input type="submit" name="registerUser" value="Registrieren" /> </router-link> 
        </form>
    </div> 
</template>

<script lang="ts">
    
    //import OrderForm from "OrderForm.vue"
    //import Register from "Register.vue"
    import{ref, defineComponent} from 'vue'
    import {postUser} from '../service/UserStore';

    export default defineComponent({
        name: "register",
        // components:{
        //     OrderForm,
        //     Register
        // },
    
        setup() {
            const firstname = ref("");
            const lastname = ref("");
            const email = ref("");
            const birthdate  = ref(new Date());
            const gender = ref("");
            const password1 = ref("");
            const password2 = ref("");
            const message = ref("");
            const {sendUser, errormessages} = postUser();
            console.log("Test 1:" ,errormessages.value.length);

            const firstnameerror = ref("");
            const lastnameerror = ref("");
            const emailerror = ref("");
            const birthdateerror = ref("");
            const gendererror = ref("");
            const firstpassworderror = ref("");
            const secondpassworderror = ref("");

            const check = ref(true);

            const component = "OrderForm";
            const compref = ref(component);
            const signUpRequest: SignUpRequest = {'firstName': firstname.value,'lastName': lastname.value, 'email': email.value, 'gender' : gender.value, 'birthdate': birthdate.value, 'password': password1.value};

            // function toggle(): void {
            //     if(compref.value === "Register"){
            //         compref.value = "Orderform"
            //     }else{
            //         compref.value = "Register"
            //     }
            // }

            // function changeComp(s:SignUpRequest):void{
            //     toggle();
            //     console.log("Im change comp drin ",errormessages.value.length);
            //     sendUser(s);
            // }

            async function newUser(): Promise<void>{
                //const user: User = {'firstName': firstname.value, 'lastName': lastname.value, 'email': email.value, 'birthdate': birthdate.value, 'gender': gender.value, 'password': password1.value};
                console.log("FIRSTNAME " + firstname.value + " LASTNAME " + lastname.value + " EMAIL " + email.value + " PW1 " + password1.value + " PW2 " + password2.value);
                console.log("Test 2:" ,errormessages.value.length);

                firstnameerror.value = "";
                lastnameerror.value = "";
                emailerror.value = "";
                gendererror.value = "";
                birthdateerror.value = "";
                firstpassworderror.value = "";
                secondpassworderror.value = "";

                    // if(errormessages.value.length == 0){
                    //     //hier passiert nix... es hat alles geklappt...user wird gesendet
                    //    // const signUpRequest: SignUpRequest = {'firstName': firstname.value,'lastName': lastname.value, 'email': email.value, 'gender' : gender.value, 'birthdate': birthdate.value, 'password': password1.value};
                    //     //message.value="";
                    //     //sendUser(signUpRequest);
                    //     console.log("Im if drin ",errormessages.value.length);
                    //     //const correct="Alle Eingaben sind richtig";
                    //     //message.value= correct;
                    // }

                    if(errormessages.value.length > 0){
                        //hier werden die fehler überprüft und die errormessages ausgegeben 
                        for(const error of errormessages.value){
                            if(error.field == "firstName"){
                                console.log("Er geht in firstname");
                                firstnameerror.value = error.message;
                            }
                            if(error.field == "lastName"){
                                lastnameerror.value = error.message; 
                            }
                            console.log("error.field: ", error.field);
                            if(error.field == "email"){
                                emailerror.value = error.message;
                            }
                            if(error.field == "birthdate"){
                                birthdateerror.value = error.message;
                            }
                            if(error.field == "gender"){
                                gendererror.value = error.message;
                            }
                            

                        }

                    }else{
                        //changeComp(signUpRequest);
                    }

                if (password1.value === password2.value) {
                    //const signUpRequest: SignUpRequest = {'firstName': firstname.value,'lastName': lastname.value, 'email': email.value, 'gender' : gender.value, 'birthdate': birthdate.value, 'password': password1.value};
                    message.value="";
                    // sendUser(signUpRequest);
                    secondpassworderror.value = "";
                  
                } else { 
                    password1.value = "";
                    password2.value = ""; 
                    secondpassworderror.value = "Die Passwörter stimmen nicht überein." ;
                }

                if(firstname.value == ""){
                    firstnameerror.value = "Bitte fülle dieses Feld aus";
                }
                if(lastname.value == ""){
                    lastnameerror.value = "Bitte fülle dieses Feld aus";
                }
                if(email.value == ""){
                    emailerror.value = "Bitte fülle dieses Feld aus";
                }
                if(gender.value == ""){
                    gendererror.value = "Bitte fülle dieses Feld aus";
                }
                if(password1.value == ""){
                    firstpassworderror.value = "Bitte fülle dieses Feld aus";
                }
                if(password2.value == ""){
                    secondpassworderror.value = "Bitte fülle dieses Feld aus";
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
                firstnameerror,
                lastnameerror,
                emailerror,
                birthdateerror,
                gendererror,
                firstpassworderror,
                secondpassworderror,
                errormessages,
                component,
                compref,
                check
                // toggle,
                // changeComp
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

.error {
    color: red;
    margin: 5px 0px 0px 0px;
}

</style>