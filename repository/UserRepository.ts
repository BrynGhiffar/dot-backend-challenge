import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { User } from "../types/UserTypes";

function getDatabase(): Db {
    const uri = "mongodb://0.0.0.0:27017";
    const client = new MongoClient(uri);
    const database = client.db("dot-backend-challenge");
    return database;
}

function getUserCollection(): Collection<User> {
    const database = getDatabase();
    return database.collection("user");
}

export async function findOneUserByEmail(email: string): Promise<User | null> {

    const userCollection = getUserCollection();
    const userFound = await userCollection.findOne({ email });
    if (userFound === null) {
        return null;
    }
    const res: User = {
        user_id: userFound._id.toHexString(),
        email: userFound.email,
        password: userFound.password,
        description: userFound.description
    };
    return res;
}

export async function findOneUserById(user_id: string): Promise<User | null> {
    const userCollection = getUserCollection();
    const userFound = await userCollection.findOne({ _id: new ObjectId(user_id) });
    if (userFound === null) return null;
    const res: User = {
        user_id: userFound._id.toHexString(),
        email: userFound.email,
        password: userFound.password,
        description: userFound.description
    };
    return res;
}

export async function createUser(email: string, password: string): Promise<User | null> {

    const userCollection = getUserCollection();
    const default_description = "Default description";
    const res = await userCollection.insertOne({ user_id: "", email, password, description: default_description });
    const user_id = res.insertedId.toHexString();
    const new_user: User = {
        user_id, email, password, description: default_description
    };
    return new_user;
}

export async function updateUserDescription(user_id: string, new_description: string): Promise<User | null> {
    const userCollection = getUserCollection();
    const possiblyFoundUser = await findOneUserById(user_id);
    if (possiblyFoundUser === null) return null;
    await userCollection.updateOne({ _id: new ObjectId(user_id) }, { "$set": { description: new_description } }, { upsert: true });
    return findOneUserById(user_id);
}