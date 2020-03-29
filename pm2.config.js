module.exports = {
  apps : [
    {
      name: 'COVID-19 Crawler',
      script: 'build/crawler.js',
      node_args: "-r dotenv/config",
      instances: 1,
      autorestart: true,
    },
    {
      name: "Popular User Transformer",
      script: "build/transform.js",
      node_args: "-r dotenv/config",
      instances: 1,
      autorestart: true
    }
  ]
};
