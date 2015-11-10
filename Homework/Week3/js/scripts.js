// get data --------------------------------------------------------------------
var datapoints = [];
var point = [];
var data = document.getElementById("rawdata").innerHTML;

// turn raw data into array of datapoints with dates and temperatures
// skip over single spaces, adjust date notation and
// turn temperatures into JavaScript numbers
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
    } else if (tmp.length == 4 || tmp.length == 7){
        tmp += '/' + data[i];
    } else if (data[i] != ' ') {
        tmp += data[i];
    };
};

// check format in console
console.log(datapoints[0]);
console.log(datapoints[0][0]);
console.log(datapoints[365]);
console.log(datapoints[365][1]);

// make canvas -----------------------------------------------------------------
var canvas = document.getElementById('MyCanvas');
var ctx = canvas.getContext('2d');

// rectangle
ctx.fillStyle = "#FF0000";
ctx.fillRect(10, 10, 55, 50);

// line
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();

//circle
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();

// text
ctx.font = "24px Arial";
ctx.fillText("Hello World", 120,50);
ctx.rotate(90*(Math.PI/180));
ctx.textAlign = "center";
ctx.strokeText("Hello World", 120,0);
