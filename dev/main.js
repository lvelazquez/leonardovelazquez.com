Handlebars.registerHelper('ifZero', function (a, opts) {
    if (a == 0)// Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

var projects = [
    {
        id: "droid",
        thumb: "droid1.jpg",
        thumbWidth: "200",
        thumbHeight: "300",
        title: "Verizon/Droid Mobile & Tablet Site",
        description: "Mobile & Tablet site for Verizon/Droid phone, while freelancing for Mcgarrybowen, additional work on Flash fallback interactive animated background",
        type: 'html/css',
        url: "",
        images: [{
            image_url: "droid1.jpg"
        }, {
            image_url: "droid2.jpg"
        }, {
            image_url: "droid3.jpg"
        }, {
            image_url: "droid4.jpg"
        }]
    }, {
        id: "believe",
        thumb: "believe1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: "Macy's Believe Augmented Reality App",
        description: "Developed in Flash to promote Macys Believe O magic augmented reality app. Featuring an interactive puppet of the main character plus several updates and bug fixes throughout the site.",
        type: 'html/css',
        url: "http://social.macys.com/believe/?cm_mmc=VanityUrl-_-believe-_-n-_-n#/believeomagic",
        images: [{
            image_url: "believe1.png"
        }, {
            image_url: "believe2.png"
        }]
    },
    {
        id: "finder",
        thumb: "finder3.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: "Macy's Finder Sitelets",
        description: "The Cookware Finder was probably the most feature rich of the series of Macy's sitelets which also included Bedding and Luggage Finders. Rebuilt from the ground up from Flash sites to cross platform HTML/CSS/jQuery hybrids.",
        type: 'html/css',
        url: "",
        images: [{
            image_url: "finder3.png"
        }, {
            image_url: "finder4.png"
        }, {
            image_url: "finder1.png"
        }, {
            image_url: "finder2.png"
        }, {
            image_url: "finder5.png"
        }, {
            image_url: "finder6.png"
        }, {
            image_url: "finder7.png"
        }, {
            image_url: "finder8.png"
        }]
    }, {
        id: "parade",
        thumb: "parade1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: "Macy's Parade Tablet Site",
        description: "Tablet site for Macy's Parade 2011 event. Note: This site was developed to be displayed in a Ipad/tablet and might not display correctly in every desktop browser.",
        type: 'html/css',
        url: "http://leonardovelazquez.com/work/parade2011/",
        images: [{
            image_url: "parade1.jpg"
        }, {
            image_url: "parade2.jpg"
        }, {
            image_url: "parade3.jpg"
        }, {
            image_url: "parade4.jpg"
        }, {
            image_url: "parade5.jpg"
        }, {
            image_url: "parade6.jpg"
        }, {
            image_url: "parade7.jpg"
        }, {
            image_url: "parade8.jpg"
        }, {
            image_url: "parade9.jpg"
        }]
    }, {
        id: "fireworks",
        thumb: "fireworks1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: "Macy's Fireworks Site",
        description: "First site in Cross-platform HTML environment for Macy's fireworks event spanning several updates.",
        type: 'html/css',
        url: "",
        images: [{
            image_url: "fireworks1.png"
        }, {
            image_url: "fireworks2.png"
        }, {
            image_url: "fireworks3.png"
        }]
    }, {
        id: "holiday",
        thumb: "santa1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: "Macy's Holiday Gift Guide FB Tablet Site",
        description: "Macy's Holiday Gift Guide Facebook site done for Tablet in HTML/jQuery using CSS3 animations. NOTE: To view this site in the tablet version link you should view on a tablet device or using a Development Kit for tablet.",
        type: 'html/css',
        url: "https://apps.facebook.com/187865291301756/",
        images: [{
            image_url: "santa1.jpg"
        }, {
            image_url: "santa2.jpg"
        }, {
            image_url: "santa3.jpg"
        }, {
            image_url: "santa4.jpg"
        }]
    }, {
        id: "wim",
        thumb: "wim1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: 'Maya Lin\'s What is Missing site',
        description: '',
        type: 'html/css',
        url: "http://whatismissing.net",
        images: [{
            image_url: "wim1.jpg"
        }, {
            image_url: "wim2.jpg"
        }]
    }, {
        id: "newmoon",
        thumb: "newmoon1.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: '"What\'s driving edward?" Puzzles',
        description: '',
        type: 'html/css',
        url: "",
        images: [{
            image_url: "newmoon1.jpg"
        }, {
            image_url: "newmoon2.jpg"
        }, {
            image_url: "newmoon3.jpg"
        }, {
            image_url: "newmoon4.jpg"
        }, {
            image_url: "newmoon5.jpg"
        }]
    }];

var myProjects = new ProjectList(projects);

var MainRouter = Backbone.Router.extend({
    routes: {

        "work/:id": "showProject", // #search/kiwis
        "work": "jumpToPage",
        "about": "jumpToPage",
        "contact": "jumpToPage"
    },
    hideProject: function () {
        if (Modernizr.touch) {
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
        if (Modernizr.touch) {
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
    //  if(Modernizr.touch) {
    $('img.lazy').lazyload({
        effect: "fadeIn"
    });


    var showSite = function () {


        TweenLite.to($('.background-poster', $siteBg), 5, {
            alpha: 1,
            ease: Strong.easeOut
        });

    };

    if (Modernizr.touch || (bowser.msie && bowser.version <= 8)) {
        $video.remove();
        $('#backup', $siteBg).removeClass('invisible');
        $('.background-poster', $siteBg).show();
    } else {
        $video.on('canplay', showSite);
        // fallback
        setTimeout(function () {
            showSite();
        }, 1000);

        if ($video[0].readyState > 3) {
            showSite();
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
            if (!(Modernizr.touch || (bowser.msie && bowser.version <= 8))) {
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

            if (!(Modernizr.touch || (bowser.msie && bowser.version <= 8))) {
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

//Google Map Skin - Get more at http://snazzymaps.com/
var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(40.7253, -74.0681),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{"color": "#A5C7DE"}]
    }, {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"gamma": 0.01}, {"lightness": 20}]
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"saturation": -31}, {"lightness": -33}, {"weight": 2}, {"gamma": 0.8}]
    }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}, {"hue": "#A5C7DE"}]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [{"visibility": "on"}]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"lightness": 30}, {"saturation": 30}]
    }, {"featureType": "poi", "elementType": "geometry", "stylers": [{"saturation": 20}]}, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"lightness": 20}, {"saturation": -20}]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{"lightness": 10}, {"saturation": -30}]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{"saturation": 25}, {"lightness": 25}]
    }, {"featureType": "water", "elementType": "all", "stylers": [{"lightness": -20}]}]

};

//"#A5C7DE"
var map = new google.maps.Map(document.getElementById('map'), myOptions);