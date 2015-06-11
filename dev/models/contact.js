var Contact = Backbone.Model.extend({
    url: './phpmail.php',
    defaults: {
        name: '',
        email: '',
        subject: '',
        message: ''
    },
    validate: function (attrs) {

        var errors = [];
        _.each(attrs, function (value, key) {
            if (!attrs[key]) {
                errors.push({name: key});
            }
        });

        if (attrs.email && !this.validateEmail(attrs.email)) {
            errors.push({name: 'email'});
        }

        return errors.length > 0 ? errors : false;

    },
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});