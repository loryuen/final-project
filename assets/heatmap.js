//
var currentDay = new Date()

// create a map object
var myMap = L.map("map", {
    center: [40.446, 79.982],
    zoom: 2,
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true
});
mapbox://styles/lorelley/ck9m5rf8a18mo1jqtznx8hwhh
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // id: "mapbox.streets-basic",
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(myMap);

  dataCsv = "data/2020_combined.csv"
  
  d3.csv(dataCsv, function(data) {
    console.log(data);
    console.log(data[0].Lat, data[0].Long)
    
    var heatArray = [];

    for (var i = 0; i < data.length; i++) {
        // var location = [];
        // location.push([data[i].Lat], data[i].Long);
        var location = [data[i].Lat, data[i].Long, data[i].median]

        if (location) {
            heatArray.push(location)
        }
        
    }
    console.log(heatArray);

    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
      }).addTo(myMap);

    // var heat = L.heatLayer(heatArray, {
    //     radius: 20,
    //     blur: 35
    // }).addLayer(heat)
  });