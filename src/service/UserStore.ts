
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'

const state = reactive({
    errormessage: "",
    check: false, 
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>(),
})



async function sendLogin(loginRequest: LoginRequest): Promise<boolean>{
    state.check = false;
    console.log("Es wird eingeloggt.")
    await fetch(`http://localhost:9090/api/user/login`,{
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(loginRequest),
      }).then((response) => {
            if(!response.ok){
                state.check = false;
                console.log("Responsestatus: "+response.status);
                throw new Error(state.errormessage);
            }else{
                state.check = true;
            }
            return response.json();
      }).then((jsondata: JwtToken) => {
          console.log("SET TOKEN.");
          state.jwttokens.push(jsondata);
          console.log(state.jwttokens);   
      }).catch((error) => {
          state.errormessage = "Email-Adresse oder Passwort falsch." + error
      })

      console.log("RETURN");
      return state.check;
}

async function sendUser(signUpRequest: SignUpRequest){

    console.log("Sende: " + 'User ' +JSON.stringify(signUpRequest));
    await fetch(`http://localhost:9090/api/user/register`,{
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(signUpRequest)
    }).then((response) =>{
        if(!response.ok){ 
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) =>{
        console.log("JSON")
        state.errormessages = jsondata;
    }).catch((error) => {
        console.log(error)
    });

}

function getAdresses() {
    console.log("send fetch to get adresses");
    return [["Burgstraße","5","55262","Heidesheim"], ["Kurfürstenstraße","46","55118","Mainz"]];
}

export function postLoginUser(){
    return{
        errormessage: computed(() => state.errormessage),
        check: computed(() => state.check),
        sendLogin
    }
}

export function useUserStore(){
    return {
        jwttokens: computed(() => state.jwttokens),
        getAdresses
    }
}

export function postUser() {
    console.log("ERROR LÄNGE: " + state.errormessages.length);
    return{
        errormessages: computed(() => state.errormessages),
        check: computed(() => state.check),
        sendUser
    };
}
