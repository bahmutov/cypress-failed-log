'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')
const path = require('path')
const relative = path.join.bind(null, __dirname)
const inParentFolder = name => relative('..', name)

const jsonFiles = [
  'failed-without-user-after-each-finds-aliens-2.json',
  'failed-cypress-failed-log-finds-aliens.json'
]

const logsFolder = inParentFolder('cypress/logs')
console.log('logs in folder', logsFolder)

function checkJsonFile (filename) {
  la(is.unemptyString(filename), 'expected filename', filename)
  const jsonFilename = path.join(logsFolder, filename)
  la(fs.existsSync(jsonFilename), 'cannot find json file', jsonFilename)

  const result = require(jsonFilename)
  la(is.object(result), 'expected an object from', jsonFilename, result)

  la(is.unemptyString(result.specName), 'missing spec file name', result)

  la(is.unemptyString(result.title), 'missing test title', result)
  la(is.unemptyString(result.suiteName), 'missing suite name', result)

  la(is.unemptyString(result.testError), 'missing test error', result)
  la(is.strings(result.testCommands), 'missing test commands', result)

  la(is.unempty(result.testCommands),
    'should have test commands in', filename, result)
  la(is.strings(result.testCommands),
    'test commands should be strings', filename, result)

  la(result.testCommands[0].startsWith('visit'),
    'expected first command to be visit', result.testCommands)

  console.log('file %s looks ok', jsonFilename)
}

jsonFiles.forEach(checkJsonFile)
