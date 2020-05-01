var center = [38.895, -77.020];
var zoom = 3;
var before = L.map('before', {
        attributionControl: false,
        inertia: false,
        minZoom: 1
    }).setView(center, zoom);
    
var after = L.map('after', {
        inertia: false,
        minZoom: 1
    }).setView(center, zoom);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/spatial.map-qgihrqg5/{z}/{x}/{y}.png').addTo(before);  
L.tileLayer('http://{s}.tiles.mapbox.com/v3/spatial.map-qgihrqg5/{z}/{x}/{y}.png').addTo(after); 



// create a map object
// var myMap = L.map("map", {
//     center: [40.446, 79.982],
//     zoom: 2  
// });

// var heatMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     // id: "mapbox.streets-basic",
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   }).addTo(myMap);

dataCsv = "data/2020_combined.csv"

d3.csv(dataCsv, function(data) {
console.log(data);
console.log(data[0].Lat, data[0].Long)

var heatArray = [];

for (var i = 0; i < data.length; i++) {
    var location = [data[i].Lat, data[i].Long, data[i].median]

    if (location) {
        heatArray.push(location)
    };
}
console.log(heatArray);

var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
    }).addTo(after);
});

$('#map').beforeAfter(before, after);