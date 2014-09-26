
// Define address form element and var names
var form = document.getElementById('showInfoWindow');
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

// Create global objects
var autocomplete, map, place, marker, infowindow;

function initialize() {
  console.log('initialize');
  checkGeolocation(); 
  createMap();
  createAutocomplete();
  createInfoWindow();
  
  // 
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    console.log('place_changed');
    
    place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    adjustMapToSelectedPlace(place);
    dropMarker(place);

  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  //function setupClickListener(id, types) {
  //  var radioButton = document.getElementById(id);
  //  google.maps.event.addDomListener(radioButton, 'click', function() {
  //    autocomplete.setTypes(types);
  //  });
  //}

  //setupClickListener('changetype-all', []);
  //setupClickListener('changetype-address', ['address']);
  //setupClickListener('changetype-establishment', ['establishment']);
  //setupClickListener('changetype-geocode', ['geocode']);
}

function adjustMapToSelectedPlace(place) {
  console.log('adjustMapToSelectedPlace');
  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);  // Why 17? Because it looks good.
  }
}

function createInfoWindow(){
  console.log('createInfoWindow');
  infowindow = new google.maps.InfoWindow({content: document.getElementById('showPlaceInMarker'), visible: false});
}

function dropMarker(place) {
  console.log('dropMarker');
  if (typeof marker === 'undefined') {
    marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
  } 
  else {
    marker.setVisible(false);
  }

  marker.setPosition(place.geometry.location);
  marker.setVisible(true);

  showInfoWindow(marker);
}

function showInfoWindow(marker){
  console.log('showInfoWindow');
  // if infowindow doesn't exist, create it
  //  otherwise close it and reopen it at the marker
  if (typeof infowindow === 'undefined' || infowindow == null) {
    console.log('infowindow undefined or null, create a new one');
    createInfoWindow();
  }
  //else {
  //  console.log('infowindow exists, closing');
  //  infowindow.close();
  //  }
    console.log('infowindow opening');
    infowindow.open(map, marker);
    buildInfoWindowContent(place);
}

// [START region_buildInfoWindowContent]
function buildInfoWindowContent(place) {
  console.log('buildInfoWindowContent');
  // Get the place details from the autocomplete object.
  //var place = autocompleteObject.getPlace();

  //for (var component in componentForm) {
  //  document.getElementById(component).value = '';
  //  document.getElementById(component).disabled = false;
  //}

  document.getElementById('showPlaceInMarker').style.display = 'block';

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
      console.log(document.getElementById(addressType).value);
    }
  }
  document.getElementById('showPlaceInMarker').style.visibility = 'visible';
}
// [END region_buildInfoWindowContent]

// [START region_checkGeolocation]
function checkGeolocation(){
  console.log('geolocation');
  // Try HTML5 geolocation
  var pos;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(pos);
        console.log('geolocation supported');
      }, 
      function() {
        //handleNoGeolocation(true);
        //pos = new google.maps.LatLng(37.1, -95.7);
        console.log('geolocation supported, but no location found or permission denied');
      });
  } else {
    // Browser doesn't support Geolocation
    // handleNoGeolocation(false);
    //pos = new google.maps.LatLng(37.1, -95.7);
    console.log('geolocation not supported');
  }
}
// [END region_checkGeolocation]


function createMap() {
  console.log('createMap');
  // Set map options
  var mapOptions = {
    center: new google.maps.LatLng(37.1, -95.7), //pos,
    zoom: 4
  };

  // Create the map object
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  console.log(map);
}

function createAutocomplete() {
  console.log('createAutocomplete');
  // Create object from the input control
  var input = /** @type {HTMLInputElement} */ (document.getElementById('pac-input')); 
  // Add the input control to the map control array
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Create the autocomplete object from the input control object
  autocomplete = new google.maps.places.Autocomplete(input);
  // Bind the autocomplete's search bias to the region displayed by the map
  autocomplete.bindTo('bounds', map);
  // Set place types that will appear in autocomplete suggestions
  // types:  geocode, establishment, address, regions, cities
  autocomplete.setTypes(['address']);
}

// Attach initialize() function to pageload event
google.maps.event.addDomListener(window, 'load', initialize);
