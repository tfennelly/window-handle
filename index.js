var theWindow = window;

exports.getWindow = function() {
	return theWindow;
}

exports.setWindow = function(newWindow) {
	theWindow = newWindow;
}