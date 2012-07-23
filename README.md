# Structure

**Structure** is a small library that encourages developers to better organize their client-side JavaScript code. It offers a single global variable under which an application's code should be contained, the ability to create namespaces under that global variable, and the ability to register reusable modules.

## Usage

Include `structure.js` with a script tag. Although you can use `Structure` itself as your global namespace, you're encouraged to pick a name for your application. These examples will simply use `App`.

``` javascript
Structure.init("App");
```

The above call will remove `Structure` from the global namespace and re-add it as `App`.

### Structure.registerModule

The `registerModule` method is used for generating namespaced modules. The first argument is a string representing the namespaces and module you're defining. If only one argument is passed, the module is created as an empty object.

``` javascript
App.registerModule("App.Views.Comment");

App.Views.Comment; // empty object
```

To populate the module in one shot, pass an object literal as the second argument.

``` javascript
App.registerModule("App.Views.Comment", {
  validate: function (comment) {
    return comment.name.length > 0 && comment.body.length > 0;
  }
});

App.Views.Comment.validate({ name: "Joe", body: "Great post!" }); // true
```

Structure will automatically *bind* all the functions in your module so that the value of `this` inside each method refers to the module itself.

``` javascript
App.registerModule("App.Examples.Binding", {
  one: function () {
    return this.two;
  },

  two: "woo!"
});

// Using a module's method as a jQuery event handler
$(document.body).on("example", App.Examples.Binding.one);
$(document.body).trigger("example"); // "woo!"
```

`registerModule` also takes an optional callback function as a third parameter. This callback will be passed the newly registered module, so you can conveniently wire up your module's methods to elements/events in the DOM without having to reference the full namespace.

``` javascript
App.registerModule("App.Form", {
  onClick: function (event) {
    // Do something with a click event
  },

  onSubmit: function (event) {
    // Do something with a submit event
  }
}, function (module) {
  var form = $("form");

  form.on("click", module.onClick);
  form.on("submit", module.onSubmit);
});
```

## Advantages

While these simple examples may make it seem that Structure is unnecessary boilerplate, there are advantages to this approach.

As your application grows, it's easier to maintain code when chunks of functionality are grouped into modules in an organized way. This organization also aids in understanding the system for new developers working on an existing code base (or the original developers trying to remember the purpose of some code they wrote months or years ago.)

Putting methods in named properties helps communicate what they do. This is often not immediately clear if all of your application's behavior is inside anonymous functions passed to jQuery event binding functions. Should you decide to unit test your code (which you should), being able to reference individual methods this way is basically required.

## Further reading

Structure was inspired by my blog post, [jQuery is not an architecture](http://jimmycuadra.com/posts/jquery-is-not-an-architecture).
