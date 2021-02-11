import {computed, reactive } from 'vue'
import '../service/Requests'
import '../service/Response'
import '../service/User'

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
    jwttokens: Array<JwtToken>(),
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
        state.jwttokens.push(jsondata);
        console.log(state.jwttokens);
    }).catch((error) => {
        console.log(error);
        state.errormessage = "Email-Adresse oder Passwort falsch."
    })

    console.log("RETURN");
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
        console.log(error)
    });

}

/**
 * sends a request to the server to logout a user that's logged in
 */
async function logoutUser(){
    const token = state.jwttokens[0];
    await fetch(`http://localhost:9090/api/user/logout`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",
        "Authorization" : "Bearer " + token.accessToken},
    }).then((response) =>{
        if(!response.ok){
            throw new Error(state.errormessage);
        }
        state.jwttokens = new Array<JwtToken>();
        return response.json();
    }).then((jsondata: Array<MessageResponse>) => {
        console.log("ERRORMESSAGES: " + JSON.stringify(jsondata));
        state.errormessages = jsondata;
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });

}

/**
 * fetches a user's information from the server
 */
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
        
    }).catch((exception) => {
        console.log(exception)
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
        
    }).catch((exception) => {
        console.log(exception)
    });
    console.log("Success: " + success);
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
        errormessage: computed(() => state.errormessage),
        sendLogin
    }
}

export function getLogoutUser() {
    return {
        errormessages: computed(() => state.errormessage),
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