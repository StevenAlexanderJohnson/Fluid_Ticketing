import { userCollection, projectCollection, authCollection } from "./Connect.js";
import User from '../Models/User.js';
import { Project } from '../Models/Project.js';
import { ObjectId } from "mongodb";
import { HashPassword, ComparePassword } from "../Services/PasswordHasher.js";
import Auth from "../Models/Auth.js";

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
export async function GetAllProjects() {
    const collection = await projectCollection;
    return collection.find().toArray();
}

export async function GetProjectById(id: string) {
    let expression = {};
    const collection = await projectCollection;

    try {
        expression = { _id: new ObjectId(id) };
    }
    catch (err) {
        expression = { name: id };
    }

    return await collection.findOne(expression);
}

export async function CreateProject(project: Project) {
    const collection = await projectCollection;
    return await collection.insertOne(project);
}

export async function UpdateProject(id: string, project: Project) {
    const expression = { _id: new ObjectId(id) };
    const collection = await projectCollection;
    return await collection.updateOne(expression, { $set: project });
}

/****************************
 *      Auth Commands       *
 ****************************/
export async function GetAuthById(id: ObjectId) {
    const collection = await authCollection;
    return await collection.findOne({ _id: id });
}

export async function GetAuthByEmailPass(email: string, password: string) {
    const collection = await authCollection;
    const user = await collection.findOne({ email: email });
    if (!user) {
        return null;
    }

    if (!await ComparePassword(password, user.password)) {
        return null
    }
    return user;
}

export async function CreateUserAuth(auth: Auth) {
    const collection = await authCollection;
    const passwordHash = await HashPassword(auth.password);
    const authUser = new Auth({ ...auth, id: auth._id.toString(), password: passwordHash });
    return await collection.insertOne(authUser);
}

export async function UpdateAuthToken(id: string, token: string) {
    const collection = await authCollection;
    const expression = { _id: new ObjectId(id) };
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getMonth() + 1);
    return await collection.updateOne(expression, { $set: { access_token: token, access_token_expiration: expirationDate } });
}