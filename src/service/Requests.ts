interface LoginRequest {
    email: string;
    password: string;
}

interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    birthdate: Date;
}
interface Adress {
    streetName: string;
    houseNumber: string;
    postCode: string;
    city: string;
}

interface Bankcard {
    iban: string;
    owner: string;
    bank: string;
}

interface Creditcard {
    cowner: string;
    creditcardnumber: string;
    dateOfExpiry: Date;
}

interface UserOrderRequest {
    adress: Adress;
    bankCard: Bankcard;
    creditcard: Creditcard;
}

interface ProductDTO {
    articleNR: number;
    amount: number;
}
interface OrderDT {
    priceTotal: number;
    allProductsOrdered: Array<ProductDTO>;
    jwtToken: JwtToken;
}

interface NewPasswordRequest {
    email: string;
    password: string;
}