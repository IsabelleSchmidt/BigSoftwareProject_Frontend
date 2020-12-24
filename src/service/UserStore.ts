import Vue from 'vue'
import { reactive } from 'vue'
//////////////////////////////////////////////////////////////////////////////

import { computed } from 'vue'
import '../service/User'

async function sendLogin(loginUser: User){
    console.log("Sende User mit Namen: " + loginUser.email + "und Passwort: " + loginUser.password + "an backend.");
    console.log("Sende: " + 'User ' +JSON.stringify(loginUser));
    fetch(`http://localhost:9090/api/user/login`,{
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(loginUser)
    }).then((response) =>{
        console.log(response);

    }).catch((exception) => {
        console.log(exception);
    });
}

export function postLoginUser(){
    return{
        sendLogin
    }
}
