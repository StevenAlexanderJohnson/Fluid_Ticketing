import { BSON, ObjectId } from "mongodb";

export interface TicketInterface {
    id: string;
    projectId: string;
    name: string;
    description: string;
    assignedTo: string[];
    status: "To Do" | "In Progress" | "Done";
    deadline: Date;
    priority: "Low" | "Medium" | "High";
    comments: string[];
    createdAt: Date;
    updatedAt: Date;
    lastUpdatedBy: string;
}

export class Ticket implements BSON.Document {
    public _id: ObjectId;
    public projectId: ObjectId;
    public name: string;
    public description: string;
    public assignedTo: string[];
    public status: string;
    public deadline: Date;
    public priority: string;
    public comments: string[];
    public createdAt: Date;
    public updatedAt: Date;
    public lastUpdatedBy: string;

    public constructor(data?: TicketInterface) {
        this._id = data && data['id'] ? new ObjectId(data['id']) : new ObjectId();
        this.projectId = data && data['projectId'] ? new ObjectId(data['projectId']) : new ObjectId();
        this.name = data && data['name'] ? data['name'] : "";
        this.description = data && data['description'] ? data['description'] : "";
        this.assignedTo = data && data['assignedTo'] ? data['assignedTo'] : [];
        this.status = data && data['status'] ? data['status'] : "";
        this.deadline = data && data['deadline'] ? data['deadline'] : new Date();
        this.priority = data && data['priority'] ? data['priority'] : "";
        this.comments = data && data['comments'] ? data['comments'] : [];
        this.createdAt = data && data['createdAt'] ? data['createdAt'] : new Date();
        this.updatedAt = data && data['updatedAt'] ? data['updatedAt'] : new Date();
        this.lastUpdatedBy = data && data['lastUpdatedBy'] ? data['lastUpdatedBy'] : "";
    }
}