if (document.visibilityState) {
	var Smartimer = (function(win){
		var nwt = {
			stt: win.setTimeout,
			sil: win.setInterval,
			ctt: win.clearTimeout,
			cil: win.clearInterval
		}

		var ttIds = {};
		var ilIds = {};
		var sleepTts = [];
		var sleepIls = [];

		function StSetTimeout(func, delay) {
			var id = nwt.stt(function(){
				if (document.visibilityState === "visible") {
					func();
					delete ttIds[id];
				}else{
					nwt.ctt(id);
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
			var id = nwt.sil(function(){
				if (document.visibilityState === "visible") {
					func();
				}else{
					nwt.cil(id);
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
			if (id.constructor === String) {
				nwt.ctt(ttIds[id]);
				delete ttIds[id];
			}else{
				nwt.ctt(id);
			};
		}

		function StClearInterval (id) {
			if (id.constructor === String) {
				nwt.cil(ilIds[id]);
				delete ilIds[id];
			}else{
				nwt.cil(id);
			};
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
						ilIds[sleepIls[i].i] = nwt.sil(function(){
							if (document.visibilityState === "visible") {
								func();
							}else{
								nwt.cil(id);
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
			hookNative: function() {
				win.setTimeout = StSetTimeout;
				win.setInterval = StSetInterval;
				win.clearTimeout = StClearTimeout;
				win.clearInterval = StClearInterval;
			},
			unhookNative: function() {
				win.setTimeout = nwt.stt;
				win.setInterval = nwt.sil;
				win.clearTimeout = nwt.ctt;
				win.clearInterval = nwt.cil;
			}
		};
	})(window);
};
