import {computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'
import '../service/User'

const state = reactive({
    errormessage: "",
    check: false,
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>(),
    allAdresses: Array<Adress>(),
    bankcard: Array<Bankcard>(),
    creditcard: Array<Creditcard>(),
    user : Array<User>()
})



async function sendLogin(loginRequest: LoginRequest): Promise<boolean> {
    state.check = false;
    console.log("Es wird eingeloggt.")
    await fetch(`http://localhost:9090/api/user/login`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(loginRequest),
    }).then((response) => {
        if (!response.ok) {
            state.check = false;
            throw new Error(state.errormessage);
        } else {
            state.check = true;
        }
        return response.json();
    }).then((jsondata: JwtToken) => {
        state.jwttokens.push(jsondata);
        console.log(state.jwttokens);
    }).catch((error) => {
        console.log(error);
        state.errormessage = "Email-Adresse oder Passwort falsch."
    })

    console.log("RETURN");
    return state.check;
}

async function sendUser(signUpRequest: SignUpRequest) {

    console.log("Sende: " + 'User ' + JSON.stringify(signUpRequest));
    await fetch(`http://localhost:9090/api/user/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpRequest)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) => {
        state.errormessages = jsondata;
    }).catch((error) => {
        console.log(error)
    });

}

async function logoutUser(logoutRequest: LogoutRequest){
    const token = state.jwttokens[0];
    await fetch(`http://localhost:9090/api/user/logout`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(logoutRequest),
    }).then((response) =>{
        if(!response.ok){
            state.errormessage = "Logout not successful.";
            throw new Error(state.errormessage);
        }
        state.jwttokens = new Array<JwtToken>();
        return response.json();
        
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });

}

async function getUser(): Promise<void> {
    const adresses = new Array<Adress>();
    const bankcards = new Array<Bankcard>();
    const creditcards = new Array<Creditcard>();
    const token = state.jwttokens[0];
    await fetch(`http://localhost:9090/api/user/getUser`, {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   "Authorization" : "Bearer " + token.accessToken},
    }).then((response) => {
        if (!response.ok) {
            throw new Error(state.errormessage);
        }
        console.log();
        return response.json();
    }).then((jsondata: User) => {

        for (let i = 0; i < Array.from(jsondata.allAdresses).length; i++) {
            adresses.push(Array.from(jsondata.allAdresses)[i] as Adress);
        }
        state.allAdresses = adresses;

        for (let i = 0; i < Array.from(jsondata.bankcard).length; i++) {
            bankcards.push(Array.from(jsondata.bankcard)[i] as Bankcard);
        }
        state.bankcard= bankcards;
        console.log("Bancard userstore inhalt", jsondata.bankcard.values)
        
        for (let i = 0; i < Array.from(jsondata.creditcard).length; i++) {
            creditcards.push(Array.from(jsondata.creditcard)[i] as Creditcard);  
        }
        state.creditcard = creditcards;
        console.log("creditcard userstore inhalt", state.creditcard)

        state.user.push(jsondata);
    }).catch((fehler) => {
        console.log(fehler);
    });
}

function reseterrormessage() {
    state.errormessage = "";
}

export function postLoginUser() {
    return {
        errormessage: computed(() => state.errormessage),
        sendLogin
    }
}

export function getLogoutUser() {
    return {
        errormessage: computed(() => state.errormessage),
        jwttokens: computed(() => state.jwttokens),
        logoutUser
    }
}

export function useUserStore() {
    return {
        jwttokens: computed(() => state.jwttokens),
        adresses: computed(() => state.allAdresses),
        bankcards: computed(() => state.bankcard),
        creditcards: computed(() => state.creditcard),
        user: computed(() => state.user),
        getUser,
        reseterrormessage,

    }
}

export function postUser() {
    return {
        errormessages: computed(() => state.errormessages),
        check: computed(() => state.check),
        sendUser
    };
}