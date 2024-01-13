import * as mongo from 'mongodb';
import dotenv from 'dotenv';
import User from '../Models/User.js';
import { Project } from '../Models/Project.js';
import Auth from '../Models/Auth.js';
import { Ticket } from '../Models/Ticket.js';
import { Company } from '../Models/Company.js';


async function ConnectToMongo() {
    // Environment Variables are not stored in source control, so they will need to be set up manually
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({ path: '.env.production' });
    }
    else {
        dotenv.config({ path: '.env.development' });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    return await new mongo.MongoClient(uri).connect();
}

async function GetCollection<T extends mongo.BSON.Document>(databaseName: string, collectionName: string): Promise<mongo.Collection<T>> {
    const client = await ConnectToMongo().catch(err => { throw err; });
    return client.db(databaseName).collection<T>(collectionName);
}

const userCollection = GetCollection<User>('Auth', 'Users');
const projectCollection = GetCollection<Project>('ProjectManager', 'Projects');
const authCollection = GetCollection<Auth>('Auth', 'Users');
const ticketCollection = GetCollection<Ticket>('ProjectManager', 'Tickets');
const companyCollection = GetCollection<Company>('ProjectManager', 'Companies');
export { userCollection, projectCollection, authCollection, ticketCollection, companyCollection };
