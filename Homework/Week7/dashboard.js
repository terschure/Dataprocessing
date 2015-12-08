//--------------------------------
// by: Anneke ter Schure, 6084087
//
// make localhost server: python -m SimpleHTTPServer
// use url: http://localhost:8000/index.html
//--------------------------------

var mapdata;
var linedata;
d3.json("/Data/electricity.json", function(error, json) {
  if (error) return console.warn(error);
  mapdata = json;
  plotMap();
});
lineGraph();

/*
* make map and colour the countries according to
* % of electricity from renewable sources
*/
function plotMap(){
    var map = new Datamap({
        element: document.getElementById('map container'),

        // zoom in to europe
        setProjection: function(element) {
        var projection = d3.geo.azimuthalEqualArea()
            .scale(800)
            .translate([220, 1000])
            .clipAngle(180 - 1e-3)
            .precision(1);
        var path = d3.geo.path()
            .projection(projection);
        return {path: path, projection: projection};
        },
        fills: {
            VVHIGH: '#1b7837',
            VHIGH: '#7fbf7b',
            HIGH: '#d9f0d3',
            MEDIUM: '#e7d4e8',
            LOW: '#af8dc3',
            VLOW: '#762a83',
            defaultFill: '#cccccc'
        },
        geographyConfig: {
            borderWidth: 0.5,
            highlightOnHover: false,
            // highlightFillColor: 'steelblue',
            // highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            // highlightBorderWidth: 1,
            popupTemplate: function(geo, mapdata) {
                if (mapdata == null || mapdata.fossil == '..'){
                    return ['<div class="hoverinfo">',
                            'Electricity from renewable sources in ' + geo.properties.name,
                            ': unknown',
                            '</div>'].join('');
                }
                else {
                    return ['<div class="hoverinfo">',
                            'Electricity from renewable sources in ' + geo.properties.name,
                            ': ' + mapdata.totalrenewable,
                            '%',
                            '</div>'].join('');
                }
            }
        },
        data: mapdata
    });
};

/*
* draw bar graph
*/

// function barGraph(){
//     element = document.getElementById('detail container')
//     var y = d3.scale.ordinal()
//         .rangeRoundBands([0, width], .1);
//
//     var x = d3.scale.linear()
//         .rangeRound([height, 0]);
//
//     var color = d3.scale.ordinal()
//         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .tickFormat(d3.format(".0%"));
//
//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("top")
//
//     color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Country"; }));
//
//     data.forEach(function(d) {
//         var x0 = 0;
//         d.ages = color.domain().map(function(name) { return {name: name, x0: x0, x1: x0 += +d[name]}; });
//         d.total = d.ages[d.ages.length - 1].y1;
//     });
//     y.domain(data.map(function(d) { return d.Country; }));
//     x.domain([0, d3.max(data, function(d) { return d.total; })]);
//
// };

/*
* make line graph
*/
function lineGraph(){
    // // make "canvas" ---------------------------------------------------------------
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // make x-axis -----------------------------------------------------------------
    var x = d3.time.scale()
        .range([0, width]);

    var x_axis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // make y-axis -----------------------------------------------------------------
    var y = d3.scale.linear()
        .range([height, 0]);

    var y_axis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // prepare SVG line ------------------------------------------------------------
    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.maxtemp); });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // get data --------------------------------------------------------------------
    // source: https://github.com/mbostock/d3/wiki/Requests#d3_json
    var parsedDate = d3.time.format("%Y").parse;
        // bisectDate = d3.bisector(function(d) { return d.date; }).left;

    d3.json("data/renewableyears.json", function(error, json) {
        if (error) return console.warn(error);
        linedata = json;
        console.log(linedata);
        console.log(linedata.ABW);
        console.log(linedata.ABW.y2010);
        console.log(Object.keys(linedata));

        for (var i = 0, l = Object.keys(linedata).length; i < l; i++) {
            console.log("key-value pair:", linedata[Object.keys(linedata)[i]]);
        };
        for (var i = 0, l = Object.keys(linedata); i < l.length; i++) {
            // for (var j = 0, pair = linedata[Object.keys(linedata)[i]]; j < pair.length; j++) {
            //     console.log(Object.keys(pair)[j]);
            // };
        };

    });

        // visualise data, making sure the y-axis starts at zero
        x.domain(d3.extent(linedata, function(d) { return Object.keys(d.ABW); }));
        y.domain([0, d3.max(linedata, function(d) { return Object.values(d.ABW); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(x_axis);

        svg.append("g")
            .attr("class", "y axis")
            .call(y_axis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Max temperature in degrees Celsius");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

    obj.data.forEach(function(itm)  {
       console.log(itm.name);
    });
};
