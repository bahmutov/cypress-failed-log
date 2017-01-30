'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')
const path = require('path')

const jsonFilename = path.join(__dirname,
  '..', 'failed-cypress-failed-log-finds-aliens.json')
la(fs.existsSync(jsonFilename), 'cannot find json file', jsonFilename)

const result = require(jsonFilename)
la(is.object(result), 'expected an object from', jsonFilename, result)

la(is.unemptyString(result.title), 'missing test title', result)
la(is.unemptyString(result.testError), 'missing test error', result)
la(is.strings(result.testCommands), 'missing test commands', result)
la(result.testCommands[0].startsWith('visit'),
  'expected first command to be visit', result.testCommands)

console.log('file %s looks ok', jsonFilename)
