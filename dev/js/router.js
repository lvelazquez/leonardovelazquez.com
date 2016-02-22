var MainRouter = Backbone.Router.extend({
    routes: {
        "work/:id": "showProject",
        "work": "jumpToPage",
        "about": "jumpToPage",
        "contact": "jumpToPage"
    },
    hideProject: function () {
        if (isMobile.matches) {
            this.project.$el.addClass('invisible');
        }
    },
    initialize: function () {
        var _self = this;

        this.thumbs = new ThumbView({
            collection: myProjects
        });

        this.project = new ProjectView({
            collection: myProjects
        });

        $(window).resize(function () {
            _self.project.resize();
        });

        $('body').on('activate.bs.scrollspy', function (e) {
            var currentPage = $('a', e.target).attr('href');
            _self._scrolling = true;

            if (currentPage != "#/") {
                if (!_.isUndefined(_self.project) && !_.isUndefined(_self.project.currentProjectId) && currentPage == "#/work") {
                    currentPage = currentPage + '/' + _self.project.currentProjectId;
                }
                _self.navigate(currentPage, {replace: true});
            } else {
                _self.navigate('#/', {replace: true});
            }
        });

        $('.nav-item').bind('click', function (event) {
            event.preventDefault();
            var id = $(this).data('target');
            _self._scrolling = false;
            _self.navigate(id, {replace: true});
        });

    },
    jumpToPage: function (id) {
        var _self = this;

        if (id == this.project.currentProjectId) return;
        _self.hideProject();

        if (_self._scrolling) return;

        var jumpTo = $("#" + id).offset().top;

        TweenLite.to($('html, body'), 1, {
            scrollTop: jumpTo,
            ease: Expo.easeInOut
        });

    },
    showProject: function (id) {
        this.jumpToPage('work');
        if (isMobile.matches) {
            this.project.$el.removeClass('invisible');
        }
        this.project.showProject(id);
    }
});