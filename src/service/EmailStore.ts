import { reactive, computed } from "vue";
import '../service/Requests';

const state = reactive({
    send: false,
    email: "",
});

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
        console.log("jsontext" + jsontext)
        code = jsontext;
    }).catch((fehler) => {
        console.log(fehler);
    });
    console.log("CODE in fetch" + code);
    return code;
}


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


export function useEmailStore() {
    return {
        code: computed(() => getCode(state.email)),
        sendEmail,
        getCode
    }
}