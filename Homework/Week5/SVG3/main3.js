// import json
var data = document.getElementById("rawdata").innerHTML;
var datapoints = JSON.parse(data);

// color countries according to number of threatened mammal species
window.onload = function() {
    for (var i = 0; i < datapoints.length; i++){
        if (Number(datapoints[i][1]) < 1) {
            changeColor(String(datapoints[i][0]), "#1a9850");
        }
        else if (Number(datapoints[i][1]) <= 1) {
            changeColor(String(datapoints[i][0]), "#a6d96a");
        }
        else if (Number(datapoints[i][1]) <= 2) {
            changeColor(String(datapoints[i][0]), "#ffeda0");
        }
        else if (Number(datapoints[i][1]) <= 4) {
            changeColor(String(datapoints[i][0]), "#fed976");
        }
        else if (Number(datapoints[i][1]) <= 6) {
            changeColor(String(datapoints[i][0]), "#feb24c");
        }
        else if (Number(datapoints[i][1]) <= 8) {
            changeColor(String(datapoints[i][0]), "#fd8d3c");
        }
        else if (Number(datapoints[i][1]) <= 10) {
            changeColor(String(datapoints[i][0]), "#fc4e2a");
        }
        else if (Number(datapoints[i][1]) <= 15) {
            changeColor(String(datapoints[i][0]), "#e31a1c");
        }
        else if (Number(datapoints[i][1]) <= 18) {
            changeColor(String(datapoints[i][0]), "#bd0026");
        }
        else if (Number(datapoints[i][1]) > 18) {
            changeColor(String(datapoints[i][0]), "#800026");
        };
    };
};

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    if (document.getElementsByClassName(id).length >= 2){
        for (var i = 0; i < document.getElementsByClassName(id)[0].getElementsByTagName("path").length; i++){
            document.getElementsByClassName(id)[0].getElementsByTagName("path")[i].style.fill = color;
        };
    }
    else {
        document.getElementById(id).style.fill = color;
    };
};
