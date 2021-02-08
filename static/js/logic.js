// Create init event handler
var form = d3.select(".is-preload");
form.on("keypress", init);
console.log("I am lost")

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
        accessToken: 'pk.eyJ1IjoicmJsZXZpbmUiLCJhIjoiY2tqenlwd2c2MDhxajJ2cGJwZ2w5YWt1eSJ9.CbH0egXe3ybOBDvV6bhVsw'
    }).addTo(myMap);
    console.log("here i am")
    // Read the csv file to get data
    d3.json("static/js/GeoCountry.geojson").then(function(data) {

        console.log(data);
        
            // CREATE A NEW CHOROPLETH LAYER
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
                layer.bindPopup(feature.properties.name + "<br># of Wines: "
                + feature.properties.title).on('click', function() {
                    // countryIn VARIABLE
                    var countryIn = feature.properties.name;
                    document.getElementById("countryIn").value = countryIn
                    updateTable(countryIn);
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

};

// CREATE CUSTOM SELECT TABLE FILTER

var x, i, j, l, ll, selElmnt, a, b, c;

// Look for any elements with the class "custom-select"
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
selElmnt = x[i].getElementsByTagName("select")[0];
ll = selElmnt.length;

// For each element, create a new DIV that will act as the selected item
a = document.createElement("DIV");
a.setAttribute("class", "select-selected");
a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
x[i].appendChild(a);

// For each element, create a new DIV that will contain the option list
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 1; j < ll; j++) {

    // For each option in the original select element, create a new DIV that will act as an option item
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {

        // When an item is clicked, update the original select box, and the selected item
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
        }
        }
        h.click();
    });
    b.appendChild(c);
}
x[i].appendChild(b);
a.addEventListener("click", function(e) {

    // When the select box is clicked, close any other select boxes, and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {

// Function that will close all select boxes in the document, except the current select box
var x, y, i, xl, yl, arrNo = [];
x = document.getElementsByClassName("select-items");
y = document.getElementsByClassName("select-selected");
xl = x.length;
yl = y.length;
for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
    arrNo.push(i)
    } else {
    y[i].classList.remove("select-arrow-active");
    }
}
for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
    x[i].classList.add("select-hide");
    }
}
}
// If the user clicks anywhere outside the select box, then close all select boxes
document.addEventListener("click", closeAllSelect);


d3.select("select")
.on('change', updateTable(countryIn));

// Function to update table with selection data
function updateTable(countryIn) {

    console.log("here again", countryIn)

        // Get a reference to the table body
        var tbody = d3.select("tbody");

        // Clear out current contents in the table
        tbody.html("");

        // Get a reference to the scatter plot
        var scatter = d3.select("plot")

        // Clear out current contents in scatter plot
        scatter.html("")

        // dropDown selection variable
        var dropDown = d3.select('select').property('value');

        console.log("selection", dropDown);


        fetch(`http://127.0.0.1:5000/api/v1.0/buildtable/${countryIn}/${dropDown}`, {
            method: 'GET',
            // mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin":"*",
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //     'Accept': 'application/json',
                // 'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify({countryIn:countryIn, dropDown:dropDown})
        })
        .then(response => response.json())
        .then(function(tableData) {

            console.log(tableData);

            // CREATE SCATTER PLOT
            temp=tableData
            temp=temp.filter(c=>c.country==countryIn)
            xx=[]
            temp.forEach(function(d){
                xx.push(parseFloat(d.price))
            })
            yy=[]
            temp.forEach(function(d){
                yy.push(parseFloat(d.points))
            })
            
            hovertext=[]
            temp.forEach(function(d){
                string=`${d.title}<br> Price:$${d.price} <br> Points: ${d.points}`
                hovertext.push(string)
            })
            
            console.log(xx)

            var trace1 = {
                type: "scatter",
                mode: "markers",
                text: hovertext,
                x: xx,
                y: yy,
                line: {
                color: "#380059"
                }
            };
        
            var data = [trace1];
            var layout = {
                title: {
                    text: `Wine`,
                    font: {
                        family: 'Times',
                        size:25
                    }
                },
                hovermode: "closest",
                hoverlabel: { bgcolor: "#380059" },
                xaxis: { 
                    title: {
                        text:"Price($)",
                        font: {
                            family: 'Times',
                            size:20
                        }
                    },
                    //Attempt at slider
                    automargin: true,
                    showticklabels: true,
                    rangeslider:{
                    },
                },
                yaxis: {
                autorange: true,
                title: {
                    text: 'Points',
                    font: {
                        family: 'Times',
                        size:20
                    }
                },
                // type: "linear"
                },
                showlegend: false
            };
            Plotly.newPlot("plot", data, layout);
        
            // CREATE WINE DATA TABLE

            // Loop through each wine object in the data array
            tableData.forEach((wineObject) => {


                // Append one table row for each wine object
                var row = tbody.append("tr");

                // Use `Object.entries` and forEach to iterate through keys and values of wine object
                Object.entries(wineObject).forEach(([key, value]) => {

                    // Append one cell per wine object value 
                    var cell = row.append("td")
                    cell.text(value);
                });
            });
        })
};

