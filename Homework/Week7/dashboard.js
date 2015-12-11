//--------------------------------
// by: Anneke ter Schure, 6084087
//
// make localhost server: python -m SimpleHTTPServer
// use url: http://localhost:8000/index.html
//--------------------------------

var data, linedata
var selection = [];

d3.json("/Data/electricity.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  plotMap();
});

// d3.json("/Data/renewableyears.json", function(error,json) {
//     if (error) return console.warn(error);
//     linedata = data
//     lineGraph();
// });
// lineGraph();


/*
* make map and colour the countries according to
* % of electricity from renewable sources ***************************************
* source of Datamap code: https://github.com/markmarkoh/datamaps
*/
function plotMap(){

    // makes a map and sets properties
    var map = new Datamap({
        element: document.getElementById('map'),

        // zoom in to europe
        setProjection: function(element) {
            var projection = d3.geo.azimuthalEqualArea()
                .scale(900)
                .translate([220, 1000])
                .clipAngle(180 - 1e-3)
                .precision(1);
            var path = d3.geo.path()
                .projection(projection);
            return {path: path, projection: projection};
        },
        // sets fill colors of countries according to the json fillKey key
        fills: {
            VVHIGH: '#1b7837',
            VHIGH: '#7fbf7b',
            HIGH: '#d9f0d3',
            MEDIUM: '#e7d4e8',
            LOW: '#af8dc3',
            VLOW: '#762a83',
            defaultFill: '#cccccc'
        },
        // adjust style of interactions
        geographyConfig: {
            borderWidth: 0.5,
            highlightOnHover: false,
            popupTemplate: function(geo, data) {
                if (data == null || data.totalrenewable == '..'){
                    return ['<div class="hoverinfo">',
                            'Electricity from renewable sources in ' + geo.properties.name,
                            ': unknown',
                            '</div>'].join('');
                }
                else {
                    return ['<div class="hoverinfo">',
                            'Electricity from renewable sources in ' + geo.properties.name,
                            ': ' + data.totalrenewable.substring(0, 5),
                            '%',
                            '</div>'].join('');
                }
            }
        },

        // parse the json data to the datamap
        data: data,

        // on a mouse click event make reminder on map and draw bar graph
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                d3.select(this)
                    .style("opacity", "0.7")
                    .style("stroke-width", "2")
                    .style("stroke", 'steelblue')
                name = geography.properties.name;
                code = String(Object(this).__data__["id"]);
                countryobject = data[code];
                barGraph(countryobject, name);
            });
        }
    });
    // create and stylise map legend
    map.legend({
        defaultFillName: 'Unknown',
        labels: {
            VVHIGH: '> 80%',
            VHIGH: '61% - 80%',
            HIGH: '41% - 60%',
            MEDIUM: '21% - 40%',
            LOW: '11% - 20%',
            VLOW: '< 10%'
        }
    });
};

/*
* draw bar graph ***************************************************************
*/
function barGraph(countryobject, name) {
    if (countryobject == null || countryobject.fillKey == null) {
        selection.push(name)
        var div = d3.select('#detail')
            .append("p")
                .text("Electricity sources in " + name + " are unknown");
    }
    else if ((selection.indexOf(name) >= 0) == false) {
        selection.push(name)
        var div = d3.select('#detail')
            .append("p")
                .text(name);

        // function to get key from value in javascript object
        countryobject.getKey = function(value){
            for(var key in this){
                if(this[key] == value){
                    return key;
                }
            }
            return null;
        };

        // get data
        percentageknown = Number(countryobject.renewable)
                        + Number(countryobject.hydroelectric)
                        + Number(countryobject.nuclear)
                        + Number(countryobject.gas)
                        + Number(countryobject.oil);
        bardata = [String(percentageknown), countryobject.renewable, countryobject.hydroelectric,
                countryobject.nuclear, countryobject.gas, countryobject.oil];
        // bardata.sort(d3.descending); // I decided not to sort the data as this allows for better comparisons across countries

        // define scaling
        var vertMargin = 10;
        var horMargin = 70;
        var barHeight = 15;
        var width = 400;
        var height = barHeight * bardata.length;

        var x = d3.scale.linear()
            .domain([0, 100])
            .range([0, width - horMargin * 2]);

        // make chart
        var chart = d3.select('#detail').append("svg")
            .attr("class", "chart")
            .attr("width", width + horMargin * 2)
            .attr("height", height + vertMargin * 2)
            .append("g")
                .attr("transform", "translate(" + horMargin + "," + vertMargin + ")");

        //create bars
        var bar = chart.selectAll("g")
            .data(bardata)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")" });

        var rect = bar.append("rect")
            .attr("width", x)
            .attr("height", barHeight - 1)
            .style("fill", function(d) {
                if (countryobject.getKey(d) == 'renewable' || countryobject.getKey(d) == 'hydroelectric') {
                    if (countryobject.fillKey == "VVHIGH") { return '#1b7837' }
                    else if (countryobject.fillKey == "VHIGH") { return '#7fbf7b' }
                    else if (countryobject.fillKey == "HIGH") { return '#d9f0d3' }
                    else if (countryobject.fillKey == "MEDIUM") { return '#e7d4e8' }
                    else if (countryobject.fillKey == "LOW") { return '#af8dc3' }
                    else if (countryobject.fillKey == "VLOW") { return '#762a83' }
                }
                else if (countryobject.getKey(d) == 'nuclear') {
                    return '#FF8C8C';
                }
                else if (countryobject.getKey(d) == 'gas') {
                    return '#F55';
                }
                else if (countryobject.getKey(d) == 'oil'){
                    return '#F11';
                }
                else {
                    return 'steelblue';
                };
            });

        // show bar values on mouseover
        bar.on("mouseover", function(d) {
                d3.select(this).append("text")
                    .attr("class", "tip")
                    .attr("x", function(d) {return x(d) + 3; })
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .text(function(d) {
                        return d.substring(0, 5) + '% ';
                    });
                })
            .on("mouseout", function(d) {
                d3.select(this).select(".tip").remove();
            });

        // always show labels
        bar.append("text")
            .attr("x", 3 - horMargin)
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d, i) {
                    if (i == 0) { return "total known %" }
                    else if (i == 1) { return "renewable" }
                    else if (i == 2) { return "hydroelectric" }
                    else if (i == 3) { return "nuclear" }
                    else if (i == 4) { return "gas" }
                    else if (i == 5) { return "oil" };
            });
    };
};

/*
 * This function removes all bar chars that are created and
 * clears the selected countries from the map **********************************
 */
function clearSelection() {
    // remove bar charts and corresponding titles
    d3.selectAll("p").remove();
    d3.selectAll(".chart").remove();

    // reset map
    d3.select("#map")
        .selectAll("path")
            .style("opacity", "1")
            .style("stroke-width", "1")
            .style("stroke", 'white');

    // reset selection array
    selection = [];
};

// /*
// * make line graph **************************************************************
// */
// function lineGraph() {
//     // make "canvas"
//     var margin = {top: 20, right: 20, bottom: 30, left: 50},
//         width = 500 - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;
//
//     // make x-axis
//     var x = d3.time.scale()
//         .range([0, width]);
//
//     var x_axis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom");
//
//     var parsedDate = d3.time.format("%Y").parse;
//
//     // make y-axis
//     var y = d3.scale.linear()
//         .range([height, 0]);
//
//     var y_axis = d3.svg.axis()
//         .scale(y)
//         .orient("left");
//
//     // get data from json and make the linegraph!!
//     d3.json("data/renewableyears.json", function(error, json) {
//         if (error) return console.warn(error);
//         linedata = json;
//         console.log("linedata: ", linedata);
//         for (var i = 0; i < linedata.AGO.length; i++) {
//             console.log("Indexing into linedata.AGO: ", linedata.AGO[i]);
//         };
//
//         // create svg and g's and set attributes for the axes
//         var svg = d3.select("#time").append("svg")
//             .attr("id", "linegraph")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(x_axis);
//
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(y_axis)
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Percentage of electricity from renewable sources");
//
//             // draw a line for each country
//             for (var country in linedata) {
//                 var object = linedata[country]
//                 drawLine(object);
//             };
//
//         /**
//          * Draw the line of a specific country *********************************
//          */
//         function drawLine(data) {
//             data.forEach(function(d) {
//                 d.year = parsedDate(d.year);
//                 d.percentage = +d.percentage;
//             });
//
//             // set the domains for the data
//             x.domain(d3.extent(data, function(d) { return d.year; }));
//             y.domain([0, 100]);
//
//             // prepare line and attach it to the SVG
//             var line = d3.svg.line()
//                 .x(function(d) { return x(d.year); })
//                 .y(function(d) { return y(d.percentage); });
//
//             d3.select("#linegraph").append("path")
//                 .datum(data)
//                 .append("path")
//                 .attr("class", "line")
//                 .attr("d", line);
//             console.log(data)
//             console.log(d3.select(".line"))
//         };
//     });
// };
