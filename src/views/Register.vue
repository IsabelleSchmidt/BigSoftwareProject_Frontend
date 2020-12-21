<template>
    <div class="register">
        <h1 align="center">Registrieren</h1>
        <form action="">
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
                <div class="col1"><label for="password" class="left">Passwort</label></div>
                <div class="col2"><input v-model="password" type="text" name="password" size="30" maxlenght="50" class="right"></div>
            </div>
            <div class="row">
                <div class="col1"><label for="password" class="left">Passwort wiederholen</label></div>
                <div class="col2"><input v-model="password" type="text" name="password" size="30" maxlenght="50" class="right"></div>
            </div>
            <input type="submit" name="registerUser" value="Registrieren">
        </form>
    </div>
</template>

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

</style>