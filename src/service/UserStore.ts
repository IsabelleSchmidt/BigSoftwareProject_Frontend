import { computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'
import '../service/User'

const state = reactive({
    errormessage: "",
    check: false,
    jwttokens: Array<JwtToken>(),
    errormessages: Array<MessageResponse>(),
    allAdresses: Array<Adress>(),
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

async function getUser(): Promise<void> {
    const adresses = new Array<Adress>();
    const token = state.jwttokens[0];
    await fetch(`http://localhost:9090/api/user/getAdress`, {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   "Authorization" : "Bearer " + token.accessToken},
    }).then((response) => {
        if (!response.ok) {
            console.log("ERROOOOOOOOOOOR");
            throw new Error(state.errormessage);
        }
        console.log("RIIIIIIICHTIG");
        return response.json();
    }).then((jsondata: User) => {

        for (let i = 0; i < Array.from(jsondata.allAdresses).length; i++) {
            adresses.push(Array.from(jsondata.allAdresses)[i] as Adress);
        }
        state.allAdresses = adresses;
        console.log("UUUUUUUUSER: " + JSON.stringify(jsondata));
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

export function useUserStore() {
    return {
        jwttokens: computed(() => state.jwttokens),
        adresses: computed(() => state.allAdresses),
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