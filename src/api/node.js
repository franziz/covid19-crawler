// @flow
import config from "config/database";
import Database from "utils/database";

class NodeAPI{
  static async findOrCreate(user:any, collection:string){
    const client = await Database.getInstance();
    const db = client.db(config.name);
    const foundNode = await db.collection(collection).findOne({
      id_str: user.id_str
    });
    if(!foundNode){
      const newData = Object.assign({}, user, { links: [] });
      const response = await db.collection(collection).insertOne(newData);
      const [ newNode ] = response.ops;
      return newNode;
    }else return foundNode;
  }

  static async findSourceNode(document:any, collection:string){
    if(document.is_quote_status){
      const sourceNode = await NodeAPI.findOrCreate(document.quoted_status.user, collection);
      return sourceNode;
    }else if(document.retweeted_status){
      const sourceNode = await NodeAPI.findOrCreate(document.retweeted_status.user, collection);
      return sourceNode;
    }else return null;
  }

  static async addLink(source:any, target:any, tweet:any, collection:string){
    const client = await Database.getInstance();
    const db = client.db(config.name);
    await db.collection(collection).updateOne({
      id_str: source.id_str
    }, {
      "$push": { links: target.id_str }
    });

    await db.collection("rawData").updateOne({
      id_str: tweet.id_str
    }, {
      "$set": { isProcessed: true }
    })
  }
}
export default NodeAPI;