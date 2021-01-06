
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'

const state = reactive({
    errormessage: "",
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>()
})


async function sendLogin(loginRequest: LoginRequest){
    console.log("Es wird eingeloggt.")
    fetch(`http://localhost:9090/api/user/login`,{
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(loginRequest),
      }).then((response) => {
            if(!response.ok){
                console.log("HIER: " + response.status);
                throw new Error(state.errormessage);
            }
            return response.json();
      }).then((jsondata: JwtToken) => {
          state.jwttokens.push(jsondata);
          console.log(state.jwttokens);   
      }).catch((error) => {
          state.errormessage = "Email-Adresse oder Passwort falsch."
      })
}

async function sendUser(signUpRequest: SignUpRequest) {
    console.log("Sende: " + 'User ' +JSON.stringify(signUpRequest));
    fetch(`http://localhost:9090/api/user/register`,{
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(signUpRequest)
    }).then((response) =>{
        if(!response.ok){
            throw new Error(state.errormessage);
        }
        console.log("REGISTRIERUNG GUT");
        return response.json();
    }).then((jsondata: Array<MessageResponse>) =>{
        state.errormessages = jsondata;
        console.log("ERROROROROROROROROROROR : " + state.errormessages.length);
    }).catch((exception) => {
        console.log(exception)
    });

    //Ziel -> response in Array<ResponseMessage> umwandeln -> Array von errors in errormessages speichern
    
}

export function postLoginUser(){
    return{
        errormessage: computed(() => state.errormessage),
        sendLogin
    }
}

export function postUser() {
    console.log("ERROR LÄNGE: " + state.errormessage.length);
    return{
        errormessages: computed(() => state.errormessages),
        sendUser
    };
}
