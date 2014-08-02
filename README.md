siena [![Build Status](https://travis-ci.org/MisumiRize/siena.svg?branch=master)](https://travis-ci.org/MisumiRize/siena)
=====

Siena is class-based micro router for client.

Siena is designed to reduce complexity of legacy JavaScript (old-type, such as inline JavaScript).

## Strategy

* Standalone (does not depend on any other modules)
* Flexible (adapted to other framework or module)
* Simple (easy to modify)
* Object-Oriented (like web framework)

## Usage

### CoffeeScript basic

```coffee
class MyController extends Siena.Controller
  run: (param) ->
    $(".dom").click () ->
      someLegacyFunction();

new Siena.Dispatcher
  .addRoute "/foo", MyController
  .addRoute /\/bar/, MyController
  .dispatch()
```

Routing by RegExp is also available.

### Placeholder

```coffee
new Siena.Dispatcher
  .addRoute "/foo/:id", MyController
  .dispatch()
```

Placeholder parameters can be accessed in Controller like `param.id`.

### Action

```coffee
class MyController extends Siena.Controller
  bar: (param) ->
  baz: (param) ->

new Siena.Dispatcher
  .addRoute "/foo/:action", MyController
  .dispatch()
end
```

`/foo/bar` is dispatched to `MyController#bar`, `/foo/baz` is dispatched to `MyController#baz`.
