# routeplus

[![NPM version](https://img.shields.io/npm/v/routeplus.svg)](https://www.npmjs.com/package/routeplus)

Express Routes ++

## Installation

    npm install routeplus

### Named Routes

Name your routes and reference to them anywhere within your app.

Route plus provides a plug-in plug-out interface.

```js
// using named routes

let express = require('express');
let rp = require('routeplus');

let app = express();
let router = rp.adapt(express.Router());

router.get('/', function(req, res) {
  res.send('Welcome');
}).as('home');

router.get('/u/:username', function(req, res) {
  res.send('User profile');
}).as('profile');
```

Ability to regenerate urls from route names anywhere in app

```js
rp.url('home'); // outputs "/"

rp.url('profile', {username: 'morrelinko'}); // outputs  /u/morrelinko
```

### Mounted Routers

When you mount an express.Router (mini app) using `app.use('/path', router)`

It does so in a fashion that the `router` is unable to access the path you mounted it to.

Side effect been that urls generated for mounted routers won't include the mounted path `/path`.

Routeplus provides a workaround for this using a `router.mount()` syntax.

```js
let app = express();
let router = rp.adapt(express.Router());

router.get('/about', function(req, res) {
  res.send('Welcome');
}).as('about');

router.mount(app, '/user'); // equivalent to doing app.use('/user', router);
```

Now when you try to generate url for `about` route, instead of just returning `/about` you get `/user/about`

### Controller Builder

Routeplus bundles a controller builder that provides a fluent api for

building controllers with features like middleware organization, 

named and composable middlewares. API Below...

```js
app.get('/dashboard', rp.builder(handlerFn)
    .use(ensureLoggedIn())
    .namedMiddleware()
    .build());
```

#### Named MiddleWares

```js
// define a named middleware
rp.builder.middleware('loggedIn', function () {
  this.use(ensureLoggedIn({
    redirectTo: urlify.web('login'),
    setReturnTo: true
  }), 0);
  return this;
});

// Use middleware named (loggedIn)
app.get('/dashboard', rp.builder(handlerFn)
  .loggedIn()
  .build());
```

## API

#### adapt()

#### url()

#### routes()

#### clear()

#### builder

#### builder.register()

#### builder.

## Testing

Clone the repository from github and run the commands below

```bash
$ npm install 
$ npm test
```

#### Composable middlewares

Using the controller builder method above, you could create a 

middleware composed of other middlewares eliminating the bootstrap 

code of having to define similar amount of middlewares across

multiple routes like so:-

```js
// Define 
rp.builder.middleware('web', function() {
    this.use(connectFlash());
    this.use(trottleRequest());
    this.use(handleModelErrors(), 100);
    this.use(handleExceptions(), 100);
    return this;
});

// Using
app.get('/dashboard', rp.builder(handlerFn).web().build());
```

## Contribution

View list of all contributors [Here](https://github.com/morrelinko/routeplus/contributors)

## Credits 

Author & Contributor: Laju Morrison <morrelinko@gmail.com>
