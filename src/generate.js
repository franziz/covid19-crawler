// @flow
import "regenerator-runtime/runtime";

import fs from "fs";
import config from "config/database";
import Database from "utils/database";

(async () => {
  console.log("Generating data");
  const client = await Database.getInstance();
  const db = client.db(config.name);

  const cursor = await db.collection("popular_user_nodes").find({}).batchSize(999999);
  const data = { nodes:[], links: [] }
  let index = 0;
  while(await cursor.hasNext()){
    index++;
    process.stdout.write(`${index} of ${await cursor.count()} \r`);

    const document = await cursor.next();
    data.nodes.push({ 
      id: document.id_str, 
      name: document.screen_name,
      numberOfLinks: document.links.length
    });

    data.links.push(document.links.map((link) => {
      return { source: link, target: document.id_str }
    }));
  }
  process.stdout.write("\n")
  data.links = data.links.flat();

  fs.writeFileSync("data.json", JSON.stringify(data, undefined, 2), "utf8");
  console.log("File generation complete");
})()