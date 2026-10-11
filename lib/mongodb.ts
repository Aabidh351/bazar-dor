
import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("MONGODB_URI is not configured");
}

if (!databaseName) {
  throw new Error("MONGODB_DB is not configured");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const mongoClient = client;
export const mongoDb = client.db(databaseName);
