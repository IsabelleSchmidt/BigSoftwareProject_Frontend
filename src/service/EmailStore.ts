import { reactive, computed } from "vue";
import '../service/Requests';

const state = reactive({
    send: false,
    email: "",
});

/**
 * fetches an encoded string from the backend
 * @param email a user's email adress
 */
async function getCode(email: string){
    let code = "";
    await fetch(`/api/email/getCode/${email}`, {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.text();
    }).then((jsontext: string) => {
        code = jsontext;
    }).catch((fehler) => {
        console.log(fehler);
    });
    return code;
}

/**
 * sends a request to the backend where
 * an email will be sent, so that a user can reset their password for login
 * @param email a user's email adress
 */
async function sendEmail(email: string): Promise<boolean> {

    state.send = false;
    state.email = email;

    await fetch(`/api/email/send`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(email)
    }).then((response) => {
        if (!response.ok) {
            state.send = false;
            throw new Error();
        } else {
            state.send = true;
        }
        return response.json();
    }).catch((error) => {
        console.log(error);
    })

    return state.send;
}

/**
 * exports important functions and attributes
 */
export function useEmailStore() {
    return {
        code: computed(() => getCode(state.email)),
        sendEmail,
        getCode
    }
}