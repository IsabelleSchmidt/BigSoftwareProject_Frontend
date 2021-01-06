
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'

const state = reactive({
    errormessage: "",
    check: false,
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>(),
    isfetching: false
})



async function sendLogin(loginRequest: LoginRequest){
    console.log("Es wird eingeloggt.")
    state.isfetching = true;
    fetch(`http://localhost:9090/api/user/login`,{
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(loginRequest),
      }).then((response) => {
            if(!response.ok){
                state.check = false;
                console.log("false", state.check);
                state.isfetching = false;
                throw new Error(state.errormessage);
            }
            state.check = true;
            console.log("true", state.check);
            state.isfetching = false;
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
    fetch(`http://localhost:9090/api/auth/register`,{
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
        console.log(" TEST 0: Userstore",state.errormessages.length);

    }).catch((exception) => {
        console.log(exception)
    });

    //Ziel -> response in Array<ResponseMessage> umwandeln -> Array von errors in errormessages speichern
    
}

export function postLoginUser(){
    return{
        errormessage: computed(() => state.errormessage),
        check: computed(() => state.check),
        isfetching: computed(()=> state.isfetching),
        sendLogin
    }
}

export function postUser() {
    return{
        errormessages: computed(() => state.errormessages),
        sendUser
    };
}
