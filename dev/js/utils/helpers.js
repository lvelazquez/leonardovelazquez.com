
// var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifZero', function (a, opts) {
        if (a == 0)
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
