/*var $navBar = $(".navbar");
var $logoHeader = $(".logo-header");
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
	if ($navBar.offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
		$navBar.fadeIn();
		$logoHeader.fadeOut();
		$("#myPlayer")[0].pause();
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
		$navBar.fadeOut();
		$logoHeader.fadeIn();
		$("#myPlayer")[0].play();
	}
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('.nav a').bind('click', function(event) {
		var $anchor = $(this);
		var jumpTo = $($anchor.attr('href')).offset().top;
		console.log(jumpTo, "jumpTo ")
		$('html, body').stop().animate({
			scrollTop : jumpTo
		}, 1000, 'easeInOutExpo');
		event.preventDefault();
	});
});*/


/*
//Google Map Skin - Get more at http://snazzymaps.com/
var myOptions = {
	zoom : 15,
	center : new google.maps.LatLng(40.7253, -74.0681),
	mapTypeId : google.maps.MapTypeId.ROADMAP,
	disableDefaultUI : true,
	styles : [{
		"featureType" : "landscape.natural",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 100
		}]
	}, {
		"featureType" : "water",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -86
		}]
	}, {
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 100
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -75
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 97
		}]
	}, {
		"featureType" : "poi.park",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -100
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 100
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "on"
		}]
	}, {
		"featureType" : "landscape.man_made",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -68
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 100
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -100
		}]
	}, {
		"featureType" : "poi",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 91
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -100
		}]
	}, {
		"featureType" : "transit.station",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : -22
		}]
	}, {
		"featureType" : "landscape.man_made",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"hue" : "#ff004c"
		}, {
			"saturation" : -100
		}, {
			"lightness" : 44
		}]
	}, {
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"saturation" : 1
		}, {
			"lightness" : -100
		}]
	}, {
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"saturation" : -100
		}, {
			"lightness" : 100
		}]
	}, {
		"featureType" : "administrative.locality",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "administrative.locality",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "on"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "on"
		}]
	}]

};

var map = new google.maps.Map(document.getElementById('map'), myOptions);
*/