//--------------------------------
// by: Anneke ter Schure, 6084087
// using a matrix for a datastructure
//
// make localhost server: python -m SimpleHTTPServer
// use url: http://localhost:8000/index.html
//--------------------------------

// globals
var data;

// make "canvas" ---------------------------------------------------------------
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
var parsedDate = d3.time.format("%Y/%m/%d").parse;
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

d3.json("data/temp.json", function(error, json) {
    if (error) return console.warn(error);

    table = {};
    data = json;
    data.forEach(function(d) {
        d.date = parsedDate(d.date);
        d.maxtemp = +(d.maxtemp/10);
        table[d.date] = d.maxtemp;
    });
    console.log(table)

    // visualise data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.maxtemp; }));

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
        .text("Max temperature in '&deg' C");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // make interaction tooltip and crosshair
    var focus = svg.append("g").style("display", "none");

    // initiate cross hair
    focus.append("line")
        .attr("id", "focusLineX")
        .attr("class", "focusLine");

    focus.append("line")
        .attr("id", "focusLineY")
        .attr("class", "focusLine");

    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);


    // make rectangle for interaction on mousemove event
    svg.append("g").append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on('mouseover', function() {  })
        .on('mouseout', function() { focus.style('display', 'none'); })
        .on("mousemove", function () {
            focus.style('display', null);
            var mouse_x = d3.mouse(this)[0];
            var mouse_y = d3.mouse(this)[1];
            console.log(mouse_x, mouse_x);

            var x0 = x.invert(mouse_x)

            // look for nearest datapoint
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            console.log("d: ", d);
            console.log("d.date ", d.date);
            console.log("d.maxtemp ", d.maxtemp);
            console.log("y : ", y(d.maxtemp))
            // console.log("Date: ", x0);
            // console.log(typeof x0);
            // console.log(table[x0]);
            // console.log("Temp: ", table["Sat May 17 2014 00:00:00 GMT+0200 (W. Europe Summer Time)"]);
            // focus.select("circle.y")
            //     .attr("transform",
            //         "translate(" + x(d.date) + "," +
            //                        y(d.maxtemp) + ")");

            // create crosshair that sticks to y-coordinate of the line
            focus.select("#focusLineX")
                .attr("x1", mouse_x).attr("y1", 0)
                .attr("x2", mouse_x).attr("y2", height);
            // focus.select("#focusLineY")
            //     .attr("x1", 0).attr("y1", y(x.invert(mouse_x)))
            //     .attr("x2", width).attr("y2", y(x.invert(mouse_x)));
        });
});
