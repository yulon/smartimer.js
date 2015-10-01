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

		function run(foc, args) {
			if (foc.constructor === Function) {
				foc.apply(window, args);
			}else{
				eval(foc);
			};
		}

		function cb(foc, sleepList, clear) {
			return function(){
				if (document.visibilityState === "visible") {
					run(foc, arguments);
					delete ttIds[id];
				}else{
					clear(id);
					sleepList.push({
						i: "st" + id,
						f: func,
						d: delay
					})
				};
			}
		}

		function StSetTimeout(foc, delay) {
			var id = nwt.stt(cb(foc, sleepTts, nwt.ctt), delay)
			var stId = "st" + id;
			ttIds[stId] = id;
			return stId;
		};

		function StSetInterval(foc, delay) {
			var id = nwt.sil(cb(foc, sleepIls, nwt.cil), delay)
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
						if (sleepTts[i].d.constructor === Array) {
							run(sleepTts[i].f, sleepTts[i].d.slice(1, sleepTts[i].d.length));
						}else{
							run(sleepTts[i].f, null);
						};
						delete ttIds[sleepTts[i].i];
					};
				};

				for (var i = 0; i < sleepIls.length; i++) {
					if (ilIds[sleepIls[i].i]) {
						if (sleepIls[i].d.constructor === Array) {
							run(sleepIls[i].f, sleepIls[i].d.slice(1, sleepIls[i].d.length));
						}else{
							run(sleepIls[i].f, null);
						};

						var foc = sleepIls[i].f;
						var delay = sleepIls[i].d;
						ilIds[sleepIls[i].i] = nwt.sil(cb(foc, sleepIls, nwt.cil), delay)
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
