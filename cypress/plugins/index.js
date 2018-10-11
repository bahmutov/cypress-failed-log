module.exports = (on, config) => {
  on('task', {
    // in the user project this would be
    // failed: require('cypress-failed-log/src/failed')()
    failed: require('../../src/failed')()
  })
}
