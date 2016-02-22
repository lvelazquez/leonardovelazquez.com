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


$(document).ready(function () {

    var wr = new MainRouter();
    var contact = new Contact();
    var contactForm = new ContactView({model: contact});
    var self = this;
    // VIDEO START

    var $siteBg = $("#siteBg");

    var $video = $('#myPlayer', $siteBg);

    // INTRO LOADING ANIMATION
    var svgLogo = $('polygon', '.site-logo');
    var titleHeader = $('span', '.brand-heading');
    var colors = ['#86a4ce', '#5e6870', '#3c444b'];
    var currentColor = 0;
    var loadLoop = function () {
        self.loader = setInterval(function () {
            currentColor++;
            if (currentColor > colors.length) {
                currentColor = 0;
            }
            svgLogo.css({fill: colors[currentColor]});
            titleHeader.css({color: colors[currentColor]});
        }, 400);
    };

    loadLoop();

    var showSite = function () {
        clearInterval(self.loader);
        $('.content-section').css({visibility:'visible'});
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

    $('img.lazy').lazyload({
        effect: "fadeIn"
    });

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
                if ($navBar.offset().top > 200) $("#myPlayer")[0].pause();

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
                $("#myPlayer")[0].play();
            }
        }

    });

    Backbone.history.start();


});
