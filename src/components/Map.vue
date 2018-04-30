<template>
    <div id="map"></div>
</template>

<script>
  //AIzaSyDZQGlMdo87H0xsGZA0pGGUJXiU93EcP3E
  const styles = [{
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
  }, {"featureType": "water", "elementType": "all", "stylers": [{"lightness": -20}]}];


  import GoogleMapsLoader from 'google-maps';

  export default {
    name: "Map",
    mounted() {
      GoogleMapsLoader.KEY = "AIzaSyDZQGlMdo87H0xsGZA0pGGUJXiU93EcP3E";
      GoogleMapsLoader.load(function (google) {
        new google.maps.Map(document.getElementById('map'), {
          zoom: 12, //38.8897° N, 77.0111° //47.6229° N, 122.3165° W
          center: new google.maps.LatLng(47.6229, -122.3165),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          styles
        });
      });
    }
  }
</script>

<style scoped>
    #map {
        position: relative;
        width: 100%;
        height: 250px;
    }
</style>