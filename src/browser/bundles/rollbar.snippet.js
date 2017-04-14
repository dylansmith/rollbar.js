/* globals __DEFAULT__ROLLBARJS_URL__ */
/* globals _rollbarConfig */

var Shims = require('../shim');
var snippetCallback = require('../snippet_callback');

_rollbarConfig = _rollbarConfig || {};
_rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || __DEFAULT_ROLLBARJS_URL__;
_rollbarConfig.async = _rollbarConfig.async === undefined || _rollbarConfig.async;

var shim = Shims.Shim.init(window, _rollbarConfig);
var callback = snippetCallback(_rollbarConfig);
window.rollbar = Shims.Rollbar;

shim.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, callback);