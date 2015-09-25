if (document.visibilityState) {
	var Smartimer = (function(win){
		var ttIds = {};
		var ilIds = {};
		var sleepTts = [];
		var sleepIls = [];

		function StSetTimeout(func, delay) {
			var id = win.setTimeout(function(){
				if (document.visibilityState === "visible") {
					func();
					delete ttIds[id];
				}else{
					win.clearTimeout(id);
					sleepTts.push({
						i: "st" + id,
						f: func
					})
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
				}else{
					win.clearInterval(id);
					sleepIls.push({
						i: "st" + id,
						f: func,
						d: delay
					})
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
			delete ilIds[id];
		}

		document.addEventListener("visibilitychange", function() {
			if (document.visibilityState === "visible") {
				for (var i = 0; i < sleepTts.length; i++) {
					if (ttIds[sleepTts[i].i]) {
						sleepTts[i].f();
						delete ttIds[sleepTts[i].i];
					};
				};

				for (var i = 0; i < sleepIls.length; i++) {
					if (ilIds[sleepIls[i].i]) {
						var func = sleepIls[i].f;
						var delay = sleepIls[i].d;
						ilIds[sleepIls[i].i] = win.setInterval(function(){
							if (document.visibilityState === "visible") {
								func();
							}else{
								win.clearInterval(id);
								sleepIls.push({
									i: "st" + id,
									f: func,
									d: delay
								})
							};
						}, delay)
					};
				};

				var sleepTts = [];
				var sleepIls = [];
			};
		});

		return {
			setTimeout: StSetTimeout,
			setInterval: StSetInterval,
			clearTimeout: StClearTimeout,
			clearInterval: StClearInterval,
		};
	})(window);
};
