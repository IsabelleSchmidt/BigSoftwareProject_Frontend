// interface Tag {
//     id: number;
//     version: number;
//     allProductsWithTag: Product;
//     value: string;
// }

interface Product {
    articlenr: any; //damit man neues Produkt mit artikelnr null uebergeben kann
    version: number;
    name: string;
    productType: string;
    roomType: string;
    price: number;
    allPictures: Array<string>;
    height: number;
    width: number;
    depth: number;
    // allTags: Tag;
    nrAvailableItems: number;
    description: string;
    information: string;
}