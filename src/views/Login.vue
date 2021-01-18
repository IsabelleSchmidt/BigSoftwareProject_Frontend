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
            <!--<router-link v-on:click="loginUser()" :to="check2 ? '/orderform' : '/login'" > Login </router-link>-->
            <!-- button machen lloginuser aufrufen ..use.router -->
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
    import { useRouter, useRoute } from 'vue-router'

    export default defineComponent({
        name:"Login",

        setup(){
            const email = ref("");
            const password = ref("");
            const loginRequest: LoginRequest = {'email':email.value, 'password':password.value};
            const {sendLogin, errormessage, check, isfetching} = postLoginUser();
            const router = useRouter();
            //const c = check;

            const COLORS = [
                "red",
                "#ccc"
            ]
                // const link = computed(()=> {
                //     const l = c ? "/login" : "/orderform"; 
                //     //router.push(l);
                //     console.log("change");
                //     return l;
                // })

                //watch wird benutzt um die check variable zu überprüfen
                //weitere if abfrage nötig wenn man sich zum beispiel ausloggen möchte
                watch(check, (neu, alt)=> {
                    console.log(`check: ${neu} vorher: ${alt}`);

                if(check.value == true ){
                        console.log("Emaaail", email.value);
                        router.push("/orderform");
                    }             
                })
                
                async function loginUser(){


                    loginRequest.email = email.value;
                    loginRequest.password = password.value;
                    // console.log('UuuuseR:', loginRequest);
                    await sendLogin(loginRequest);
                    // console.log('Ich bin nach sendlogin', loginRequest);



                    // // while(isfetching){
                    // //     console.log("--");
                    // // }
                    //     const test = check ? "/login" : "/orderform";
                    //     console.log("test", test);
                    //     router.push(test);
                    //     console.log("Check ausgabe",check.value);

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