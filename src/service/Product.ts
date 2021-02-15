/**
 * representation of a tag database's entry
 */
interface Tag {
    /**
     * identifier of a tag
     */
    id: number;
    /**
     * a tag's value
     */
    value: string;
 }

 /**
  * representation of a product database's entry
  */
interface Product {
    /**
     * identifier of a product
     */
    articlenr: any; 
    /**
     * a product's version
     */
    version: number; //Kann das weg?
    /**
     * the unique name of the product
     */
    name: string;
    /**
     * the producttype of the product
     */
    productType: string;
    /**
     * the roomtype of the product
     */
    roomType: string;
    /**
     * the product's price
     */
    price: number;
    /**
     * the pictures showing the product
     */
    allPictures: Array<Picture>;
    /**
     * the product's height
     */
    height: number;
    /**
     * the product's width
     */
    width: number;
    /**
     * the product's depth
     */
    depth: number;
    /**
     * all tags describing the product
     */
    allTags: Array<Tag>;
    /**
     * number of times the product is available for sale
     */
    available: number;
    /**
     * the product's description
     * longer and more detailed than the information
     */
    description: string;
    /**
     * the product's information
     */
    information: string;
}