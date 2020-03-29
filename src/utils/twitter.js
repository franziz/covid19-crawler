// @flow
import config from "config/twitter";
import Twitter from "twitter-lite";

class TwitterClient{
  static _instance:Twitter;

  static initialize(){
    TwitterClient._instance = new Twitter({
      consumer_key: config.apiKey,
      consumer_secret: config.apiSecret,
      access_token_key: config.accessToken,
      access_token_secret: config.tokenSecret
    });
  }

  static getInstance():Twitter{
    if(!TwitterClient._instance) TwitterClient.initialize();
    return TwitterClient._instance;
  }
}
export default TwitterClient;
