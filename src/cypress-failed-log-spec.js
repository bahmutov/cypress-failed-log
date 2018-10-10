'use strict'

const la = require('lazy-ass')
const cypress = require('cypress')
const snapshot = require('snap-shot-it')
const { pick } = require('ramda')
const { existsSync } = require('fs')
const { join } = require('path')

/* global describe, it */
describe('cypress-failed-log', () => {
  it('runs spec a', () => {
    return cypress
      .run({
        spec: 'cypress/integration/a.js'
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
      })
  })
})
