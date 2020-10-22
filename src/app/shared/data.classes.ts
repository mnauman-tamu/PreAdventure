export class attObject {
    name: any;
    description: any;
    address: any;
    webURL: any;
    photo: any;

    constructor(name: string, description: string, address: string, webURL: string, photo: string) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.webURL = webURL;
        this.photo = photo;
    }
}