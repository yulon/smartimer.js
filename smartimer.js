if (document.visibilityState) {
	var Smartimer = (function(win){
		function StSetTimeout(func, delay) {
			return win.setTimeout(function(){
				if (document.visibilityState === "visible") {
					func();
				};
			}, delay)
		};

		function StSetInterval(func, delay) {
			return win.setInterval(function(){
				if (document.visibilityState === "visible") {
					func();
				};
			}, delay)
		};

		return {
			setTimeout: StSetTimeout,
			setInterval: StSetInterval,
		};
	})(window);
};
