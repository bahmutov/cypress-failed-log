/// <reference types="cypress" />
'use strict'

// ? why are we not using Cypress._ ?
const kebabCase = require('lodash.kebabcase')
const deburr = require('lodash.deburr')
const path = require('path')
const debug = require('debug')('cypress-failed-log')

const cleanupFilename = s => kebabCase(deburr(s))
const getFilepath = filename => path.join('cypress', 'logs', filename)

function writeFailedTestInfo ({
  specName,
  title,
  suiteName,
  testName,
  testError,
  testCommands,
  screenshot
}) {
  const info = {
    specName,
    title,
    suiteName,
    testName,
    testError,
    testCommands,
    screenshot
  }
  const str = JSON.stringify(info, null, 2) + '\n'
  const cleaned = cleanupFilename(testName)
  const filename = `failed-${cleaned}.json`
  const filepath = getFilepath(filename)
  cy
    .writeFile(filepath, str)
    .log(`saved failed test information to ${filename}`)
}

let savingCommands = false
let loggedCommands = []

function startLogging () {
  console.log('Will log Cypress commands')

  // const logCommand = options => {
  //   debug('log command', options)
  //   const { attributes } = options
  //   const str =
  //     options.options +
  //     ' ' +
  //     attributes.name +
  //     ' ' +
  //     attributes.args.map(stringify).join(' ')

  //   if (isSimple(attributes.subject)) {
  //     try {
  //       const s = stringify(attributes.subject)
  //       // loggedCommands.push({
  //       //   id: attributes.chainerId,
  //       //   message: s + ' ' + str
  //       // })
  //     } catch (e) {
  //       // if subject is complex (like Window or circular element)
  //       // use just name and arguments
  //       console.error('could not convert subject', attributes.subject)
  //       console.error('for command', attributes)
  //       // loggedCommands.push({
  //       //   id: attributes.chainerId,
  //       //   message: str
  //       // })
  //     }
  //   } else {
  //     // loggedCommands.push({
  //     //   id: attributes.chainerId,
  //     //   message: str
  //     // })
  //   }
  // }

  // Cypress.on('command:start', logCommand)

  Cypress.on('test:before:run', () => {
    debug('before test run')
    savingCommands = true
  })

  // Cypress.on('test:after:run', () => {
  //   debug('after test run')
  // })

  // should we use command:start or command:end
  // or combination of both to keep track?
  // hmm, not every command seems to show up in command:end
  // Cypress.on('command:end', logCommand)

  Cypress.on('log:added', options => {
    if (!savingCommands) {
      return
    }
    if (options.instrument === 'command' && options.consoleProps) {
      const log = {
        message: options.name + ' ' + options.message
      }
      console.log(log)
      loggedCommands.push(log)
      // console.log(stringify(options.consoleProps))
      // cy.task('log', options.consoleProps, { log: false })
    }
  })
}

function initLog () {
  loggedCommands = []
}

// function duplicate (s, k, collection) {
//   if (k === 0) {
//     return
//   }
//   return s.id === collection[k - 1].id
// }

// const describeCommand = c => `${c.name} ${c.message}`.trim()
// const notEmpty = c => c

function onFailed () {
  savingCommands = false
  if (this.currentTest.state === 'passed') {
    return
  }
  const testName = this.currentTest.fullTitle()
  // prevents processing failed test twice - from our "afterEach" callback
  // and from wrapping user "afterEach"
  if (hasSeen(testName)) {
    return
  }
  doneWithTest(testName)

  const title = this.currentTest.title
  const screenshotName = `${cleanupFilename(title)}-failed`
  cy.wait(1000).log('waited for UI before capturing screenshot')
  cy.screenshot(screenshotName)
  cy.wait(1000)

  const suiteName = this.currentTest.parent && this.currentTest.parent.title

  const testError = this.currentTest.err.message

  const commands = loggedCommands

  // sometimes the message is the same, since the log command events
  // repeat when state changes (command starts, runs, etc)
  // so filter and cleanup
  // const testCommands = reject(commands.filter(notEmpty), duplicate)
  const testCommands = Cypress._.map(commands, 'message')

  const specName = path.basename(window.location.pathname)

  const screenshot = `${screenshotName}.png`

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
  console.log('=== screenshot ===')
  console.log(screenshot)
  writeFailedTestInfo({
    specName,
    title,
    suiteName,
    testName,
    testError,
    testCommands,
    screenshot
  })
}

//   We have to do a hack to make sure OUR "afterEach" callback function
// runs BEFORE any user supplied "afterEach" callback. This is necessary
// to take screenshot of the failure AS SOON AS POSSIBLE.
//   Otherwise commands executed by the user callback might destroys the
// screen and add too many commands to the log, making post-mortem
// triage very difficult. In this case we just wrap client supplied
// "afterEach" function with our callback "onFailed". This ensures we run
// first.

// remember which tests we have processed already
const seenTests = {}
function hasSeen (testName) {
  return seenTests[testName]
}
function doneWithTest (testName) {
  seenTests[testName] = true
}

const _afterEach = afterEach
/* eslint-disable-next-line no-global-assign */
afterEach = (name, fn) => {
  // eslint-disable-line
  if (typeof name === 'function') {
    fn = name
    name = fn.name
  }
  // before running the client function "fn"
  // run our "onFailed" to capture the screenshot sooner
  _afterEach(name, function () {
    onFailed.call(this)
    fn()
  })
}

startLogging()
beforeEach(initLog)
// register our callback to process failed tests without wrapping
_afterEach(onFailed)
