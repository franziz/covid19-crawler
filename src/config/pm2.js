export default {
  apps : [{
    name      : 'COVID-19 Crawler',
    script    : 'build/index.js',
    node_args : '-r dotenv/config',
  }]
}