exports['spec cypress/e2e/a.cy.js finished with'] = {
  "totalTests": 4,
  "totalFailed": 2,
  "totalPassed": 2,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec cypress/e2e/test-page1.cy.js finished with'] = {
  "totalTests": 1,
  "totalFailed": 1,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec cypress/e2e/test-page2.cy.js finished with'] = {
  "totalTests": 1,
  "totalFailed": 1,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec cypress/e2e/long-name.cy.js finished with'] = {
  "totalTests": 2,
  "totalFailed": 2,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['saved commands from cypress/e2e/test-page1.cy.js finds aliens'] = [
  "visit test-page1.html",
  "log fail on purpose, no such text",
  "wrap {foo: bar}",
  "assert expected **{ foo: bar }** to deeply equal **{ foo: bar }**",
  "contains this text does not exist",
  "assert expected **:cy-contains('this text does not exist'), [type='submit'][value~='this text does not exist']** to be **visible**"
]

exports['saved commands from cypress/e2e/test-page2.cy.js finds xhr'] = [
  "visit test-page2.html",
  "get #triggerXHR",
  "click ",
  "xhr  GET http://localhost:9999/test-page2.json",
  "xhr  STUBBED GET http://localhost:9999/test-page3.json",
  "log fail on purpose, no such text",
  "wrap {foo: bar}",
  "assert expected **{ foo: bar }** to deeply equal **{ foo: bar }**",
  "contains this text does not exist",
  "assert expected **:cy-contains('this text does not exist'), [type='submit'][value~='this text does not exist']** to be **visible**"
]

exports['saved commands from cypress/e2e/long-name.cy.js 184-188-192-196-2001'] = [
  "log file name too long",
  "get .nonexistent-selector",
  "assert expected **.nonexistent-selector** to exist in the DOM"
]

exports['saved commands from cypress/e2e/long-name.cy.js 184-188-192-196-200-204-208-212-216-220-224-228-232-236-240-244-248-252-2561'] = [
  "log file name too long",
  "get .nonexistent-selector",
  "assert expected **.nonexistent-selector** to exist in the DOM"
]

exports['saved commands from cypress/e2e/a.cy.js has second test (failing)'] = [
  "wrap {foo: 42}",
  "its .foo",
  "assert expected **42** to equal **2**"
]

exports['saved commands from cypress/e2e/a.cy.js has third test (failing)'] = [
  "wrap foo",
  "assert expected **foo** to equal **bar**"
]
