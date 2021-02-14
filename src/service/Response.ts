/**
 * represents the information needed to authenticate a user
 */
interface JwtToken {
    /**
     * a user's email adress
     */
    email: string;
    /**
     * a user's access role 
     */
    roles: Array<string>;
    /**
     * a user's authentification token
     */
    accessToken: string;
}
/**
 * the server's response to POST requests
 * if an error occurs, the message and the field,
 * in which the error occured, are set
 * 
 */
interface MessageResponse {
    /**
     *  A message of an error that was thrown
     */
    message: string;

    /**
     * field of an object which caused the error to be thrown
     */
    field: string;
}
/**
 * the server's response to the POST request for a new order
 */
interface OrderResponse {
    /**
     * A message of an error that was thrown during the request processing
     */
    message: string;
    /**
     * the field of an object that caused the error
     */
    field: string;
    /**
     * identifier of an order, -1 if reqquest was unsuccessful
     */
    orderid: number;
}

/**
 * the server's response to a post request of a new product
 */
interface ProductResponse{
    /**
     * all errors that occured during the posting process
     */
    allErrors: Array<MessageResponse>;
    /**
     * product to be saved into the database
     */
    product: Product;
}

/**
 * Response from the server when a new picture is posted
 */
interface PictureResponse{
    allErrors: Array<MessageResponse>;
}

