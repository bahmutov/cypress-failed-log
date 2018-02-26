# cypress-failed-log

[![Greenkeeper badge](https://badges.greenkeeper.io/bahmutov/cypress-failed-log.svg)](https://greenkeeper.io/)

> Gets you the Cypress test command log as JSON on failure

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Install

Add this module as a dev dependency to your project

```sh
npm install --save-dev cypress cypress-failed-log
```

Then include this module from your `cypress/support/index.js` file

```js
// cypress/support/index.js
require('cypress-failed-log')
```

Add an NPM script `failed-test` that will get the name of the JSON file
with failed test details.

```json
{
  "scripts": {
    "failed-test": "echo Test failed, details in $1"
  }
}
```

You can send the file as an email, upload it somewhere, post to a chat
channel, etc.

## JSON file fields

The saved JSON file will have the following properties (see
[src/index.js](src/index.js#L67))

```
specName - filename of the spec
title - the name of the test
suiteName - the parent suite name
testName - full name of the test, including the suite name
testError - error message string
testCommands - array of strings, last failing command is last
screenshot - filename of PNG file taken right after failure
```

## Example

Here is the failed test JSON file contents. The test name, the failure
and each test command before the test are recorded

```json
{
  "specName": "failing-spec.js",
  "title": "loads the About tab",
  "suiteName": "Website",
  "testName": "Website loads the About tab",
  "testError": "Timed out retrying: Expected to find content: 'Join Us' but never did.",
  "testCommands": [
    "visit",
    "new url https://www.company.com/#/",
    "contains a.nav-link, About",
    "click",
    "new url https://www.company.com/#/about",
    "hash",
    "assert expected **#/about** to equal **#/about**",
    "contains Join Us",
    "assert expected **body :not(script):contains(**'Join Us'**), [type='submit'][value~='Join Us']** to exist in the DOM"
  ],
  "screenshot": "loads-the-about-tab.png"
}
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-failed-log/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/cypress-failed-log.svg?downloads=true
[npm-url]: https://npmjs.org/package/cypress-failed-log
[ci-image]: https://travis-ci.org/bahmutov/cypress-failed-log.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/cypress-failed-log
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
