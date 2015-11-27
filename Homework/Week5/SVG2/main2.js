/* use this to test out your function */
window.onload = function() {
 	changeColor("ch", "#b380ff");
    changeColor("gb", "#944dff");
    changeColor("hr", "#751aff");
    changeColor("mk", "#5200cc");
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
