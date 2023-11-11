import * as mongo from 'mongodb';
import dotenv from 'dotenv';
import User from '../Models/User.js';

async function ConnectToMongo() {
    dotenv.config();

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    const client = await new mongo.MongoClient(uri).connect();

    return client;
}

async function GetCollection<T extends mongo.BSON.Document>(databaseName: string, collectionName: string): Promise<mongo.Collection<T>> {
    const client = await ConnectToMongo();
    return client.db(databaseName).collection<T>(collectionName);
}

const userCollection = GetCollection<User>('Auth', 'Users');

export { userCollection };
