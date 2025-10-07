export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
        suite: string;
        zipcode: string;
        geo: {
            lat: number;
            lang: number
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}