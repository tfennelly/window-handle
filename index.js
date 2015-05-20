var theWindow;
var callbacks = [];
var windowSetTimeout;

exports.getWindow = function(callback, timeout) {
    function execCallback(windowToPass) {
		if (callback) {
            try {
                callback(windowToPass);                
            } catch (e) {
                console.log("Error invoking window-handle callback.");
                console.log(e);
            }
        }
    }
    
	if (theWindow) {
        execCallback(theWindow);
        return theWindow;
	} 
	
	try {
		if (window) {
            execCallback(window);
			return window;
		} 
	} catch (e) {
		// no window "yet". This should only ever be the case in a test env.
		// Fall through and use callbacks, if supplied.
	}

	if (callback) {
		callbacks.push(callback);
		windowSetTimeout = setTimeout(function() {
			throw "Timed out waiting on the window to be set.";
		}, (timeout?timeout:10000));
	} else {
		throw "No 'window' available. Consider providing a 'callback' and receiving the 'window' async when available. Typically, this should only be the case in a test environment.";
	}
}

exports.setWindow = function(newWindow) {
	if (windowSetTimeout) {
		clearTimeout(windowSetTimeout);
	}
	theWindow = newWindow;
	for (var i = 0; i < callbacks.length; i++) {
		callbacks[i](theWindow);
	}
}