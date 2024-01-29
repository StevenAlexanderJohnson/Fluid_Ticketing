import { userCollection, projectCollection, authCollection, ticketCollection, companyCollection } from "./Connect.js";
import User from '../Models/User.js';
import { Project } from '../Models/Project.js';
import { ObjectId } from "mongodb";
import { HashPassword, ComparePassword } from "../Services/PasswordHasher.js";
import Auth from "../Models/Auth.js";
import { Ticket } from "../Models/Ticket.js";
import { Company } from "../Models/Company.js";

/****************************
 *      User Commands       *
 ****************************/

/**
 * Get all users from the database
 * @returns Array of User objects from the database.
 */
export async function GetAllUsers() {
    const collection = await userCollection;
    const output = await collection.find().toArray();

    return output;
}

/**
 * Get information for a user by id or email.
 * @param id _id or email of the user to find
 * @returns a User object from the database
 */
export async function GetUserById(id: string) {
    let expression = {};
    const collection = await userCollection;

    try {
        expression = { _id: new ObjectId(id) };
    }
    catch (err) {
        expression = { email: id };
    }

    return await collection.findOne(expression);
}

/**
 * Insert a user object into the database.
 * @param user User object to insert into the database
 * @returns Response from the database after insertion.
 */
export async function CreateUser(user: User) {
    const collection = await userCollection;
    return await collection.insertOne(user);
}

/****************************
 *     Project Commands     *
 * **************************/
export async function GetAllProjects(companyId: string) {
    const collection = await companyCollection;
    const output = await collection.findOne<Company>(
        { _id: new ObjectId(companyId) },
        { projection: { projects: 1, _id: 0 } }
    );

    return output ? output.projects : [];
}

export async function GetProjectById(companyId: string, id: string) {
    let expression = {};
    const collection = await companyCollection;

    try {
        expression = { _id: new ObjectId(companyId), 'projects._id': new ObjectId(id) };
    }
    catch (err) {
        expression = { _id: new ObjectId(companyId), 'projects.name': id };
    }

    const output = await collection.findOne(expression, { projection: { "projects.$": 1, _id: 0 } })

    return output && output.projects ? output.projects[0] : {};
}

export async function CreateProject(companyId: string, project: Project) {
    const collection = await companyCollection;
    return await collection.updateOne({ _id: new ObjectId(companyId) }, {
        $push: {
            "projects": project
        }
    });
}

export async function UpdateProject(companyId: string, id: string, project: Project) {
    const collection = await companyCollection;
    const expression = { _id: new ObjectId(companyId), 'projects._id': new ObjectId(id) };

    return await collection.updateOne(expression, { $set: { 'projects.$': project } })
}

/****************************
 *      Ticket Commands     *
 ****************************/
export async function GetAllTickets(companyId: string) {
    const collection = await ticketCollection;
    const testing = (await companyCollection).aggregate([
        { $match: { _id: companyId } },
        { $unwind: "$projects" },
        {
            $lookup: {
                localField: "projects._id",
                foreignField: "projectId",
                as: "tickets"
            }
        },
        { $unwind: "$tickets" },
        { $replaceRoot: { newRoot: "$tickets" } }
    ]).toArray();
    console.log(testing);
    return collection.find({}).toArray();
}

export async function GetTicketById(id: string) {
    let expression = {};
    const collection = await ticketCollection;

    try {
        expression = { _id: new ObjectId(id) };
    }
    catch (err) {
        expression = { name: id };
    }

    return await collection.findOne(expression);
}

export async function CreateTicket(ticket: Ticket) {
    const collection = await ticketCollection;
    const output = await collection.insertOne(ticket);

    const projectExpression = { _id: new ObjectId(ticket.projectId) };
    const pCollection = await projectCollection;
    let project = await pCollection.findOne(projectExpression);
    // No need to check if project exists becuase we did that in the route.
    await pCollection.updateOne(projectExpression, { $set: { tasks: [...project!.tasks, new ObjectId(output.insertedId)] } });

    return output;
}

export async function UpdateTicket(id: string, ticket: Ticket) {
    const expression = { _id: new ObjectId(id) };
    const collection = await ticketCollection;
    collection.updateOne(expression, { $set: ticket });
}

/***************************
 *     Company Commands    *
 ***************************/
export async function GetCompaniesByUserId(id: string) {
    const collection = await companyCollection;
    return await collection.find({ users: new ObjectId(id) }).toArray();
}

export async function GetCompanyById(id: string, userId: string) {
    const expression = { _id: new ObjectId(id), users: new ObjectId(userId) };
    const collection = await companyCollection;
    return await collection.findOne(expression);
}

export async function CreateCompany(company: Company, userId: ObjectId) {
    const collection = await companyCollection;
    company.users = [userId];
    return await collection.insertOne(company);
}

export async function InviteUserToCompany(companyId: string, userId: string) {
    const collection = await companyCollection;
    const expression = { _id: new ObjectId(companyId) };
    const company = await collection.findOne(expression);
    if (!company) {
        throw new Error('Company not found');
    }
    const users = [...company.invitedUsers, new ObjectId(userId)];
    await collection.updateOne(expression, { $set: { invitedUsers: users } });
}

export async function AddUserToCompany(companyId: string, userId: string) {
    const collection = await companyCollection;
    const expression = { _id: new ObjectId(companyId) };
    const company = await collection.findOne(expression);
    if (!company) {
        throw new Error('Company not found');
    }
    const users = [...company.users, new ObjectId(userId)];
    await collection.updateOne(expression, { $set: { users: users } });
}

/****************************
 *      Auth Commands       *
 ****************************/
export async function GetAuthById(id: ObjectId) {
    const collection = await authCollection;
    return await collection.findOne({ _id: id });
}

export async function CheckEmailExists(email: string) {
    const collection = await authCollection;
    const user = await collection.findOne({ email: email });
    if (user) {
        return true;
    }
    return false;
}

export async function GetAuthByEmailPass(email: string, password: string) {
    const collection = await authCollection;
    const user = await collection.findOne({ email: email });
    if (!user) {
        return null;
    }

    if (!await ComparePassword(password, user.password!)) {
        return null
    }
    return user;
}

export async function CreateUserAuth(auth: Auth) {
    const collection = await authCollection;
    const passwordHash = await HashPassword(auth.password!);
    const authUser = new Auth({ ...auth, id: auth._id!.toString(), password: passwordHash });
    return await collection.insertOne(authUser);
}

export async function UpdateAuthToken(id: string, token: string) {
    const collection = await authCollection;
    const expression = { _id: new ObjectId(id) };
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getMonth() + 1);
    return await collection.updateOne(expression, { $set: { access_token: token, access_token_expiration: expirationDate } });
}