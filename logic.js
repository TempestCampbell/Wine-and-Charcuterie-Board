var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


// Create the function for the initial data rendering
function init() {


    // Read the csv file to get data
    d3.json("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(function(data) {
        console.log(data)

        // Create a new choropleth layer
        geojson = L.choropleth(data, {

            // Fetch api from flasks
            fetch("http://127.0.0.1:5000/api/v1.0/world/")
            .then(response => response.json())
            .then(function() { 
            

            // Define what  property in the features to use
            valueProperty: response.country;

            // Set color scale
            scale: ["#fff7f3", "#49006a"];

            // Number of breaks in step range
            steps: 10;

            // q for quartile, e for equidistant, k for k-means
            mode: "q";
            style: {
            // Border color
            color: "#fff";
            weight: 1;
            fillOpacity: 0.8
            };

            // Binding a pop-up to each layer
            onEachFeature: function(feature, layer) {
            layer.bindPopup().on('dblclick', function(ev) {
                var countrySelect = winereviews
            });
            }
            })
        }).addTo(myMap);
    
    });
};

function updateTable(countrySelect) {
    
    fetch(`http://127.0.0.1:5000/api/v1.0/world/${countrySelect}`)
    .then(response => response.json())
    .then(function(data) {

        // from data.js
        var tableData = data,

        // Get a reference to the table body
        var tbody = d3.select("tbody");

        // Loop through each wine object in the data array
        tableData.forEach((wineObject) => {

            // Append one table row for each wine object
            var row = tbody.append("tr");

            // Use `Object.entries` and forEach to iterate through keys and values of wine object
            Object.entries(wineObject).forEach(([key, value]) => {

                // Append one cell per wine object value 
                var cell = row.append("td");
                cell.text(value);
            });
        }),
    });
};

init();