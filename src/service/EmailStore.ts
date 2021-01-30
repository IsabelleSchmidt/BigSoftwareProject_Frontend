import { reactive } from "vue";

const state = reactive({
    send: false
});

async function sendEmail(email: string): Promise<boolean> {

    state.send = false;

    await fetch(`/api/email/send`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(email),
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
        sendEmail
    }
}