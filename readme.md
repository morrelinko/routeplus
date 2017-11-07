# routeplus

[![NPM version](https://img.shields.io/npm/v/routeplus.svg)](https://www.npmjs.com/package/routeplus)

Express Route++

## Installation

    $ yarn add routeplus

### Named Routes

Name your routes and reference to them anywhere within your app.

Route plus provides a plug in-out interface.

```js
// using named routes

const express = require('express')
const rp = require('routeplus')

let app = express()

// Create a new router
let router = rp.router(express.Router(), {
  prefix: '/user'
})

// Define Routes as usual + fluent api
router.match(['GET'], '/settings', handler).as('setting')

router.get('/dasboard', handler).as('dashboard')

router.get('/p/:username', handler).as('profile')

app.use('/user', router.mount())

```

Generate urls from route names anywhere in app

```js
rp.url('dashboard') // outputs "/user/dashboard"

rp.url('profile', {username: 'johndoe'}); // outputs  /user/p/morrelinko
```

## API

#### routeplus.router()

#### routeplus.url()

#### routeplus.routeTable()

#### routeplus.clear()

## Testing

Clone the repository from github and run the commands below

```bash
$ yarn install 
$ yarn test
```

## Contribution

View list of all contributors [Here](https://github.com/morrelinko/routeplus/contributors)
