<template>
    <div class="register">
        <h1 align="center">Registrieren</h1>
        <p id="error" align="center">{{errormessage}}</p>
        <p id="error" align="center">{{message}}</p>
        <form @submit.prevent="newUser()">
            <div class="row">
                <div class="col1"><label for="firstname" class="left">Vorname</label></div>
                <div class="col2"><input v-model="firstname" type="text" name="firstname" size="30" maxlenght="50" class="right"></div>
            </div>  
            <div class="row">
                <div class="col1"><label for="lastname" class="left">Nachname</label></div>
                <div class="col2"><input v-model="lastname" type="text" name="lastname" size="30" maxlenght="50" class="right"></div>
            </div>
            <div class="row">
                <div class="col1"><label for="email" class="left">Email-Adresse</label></div>
                <div class="col2"><input v-model="email" type="text" name="email" size="30" maxlenght="50" class="right"></div>
            </div>
            <div class="row">
                <div class="col1"><label for="birthdate" class="left">Geburtsdatum</label></div>
                <div class="col2"><input v-model="birthdate" type="date" name="birthdate" size="30" maxlenght="50" class="right"></div>
            </div>
            <div class="row">
                <div class="col1"><label for="gender" class="left">Geschlecht</label></div>
                <div class="col2">
                    <select v-model="gender" name="birthdate" class="right">
                        <option value="FEMALE">weiblich</option>
                        <option value="MALE">männlich</option>
                        <option value="DIVERSE">diverse</option>
                    </select></div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort</label></div>
                <div class="col2"><input id="pw1" v-model="password1" type="password" name="password" size="30" maxlenght="50" class="right"></div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort wiederholen</label></div>
                <div class="col2"><input id="pw2" v-model="password2" type="password" name="password" size="30" maxlenght="50" class="right"></div>
            </div>
            <input type="submit" name="registerUser" value="Registrieren">
        </form>
    </div>
</template>

<script lang="ts">
    import{ref, defineComponent} from 'vue'
    //import {postUser} from '../service/UserStore';

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
            //const {sendUser, errormessage} = postUser();

            async function newUser(): Promise<void>{
                console.log("FIRST NAME " + firstname.value + " LASTNAME " + lastname.value + " EMAIL " + email.value + " PW1 " + password1.value + " PW2 " + password2.value);
                
                //passwords the same
                if (password1.value === password2.value) {
                    const user: User = {'firstName': firstname.value,'lastName': lastname.value, 'email': email.value, 'gender' : gender.value, 'birthdate': birthdate.value, 'password': password1.value};
                    message.value="";
                    //sendUser(user);

                } else {  //different passwords
                    message.value = "Die Passwörter stimmen nicht überein.";
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
                //errormessage
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

#error {
    color: red;
    margin: 40px 0px 0px 0px;
}

</style>