exports['saved commands from test-page2-spec.js finds xhr'] = [
  "visit test-page2.html",
  "get #triggerXHR",
  "click ",
  "xhr  GET http://localhost:9999/test-page2.json",
  "xhr  STUBBED GET http://localhost:9999/test-page3.json",
  "log fail on purpose, no such text",
  "wrap {foo: bar}",
  "assert expected **{ foo: bar }** to deeply equal **{ foo: bar }**",
  "contains this text does not exist",
  "assert expected **:not(script,style):cy-contains('this text does not exist'), [type='submit'][value~='this text does not exist']** to be **visible**"
]

exports['saved commands from test-page1-spec.js finds aliens'] = [
  "visit test-page1.html",
  "log fail on purpose, no such text",
  "wrap {foo: bar}",
  "assert expected **{ foo: bar }** to deeply equal **{ foo: bar }**",
  "contains this text does not exist",
  "assert expected **:not(script,style):cy-contains('this text does not exist'), [type='submit'][value~='this text does not exist']** to be **visible**"
]

exports['saved commands from a.js has second test (failing)'] = [
  "wrap {foo: 42}",
  "its .foo",
  "assert expected **42** to equal **2**"
]

exports['saved commands from a.js has third test (failing)'] = [
  "wrap foo",
  "assert expected **foo** to equal **bar**"
]

exports['saved commands from long-name-spec.js 184-188-192-196-2001'] = [
  "log file name short enough",
  "visit https://example.cypress.io",
  "url ",
  "assert expected **https://example.cypress.io/** to include **google**"
]

exports['saved commands from long-name-spec.js 184-188-192-196-200-204-208-212-216-220-224-228-232-236-240-244-248-252-2561'] = [
  "log file name too long",
  "get .nonexistent-selector",
  "assert expected **.nonexistent-selector** to exist in the DOM"
]

exports['spec a.js finished with'] = {
  "totalTests": 4,
  "totalFailed": 2,
  "totalPassed": 2,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec test-page1-spec.js finished with'] = {
  "totalTests": 1,
  "totalFailed": 1,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec test-page2-spec.js finished with'] = {
  "totalTests": 1,
  "totalFailed": 1,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}

exports['spec long-name-spec.js finished with'] = {
  "totalTests": 2,
  "totalFailed": 2,
  "totalPassed": 0,
  "totalPending": 0,
  "totalSkipped": 0
}
