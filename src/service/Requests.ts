interface LoginRequest{
    email: string;
    password: string;
}

interface SignUpRequest{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    birthdate: Date;
}
interface Adress{
    streetName: string;
    houseNumber: string;
    postCode: string;
    city: string;
}

interface UserOrderRequest{
    adress: Adress;
    iban: string;
    bankcardOwner: string;
    bank: string;
    creditcardOwner: string;
    creditcardnumber: string;
    dateOfExpiry: Date;
    token: JwtToken;
}