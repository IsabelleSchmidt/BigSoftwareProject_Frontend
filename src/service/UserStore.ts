
import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'
import '../service/User'

const state = reactive({
    errormessage: "",
    check: false,
    jwttokens: Array<JwtToken>(),
    email: "",
    errormessages: Array<MessageResponse>(),
    allAdresses: Array<Adress>()
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
        state.email = loginRequest.email;
        console.log(state.jwttokens);
    }).catch((error) => {
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

async function getAdresses(jwttoken: JwtToken): Promise<void> {
    const adresses = new Array<Adress>();

    await fetch(`http://localhost:9090/api/user/getAdress`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(jwttoken)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: User) => {

        for (let i = 0; i < Array.from(jsondata.allAdresses).length; i++) {
            adresses.push(Array.from(jsondata.allAdresses)[i] as Adress);
        }
        state.allAdresses = adresses;
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

export function useUserStore() {
    return {
        jwttokens: computed(() => state.jwttokens),
        email: computed(() => state.email),
        adresses: computed(() => state.allAdresses),
        getAdresses,
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
