import {BSON, ObjectId} from "mongodb";
import { Project } from "./Project.js";

export interface CompanyInterface {
    id: string,
    name: string,
    description: string,
    projects: Project[],
    users: ObjectId[],
    invitedUsers: ObjectId[],
    createdAt: Date
}

export class Company implements BSON.Document {
    public _id: ObjectId;
    public name: string;
    public description: string;
    public projects: Project[];
    public users: ObjectId[];
    public invitedUsers: ObjectId[];
    public createdAt: Date;

    public constructor(data?: CompanyInterface) {
        this._id = data && data['id'] ? new ObjectId(data['id']) : new ObjectId();
        this.name = data && data['name'] ? data['name'] : "";
        this.description = data && data['description'] ? data['description'] : "";
        this.projects = data && data['projects'] ? data['projects'] : [];
        this.users = data && data['users'] ? data['users'] : [];
        this.invitedUsers = data && data['invitedUsers'] ? data['invitedUsers'] : [];
        this.createdAt = data && data['createdAt'] ? data['createdAt'] : new Date();
    }
}