
/**
 * holds information on an error that the server has thrown during the 
 * processing of a request
 */
 interface Validationerror{
    /**
     * the field of an object which caused the error to be thrown
     */
    field: string;
    /**
     * the error's message
     */
    message: string;
}