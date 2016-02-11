# Assignment 1 - API

This assignment is split up into several parts. The first part will be to create
a module to interact with the [WhoIsMyRepresentative API][repapi]. You will
create a module that will expose methods to call the different endpoints. The
second part will be to expose an express app api around your reps module. After
that, we will use express middleware to do other things such as using a
templating engine.

# Part 1

In the file `lib/reps.js`, export 5 methods that implement the 5 different api
endpoints described [here][repapi].

Here are the methods you should implement:

* `allByZip(zip, callback)` - corresponds with `getall_mems.php?zip={zip}`

* `repsByName(name, callback)` - corresponds with `getall_reps_byname.php?name={name}`

* `repsByState(state, callback)` - corresponds with `getall_reps_bystate.php?state={state}`

* `sensByName(name, callback)` - corresponds with `getall_sens_byname.php?name={name}`

* `sensByState(state, callback)` - corresponds with `getall_sens_bystate.php?state={state}`

In all of the above examples, the second parameter will always be a function
which accepts two parameters: and `err` object, and the results of the api call
as the second.

Use an http request module such as [`superagent`][superagent] or
[`request`][request] to make http calls to the whoismyrepresentative api.

Example usage:

```js
// reps is the module that you will develop. The following is how it would be
// used in other modules.
var reps = require('./lib/reps');

reps.allByZip('84043', function(err, results) {
  if (err) return console.log(err);
  console.log(results);
});

reps.sensByState('Hatch', function(err, results) {
  if (err) return console.log(err);
  console.log(results);
});
```

To run the tests, run:

```sh
npm run test:unit
```

# Part 2

Using the [`express`][express] module, write a json api that wraps your module
methods. Create the following endpoints:

* `/all/by-zip/:zip` - maps to `reps.allByZip(zip, cb)`
* `/reps/by-name/:name` - maps to `reps.repsByName(name, cb)`
* `/reps/by-state/:state` - maps to `reps.repsByState(state, cb)`
* `/sens/by-name/:name` - maps to `reps.sensByName(name, cb)`
* `/sens/by-state/:state` - maps to `reps.sensByState(name, cb)`

To run the tests, run:

```sh
npm run test:api
```

# Part 3

For part three, you will use express' view engine, which allows you to make
templates from which you will render html and put in dynamic content.

You will have to set some app level settings to get this going. First, you need
to decide on a template engine. I recommend using one called `pug`
([formally][pug] known as `jade`)

First, you'll need to install `pug`:

```js
npm install --save pug
```

Create a new folder called `views/` and place a new file called `index.pug` in
that directory. Just to get things rolling, put in the following contents:

```jade
html
  head
    title Who is my representative?
  body
    h1 Hello there
```

We'll talk more about this syntax in class.

Next, in your `app.js`, you'll need to set some view settings to enable `pug`
as your view engine:

```js
var path = require('path');
var express = require('express');
var app = express();

// This sets it so that when you call `res.render(viewName)`, it will look in
// the `views/` directory for a file called `viewName`.pug
app.set('views', path.join(__dirname, 'views'));
// This sets the view engine. Notice that you don't actually have to require
// `pug`, just put in the string name of the package.
app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  // This is pointing to the file called `index.*` in your views directory.
  res.render('index');
});
```

More information about `res.render()` can be found [here][render]. More
information about `pug` can be found [here][jade].

For the assignment, you will create a form on the home page that will allow
people to search their representatives by zip, by state, or by name.

I recommend you use query parameters to do the searching, but you may implement
it as you wish.

Your jade form could look something like this:

```jade
form(method='get' action='/')
  select(name='type')
    option(label='Zip' value='zip')
    option(label='State' value='state')
    option(label='Name' value='name')
  input(type='text' name='search')
```

Try putting that into your jade template. View the page in your browser and
type something into the search box and press enter. Notice how the url changed.
Those are query parameters, and you have access to those in your middleware
where you `res.render('index')`:

```js
app.get('/', function(req, res, next) {
  console.log(req.query);
  res.render('index');
});
```

We can also pass in variables that you can use in your template. Look at the
following:

```js
app.get('/', function(req, res, next) {
  res.render('index', {
    type: req.query.type,
    search: req.query.search,
  });
});
```

```jade
html
  body
    if type
      p You searched for type: #{type}
    if search
      p Your search query was: #{search}
```

For more information about using logic and variables in your pug templates,
refer to the [language documentation][jade].

So for the assignment, I want you to consume that type and search, and perform
the searches and render the data from your pug templates. The listing doesn't
have to look pretty. It can just be some `ul` displaying the data.

Refer to the resources given to you to look up how to do loops and things in
your templates. You'll need to call your reps library methods and put the data
into your `res.render` call.

[request]: https://github.com/request/request
[superagent]: http://visionmedia.github.io/superagent/
[repapi]: http://whoismyrepresentative.com/api
[express]: http://expressjs.com/en/guide/routing.html
[pug]: https://github.com/pugjs/jade/issues/2184
[jade]: http://jade-lang.com/
[render]: http://expressjs.com/en/4x/api.html#res.render
