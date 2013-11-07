// For this problem, paste the code below in between script tags
var x = document.cookie.split(";");
var y;
$.each(x, function(i, val) {
	if (val.substr(0, 20) == "6470JUNGLEADVENTURES") {
		y = val;
	}
});
alert(y);