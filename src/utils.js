/// <reference types="cypress" />

const util = require('util')

const useSingleQuotes = s =>
  Cypress._.replace(Cypress._.replace(s, /'/g, "\\'"), /"/g, "'")

const stringify = x => useSingleQuotes(JSON.stringify(util.inspect(x)))

const isSimple = x =>
  Cypress._.isString(x) || Cypress._.isNumber(x) || Cypress._.isPlainObject(x)

module.exports = {
  useSingleQuotes,
  isSimple,
  stringify
}
