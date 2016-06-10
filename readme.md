RoutePlus
---------------------

Express Routes ++

[Nothing Here: WIP]

## Installation

    npm install routeplus

## Features & Usage

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
}).name('home');

router.get('/u/:username', function(req, res) {
  res.send('User profile');
}).name('profile');
```

Ability to regenerate urls from route names anywhere in app

```js
rp.url('home'); // outputs "/"

rp.url('profile', {username: 'morrelinko'}); // outputs 
```

### Mounted Routers

When you mount an express Router using `app.use('/path', router)`

It does so in a fashion that the `router` is unable to access the path you mounted it to.

So normally routes generated for mounted routers won't include `/path`.

Routeplus provides support for mounted routes (mini apps) using a different syntax.

```js
let app = express();
let router = rp.adapt(express.Router());

router.get('/about', function(req, res) {
  res.send('Welcome');
}).name('about');

router.mount(app, '/user'); // equivalent to doing app.use('/user', router);
```

Now when you try to generate url for `home` route, instead of just returning `/about` you get `/user/about`

### Controller Builder

##### Note: API not implemented. Below is the documentation of how it supposedly should look like

Routeplus comes with a controller builder that provides a 

fluent api for configuring each controllers for a specific route. 

The controller builder comes with its own middleware stack organization 

and allows you to move middlewares up and down the stack. Meaning you 

can define exactly position of a middleware in your execution stack.

```js
// api

app.get('/dashboard', rp.builder(function(req, res) {
    res.send('Welcome user');
  })
  .middleware(ensureLoggedIn(), 10)
  .build());
```

With support for inline middleware

```js
let controller = rp.builder(function(req, res) {
    res.send('Welcome user');
  })
  .middleware(function(req, res, next) {
      console.log('Executed after main controller');
      next();
  }), 60)
  .build();

// use generated controller
app.get('/dashboard', controller);

```

## Controller Builder Named Middlewares

Routeplus also allows you to define named middlewares 

and call them directly with its custom name.

```js
// middlewares/loggedIn.js

rp.builder.extend('loggedIn', function () {
  this.middleware(ensureLoggedIn({
    redirectTo: urlify.web('login'),
    setReturnTo: true
  }), 0);

  return this;
});

// index.js

require('./middlewares/loggedIn');

let controller = rp.builder(function(req, res) {
    res.send('Welcome user');
  })
  .loggedIn()
  .build();

// use generated controller
app.get('/dashboard', controller);
```

## Contribution

Contribute

## Credits 

Author & Contributor: Laju Morrison <morrelinko@gmail.com>

Contributor: [Some contributor name]
