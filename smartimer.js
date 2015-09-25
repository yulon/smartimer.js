if (document.visibilityState) {
	var Smartimer = (function(win){
		var ttIds = {};
		var ilIds = {};

		function StSetTimeout(func, delay) {
			var id = win.setTimeout(function(){
				if (document.visibilityState === "visible") {
					func();
				}else{
					win.clearTimeout()
				};
			}, delay)
			var stId = "st" + id;
			ttIds[stId] = id;
			return stId;
		};

		function StSetInterval(func, delay) {
			var id = win.setInterval(function(){
				if (document.visibilityState === "visible") {
					func();
				};
			}, delay)
			var stId = "st" + id;
			ilIds[stId] = id;
			return stId;
		};

		function StClearTimeout (id) {
			win.clearTimeout(ttIds[id]);
			delete ttIds[id];
		}

		function StClearInterval (id) {
			win.clearInterval(ilIds[id]);
			delete ttIds[id];
		}

		return {
			setTimeout: StSetTimeout,
			setInterval: StSetInterval,
			clearTimeout: StClearTimeout,
			clearInterval: StClearInterval,
		};
	})(window);
};
