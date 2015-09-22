if (document.visibilityState) {
	var Smartimer;

	Smartimer.setTimeout = function (func, delay) {
		return window.setTimeout(function(){
			if (document.visibilityState === "visible") {
				func();
			};
		}, delay)
	};

	Smartimer.setInterval = function (func, delay) {
		return window.setInterval(function(){
			if (document.visibilityState === "visible") {
				func();
			};
		}, delay)
	};
};
