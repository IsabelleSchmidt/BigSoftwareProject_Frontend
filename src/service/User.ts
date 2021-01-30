interface User {
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    password: string;
    gender: string;
    allAdresses: Set<Adress>;
    bankcard: Set<Bankcard>;
    creditcard: Set<Creditcard>;

}

interface UserMessage {
    email: string;
    message: string;
    type: string;
}