import {BSON, ObjectId} from "mongodb";

interface ProjectInterface {
    id: string;
    name: string;
    description: string;
    owner: string;
    companyId: string;
    members: string[];
    tasks: string[];
    createdAt: Date;
    updatedAt: Date;
    lastUpdatedBy: string;
}

export class Project implements BSON.Document {
    public _id: ObjectId;
    public name: string;
    public description: string;
    public owner: string;
    public companyId?: ObjectId;
    public members: string[];
    public tasks: ObjectId[];
    public createdAt: Date;
    public updatedAt: Date;
    public lastUpdatedBy: string;

    constructor(data?: ProjectInterface) {
        this._id = data && data['id'] ? new ObjectId(data['id']) : new ObjectId();
        this.name = data && data['name'] ? data['name'] : "";
        this.description = data && data['description'] ? data['description'] : "";
        this.owner = data && data['owner'] ? data['owner'] : "";
        // Check to make sure this isn't undefined when creating the object.
        this.companyId = data && data['companyId'] ? new ObjectId(data['companyId']) : undefined;
        this.members = data && data['members'] ? data['members'] : [];
        this.tasks = data && data['tasks'] ? data['tasks'].map(x => new ObjectId(x)) : [];
        this.createdAt = data && data['createdAt'] ? data['createdAt'] : new Date();
        this.updatedAt = data && data['updatedAt'] ? data['updatedAt'] : new Date();
        this.lastUpdatedBy = data && data['lastUpdatedBy'] ? data['lastUpdatedBy'] : "";
    }
}

interface TaskInterface {
    id: string;
    name: string;
    description: string;
    assignedTo: string[];
    status: "To Do" | "In Progress" | "Done";
    deadline: Date;
    priority: "Low" | "Medium" | "High";
    comments: string[];
}

export class Task {
    public id: string;
    public name: string;
    public description: string;
    public assignedTo: string[];
    public status: string;
    public deadline: Date;
    public priority: string;
    public comments: string[];

    constructor(data?: TaskInterface) {
        this.id = data && data['id'] ? data['id'] : "";
        this.name = data && data['name'] ? data['name'] : "";
        this.description = data && data['description'] ? data['description'] : "";
        this.assignedTo = data && data['assignedTo'] ? data['assignedTo'] : [];
        this.status = data && data['status'] ? data['status'] : "";
        this.deadline = data && data['deadline'] ? data['deadline'] : new Date();
        this.priority = data && data['priority'] ? data['priority'] : "";
        this.comments = data && data['comments'] ? data['comments'] : [];
    }
}