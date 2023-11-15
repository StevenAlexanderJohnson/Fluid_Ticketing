import { BSON, ObjectId } from "mongodb";

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export default class User implements BSON.Document {
    public _id: ObjectId;
    public name: string;
    public email: string;
    public password: string;
    public role: string;

    constructor(data?: UserInterface) {
        this._id = data && data['id'] ? new ObjectId(data['id']) : new ObjectId();
        this.name = data && data['name'] ? data['name'] : "";
        this.email = data && data['email'] ? data['email'] : "";
        this.password = data && data['password'] ? data['password'] : "";
        this.role = data && data['role'] ? data['role'] : "user";
    }
}