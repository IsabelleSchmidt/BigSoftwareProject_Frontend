interface Tag {
//     id: number;
//    version: number;
//    allProductsWithTag: Product;
    value: string;
 }

interface Product {
    articlenr: number;
    version: number;
    name: string;
    productType: string;
    roomType: string;
    price: number;
    allPictures: Array<string>;
    height: number;
    width: number;
    depth: number;
    allTags: Array<Tag>;
    available: number;
    description: string;
    information: string;
}