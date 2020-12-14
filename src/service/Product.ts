// interface Tag {
//     id: number;
//     version: number;
//     allProductsWithTag: Product;
//     value: string;
// }

interface Product {
    articlenr: number;
    version: number;
    name: string;
    productType: string;
    roomType: string;
    price: number;
    picture: string;
    height: number;
    width: number;
    depth: number;
    // allTags: Tag;
    nrAvailableItems: number;
}