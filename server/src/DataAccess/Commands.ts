import { userCollection, projectCollection } from "./Connect.js";
import User from '../Models/User.js';
import { Project, Task } from '../Models/Project.js';
import { ObjectId } from "mongodb";

/****************************
 *      User Commands       *
 ****************************/

/**
 * Get all users from the database
 * @returns Array of User objects from the database.
 */
export async function GetAllUsers() {
    return (await userCollection).find().toArray();
}

/**
 * Get information for a user by id or email.
 * @param id _id or email of the user to find
 * @returns a User object from the database
 */
export async function GetUserById(id: string) {
    let expression = {};

    try {
        expression = { _id: new ObjectId(id) };
    }
    catch (err) {
        expression = { email: id };
    }

    return (await userCollection).findOne(expression);
}

/**
 * Insert a user object into the database.
 * @param user User object to insert into the database
 * @returns Response from the database after insertion.
 */
export async function CreateUser(user: User) {
    return (await userCollection).insertOne(user);
}

/****************************
 *     Project Commands     *
 * **************************/
export async function GetAllProjects() {
    return (await projectCollection).find().toArray();
}

export async function GetProjectById(id: string) {
    let expression = {};

    try {
        expression = { _id: new ObjectId(id) };
    }
    catch (err) {
        expression = { name: id };
    }

    return (await projectCollection).findOne(expression);
}

export async function CreateProject(project: Project) {
    return (await projectCollection).insertOne(project);
}

export async function UpdateProject(id: string, project: Project) {
    const expression = { _id: new ObjectId(id) };
    return (await projectCollection).updateOne(expression, { $set: project });
}