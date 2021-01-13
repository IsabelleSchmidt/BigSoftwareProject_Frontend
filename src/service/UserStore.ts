
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'

const state = reactive({
    errormessage: "",
    check: false, //hier wieder false machen
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>(),
    isfetching: false
})



function sendLogin(loginRequest: LoginRequest){
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
            console.log('Jetzt bin ich im fetch');
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
    
}

function getAdresses() {
    console.log("send fetch to get adresses");
    return [["Burgstraße","5","55262","Heidesheim"], ["Kurfürstenstraße","46","55118","Mainz"]];
}

export function postLoginUser(){
    return{
        errormessage: computed(() => state.errormessage),
        check: computed(() => state.check),
        isfetching: computed(()=> state.isfetching),
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
    // console.log("ERROR LÄNGE: " + state.errormessage.length);
    return{
        errormessages: computed(() => state.errormessages),
        sendUser
    };
}
