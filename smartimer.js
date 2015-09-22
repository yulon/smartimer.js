if (document.visibilityState) {
	var Smartimer;

	(function(st, win){
		st.setTimeout = function (func, delay) {
			return win.setTimeout(function(){
				if (document.visibilityState === "visible") {
					func();
				};
			}, delay)
		};

		st.setInterval = function (func, delay) {
			return win.setInterval(function(){
				if (document.visibilityState === "visible") {
					func();
				};
			}, delay)
		};
	};)(Smartimer, window)

};
