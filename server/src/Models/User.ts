import { BSON, ObjectId } from "mongodb";

export interface UserInterface {
    id: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    role?: string;
}

export default class User implements BSON.Document {
    public _id: ObjectId;
    public name?: string;
    public email?: string;
    public phoneNumber?: string;
    public password?: string;
    public role?: string;

    constructor(data?: UserInterface) {
        this._id = data && data['id'] ? new ObjectId(data['id']) : new ObjectId();
        this.name = data && data['name'] ? data['name'] : undefined;
        this.email = data && data['email'] ? data['email'] : undefined;
        this.phoneNumber = data && data['phoneNumber'] ? data['phoneNumber'] : undefined;
        this.password = data && data['password'] ? data['password'] : undefined;
        this.role = data && data['role'] ? data['role'] : "user";
    }
}