// registers this plugin in the user's Cypress plugin / config.js file
module.exports = function registerPlugin(on) {
  on('task', {
    failed: require('./src/failed')()
  })
}
