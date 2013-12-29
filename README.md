# Rollbar notifier for JavaScript [![Build Status](https://api.travis-ci.org/rollbar/rollbar.js.png?branch=master)](https://travis-ci.org/rollbar/rollbar.js)

<!-- Sub:[TOC] -->

## Quick start

Copy-paste the following code into the ```<head>``` of every page you want to monitor. It should be as high as possible, before any other ```<script>``` tags.

<!-- RemoveNextIfProject -->
Be sure to replace ```POST_CLIENT_ITEM_ACCESS_TOKEN``` with your project's ```post_client_item``` access token, which you can find in the Rollbar.com interface.

<!-- EditableTextAreaStart -->
<!-- RemoveNext -->
```html
<script>
var _rollbarConfig = {
    accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
    captureUncaught: true,
    environment: "production",
    server: {
      host: "web2"
    }
};
!function(a,b){function c(a){this.shimId=++_shimCounter,this.notifier=null,this.parentShim=a}function d(b){var d=c;return function(){if(this.notifier)return this.notifier[b].apply(this.notifier,arguments);var c=this,e="scope"===b;e&&(c=new d(this));var f=Array.prototype.slice.call(arguments,0),g={shim:c,method:b,args:f,ts:new Date};return a.RollbarShimQueue.push(g),e?c:void 0}}_shimCounter=0,c.VERSION="1.0.0-beta1",c.init=function(a,b){if("object"==typeof a.Rollbar)return a.Rollbar;a.RollbarShimQueue=[],b=b||{};var d=new c;if(d.configure(b),b.captureUncaught){var e=a.onerror;a.onerror=function(){d.uncaughtError.apply(d,arguments),e&&e.apply(a,arguments)}}return a.Rollbar=d,d},c.prototype.loadFull=function(a,b,c,d){var e=function(){var a=b.createElement("script"),e=b.getElementsByTagName("script")[0];a.src=d,a.async=!c,a.onload=f,e.parentNode.insertBefore(a,e)},f=function(){if(void 0===a._rollbarPayloadQueue)for(var b,c,d,e,f=new Error("rollbar.js did not load");b=a.RollbarShimQueue.shift();)for(d=b.args,e=0;e<d.length;++e)if(c=d[e],"function"==typeof c){c(f);break}};c?e():a.addEventListener?a.addEventListener("load",e,!1):a.attachEvent("onload",e)};for(var e="log,debug,info,warning,error,critical,global,configure,scope,uncaughtError".split(","),f=0;f<e.length;++f)c.prototype[e[f]]=d(e[f]);var g="//d37gvrvc0wt4s1.cloudfront.net/js/v1.0/rollbar.min.js",h=c.init(a,_rollbaConfig);h.loadFull(a,b,!0,g)}(window,document);
</script>
```
<!-- RemovePrev -->
<!-- EditableTextAreaEnd -->

If you're running Rollbar on an environment besides production, change the ```server.environment``` value to something else (e.g. "staging"). See below for more configuration options.
  
### Test your installation

1. Navigate your browser to a page that has the above code installed
2. Type the following code *into the address bar* (not the console) and press enter: ```javascript:testing_rollbar_123();```

As long as you don't happen to have a function by that name, this will cause an uncaught error that will be reported to Rollbar. It should appear in the dashboard within a few seconds.

## Usage

In addition to catching top-level errors, you can send caught errors or custom log messages. All of the following methods are fully-asynchronous and safe to call anywhere in your code after the ```<script>``` tag above.

```js
// Caught errors
try {
  doSomething();
} catch (e) {
  Rollbar.error("Something went wrong", e);
}

// Arbitrary log messages. 'critical' is most severe; 'debug' is least.
Rollbar.critical("Connection error from remote Payments API");
Rollbar.error("Some unexpected condition");
Rollbar.warning("Connection error from Twitter API");
Rollbar.info("User opened the purchase dialog");
Rollbar.debug("Purchase dialog finished rendering");

// Can include custom data with any of the above.
// It will appear as `custom.postId` in the Occurrences tab
Rollbar.info("Post published", {postId: 123});

// Callback functions
Rollbar.error(e, function(err, data) {
  if (err) {
    console.log("Error while reporting error to Rollbar: ", e);
  } else {
    console.log("Error successfully reported to Rollbar. UUID:", data.uuid);
  }
});
```

To set configuration options at runtime, use `Rollbar.configure`:

```js
Rollbar.configure({
  personId: 456,
  personUsername: "foo",
  personEmail: "foo@example.com"
});
```

(Advanced) For fine-grained control of the payload sent to the [Rollbar API](https://rollbar.com/docs/api_items/), use `Rollbar.scope`:

```js
Rollbar.scope({fingerprint: "custom fingerprint to override grouping algorithm"}).error(err);
```

## Source Maps

If you minify your JavaScript in production, you'll want to configure source maps so you get meaningful stack traces. See the [source maps guide](https://rollbar.com/docs/guides_sourcemaps/) for instructions.

## Next steps

- [Configuration reference](#)
- [API reference](#)
- [Plugins](#)
- [Best Practices](#)

## Help / Support

If you run into any issues, please email us at [support@rollbar.com](mailto:support@rollbar.com)

You can also find us in IRC: [#rollbar on chat.freenode.net](irc://chat.freenode.net/rollbar)

For bug reports, please [open an issue on GitHub](https://github.com/rollbar/rollbar.js/issues/new).

## Contributing

1. [Fork it](https://github.com/rollbar/rollbar.js)
2. Create your feature branch (```git checkout -b my-new-feature```).
3. Commit your changes (```git commit -am 'Added some feature'```)
4. Push to the branch (```git push origin my-new-feature```)
5. Create new Pull Request

To set up a development environment, you'll need Node.js and npm. Run `npm install`, then `make test` to run the tests.
