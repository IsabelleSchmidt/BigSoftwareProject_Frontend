interface Tag {
    id: number;
//    version: number;
//    allProductsWithTag: Product;
    value: string;
 }

interface Product {
    articlenr: any; //damit man neues Produkt mit artikelnr null uebergeben kann
    version: number;
    name: string;
    productType: string;
    roomType: string;
    price: number;
    allPictures: Array<Picture>;
    height: number;
    width: number;
    depth: number;
    allTags: Array<Tag>;
    available: number;
    description: string;
    information: string;
}