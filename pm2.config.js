module.exports = {
  apps : [{
    name: 'COVID-19 Crawler',
    script: 'build/index.js',
    node_args: "-r dotenv/config",
    instances: 1,
    autorestart: true,
  }]
};
