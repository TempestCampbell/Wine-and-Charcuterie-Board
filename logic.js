// var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 2
//   });
  
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);

// Create init event handler
var form = d3.select(".is-preload");
form.on("keypress", init);

// Create the function for the initial data rendering
function init() {

    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 1
      });
      
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: "pk.eyJ1IjoicmJsZXZpbmUiLCJhIjoiY2tqenlwd2c2MDhxajJ2cGJwZ2w5YWt1eSJ9.CbH0egXe3ybOBDvV6bhVsw"
      }).addTo(myMap);

    // Read the csv file to get data
    d3.json("GeoCountry.geojson").then(function(data) {
<<<<<<< HEAD

=======
>>>>>>> mk/coding
        console.log(data);

        // Fetch api from flask
        // fetch("https://127.0.0.1:5000/api/v1.0/world", {
        //     method: "GET",
        //     headers: {
        //         "Access-Control-Allow-Origin": "*"
        //     }

        // }).then(function(response) {
        
            // Create a new choropleth layer
            geojson = L.choropleth(data, {
    
                // Define what  property in the features to use
                valueProperty: "title",

                // Set color scale
                scale: ["#fff7f3", "#49006a"],

                // Number of breaks in step range
                steps: 10,

                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.8
                },

                // Binding a pop-up to each layer
                onEachFeature: function(feature, layer) {
<<<<<<< HEAD
                layer.bindPopup().on('click', function(ev) {
=======
                layer.bindPopup(feature.properties.name + "<br># of Wines: "
                + feature.properties.title).on('click', function(ev) {
>>>>>>> mk/coding
                    var countrySelect = feature.properties.name;
                    updateTable(countrySelect);
                });
                }
            }).addTo(myMap);

                // Set up the legend
                var legend = L.control({ position: "bottomright" });
                legend.onAdd = function() {
                    var div = L.DomUtil.create("div", "info legend");
                    var limits = geojson.options.limits;
                    var colors = geojson.options.colors;
                    var labels = [];

                    // Add min & max
                    var legendInfo = "<h1>Wines by Country</h1>" +
                        "<div class=\"labels\">" +
                        "<div class=\"min\">" + limits[0] + "</div>" +
                        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
                        "</div>";

                    div.innerHTML = legendInfo;

                    limits.forEach(function(limit, index) {
                        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
                    });

                    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
                    return div;
                };

            // Adding legend to the map
            legend.addTo(myMap);
        
    });
<<<<<<< HEAD
    idNumber=["Highest Ranked", "Lowest Ranked","Cheapest","Most Expensive"]
    // select the user input field
    // var dropDownMenu = d3.select("#selDataset");
    // dropDownMenu.append("option").text("HighestRated");
    // dropDownMenu.append("option").text("LowestRated");
    // dropDownMenu.append("option").text("MostExpensive");
    // dropDownMenu.append("option").text("Cheapest");
    // dropDownMenu.append("option").text("NewestVintage");
    // dropDownMenu.append("option").text("OldestVintage");
    // let dropdownBtn = document.querySelector('.menu-btn');
    // let menuContent = document.querySelector('.menu-content');
    // dropdownBtn.addEventListener('click',()=>{
    // if(menuContent.style.display===""){
    //     menuContent.style.display="block";
    // } 
    // else {
    //     menuContent.style.display="";
    // }
    // });
=======
>>>>>>> mk/coding
};

// Create map event handler
// var mapSelect = d3.select("#map");
// mapSelect.on("click", updateTable);

function updateTable(countrySelect) {

    console.log("here again", countrySelect)

    // dropdown menu to filter table
    let dropdownBtn = document.querySelector('.menu-btn');
    let menuContent = document.querySelector('.menu-content');
    dropdownBtn.addEventListener('click',()=>{
    if(menuContent.style.display===""){
        menuContent.style.display="block";
    } 
    else {
        menuContent.style.display="";
    }
    });
<<<<<<< HEAD

    // Select the input element and get the raw HTML node
    var inputElement = d3.select(".menu-content");

    // Get the value property of the input element
    var dropDown = inputElement.property("value");

    // handle on click event
    d3.select('.menu-content')
    .on('change', function() {

        // Read the csv file to get data
        d3.json(`http://127.0.0.1:5000/api/v1.0/buildtable/${countrySelect}/${dropDown}`).then(function(data) {
            console.log("here we go", data);
        // fetch(`http://127.0.0.1:5000/api/v1.0/buildtable/${countrySelect}`)
        // .then(response => response.json())
        // .then(function(data) {

            var tableData = data;
            console.log("here", tableData)
            // Prevent the page from refreshing
            d3.event.preventDefault();

            // Clear out current contents in the table
            tbody.html("");

            // // Select the input element and get the raw HTML node
            // var inputElement = d3.select(".form-control");

            // // Get the value property of the input element
            // var inputValue = inputElement.property("value");

            // // Filter Data with country equal to input value
            // var filteredData = tableData.filter(wineObject => wineObject.country === inputValue);

            // Get a reference to the table body
            var tbody = d3.select("tbody");

            // Loop through each wine object in the data array
            tableData.forEach((wineObject) => {

=======

    // Select the input element and get the raw HTML node
    // var inputElement = d3.select(".menu-content");

    // handle on click event
    d3.select('.menu-content')
    .on('click', function(dropDownSelect) {

        var dropDown = eval(d3.select(this).attr('href'));
        // Get the value property of the input element
        // var dropDown = inputElement.property("value");
        console.log("selection", dropDown)
        // Read the csv file to get data
        d3.json(`http://127.0.0.1:5000/api/v1.0/buildtable/${countrySelect}/${dropDown}`).then(function(tableData) {
            console.log("here we go", tableData);
        // fetch(`http://127.0.0.1:5000/api/v1.0/buildtable/${countrySelect}`)
        // .then(response => response.json())
        // .then(function(data) {

            // Prevent the page from refreshing
            // d3.event.preventDefault();

            // Clear out current contents in the table
            tbody.html("");

            // // Select the input element and get the raw HTML node
            // var inputElement = d3.select(".form-control");

            // // Get the value property of the input element
            // var inputValue = inputElement.property("value");

            // // Filter Data with country equal to input value
            // var filteredData = tableData.filter(wineObject => wineObject.country === inputValue);

            // Get a reference to the table body
            var tbody = d3.select("tbody");

            // Loop through each wine object in the data array
            tableData.forEach((wineObject) => {

>>>>>>> mk/coding
                // Append one table row for each wine object
                var row = tbody.append("tr");

                // Use `Object.entries` and forEach to iterate through keys and values of wine object
                Object.entries(wineObject).forEach(([key, value]) => {

                    // Append one cell per wine object value 
                    var cell = row.append("td");
                    cell.text(value);
                });
            });
        });
    });
};
