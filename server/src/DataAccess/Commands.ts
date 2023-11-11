import { userCollection } from "./Connect.js";
import User from '../Models/User.js';
import { ObjectId } from "mongodb";

export async function GetAllUsers() {
    return (await userCollection).find().toArray();
}

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

export async function CreateUser(user: User) {
    return (await userCollection).insertOne(user);
}