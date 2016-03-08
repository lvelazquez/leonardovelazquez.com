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
    var $siteBg = $("#site-background");
    var $video = $('#site-player', $siteBg);

    TweenLite.to(
        $('.logo-header'),
        2,
        {
            delay: 1,
            alpha: 1,
            ease: Strong.easeOut
        });

    var showSite = function () {

        $('.content-section').removeClass('invisible');
        $('img.lazy').lazyload({
            effect: "fadeIn",
            failure_limit: 10
        });

        TweenLite.to(
            $('span', '.brand-heading'),
            1,

            {
                delay: 3,
                css: {color: '#FFF'},
                ease: Strong.easeOut,
                onStart: function (e) {
                    var heading = $(this.target);
                    var headingColor = window.getComputedStyle(heading[0])['color'];
                    heading.css({
                        '-webkit-animation': 'none',
                        color: headingColor
                    });
                    heading.removeClass('titleLoader');
                }
            });
        TweenLite.to(
            $('#svgLogo'),
            1,
            {
                delay: 3,
                css: {
                    fill: '#FFF'
                },
                ease: Strong.easeOut,
                onStart: function () {
                    var heading = $(this.target);
                    var headingColor = window.getComputedStyle(heading[0])['fill'];
                    heading.css({
                        '-webkit-animation': 'none',
                        fill: headingColor
                    });
                    heading[0].className.baseVal = '';
                }
            });

        TweenLite.to($('.background-poster', $siteBg), 2, {
            alpha: 1,
            ease: Circ.easeOut,
            delay: 4
        });
    };


    if (bowser.ios || (bowser.msie && bowser.version <= 8)) {
        showSite();
    }

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
