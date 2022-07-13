/// <reference types="cypress" />
// @ts-check
'use strict'

const path = require('path')
const debug = require('debug')('cypress-failed-log')

// check built-in module against missing methods
if (typeof path.basename !== 'function') {
  throw new Error('path.basename should be a function')
}

const maxFileNameLength = 220
const cleanupFilename = s => Cypress._.kebabCase(Cypress._.deburr(s))
const truncateFilename = s => Cypress._.truncate(s, {
  length: maxFileNameLength,
  omission: ''
})
const getCleanFilename = s => truncateFilename(cleanupFilename(s))
const getFilepath = filename => path.join('cypress', 'logs', filename)
const retriesTimes = getRetriesTimes()

function getRetriesTimes () {
  const retries = Cypress.config('retries')
  if (Cypress._.isNumber(retries)) {
    return retries
  }

  if (Cypress._.isObject(retries) && Cypress._.isNumber(retries.runMode)) {
    return retries.runMode
  }

  return 0
}

const failedCaseTable = {}

function writeFailedTestInfo ({
  specName,
  title,
  suiteName,
  testName,
  testError,
  testCommands
}) {
  const info = {
    specName,
    title,
    suiteName,
    testName,
    testError,
    testCommands
  }
  const str = JSON.stringify(info, null, 2) + '\n'
  const cleaned = getCleanFilename(
    Cypress._.join([
      Cypress._.split(specName, '.')[0],
      testName
    ], '-'))
  const filename = `failed-${cleaned}.json`
  const filepath = getFilepath(filename)
  cy
    .writeFile(filepath, str)
    .log(`saved failed test information to ${filename}`)

  return filepath
}

let savingCommands = false
let loggedCommands = []

function startLogging () {
  debug('will log Cypress commands')

  Cypress.on('test:before:run', () => {
    debug('before test run')
    savingCommands = true
  })

  // should we use command:start or command:end
  // or combination of both to keep track?
  // hmm, not every command seems to show up in command:end
  // Cypress.on('command:end', logCommand)

  Cypress.on('log:added', options => {
    if (!savingCommands) {
      return
    }
    if (options.instrument === 'command' && options.consoleProps) {
      let detailMessage = ''
      if (options.name === 'xhr') {
        detailMessage = (options.consoleProps.Stubbed === 'Yes' ? 'STUBBED ' : '') + options.consoleProps.Method + ' ' + options.consoleProps.URL
      }
      const log = {
        message: options.name + ' ' + options.message + (detailMessage !== '' ? ' ' + detailMessage : '')
      }
      debug(log)
      loggedCommands.push(log)
    }
  })

  Cypress.on('log:changed', options => {
    if (options.instrument === 'command' && options.consoleProps) {
      // This is NOT the exact command duration, since we are only
      // getting an event some time after the command finishes.
      // Still better to have approximate value than nothing
      options.wallClockStoppedAt = Date.now()
      options.duration = +options.wallClockStoppedAt - (+new Date(options.wallClockStartedAt))
      options.consoleProps.Duration = options.duration
    }
  })
}

function initLog () {
  loggedCommands = []
}

function onFailed () {
  savingCommands = false
  if (this.currentTest.state === 'passed') {
    return
  }
  const testName = this.currentTest.fullTitle()

  // remember the test case retry times
  if (failedCaseTable[testName]) {
    failedCaseTable[testName] += 1
  } else {
    failedCaseTable[testName] = 1
  }

  const title = this.currentTest.title

  const suiteName = this.currentTest.parent && this.currentTest.parent.title

  const testError = this.currentTest.err.message

  const commands = loggedCommands

  // sometimes the message is the same, since the log command events
  // repeat when state changes (command starts, runs, etc)
  // so filter and cleanup
  // const testCommands = reject(commands.filter(notEmpty), duplicate)
  const testCommands = Cypress._.map(commands, 'message')

  // const specName = path.basename(window.location.pathname)
  const specName = Cypress.spec.relative

  console.log('=== test failed ===')
  console.log(specName)
  console.log('=== title ===')
  console.log(title)
  if (suiteName) {
    console.log('suite', suiteName)
  }
  console.log(testName)
  console.log('=== error ===')
  console.log(testError)
  console.log('=== commands ===')
  console.log(testCommands.join('\n'))

  const info = {
    specName,
    title,
    suiteName,
    testName,
    testError,
    testCommands
  }

  // If finally retry still failed or we didn't set the retry value in cypress.json
  // directly to write the failed log
  const lastAttempt = failedCaseTable[testName] - 1 === retriesTimes
  const noRetries = retriesTimes === 0
  debug('no retries %o last attempt %o', noRetries, lastAttempt)
  if (noRetries || lastAttempt) {
    const filepath = writeFailedTestInfo(info)
    debug('saving the log file %s', filepath)
    info.filepath = filepath
  }

  cy.task('failed', info, { log: false })
}

//   We have to do a hack to make sure OUR "afterEach" callback function
// runs BEFORE any user supplied "afterEach" callback.
//   Otherwise commands executed by the user callback might
// add too many commands to the log, making post-mortem
// triage very difficult. In this case we just wrap client supplied
// "afterEach" function with our callback "onFailed". This ensures we run
// first.

const _afterEach = afterEach
/* eslint-disable-next-line no-global-assign */
afterEach = (name, fn) => {
  // eslint-disable-line
  if (typeof name === 'function') {
    fn = name
    name = fn.name
  }
  // run our "onFailed" before running the client function "fn"
  _afterEach(name, function () {
    // run callbacks with context "this"
    onFailed.call(this)
    fn.call(this)
  })
}

startLogging()
beforeEach(initLog)
// register our callback to process failed tests without wrapping
_afterEach(onFailed)
