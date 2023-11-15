import { BSON } from "mongodb";
import User, { UserInterface } from "./User.js";

interface AuthInterface extends UserInterface {
    access_token?: string | null;
    access_token_expiration?: Date;
}

export default class Auth extends User implements BSON.Document {
    public access_token: string;
    public access_token_expiration: Date;

    constructor(data?: AuthInterface) {
        super();
        this.email = data && data['email'] ? data['email'] : "";
        this.password = data && data['password'] ? data['password'] : "";
        this.access_token = data && data['access_token'] ? data['access_token'] : "";
        this.access_token_expiration = data && data['access_token_expiration'] ? data['access_token_expiration'] : new Date();
    }
}