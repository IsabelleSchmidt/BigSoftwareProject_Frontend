
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
    await fetch(`/api/user/login`, {
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
    }).catch((error) => {
        state.errormessage = "Email-Adresse oder Passwort falsch."
    })

    return state.check;
}

async function sendUser(signUpRequest: SignUpRequest) {

    await fetch(`/api/user/register`, {
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

    await fetch(`/api/user/getAdress`, {
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

async function checkIfEmailExists(email: string): Promise<boolean> {
    let exists = false;

    await fetch(`/api/user/checkByEmail/${email}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    }).then((jsondata: MessageResponse) => {
        
        if (!jsondata.message)
            exists = true;
        
    }).catch((exception) => {
        console.log(exception)
    });

    return exists;
} 

async function changePassword(npr: NewPasswordRequest) {
    let success = false;

    await fetch(`/api/user/changePassword`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(npr)
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    }).then((jsondata: MessageResponse) => {
        
        if (!jsondata.message)
            success = true;
        
    }).catch((exception) => {
        console.log(exception)
    });
    console.log("Success: " + success);
    return success;

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
        checkIfEmailExists,
        changePassword
    }
}

export function postUser() {
    return {
        errormessages: computed(() => state.errormessages),
        check: computed(() => state.check),
        sendUser
    };
}
