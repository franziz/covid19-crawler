// @flow
import "regenerator-runtime/runtime";

import config from "config/database";
import NodeAPI from "api/node";
import Database from "utils/database";

(async (batchSize) => {
  // get data from database where isProcessed:false or not exists
  const client = await Database.getInstance();
  const db = client.db(config.name);

  const cursor = await db.collection("rawData").find({
    isProcessed: {
      "$exists": false
    }
  }).batchSize(batchSize);
  while(await cursor.hasNext()){
    const document = await cursor.next();
    // find if you have existing node or not
    // if not, you create a new document in the database
    const targetNode = await NodeAPI.findOrCreate(document.user, "popular_user_nodes");
    const sourceNode = await NodeAPI.findSourceNode(document, "popular_user_nodes");
    if(targetNode && sourceNode) {
      await NodeAPI.addLink(sourceNode, targetNode, document, "popular_user_nodes");
      console.log(`Link has been created: [${document.id_str} ]${sourceNode.id_str} > ${targetNode.id_str}`);
    }else console.log("No Source Node Found!");
  }
})(1000)