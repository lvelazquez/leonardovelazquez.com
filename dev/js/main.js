// TODO modularize with browserify
// TODO debug and optimize router & auto scroll
// TODO support swiping for mobile
// TODO make slideshow degrade gracefully without javascript
// TODO test deploy with heroku

var myProjects = new ProjectList(projects);
var isMobile = window.matchMedia("only screen and (max-width: 760px)");

$(document).ready(function () {

    var wr = new MainRouter();
    var contact = new Contact();
    var contactForm = new ContactView({model: contact});
    var self = this;
    // VIDEO START

    var $siteBg = $("#site-background");

    var $video = $('#site-player', $siteBg);

    // INTRO LOADING ANIMATION
    var svgLogo = $('polygon', '.site-logo');
    var titleHeader = $('span', '.brand-heading');
    var colors = ['#86a4ce', '#5e6870', '#3c444b'];
    var currentColor = 0;
    var loadingLoop = function () {
        self.loader = setInterval(function () {
            currentColor++;
            if (currentColor > colors.length) {
                currentColor = 0;
            }
            svgLogo.css({fill: colors[currentColor]});
            titleHeader.css({color: colors[currentColor]});
        }, 400);
    };

    loadingLoop();

    var showSite = function () {
        clearInterval(self.loader);

        $('.content-section').removeClass('invisible');
        $('img.lazy').lazyload({
            effect: "fadeIn",
            failure_limit : 10
        });

        svgLogo.css({fill: 'white'});
        titleHeader.css({color: 'white'});

        TweenLite.to($('.background-poster', $siteBg), 5, {
            alpha: 1,
            ease: Strong.easeOut
        });
    };

    $video.on('canplay', showSite);

    if ($video[0].readyState > 3) {
        showSite();
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
                onStart: function () {
                    $navBar.css('display', 'block');
                    $navBar.css('top', '-50px');
                }
            });
            if (!(isMobile.matches || (bowser.msie && bowser.version <= 8))) {
                TweenLite.to($logoHeader, 3, {
                    alpha: 0,
                    ease: Circ.easeOut
                });
                if ($navBar.offset().top > 200) $video[0].pause();

            }
        } else {

            TweenLite.to($navBar, .25, {
                top: "-50px",
                ease: Circ.easeOut
            });

            if (!(isMobile.matches || (bowser.msie && bowser.version <= 8))) {
                TweenLite.to($logoHeader, 1, {
                    alpha: 1,
                    ease: Circ.easeOut
                });

                $video[0].play();
            }
        }

    });

    Backbone.history.start();


});
