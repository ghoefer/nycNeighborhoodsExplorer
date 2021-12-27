var directionsRenderer;
var rendererArray=[];
var numRenderers=0; 
var commuteArr= [];
var timeSelected = 0;
var listPos = [];

var departureDateTime;

function showDiv(select){
  document.getElementById('scroll').scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest"});
  
  timeSelected = timeSelected +1;
  if (timeSelected > 1) {
    rendererArray = [];
    console.log("CLEARED SO RENDERER ARRAY IS");
    console.log(rendererArray);
    listPos = [];
    }
  
   if(select.value==1){
     document.getElementById('most').style.display = "block";
     document.getElementById('least').style.display = "none";
     console.log("LEAST!!!");
   } else{
    document.getElementById('most').style.display = "none";
    document.getElementById('least').style.display = "block";
     console.log("LEAST BUT 0");
   }
  
} 

function initMap() {

  const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

  function clearOverlays(markers) {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
}
  
  document.addEventListener("DOMContentLoaded", createMap); 


// --------------- CREATE A NEW MAP -------------------
function createMap(){
  
  let directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 40.73, lng: -73.99 },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  });
    
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.    
    clearOverlays(markers);

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: "https://cdn.glitch.me/31a365f1-0b1f-4749-8ba1-3190ecc5243b%2Fplaceholder%20(4).png?v=1637258233739",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  
  const ctaLayer = new google.maps.KmlLayer({
    url: "https://cdn.glitch.me/31a365f1-0b1f-4749-8ba1-3190ecc5243b%2Flocality%20Manhattan%20Neighborhoods.kml?v=1636583819048",
    map: map,
  });
  
  let arr = [];
  arr[0]=map;
  arr[1]=directionsService;
  
  return arr;
}
   
  
  
// --------------- FUNCTION WHEN A ROUTE IS ADDED -------------------
const onAddHandler = function (map, directionsService) {
    console.log("NOW IN ON ADD HANDLER");
    
    console.log(rendererArray);
    console.log("listPos is:")
    console.log(listPos.length);

    for (var i = 0; i <listPos.length; i++) {
      var endPoint = listPos[i];
      rendererArray[i] = new google.maps.DirectionsRenderer({
        map: map
      });
      // rendererArray[i].setDirections(listPos[i]);
      console.log("END");
      console.log(listPos[i]);
      calculateAndDisplayRoute(directionsService, rendererArray[i], listPos[i]); 
    }
    console.log("DIRECTIONS RENDERER ARRAY IS:");
    console.log(rendererArray.length);
  };

  

// --------------- FUNCTION WHEN A ROUTE IS REMOVED ------------------- 
const onRemoveHandler = function () {
    console.log("NOW IN ONREMOVEHANDLER");
    
    createMap();
    
    departureDateTime = document.getElementById("departureTime").value;
    
    let directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 40.73, lng: -73.99 },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  });
    
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.    
    clearOverlays(markers);

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: "https://cdn.glitch.me/31a365f1-0b1f-4749-8ba1-3190ecc5243b%2Fplaceholder%20(4).png?v=1637258233739",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  
  const ctaLayer = new google.maps.KmlLayer({
    url: "https://cdn.glitch.me/31a365f1-0b1f-4749-8ba1-3190ecc5243b%2Flocality%20Manhattan%20Neighborhoods.kml?v=1636583819048",
    map: map,
  });
        
    console.log(rendererArray);
    console.log("listPos is:")
    console.log(listPos.length);

    for (var i = 0; i <=listPos.length; i++) {
      var endPoint = listPos[i];
      rendererArray[i] = new google.maps.DirectionsRenderer({
        map: map
      });
      
      // console.log("END HEREEEE");
      // console.log(listPos[i]);

      var endPoint = listPos[i];
      console.log(endPoint);
      
      calculateAndDisplayRoute(directionsService, rendererArray[i], endPoint);
      
    }
    console.log("DIRECTIONS RENDERER ARRAY IS:");
    console.log(rendererArray.length);
  };
  
// // Handle departure time
//   document.getElementById("submitDeparture").addEventListener("keypress", function (e){
//     createMap();                                                      
//   });

// Handles search box
  document.getElementById("pac-input").addEventListener("change", onAddHandler);
  

  
  // --------------- HANDLE CHECKBOXES ------------------- 
  // Handles check boxes
  // When something changes in a checkbox (so either check or uncheck):
  // If checkbox is checked, then draw map
  // If checkbox is not checked, then it is unchecked so remove
  var checkboxes = document.querySelectorAll("input[name=neighborhood]");
  
  checkboxes.forEach(function(checkbox) { 
  // When checkbox changes (clicked or unclicked):
    checkbox.addEventListener('change', function() {
    console.log("-----CHECK HAS BEEN PRESSED!----");
    let checkId=this.id;
    
    // empty commuteArr so that it can rewrite commute display panel
    // we need to rewrite it regardless of whether bix is checked or unchecked
      commuteArr = [];
    console.log(checkId);
    if (this.checked) {
      listPos.push(checkId);
      onAddHandler(initMap, initDirectionsService);
  } 
  else {
    console.log("Checkbox " + this.id + " is not checked..");
    console.log("listPos right now is: ");
    console.log(listPos);

    // now remove all renderers from the array so everything is clear
    rendererArray = [];
    console.log("CLEARED SO RENDERER ARRAY IS");
    console.log(rendererArray);
    
    // remove neighborhood from listPos because it is unchecked
    // get index based on it's id and remove
    const index = listPos.indexOf(this.id);
    if (index > -1) {
    listPos.splice(index, 1);
      }
    console.log("but now it has removed so listPos is:")
    console.log(listPos);
    
    onRemoveHandler();  
  }
})
}); 
 
// This below creates the very first map, before anything is checked or called
  let arr = createMap();
  let initMap = arr[0];
  let initDirectionsService = arr[1];
  
} //end of initMap


// function to order Commute Display Panel
function orderCommuteDisplayPanel(commuteArr){
  console.log("COMMUTE ARRAY IS...");
  console.table(commuteArr);
  
  commuteArr.sort(orderedCommute);

  function orderedCommute(a, b) {
      if (a[1] === b[1]) {
          return 0;
      }
      else {
          return (a[1] < b[1]) ? -1 : 1;
      }
  }
    
  console.table(commuteArr);
  console.log("writing...");
  
  console.log(commuteArr[0][0]);
  console.log(commuteArr[0][1]);

  let commuteDisplay = document.getElementById('commutePanel');
  commuteDisplay.innerHTML="";
  
  commuteDisplay.innerHTML="<h1-commute>"+"Your Commute"+ "</h1-commute>";

  // Now write ordered commute to the display
  for (var i = 0; i <=commuteArr.length; i++){   
    
    //if it is odd, then style to be light gray background
    function isOdd(num) { return !!(num % 2);}
    
    if (isOdd(i)==false) {
        commuteDisplay.innerHTML += "<gray>" + "<comm>" + "<location>" + commuteArr[i][0] + "</location>"
    + "<dist>" + commuteArr[i][1] + "</dist></comm></gray>"; 
    }
    else {
          commuteDisplay.innerHTML += "<comm>" + "<location>" + commuteArr[i][0] + "</location>"
    + "<dist>" + commuteArr[i][1] + "</dist></comm>"; 
    }
    

  
    }
}


// --------------- CALLED TO WRITE DIRECTIONS ------------------- 
function calculateAndDisplayRoute(directionsService, directionsRenderer, endPoint) {
  console.log("SO ENDPOINT IS:");
  // console.log(endPoint.value);
  let commuteDisplay = document.getElementById('commutePanel');
  commuteDisplay.innerHTML="";

  
  directionsService
    .route({
      origin: {
        query: document.getElementById("pac-input").value,
      },
      destination: {
        query: document.getElementById(endPoint).value,
      },
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        departureTime: new Date(document.getElementById("departureTime").value),
      }
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          console.log('Directions request failed');
          return;
        }
        else { 
          commuteArr.push([endPoint, directionsData.duration.text]);
          orderCommuteDisplayPanel(commuteArr);
        }
    })
  
}
