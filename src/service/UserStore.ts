import {computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'
import '../service/User'

const jwtToken1: JwtToken = {email: "", roles: new Array<string>(), accessToken: "" };

const state = reactive({
    /**
     * the message that's placed when a login was unsuccessful
     */
    errormessage: "",
    /**
     * describes whether a login was successful
     */
    check: false,
    /**
     * Array of authentification tokens
     */
    jwttoken:  jwtToken1,
    /**
     * Array of messages describing (validation)errors
     */
    errormessages: Array<MessageResponse>(),
    /**
     * a user's saved adresses
     */
    allAdresses: Array<Adress>(),
    /**
     * a user's saved bankcards
     */
    bankcard: Array<Bankcard>(),
    /**
     * a user's saved creditcards
     */
    creditcard: Array<Creditcard>(),
    /**
     * a user
     */
    user : Array<User>()
})

/**
 * Resets everything in context with the user.
 */
function resetUser(){
    state.jwttoken.accessToken = "";
    state.jwttoken.email = "";
    state.jwttoken.roles = [];
    state.allAdresses = [];
    state.bankcard = [];
    state.creditcard = [];
    state.user = [];
}

/**
 * Sends a request to the server to login an existing user
 * @param loginRequest information needed to login
 */
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
        state.jwttoken = jsondata;
    }).catch(() => {
        state.errormessage = "Email-Adresse oder Passwort falsch."
    })

    return state.check;
}

/**
 * sends a request to the server to signup a new user
 * @param signUpRequest information needed to sign up
 */
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
        console.error(error);
    });

}

/**
 * sends a request to the server to logout a user that's logged in
 */
async function logoutUser(){
    const token: JwtToken = state.jwttoken;
    state.errormessage = "";
    state.errormessages = [];
    await fetch(`http://localhost:9090/api/user/logout`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",
        "Authorization" : "Bearer " + token.accessToken},
    }).then((response) =>{
        if(!response.ok){
            throw new Error(state.errormessage);
        }
        return response.json();
    }).then((jsondata: Array<MessageResponse>) => {
        state.errormessages = jsondata;
    }).catch((error) => {
       console.error(error);
    });

}

/**
 * fetches a user's information from the server
 */
async function getUser(): Promise<void> {
    const adresses = new Array<Adress>();
    const bankcards = new Array<Bankcard>();
    const creditcards = new Array<Creditcard>();
    const token: JwtToken = state.jwttoken;
    await fetch(`http://localhost:9090/api/user/getUser`, {
        method: 'GET',
        headers: { "Content-Type": "application/json",
                   "Authorization" : "Bearer " + token.accessToken},
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

        for (let i = 0; i < Array.from(jsondata.bankcard).length; i++) {
            bankcards.push(Array.from(jsondata.bankcard)[i] as Bankcard);
        }
        state.bankcard= bankcards;
        
        for (let i = 0; i < Array.from(jsondata.creditcard).length; i++) {
            creditcards.push(Array.from(jsondata.creditcard)[i] as Creditcard);  
        }
        state.creditcard = creditcards;
        state.user.push(jsondata);
    }).catch((error) => {
        console.error(error);
    });
}

/**
 * checks whether a given email is linked to an existing user
 * @param email email to be checked
 */
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
        
    }).catch((error) => {
        console.error(error)
    });

    return exists;
} 

/**
 * sends a request to the server to change an existing user's password
 * @param npr password request that's sent to the server
 */
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
        
    }).catch((error) => {
        console.error(error)
    });
    return success;

}

/**
 * sets the value of the errormessage to an empty string
 */
function reseterrormessage() {
    state.errormessage = "";
}



export function postLoginUser() {
    return {
        jwttoken: computed(() => state.jwttoken),
        errormessage: computed(() => state.errormessage),
        sendLogin
    }
}

export function getLogoutUser() {
    return {
        errormessages: computed(() => state.errormessage),
        jwttoken: computed(() => state.jwttoken),
        logoutUser
    }
}

export function useUserStore() {
    return {
        jwttoken: computed(() => state.jwttoken),
        adresses: computed(() => state.allAdresses),
        bankcards: computed(() => state.bankcard),
        creditcards: computed(() => state.creditcard),
        user: computed(() => state.user),
        getUser,
        reseterrormessage,
        checkIfEmailExists,
        changePassword,
        resetUser
    }
}

export function postUser() {
    return {
        errormessages: computed(() => state.errormessages),
        check: computed(() => state.check),
        sendUser
    };
}