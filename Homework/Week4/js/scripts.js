//--------------------------------
// by: Anneke ter Schure, 6084087
// using a matrix for a datastructure
//--------------------------------

// get data --------------------------------------------------------------------
var datapoints = [];
var point = [];
var data = document.getElementById("rawdata").innerHTML;

// turn raw data into array of datapoints[point[date, temperature]]
var tmp = '';
for (var i = 0; i < data.length; i++){
    if (data[i] == ','){
        point.push(new Date(tmp));
        tmp = '';
    } else if (data[i] == '\n'){
        point.push(Number(tmp));
        datapoints.push(point);
        point = []
        tmp = '';
    } else if (data[i] != ' ') {
        tmp += data[i];
    };
};

// make canvas -----------------------------------------------------------------
var canvas = document.getElementById('MyCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var padding = 60;
var maxtemp = 400;
var maxdays = datapoints.length;

// make line graph -------------------------------------------------------------

// transformation fuction taking screen range and image domain
function createTransform(domain, range){
	var alpha = (range[1] - range[0]) / (domain[1] - domain [0]);
    var beta = range[0] - (alpha * domain[0])
	return function(x){
		return alpha * x + beta;
	};
}

// x and y axes transformation functions; take care that y-axis is reversed
var dateTransform = createTransform([datapoints[0][0].getTime(),
                                    datapoints[365][0].getTime()], [0, 365]);
var xTransform = createTransform([0, 365], [padding, width-padding]);
var yTransform = createTransform([0, maxtemp], [height-padding, padding]);

// draw line graph; make starting point and iterate over the datapoints
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(datapoints[0][0])), yTransform(datapoints[0][1]));
ctx.strokeStyle="#800000";
for (var i = 1; i < datapoints.length; i++){
    ctx.lineTo(xTransform(dateTransform(datapoints[i][0])), yTransform(datapoints[i][1]));
};
ctx.stroke();

// make axes--------------------------------------------------------------------

// y-axis
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(datapoints[0][0])), padding);
ctx.strokeStyle="#000000";
ctx.lineTo(xTransform(dateTransform(datapoints[0][0])), height - padding);
ctx.stroke();

var nlabels = 8
for (var i = 0; i < nlabels; i++){
    ctx.textAlign = "center";
    ctx.font = "16px serif";
    ctx.fillText(String(i * maxtemp / nlabels), padding / 1.3, yTransform(i * maxtemp / nlabels));
};

// x-axis on temp = 000
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(datapoints[0][0])), yTransform(0));
ctx.strokeStyle="#000000";
ctx.lineTo(xTransform(dateTransform(datapoints[365][0])), yTransform(0));
ctx.stroke();

var currentmonth = "";
for (var i = 0; i < datapoints.length; i++){
    var date = datapoints[i][0];
    var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    var monthname = month[date.getMonth()];

    // put each new month name on the canvas at the appropriate spot
    if (monthname != currentmonth){
        // label
        ctx.textAlign = "left";
        ctx.font = "16px serif";
        ctx.fillStyle = '#a6a6a6';
        ctx.fillText(String(monthname), xTransform(i), height - padding / 1.3);
        currentmonth = monthname;

        // tick
        ctx.beginPath();
        ctx.moveTo(xTransform(i), yTransform(0));
        ctx.strokeStyle="#000000";
        ctx.lineTo(xTransform(i), yTransform(0) + padding/5);
        ctx.stroke();
    };
};

ctx.textAlign = "center";
ctx.font = "16px serif";
ctx.fillStyle = '#000000';
ctx.fillText("2014", width / 2, height - padding * 1.3);

ctx.save();
ctx.translate(width - 1, 0);
ctx.rotate(270 * (Math.PI / 180));
ctx.font = "16px serif";
ctx.fillText("Max Temperature 0.1 degrees C", -height / 2, -width + padding / 3);
ctx.restore();
