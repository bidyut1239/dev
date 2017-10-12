/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For more information on views and layouts, check out:
 * http://sailsjs.org/#!/documentation/concepts/Views
 */

module.exports.views = {

  /****************************************************************************
  *                                                                           *
  * View engine (aka template language) to use for your app's *server-side*   *
  * views                                                                     *
  *                                                                           *
  * Sails+Express supports all view engines which implement TJ Holowaychuk's  *
  * `consolidate.js`, including, but not limited to:                          *
  *                                                                           *
  * ejs, jade, handlebars, mustache underscore, hogan, haml, haml-coffee,     *
  * dust atpl, eco, ect, jazz, jqtpl, JUST, liquor, QEJS, swig, templayed,    *
  * toffee, walrus, & whiskers                                                *
  *                                                                           *
  * For more options, check out the docs:                                     *
  * https://github.com/balderdashy/sails-wiki/blob/0.9/config.views.md#engine *
  *                                                                           *
  ****************************************************************************/

  engine: 'handlebars',


  /****************************************************************************
  *                                                                           *
  * Layouts are simply top-level HTML templates you can use as wrappers for   *
  * your server-side views. If you're using ejs or jade, you can take         *
  * advantage of Sails' built-in `layout` support.                            *
  *                                                                           *
  * When using a layout, when one of your views is served, it is injected     *
  * into the `body` partial defined in the layout. This lets you reuse header *
  * and footer logic between views.                                           *
  *                                                                           *
  * NOTE: Layout support is only implemented for the `ejs` view engine!       *
  *       For most other engines, it is not necessary, since they implement   *
  *       partials/layouts themselves. In those cases, this config will be    *
  *       silently ignored.                                                   *
  *                                                                           *
  * The `layout` setting may be set to one of the following:                  *
  *                                                                           *
  * If `false`, la'use strict';

if (process.env.NODE_ENV === 'staging') {
  var Handlebars = require('sails/node_modules/express-handlebars/node_modules/handlebars');
} else {
  var Handlebars = require('handlebars');
}
 var layouts = require('handlebars-layouts');

layouts.register(Handlebars);

Handlebars.registerHelper('ifCond', function (v1, v2, options) {

  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('reverse', function (hierarchy) {
  hierarchy.reverse();
});

Handlebars.registerHelper("not", function(obj) {
  return !obj;
});

Handlebars.registerHelper("counter", function (index) {
  return index + 1;
});

Handlebars.registerHelper("index", function (index) {
    index = index + 1;
    if(index<10) {
      return '0'+index;
    }
    return index;
});
Handlebars.registerHelper('difLvl', function (lvl) {
  if (lvl === 1)
    return 'Easy';
  if (lvl === 2)
    return 'Medium';
  if (lvl === 3)
    return 'Difficult';
  if (lvl === 4)
    return 'Advanced';
  if (lvl === 5)
    return 'Expert';

});

Handlebars.registerHelper("checkEven", function (index, options) {
  if(index % 2 == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('toUpperCase', function(str) {
  return str.toUpperCase();
});
                                                            *
  *                                                                           *
  ****************************************************************************/

  /****************************************************************************
  *                                                                           *
  * Using Multiple Layouts                                                    *
  *                                                                           *
  * If you're using the default `ejs` or `handlebars` Sails supports the use  *
  * of multiple `layout` files. To take advantage of this, before rendering a *
  * view, override the `layout` local in your controller by setting           *
  * `res.locals.layout`. (this is handy if you parts of your app's UI look    *
  * completely different from each other)                                     *
  *                                                                           *
  * e.g. your default might be                                                *
  * layout: 'layouts/public'                                                  *
  *                                                                           *
  * But you might override that in some of your controllers with:             *
  * layout: 'layouts/internal'                                                *
  *                                                                           *
  ****************************************************************************/

  layout: 'layouts/layout',

  /****************************************************************************
  *                                                                           *
  * Partials are simply top-level snippets you can leverage to reuse template *
  * for your server-side views. If you're using handlebars, you can take      *
  * advantage of Sails' built-in `partials` support.                          *
  *                                                                           *
  * If `false` or empty partials will be located in the same folder as views. *
  * Otherwise, if a string is specified, it will be interpreted as the        *
  * relative path to your partial files from `views/` folder.                 *
  *                                                                           *
  ****************************************************************************/

  partials: 'partials'


};
