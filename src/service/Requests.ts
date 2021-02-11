/**
 * represents information needed to login
* is only used to transmit data to the server in HttpRequests
 */
interface LoginRequest {
    /**
     * email that the user entered
     */
    email: string;
    /**
     * password that the user entered
     */
    password: string;
}

/**
 * represents the information needed to sign up
 * is only used to transmit data to the server in HttpRequests
 */
interface SignUpRequest {
    /**
     * a user's first name
     */
    firstName: string;
    /**
     * a user's surname
     */
    lastName: string;
    /**
     * a user's email adress
     */
    email: string;
    /**
     * a user's password 
     */
    password: string;
    /**
     * a user's gender
     */
    gender: string;
    /**
     * a user's birthdate
     */
    birthdate: Date;
}
/**
 *represents the information of a User's Adress
 */
interface Adress {
    /**
     * street name of residence
     */
    streetName: string;
    /**
     * house number of residence
     */
    houseNumber: string;
    /**
     * postal code / zip code
     */
    postCode: string;
    /**
     * city of residence
     */
    city: string;
}
/**
 * represents a User's bankcard information
 */
interface Bankcard {
    /**
     * identifies a bankcard
     * country code +  20 digits 
     */
    iban: string;
    /**
     * the full name of a bankcard's owner
     */
    owner: string;
    /**
     * the name of the bank to which the account belongs
     */
    bank: string;
}
/**
 *  * represents a User's creditcard information
 */
interface Creditcard {
    /**
     * full name of the creditcard's owner
     */
    cowner: string;
    /**
     * Identifying number of a creditcard 
     */
    creditcardnumber: string;
    dateOfExpiry: Date;
}
/**
 * represents the information needed to add payment methods to an existing user
 * is only used to transmit data to the server in HttpRequests
 */
interface UserOrderRequest {
   
    adress: Adress;
  
    bankCard: Bankcard;
   
    creditcard: Creditcard;
}

/**
 * represents the information needed to add a product to an order
 * is only used to transmit data to the server in HttpRequests
 */
interface ProductDTO {
    /**
     * identifier of a product
     */
    articleNR: number;
    /**
     * amount of times a product was bought in an order
     */
    amount: number;
}
/**
 * represents the information needed to place an order without the user information
 * is only used to transmit data to the server in HttpRequests
 */
interface OrderDT {
    /**
     * total price of an order
     */
    priceTotal: number;
    /**
     * all products bought in an order
     */
    allProductsOrdered: Array<ProductDTO>;
}

/**
 *  represents the information needed to set back a user's password
 *  is only used to transmit data to the server in HttpRequests
 */
interface NewPasswordRequest {
    /**
     * email of a registered user
     */
    email: string;
    /**
     * new password of the user
     */
    password: string;
}