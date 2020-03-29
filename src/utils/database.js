// @flow
import config from "config/database";
import { MongoClient } from "mongodb";

class Database{
  static _instance:MongoClient;

  static async initialize(){
    Database._instance = new MongoClient(config.connectionString, { useUnifiedTopology: true })
    await Database._instance.connect();
  }

  static async getInstance():MongoClient{
    if(!Database._instance) await Database.initialize()
    return Database._instance;
  }
}
export default Database;