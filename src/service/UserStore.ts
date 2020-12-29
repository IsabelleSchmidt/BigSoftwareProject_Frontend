
import { computed, reactive } from 'vue'
import '../service/LoginRequest'
import '../service/JwtToken'

const state = reactive({
    errormessage: "",
    jwttokens: Array<JwtToken>()
})


async function sendLogin(loginRequest: LoginRequest){
    console.log("Es wird eingeloggt.")
    fetch(`http://localhost:9090/api/auth/login`,{
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(loginRequest),
      }).then((response) => {
            if(!response.ok){
                console.log("HIER: " + response.status);
                throw new Error(state.errormessage);
            }
            return response.json();
      }).then((jsondata: JwtToken) => {
          state.jwttokens.push(jsondata);
          console.log(state.jwttokens);   
      }).catch((error) => {
          state.errormessage = "Email-Adresse oder Passwort falsch."
      })
}

// async function sendUser(newUser: User) {
//     console.log("Sende: " + 'User ' +JSON.stringify(newUser));
//     fetch(`http://localhost:9090/api/user/new`,{
//       method: 'POST',
//       headers: {"Content-Type":"application/json"},
//       body: JSON.stringify(newUser)
//     }).then((response) =>{
//         if(!response.ok){
//             console.log("response not okay");
//             throw new Error(state.errormessage);
//         }
//         console.log("response okay");
//         return response.json();

//     }).then((jsondata: Array<UserMessage>) => {
//         for (let i = 0; i < jsondata.length; i++) {
//             state.errormessage+=jsondata[i].type + ": " + jsondata[i].message + "; ";  
//           }
//           console.log("ERROOOOOOOOOOOOOOR: " + state.errormessage);
//     }).catch((exception) => {
//         state.errormessage = exception;
//         console.log("catch Error: " + state.errormessage);
//     });
// }

export function postLoginUser(){
    return{
        errormessage: computed(() => state.errormessage),
        sendLogin
    }
}

// export function postUser() {
//     return{
//         errormessage: computed(() => state.errormessage),
//         sendUser
//     };
// }
