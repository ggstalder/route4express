# route4express

Route4express load directories and build the url using the directory tree

## Usage

### Server declaration

```js
'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const route4express = require('route4express')
const joi4express = require('joi4express')

let port = process.env.port || 8080

// Load your route directory
let routes = route4express(path.join(__dirname, '/lib/routes'), 'api')

let app = express()

app.use(bodyParser.json())

// Registering routes
routes.forEach(route => app[route.method](route.url, joi4express(route)))

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})
```

# Route declaration

```js
'use strict'

function post(req, res) {
  res.send()
}

function get(req, res) {
  res.send()
}

module.exports = [
  {
    method: 'post',
    url: 'import',
    handler: post,
    summary: 'Import data',
    description: 'Import data',
    tags: ['survey']
  },
  {
    method: 'get',
    url: 'import/:id',
    handler: get,
    summary: 'Get imported data',
    description: 'Get imported data',
    tags: ['survey']
  }
]

```

## Installation

### Installing joi4express
```
  npm install route4express --save
```

## Run Tests
Tests are written with mocha/chai.

``` bash
  $ npm test
```
