var center = [38.895, -77.020];
var zoom = 2;
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

// Configure a parseTime function which will return a new Date object from a string
var timeParse = d3.timeParse("%m/%d/%y");
// Format time so it is easy to filter
var timeFormat = d3.timeFormat("%Y-%m-%d")

dataCsv = "data/2020_combined2.csv"

d3.csv(dataCsv, function(data) {
    console.log(data);

    // parse through time
    data.forEach(function(d) {
        d.Date = timeParse(d.Date);
        d.Date = timeFormat(d.Date)
    });

    // filter for december dates
    dec = data.filter(function(d){ return d.Date > "2019-09-30" && d.Date < "2019-10-15"})
    console.log(dec.length)  

    // filter for april dates
    april = data.filter(function(d){ return d.Date > "2020-04-23"})
    console.log(april.length)    
    
    // get location data for dec dates and store in heatArray
    var heatArrayDec = [];
    for (var i = 0; i < dec.length; i++) {
        var location = [dec[i].Lat, dec[i].Long, dec[i].median]

        if (location) {
            heatArrayDec.push(location)
        };
    };
    console.log(heatArrayDec);

    // get location data for april dates and store in heatArray
    var heatArrayApril = [];
    for (var i = 0; i < april.length; i++) {
        var location = [april[i].Lat, april[i].Long, april[i].median]

        if (location) {
            heatArrayApril.push(location)
        };
    };
    console.log(heatArrayApril);

    // heat layer for dec
    var heat = L.heatLayer(heatArrayDec, {
        radius: 20,
        blur: 35
        }).addTo(before);
    
    // heat layer for April
    var heat = L.heatLayer(heatArrayApril, {
        radius: 20,
        blur: 35
        }).addTo(after);
});

L.marker([38.895, -77.060]).addTo(before);

$('#map').beforeAfter(before, after);


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