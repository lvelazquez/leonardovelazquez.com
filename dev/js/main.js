// TODO modularize with browserify
// TODO add recent projects, planned parenthood, map, un women
// TODO optimize intro loading, try intro animation
// TODO fix intro for Safari, site is blocked
// TODO debug and optimize router, auto scroll hack

// TODO Optimize
// Use sprite for thumbs? won't work with
// support swiping for mobile

// TODO consolidate css in a sass file
// TODO make slideshow degrade gracefully without javascript
// TODO test deploy with heroku
// TODO test for IE and mobile

var myProjects = new ProjectList(projects);
var isMobile = window.matchMedia("only screen and (max-width: 760px)");
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

$(document).ready(function () {

    var wr = new MainRouter();
    var contact = new Contact();
    var contactForm = new ContactView({model: contact});

    // VIDEO START

    var $siteBg = $("#siteBg");
    var $video = $('#myPlayer', $siteBg);

    $('img.lazy').lazyload({
        effect: "fadeIn"
    });


    var showSite = function () {
        TweenLite.to($('.background-poster',$siteBg), 5, {
            alpha: 1,
            ease: Strong.easeOut,
            onStart: function() {
                $video[0].play();
            }
        });
    };

    if (isMobile.matches|| (bowser.msie && bowser.version <= 8)) {
        $video.remove();
        $('.background-poster', $siteBg).show();
    } else {
        $video.on('canplay', showSite);

        if ($video[0].readyState > 3) {
            // showSite();
        }
    }


    // VIDEO END

    var $navBar = $(".navbar");
    var $logoHeader = $(".logo-header");

    //jQuery to collapse the navbar on scroll

    $(window).scroll(function () {

        if ($navBar.offset().top > 50) {

            TweenLite.to($navBar, 1.5, {
                top: "0px",
                ease: Circ.easeOut,
                onStart: function(){
                    $navBar.css('display', 'block');
                    $navBar.css('top', '-50px');
                }
            });
            if (!(isMobile.matches || (bowser.msie && bowser.version <= 8))) {
                TweenLite.to($logoHeader, 3, {
                    alpha: 0,
                    ease: Circ.easeOut
                });
                if ($navBar.offset().top > 200) $("#myPlayer")[0].pause();

            }
        } else {

            TweenLite.to($navBar,.25, {
                top: "-50px",
                ease: Circ.easeOut
            });

            if (!(isMobile.matches || (bowser.msie && bowser.version <= 8))) {
                TweenLite.to($logoHeader, 1, {
                    alpha: 1,
                    ease: Circ.easeOut
                });
                $("#myPlayer")[0].play();
            }
        }

    });

    Backbone.history.start();

});
