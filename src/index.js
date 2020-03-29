// @flow
import "regenerator-runtime/runtime";
import config from "config/database";

import Database from "utils/database";
import TwitterClient from "utils/twitter";

(async () => {
  const tracks = [
    "#IndonesiaFreeCovid19",
    "covid indonesia",
    "covid jakarta",
    "covid indonesia",
    "covid19 indoneisa",
    "covid19 surabaya",
    "#DataTerbaruCorona",
    "corona ri",
    "corona jakarta",
    "corona surabaya",
    "corona indonesia"
  ]
  const parameters = {
    track: tracks.join(",")
  }
  const stream = TwitterClient.getInstance().stream("statuses/filter", parameters)
    .on("start", (response) => console.log("Start"))
    .on("data", async (tweet) => {
      const client = await Database.getInstance();
      const db = client.db(config.name);
      await db.collection("rawData").insertOne(tweet);
      console.log(`Inserted 1 document`);
    })
    .on("ping", (() => console.log("ping")))
    .on("error", ((err) => console.log(err)))
    .on("end", async () => {
      await Database.getInstance().close();
      console.log("end");
    })
})()