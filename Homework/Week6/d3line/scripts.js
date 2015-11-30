//--------------------------------
// by: Anneke ter Schure, 6084087
// using a matrix for a datastructure
//--------------------------------

// get data --------------------------------------------------------------------
var datapoints = [];
var point = [];
var data = document.getElementById("rawdata").innerHTML;
datapoints = JSON.parse(data);

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
    var beta = range[0] - (alpha * domain[0]);
	return function(x){
		return alpha * x + beta;
	};
};

// x and y axes transformation functions; take care that y-axis is reversed
var dateTransform = createTransform([new Date(datapoints[0][0]).getTime(), new Date(datapoints[365][0]).getTime()], [0, 365]);
var xTransform = createTransform([0, 365], [padding, width-padding]);
var yTransform = createTransform([0, maxtemp], [height-padding, padding]);

var reverse_xTransform = createTransform([padding, width-padding], [0, 365]);

// draw line graph; make starting point and iterate over the datapoints
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(new Date(datapoints[0][0]))), yTransform(datapoints[0][1]));
ctx.strokeStyle="#800000";
for (var i = 1; i < datapoints.length; i++){
    ctx.lineTo(xTransform(dateTransform(new Date(datapoints[i][0]))), yTransform(datapoints[i][1]));
};
ctx.stroke();

// make axes--------------------------------------------------------------------

// y-axis
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(new Date(datapoints[0][0]))), padding);
ctx.strokeStyle="#000000";
ctx.lineTo(xTransform(dateTransform(new Date(datapoints[0][0]))), height - padding);
ctx.stroke();

// y-axis labels
var nlabels = 8;
for (var i = 0; i < nlabels; i++){
    ctx.textAlign = "center";
    ctx.font = "16px serif";
    ctx.fillText(String(i * maxtemp/10 / nlabels), padding / 1.3, yTransform(i * maxtemp / nlabels));
};

// x-axis on temp = 000
ctx.beginPath();
ctx.moveTo(xTransform(dateTransform(new Date(datapoints[0][0]))), yTransform(0));
ctx.strokeStyle="#000000";
ctx.lineTo(xTransform(dateTransform(new Date(datapoints[365][0]))), yTransform(0));
ctx.stroke();

// x-axis labels
var currentmonth = "";
for (var i = 0; i < datapoints.length - 1; i++){
    var date = new Date(datapoints[i][0]);
    var month = new Array();
        month = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var monthname = month[date.getMonth()];

    // put each new month name on the canvas at the appropriate spot
    if (monthname != currentmonth){
        // label
        ctx.textAlign = "left";
        ctx.font = "16px serif";
        ctx.fillStyle = '#000000';
        ctx.fillText(String(monthname), xTransform(i), height - padding / 1.3);
        currentmonth = monthname;

        // tick
        ctx.beginPath();
        ctx.moveTo(xTransform(i), yTransform(0));
        ctx.strokeStyle="#000000";
        ctx.lineTo(xTransform(i), yTransform(0) + padding/6);
        ctx.stroke();
    };
};

// axes titles
ctx.textAlign = "center";
ctx.font = "16px serif";
ctx.fillStyle = '#000000';
ctx.fillText("2014", width / 2, height - padding * 1.3);

ctx.save();
ctx.translate(width - 1, 0);
ctx.rotate(270 * (Math.PI / 180));
ctx.font = "16px serif";
ctx.fillText("Max Temperature in C", -height / 2, -width + padding / 3);
ctx.restore();

// make interaction canvas ------------------------------------------------------
var canvas2 = document.getElementById('GridCanvas');
var ctx2 = canvas2.getContext('2d');
var width2 = canvas2.width;
var height2 = canvas2.height;
ctx2.save();

// cross-hair and tooltip ------------------------------------------------------
var tooltip = document.getElementById('tooltip');
mousemove = false;
canvas2.addEventListener('mousemove', function(event){
    x = event.clientX;

    if (x > width - padding){
        x = width - padding;
    }
    else if (x < padding) {
        x = padding
    }
    else {
        ctx2.clearRect(0,0,width2,height2);
        tooltip.style.visibility = "hidden";

        // make vertical cross-hair
        ctx2.beginPath();
        ctx2.moveTo(x, 0);
        ctx2.strokeStyle="#000000";
        ctx2.lineTo(x, height2);
        ctx2.stroke();

        index = parseInt(reverse_xTransform(x));
        // make horizontal cross-hair
        ctx2.beginPath();
        ctx2.moveTo(0, yTransform(datapoints[index][1]));
        ctx2.strokeStyle="#000000";
        ctx2.lineTo(width, yTransform(datapoints[index][1]));
        ctx2.stroke();

        // get tooltip after delay of 500 milliseconds
        setTimeout(updateTooltip, 500);
    };
});

function updateTooltip(){
    tooltip.style.visibility = "visible";
    // update tooltip data
    document.getElementById('data').innerHTML = "Date: " + datapoints[index][0] + "<br>" +
                                                "Max Temp: " + datapoints[index][1]/10 + "&deg C";

    // update tooltip position
    tx = x + 5;
    ty = yTransform(datapoints[index][1]) + 5;
    tooltip.style.left = tx + 'px';
    tooltip.style.top = ty + 'px';
    mousemove = false;
};
