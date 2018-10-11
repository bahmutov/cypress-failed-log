exports['saved commands failed test in test-page1-spec'] = [
  "visit test-page1.html",
  "log fail on purpose, no such text",
  "wrap {foo: bar}",
  "assert expected **{ foo: bar }** to deeply equal **{ foo: bar }**",
  "contains this text does not exist",
  "assert expected **{ Object (length, prevObject, ...) }** to be **visible**"
]

exports['saved commands from second test'] = [
  "wrap {foo: 42}",
  "its .foo",
  "assert expected **42** to equal **2**"
]

exports['saved commands from third test'] = [
  "wrap foo",
  "assert expected **foo** to equal **bar**"
]

exports['spec a.js finished with'] = {
  "totalTests": 3,
  "totalFailed": 2,
  "totalPassed": 1,
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
