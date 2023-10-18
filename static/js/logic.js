let queryurl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
let quakes=[]
let lat=[]
let long=[]
let depth=[]
let mag=[]
let popups=[]
function colorf(depth) {
    if (depth <= 10) {return("yellow")
    } else if (depth<=50) {return("green")
    } else if (depth<=100) {return("red")
    } else if (depth>100) {return("black")}
};
d3.json(queryurl).then(function(data) {
    for (let i =0; i<data.features.length;i++) {
        lat.push(data.features[i].geometry.coordinates[0]);
        long.push(data.features[i].geometry.coordinates[1]);
        depth.push(data.features[i].geometry.coordinates[2]);
        mag.push(data.features[i].properties.mag);
        quakes.push(L.circle([long[i],lat[i]], {
            color: "black",
            fillColor: colorf(depth[i]),
            fillOpacity:.75,
            radius: Math.sqrt(mag[i])*10000
        }));

        quakes[i].bindPopup(`Magnitude: ${mag[i]}, lat/long: ${long[i]}/${lat[i]}, Depth ${depth[i]}`)
    };

    
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    console.log("hi");
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    let quakers = L.layerGroup(quakes);
    let baseMaps = {
        "Street Map": street,
        "Topological Map":topo
    };
    let overlayMaps = {
        "earthquakes": quakers
    }

    console.log("hi");
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, quakers]
    });

   console.log("hi");
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);


});

