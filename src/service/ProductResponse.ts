/**
 * the server's response to a post request of a new product
 */
interface ProductResponse{
    /**
     * all errors that occured during the posting process
     */
    allErrors: Array<Validationerror>;
    /**
     * product to be saved into the database
     */
    product: Product;
}