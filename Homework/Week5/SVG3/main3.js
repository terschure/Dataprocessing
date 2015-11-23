/* use this to test out your function */
window.onload = function() {
 	changeColor("ch", "#b380ff");
    changeColor("path2656", "#944dff");
    changeColor("path4066", "#751aff");
    changeColor("mk", "#5200cc");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;
}
