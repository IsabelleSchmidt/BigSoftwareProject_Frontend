<template>
    <div class="login">
        <h1 align="center">Login</h1>
        <form @submit.prevent="loginUser()">
            <div class="row">
                <div class="col1"><label for="email" class="left">E-Mail Adresse</label></div>
                <div class="col2"><input v-model="email" type="text" name="email" size="30" maxlenght="50" class="right"></div>
            </div>  
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort</label></div>
                <div class="col2"><input v-model="password" id="pw" type="password" name="password" size="20" maxlenght="50" class="right"></div>
            </div>
            <div class="row">    
            <input type="submit" name="loginUser" value="Login">
            </div>
            <div class="row">    
                <router-link class="link" to="/register">Noch kein Kunde? Hier registrieren.</router-link>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

    import{postLoginUser} from '../service/UserStore'
    import{ref, defineComponent} from 'vue'

    export default defineComponent({
        name:"Login",

        setup(){
            const email = ref("");
            const password = ref("");
            const user: User = {'firstname':"",'lastname':"", 'email': email.value, 'password':password.value};
            const {sendLogin} = postLoginUser();

            async function loginUser(): Promise<void>{
                console.log("Emaaail", email.value);
                user.email = email.value;
                user.password = password.value;
                console.log('UuuuseR:', user);
                sendLogin(user);
            } 

            return {loginUser, user, email, password};
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

#pw {
    width: 30%;
    padding: 0.25em;
    border: 1px solid #ccc;
    border-radius:3px;
    resize: vertical;
}

</style>