//--------------------------------
// by: Anneke ter Schure, 6084087
// script using data library instead of matrix
//--------------------------------

// initialisations get data ----------------------------------------------------
var datapoints = {
    dates : [],
    temps : []
};
var data = document.getElementById("rawdata").innerHTML;

// modify the raw data and put into datapoints library
var tmp = '';
for (var i = 0; i < data.length; i++){
    if (data[i] == ','){
        datapoints.dates.push(new Date(tmp));
        tmp = '';
    } else if (data[i] == '\n'){
        datapoints.temps.push(Number(tmp));
        tmp = '';
    } else if (data[i] != ' ') {
        tmp += data[i];
    };
};

// transformation fuction taking screen range and image domain
function createTransform(domain, range){
	var alpha = (range[1] - range[0]) / (domain[1] - domain [0]);
    var beta = range[0] - (alpha * domain[0])
	return function(x){
		return alpha * x + beta;
	};
}

// make canvas -----------------------------------------------------------------
var canvas = document.getElementById('MyCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var padding = 30;

// make line graph -------------------------------------------------------------
// x and y axes transformation functions; take care that y-axis is reversed
var dateTransform = createTransform([datapoints.dates[0].getTime(),
                                    datapoints.dates[365].getTime()], [0, 365]);
var xTransform = createTransform([0, 365], [padding, width - padding]);
var yTransform = createTransform([0, 400], [height - padding, padding]);

// draw line graph; make starting point and iterate over the datapoints
ctx.moveTo(xTransform(dateTransform(datapoints.dates[0])),
            yTransform(datapoints.temps[0]));
ctx.strokeStyle="#800000";
for (var i = 1; i < datapoints.length; i++){
    ctx.lineTo(xTransform(dateTransform(datapoints.dates[i])),
                yTransform(datapoints.temps[i]));
    ctx.stroke();
};

console.log(xTransform(dateTransform(datapoints.dates[0])));
console.log(yTransform(datapoints.temps[0]));
console.log(xTransform(dateTransform(datapoints.dates[1])));
console.log(yTransform(datapoints.temps[1]));

// y-axis
console.log(dateTransform(datapoints.dates[0])); // day number

// text
ctx.textAlign = "center";
ctx.font = "16px serif";
ctx.fillText("2014", width / 2, height - padding / 2);

ctx.save();
ctx.translate(width - 1, 0);
ctx.rotate(270 * (Math.PI / 180));
ctx.textAlign = "center";
ctx.font = "16px serif";
ctx.fillText("Maximum Temperature", -height / 2, -width + padding / 2);
ctx.restore();
