import * as mongodb from "mongodb";
import { Pangolin } from "./pangolin";

export const collections: {
    pangolins?: mongodb.Collection<Pangolin>;
 } = {};

 export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("meanstack");
    await applySchemaValidation(db);
  
    const pangolinsCollection = db.collection<Pangolin>("pangolins");
    collections.pangolins = pangolinsCollection;
 }


 async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "role", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                role: {
                    bsonType: "string",
                    description: "'role' is required and is a string",
                    enum: ["Guerrier", "Alchimiste", "Sorcier", "Espions", "Enchanteur"],
                },
                level: {
                    bsonType: "number",
                    description: "'level' is required and is a number",
                },
            },
        },
    };

    await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("pangolins", {validator: jsonSchema});
        }
    });
 }