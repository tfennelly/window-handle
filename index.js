var theWindow;

exports.getWindow = function() {
	if (theWindow) {
		return theWindow;
	} else {
		return window;
	}
}

exports.setWindow = function(newWindow) {
	theWindow = newWindow;
}