'use strict';

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

Handlebars.registerHelper('lessThan', function (v1, v2, options) {

  if (v1 < v2) {
    return options.fn(this);
  }
  return options.inverse(this);

});

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper('greaterThan', function (v1, v2, options) {

  if (v1 > v2) {
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
