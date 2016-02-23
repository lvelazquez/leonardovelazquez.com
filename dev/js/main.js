// TODO modularize with browserify
// TODO debug and optimize router & auto scroll
// TODO support swiping for mobile
// TODO make slideshow degrade gracefully without javascript
// TODO test deploy with heroku
// TODO pixelation effect

var myProjects = new ProjectList(projects);
var isMobile = window.matchMedia("only screen and (max-width: 760px)");

$(document).ready(function () {

    var wr = new MainRouter();
    var contact = new Contact();
    var contactForm = new ContactView({model: contact});
    var self = this;
    var pixelEffect = new PixelFX();
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
        // pixelEffect.init();
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
    var scrollMax = $('#contact').offset().top;
    var scrollMin = 1000;
    //jQuery to collapse the navbar on scroll
    var pScroll = 0;

    var convertRange = function(Input, InputLow, InputHigh, OutputLow, OutputHigh) {
        return (((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow);
    }

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
                if ($navBar.offset().top > 200) {
                    $video[0].pause();
                    $video.addClass('invisible');
                    // make a num that goes from x to y go from scrollMin to scrollMax
                    // on x = scrollMin and on y it has to be scrollMax
                    // Input, InputLow, InputHigh, OutputHigh, OutputLow
                    if(pScroll>=0) {
                        pScroll =(convertRange($navBar.offset().top, 50, scrollMax, 30, 10));
                        pixelEffect.pixelate(pScroll);
                    } else {
                        pixelEffect.pixelate(0);
                    }

                }

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
                $video.removeClass('invisible');
                $video[0].play();
            }
        }

    });

    Backbone.history.start();


});
