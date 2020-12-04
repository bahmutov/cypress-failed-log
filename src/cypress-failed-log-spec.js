'use strict'

require('mocha-banner').register()

const la = require('lazy-ass')
const cypress = require('cypress')
const snapshot = require('snap-shot-it')
const { existsSync } = require('fs')
const { join } = require('path')
const rimraf = require('rimraf')
const debug = require('debug')('test')
const { terminalBanner } = require('terminal-banner')
const _ = require('lodash')

function getFilename (specName, title) {
  la(specName, 'missing spec name', specName)
  la(title, 'missing test title', title)

  function getCleanTestTitle (specName, title) {
    const result = _
      .chain([_.split(specName, '.')[0], _.join(title, '-')])
      .join('-')
      .deburr()
      .kebabCase()
      .truncate({
        length: 220,
        omission: ''
      })
      .value()

    return `failed-${result}.json`
  }

  const fileName = getCleanTestTitle(specName, title)
  return join(__dirname, '..', 'cypress', 'logs', fileName)
}

function checkStats (tests) {
  const {
    totalTests,
    totalFailed,
    totalPassed,
    totalPending,
    totalSkipped,
    runs: [
      { spec: { name } }
    ]
  } = tests
  const logObj = {
    totalTests,
    totalFailed,
    totalPassed,
    totalPending,
    totalSkipped
  }
  debug('finished tests stats %o', logObj)
  snapshot(`spec ${name} finished with`, logObj)
  return tests
}

/* global describe, it */
describe('cypress-failed-log', () => {
  beforeEach(() => {
    const logsFolder = join(__dirname, '..', 'cypress', 'logs')
    debug('deleting folder %s', logsFolder)
    rimraf.sync(logsFolder)
  })

  it('runs spec a', () => {
    const spec = 'cypress/integration/a.js'
    terminalBanner(`Starting spec ${spec} at ${new Date()}`, '*')

    return cypress
      .run({
        spec
      })
      .tap(() => {
        terminalBanner(
          `Cypress run finished for: ${spec} at ${new Date()}`,
          '*'
        )
      })
      .then(checkStats)
      .then(({ runs }) => {
        const { spec: { name }, tests } = runs[0]
        for (const testInfo of tests) {
          debug('test info %o', testInfo)
          const { title, state } = testInfo

          if (state === 'failed') {
            const filename = getFilename(name, title)
            la(existsSync(filename), 'cannot find file', filename)

            const saved = require(filename)
            snapshot(`saved commands from ${name} ${_.last(title)}`, saved.testCommands)
          }
        }
      })
  })

  it('runs spec test-page1-spec', () => {
    const spec = 'cypress/integration/test-page1-spec.js'
    terminalBanner(`Starting spec ${spec} at ${new Date()}`, '*')

    return cypress
      .run({
        spec
      })
      .tap(() => {
        terminalBanner(
          `Cypress run finished for: ${spec} at ${new Date()}`,
          '*'
        )
      })
      .then(checkStats)
      .then(({ runs }) => {
        const { spec: { name }, tests } = runs[0]
        for (const { title, state } of tests) {
          if (state === 'failed') {
            const filename = getFilename(name, title)
            la(existsSync(filename), 'cannot find file', filename)
            const saved = require(filename)
            snapshot(`saved commands from ${name} ${_.last(title)}`, saved.testCommands)
          }
        }
      })
  })

  it('runs spec test-page2-spec', () => {
    const spec = 'cypress/integration/test-page2-spec.js'
    terminalBanner(`Starting spec ${spec} at ${new Date()}`, '*')

    return cypress
      .run({
        spec
      })
      .tap(() => {
        terminalBanner(
          `Cypress run finished for: ${spec} at ${new Date()}`,
          '*'
        )
      })
      .then(checkStats)
      .then(({ runs }) => {
        const { spec: { name }, tests } = runs[0]
        const { title } = tests[0]

        const filename = getFilename(name, title)
        la(existsSync(filename), 'cannot find file', filename)
        const saved = require(filename)
        saved.testCommands = saved.testCommands.map((command) => {
          if (command.substring(0, 3) === 'xhr') {
            return command.replace(/localhost:[0-9]+/, 'localhost:9999')
          } else {
            return command
          }
        })
        snapshot(`saved commands from ${name} ${_.last(title)}`, saved.testCommands)
      })
  })

  it('runs spec long-name-spec', () => {
    const spec = 'cypress/integration/long-name-spec.js'
    terminalBanner(`Starting spec ${spec} at ${new Date()}`, '*')

    return cypress
      .run({
        spec
      })
      .tap(() => {
        terminalBanner(
          `Cypress run finished for: ${spec} at ${new Date()}`,
          '*'
        )
      })
      .then(checkStats)
      .then(({ runs }) => {
        const { spec: { name }, tests } = runs[0]
        for (const { title, state } of tests) {
          if (state === 'failed') {
            const filename = getFilename(name, title)
            la(existsSync(filename), 'cannot find file', filename)

            console.log('loading saved output from %s', filename)
            const saved = require(filename)
            console.log('>>> loaded json <<<')
            console.log(JSON.stringify(saved, null, 2))

            snapshot(`saved commands from ${name} ${_.last(title)}`, saved.testCommands)
          }
        }
      })
  })
})
