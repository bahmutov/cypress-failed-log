'use strict'

const la = require('lazy-ass')
const cypress = require('cypress')
const snapshot = require('snap-shot-it')
const { pick } = require('ramda')
const { existsSync } = require('fs')
const { join } = require('path')
const rimraf = require('rimraf')
const debug = require('debug')('test')
const { terminalBanner } = require('terminal-banner')

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
      .then(
        pick([
          'totalTests',
          'totalFailed',
          'totalPassed',
          'totalPending',
          'totalSkipped'
        ])
      )
      .then(tests => {
        debug('finished tests stats %o', tests)
        snapshot('spec a.js finished with', tests)
      })
      .then(() => {
        const logFilename = join(
          __dirname,
          '..',
          'cypress',
          'logs',
          'failed-root-suite-first-context-has-second-test-failing.json'
        )
        la(existsSync(logFilename), 'cannot find file', logFilename)
        const saved = require(logFilename)
        snapshot('saved commands from second test', saved.testCommands)
      })
      .then(() => {
        const logFilename = join(
          __dirname,
          '..',
          'cypress',
          'logs',
          'failed-root-suite-first-context-has-third-test-failing.json'
        )
        la(existsSync(logFilename), 'cannot find file', logFilename)
        const saved = require(logFilename)
        snapshot('saved commands from third test', saved.testCommands)
      })
  })

  it.only('runs spec test-page1-spec', () => {
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
      .then(
        pick([
          'totalTests',
          'totalFailed',
          'totalPassed',
          'totalPending',
          'totalSkipped'
        ])
      )
      .then(tests => {
        debug('finished tests stats for test-page1-spec %o', tests)
        snapshot('spec test-page1-spec.js finished with', tests)
      })
      .then(() => {
        const logFilename = join(
          __dirname,
          '..',
          'cypress',
          'logs',
          'failed-cypress-failed-log-finds-aliens.json'
        )
        la(existsSync(logFilename), 'cannot find file', logFilename)
        const saved = require(logFilename)
        snapshot(
          'saved commands failed test in test-page1-spec',
          saved.testCommands
        )
      })
  })
})
