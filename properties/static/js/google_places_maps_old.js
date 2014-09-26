// for auditing
// if (){console.log(' created');}

// Create a global autocomplete var, so it can be used by functions
var autocomplete;


function initialize() {

  // check for Geolocation support
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  }
  else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }

  var mapOptions = {
    // TODO: change default location to geolocate when possible
    center: new google.maps.LatLng(0,0),
    zoom: 2
  };
  if (mapOptions) {console.log('mapOptions created');}

  // Create the map object, using mapOptions
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  //var map = new google.maps.Map(document.getElementById('map-canvas'));
  if (map){console.log('map object created');}

  // Create a var representing the autocomplete input element
  var autocomplete = /** @type {HTMLInputElement} */
    (document.getElementById('pac-input'));

  if (autocomplete){console.log('autocomplete created');}

  // Position the map on the page
  //    what exactly is happening here?
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(autocomplete);

  // Initialize the autocomplete object
  autocomplete = new google.maps.places.Autocomplete(autocomplete);
  // Bind the autocomplete/input objects to the map
  autocomplete.bindTo('bounds', map);

  // Create the info window and marker that will display 
  // when a place is selected from the autocomplete input
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, 0)
  });

  // [START region_place_changed_event]
  // Listens for 
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);

    fillInAddress();
  });
  // [END region_place_changed_event]
} 
// [END funct initialize]

google.maps.event.addDomListener(window, 'load', initialize);


// [START region_fillform]
function fillInAddress() {
  console.log('fillin');

  // Define the fields and data types of the form to be filled in
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      autocomplete.setBounds(new google.maps.LatLngBounds(geolocation, geolocation));
    });
  }
}
// [END region_geolocation]