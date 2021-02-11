/**
 * represents a User's information
 */
interface User {
    /**
     * first name of a user
     */
    firstName: string;
    /**
     * surname of a user
     */
    lastName: string;
    /**
     * a user's email adress
     */
    email: string;
    /**
     * a user's birthdate
     */
    birthdate: Date;
    /**
     * a user's password
     */
    password: string;
    /**
     * a user's gender
     */
    gender: string;
    /**
     * saved adresses of a user
     */
    allAdresses: Set<Adress>;
    /**
     * a user's saved bankcards
     */
    bankcard: Set<Bankcard>;
    /**
     * a user's saved creditcards
     */
    creditcard: Set<Creditcard>;
    /**
     * a user's access roles
     */
    roles: Array<Roles>;

}

/**
 * represents the server's response for requests regarding users
 */
interface UserMessage {
    /**
     * a user's email adress
     */
    email: string;
    /**
     * 
     */
    message: string;
    /**
     * 
     */
    type: string;
}

/**
 * represents a user's role
 */
interface Roles{
    /**
     * defines the amount of access granted 
     */
    name: string;
}