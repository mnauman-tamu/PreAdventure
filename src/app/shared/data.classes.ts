export class attObject {
    name: any;
    description: any;
    rating: any;
    address: any;
    webURL: any;
    photo: any;

    constructor(name: string, description: string, rating: string, address: string, webURL: string, photo: string) {
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.address = address;
        this.webURL = webURL;
        this.photo = photo;
    }
}

export class hotObject {
    name: any;
    description: any;
    rating: any;
    price: any;
    address: any;
    webURL: any;
    photo: any;
    wifi: boolean;
    breakfast: boolean;

    constructor(name: string, description: string, rating: string, price:string, address: string, webURL: string, photo:string, wifi: boolean, breakfast: boolean)
    {
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.address = address;
        this.webURL = webURL;
        this.photo = photo;
        this.wifi = wifi;
        this.breakfast = breakfast;
    }
}

export class restObject {
    name: any;
    description: any;
    rating: any;
    price: any;
    address: any;
    webURL: any;
    photo: any;

    constructor(name: string, description: string, rating: string, price: string, address: string, webURL: string, photo: string) {
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.address = address;
        this.webURL = webURL;
        this.photo = photo;
    }
}