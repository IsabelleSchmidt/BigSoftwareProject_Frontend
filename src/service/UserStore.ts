
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'

const state = reactive({
    errormessage: "",
    check: false, //hier wieder false machen
    jwttokens: Array<JwtToken>(),
    email: "",
    errormessages: Array<MessageResponse>(),
    isfetching: false,
    allAdresses: Array<Adress>()
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
          state.email = loginRequest.email;
          console.log(state.jwttokens);   
      }).catch((error) => {
          state.errormessage = "Email-Adresse oder Passwort falsch."
      })
}

async function sendUser(signUpRequest: SignUpRequest) {
    console.log("Sende: " + 'User ' +JSON.stringify(signUpRequest));
    await fetch(`http://localhost:9090/api/user/register`,{
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(signUpRequest)
    }).then((response) =>{
        if(!response.ok){
            throw new Error(state.errormessage);
            state.check = false;
        }
        console.log("REGISTRIERUNG GUT");
        return response.json();
    }).then((jsondata: Array<MessageResponse>) =>{
        state.errormessages = jsondata;
        if(state.errormessages.length == 0){
            console.log(`Im Fetch. Errorm länge: ${state.errormessages.length}`);
            state.check = true;
            console.log(`Im Fetch. Check status wenn länge null: ${state.check}`);
        }else{
            state.check = false;
        }
        //state.check = false;
    }).catch((error) => {
        console.log(error)
    });

    //Ziel -> response in Array<ResponseMessage> umwandeln -> Array von errors in errormessages speichern
    
}

async function getAdresses(e: string): Promise<void> {
    console.log("send fetch to get adresses: " + e);

    const adresses = new Array<Adress>();

    fetch(`http://localhost:9090/api/user/email/${e}`,{
        method: 'GET'
    }).then((response) => {
        if(!response.ok){
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<Adress>) => {
        for(let i = 0; i < jsondata.length; i++){
            adresses.push(jsondata[i]);
          }
          state.allAdresses = adresses;
    }).catch((fehler) => {
        //fehler.state.errormessage("Fehler bei der Serverkommunikation");
        //state.liste = alt;
        console.log(fehler);
    });   
    console.log("Adresses nachm Fetch: " + JSON.stringify(state.allAdresses));
    // const adr1: Adress = {streetName: "Burgstraße", houseNumber: "5", postCode: "55262", city: "Heidesheim"};
    // adresses.push(adr1);
    // const adr2: Adress = {streetName: "Kurfürstenstraße", houseNumber: "46", postCode: "55118", city: "Mainz"};
    // adresses.push(adr2);
    // return adresses;
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
        email: computed(() => state.email),
        adresses: computed(() => state.allAdresses),
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
