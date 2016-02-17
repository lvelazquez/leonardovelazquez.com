var ContactView = Backbone.View.extend({
    el: "div#contact-container",
    template: $("#contact-template"),
    events: {
        'click #submit': 'submitClicked'
    },
    initialize: function () {
        var _self = this;
        this.model.on('invalid', function(data) {
            _self.resetSubmit();
            _self.showErrors(data.validationError);
        });

        this.render();

        this.submitBtn = _self.$("#submit");
        this.statusMsg = _self.$('#statusMsg');
    },
    resetSubmit: function() {
        this.submitBtn.removeClass("disabled");
        this.submitBtn.html("SUBMIT");
    },
    submitClicked: function (e) {
        e.preventDefault();

        var _self = this;
        var send = {
            email: this.$('#contact_email').val(),
            name: this.$('#contact_name').val(),
            subject: this.$('#contact_subject').val(),
            message: this.$('#contact_message').val()
        };

        var opts = {
            success: function () {
                _self.statusMsg.html(errors.responseText);
                _self.statusMsg.show();

                _.delay(function(){
                    _self.statusMsg.hide();
                },1000);
            },
            error: function (model, errors) {
                console.log(errors);
                switch(errors.statusText) {
                    case 'OK':
                        _self.statusMsg.html(errors.responseText);
                        _self.statusMsg.show();

                        _.delay(function(){
                            _self.statusMsg.hide();
                        },1000);

                        break;
                }

                _self.resetSubmit();

            }
        };
        this.hideErrors();

        this.submitBtn.html("Sending...");
        this.submitBtn.addClass("disabled");

        this.model.save(send, opts);

    },
    render: function () {
        var template = Handlebars.compile(this.template.html());
        this.$el.html(template);

        return this;
    },
    showErrors: function (errors) {
        // console.log(errors, 'ERRORS');
        _.each(errors, function (error) {
            var controlGroup = this.$('.contact-' + error.name);
            controlGroup.removeClass('has-success');
            controlGroup.addClass('has-error');
        }, this);
    },
    hideErrors: function () {
        this.$('.contact-info').addClass('has-success');
        this.$('.contact-info').removeClass('has-error');
    }
});