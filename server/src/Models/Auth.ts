import { BSON } from "mongodb";
import User, { UserInterface } from "./User.js";

interface AuthInterface extends UserInterface {
    access_token?: string | null;
    access_token_expiration?: Date;
    refresh_token?: string | null;
}

export default class Auth extends User implements BSON.Document {
    public access_token: string;
    public access_token_expiration: Date;
    public refresh_token: string;

    constructor(data?: AuthInterface) {
        super(data);
        this.name = data && data['name'] ? data['name'] : "";
        this.email = data && data['email'] ? data['email'] : "";
        this.password = data && data['password'] ? data['password'] : "";
        this.phoneNumber = data && data['phoneNumber'] ? data['phoneNumber'] : "";
        this.role = data && data['role'] ? data['role'] : "";
        this.access_token = data && data['access_token'] ? data['access_token'] : "";
        this.refresh_token = data && data['refresh_token'] ? data['refresh_token'] : "";
        this.access_token_expiration = data && data['access_token_expiration'] ? data['access_token_expiration'] : new Date();
    }
}