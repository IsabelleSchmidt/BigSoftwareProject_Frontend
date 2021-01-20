<template>
    <div class="login">
        <h1 align="center">Login</h1>
        <p id="error" align="center">{{errormessage}}</p>
        <form @submit.prevent="loginUser()">
            <div class="row">
                <div class="col1"><label for="email" class="left">E-Mail Adresse</label></div>
                <div class="col2"><input v-model="email" id="email" type="text" name="email" size="30" maxlenght="50" class="right"></div>
            </div>  
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort</label></div>
                <div class="col2"><input v-model="password" id="pw" type="password" name="password" size="20" maxlenght="50" class="right"></div>
            </div>
            <div class="row">    
                <button name="loginUser" value="Login" > Login</button>
            </div>
            <div class="row">    
                <router-link class="link" to="/register">Noch kein Kunde? Hier registrieren.</router-link>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

    import{postLoginUser} from '../service/UserStore'
    import{ref, defineComponent, computed, reactive, watch} from 'vue'
    import{useRouter, useRoute } from 'vue-router'

    export default defineComponent({
        name:"Login",

        setup(){
            const email = ref("");
            const password = ref("");
            const loginRequest: LoginRequest = {'email':email.value, 'password':password.value};
            const {sendLogin, errormessage, check} = postLoginUser();
            const router = useRouter();
            const COLORS = [
                "red",
                "#ccc"
            ]
               
                
                async function loginUser(){


                    loginRequest.email = email.value;
                    loginRequest.password = password.value;
                    console.log('UuuuseR:', loginRequest);
                    const loginSuccess = await(sendLogin(loginRequest));
                    if(loginSuccess){
                        console.log("Login success!");
                        router.push("/orderForm");
                    }else{
                        console.log("LOGIN FEHLGESCHLAGEN.")
                    }
                } 

            return {
                loginUser, 
                loginRequest,
                email, 
                password, 
                errormessage,
                colorEmail: computed(() => {
                    if(errormessage.value != ""){
                        return COLORS[0];
                    }else{
                        return COLORS[1];
                    }
                    
                })   
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

.link {
    margin: 4% 0% 5% 6.5%;
    color: black;
    text-decoration: none;
    list-style: none;
    list-style-type: none;
}

.link:hover {
    color:#3BA07C;
}

#pw {
    width: 30%;
    padding: 0.25em;
    border: 1px solid v-bind('colorEmail');
    border-radius:3px;
    resize: vertical;
}

#email {
    width: 30%;
    padding: 0.25em;
    border: 1px solid v-bind('colorEmail');
    border-radius:3px;
    resize: vertical;
}

</style>