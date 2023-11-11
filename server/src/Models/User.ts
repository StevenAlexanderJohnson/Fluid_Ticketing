import { BSON } from "mongodb";

interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export default class User implements BSON.Document {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public role: string;

    constructor(data?: UserInterface) {
        this.id = data && data['id'] ? data['id'] : 0;
        this.name = data && data['name'] ? data['name'] : "";
        this.email = data && data['email'] ? data['email'] : "";
        this.password = data && data['password'] ? data['password'] : "";
        this.role = data && data['role'] ? data['role'] : "";
    }
}