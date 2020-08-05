window.apples.raceSetup =
	window.apples.raceSetup ||
	(function ($) {
		"use strict";

		var RaceSetup = function () {
			this.addFunctionality = function () {
				if ($("font").length) {
					if (confirm("Send data to apples?")) {
						window.apples.forum.sendData();
					}
				}

				$("#StartTyres").on("change", checkTyres);

				checkTyres();
			};

			function checkTyres() {
				var startTyres = $("#StartTyres"),
					q2Weather = $("table:eq(3) img:eq(1)").attr("title");

				if (
					(q2Weather === "Rain" && startTyres.val() !== "6") ||
					(q2Weather !== "Rain" && startTyres.val() === "6")
				) {
					startTyres.parent().css("background", "red");
				} else {
					startTyres.parent().css("background", "");
				}
			}
		};

		return new RaceSetup();
	})(jQuery);
