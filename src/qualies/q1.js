window.apples.qualify1 =
	window.apples.qualify1 ||
	(function ($) {
		"use strict";

		var Qualify = function () {
			this.getInfo = function (success, error) {
				$.ajax({
					type: "GET",
					url: "/Qualify.asp",
					success: function (data) {
						if (data && success) success(prepareInfo(data));
					},
					error: function () {
						if (error) error();
					},
				});
			};

			function prepareInfo(data) {
				var result = {
					Practice: $.map(
						$('table:eq(5) tr[class="pointerhand"]', data),
						function (row) {
							var children = $(row).children("td[onclick]");

							return {
								Lap: $.trim(children.eq(0).text()),
								LTime: $.trim(children.eq(1).text()),
								Mistake: $.trim(children.eq(2).text()),
								NTime: $.trim(children.eq(3).text()),
								FWing: $.trim(children.eq(4).text()),
								RWing: $.trim(children.eq(5).text()),
								Engine: $.trim(children.eq(6).text()),
								Brakes: $.trim(children.eq(7).text()),
								Gear: $.trim(children.eq(8).text()),
								Susp: $.trim(children.eq(9).text()),
								Tyres: $.trim(children.eq(10).text()),
							};
						}
					),
				};

				if (~$("table:eq(6)", data).text().indexOf("Qualify 1 lap data")) {
					var qData = $("table:eq(6) tr:last > td", data),
						tempData = $("table:eq(3) img:first", data),
						text = tempData.parent().text();

					result.Q1 = {
						Data: {
							Time: $.trim(qData.eq(0).text()),
							FWing: $.trim(qData.eq(1).text()),
							RWing: $.trim(qData.eq(2).text()),
							Engine: $.trim(qData.eq(3).text()),
							Brakes: $.trim(qData.eq(4).text()),
							Gear: $.trim(qData.eq(5).text()),
							Susp: $.trim(qData.eq(6).text()),
							TType: qData.eq(7).children("img").attr("title"),
							Tyres: $.trim(qData.eq(8).text()),
							Risk: $.trim(qData.eq(9).text()),
						},
						Weather: tempData.attr("title"),
						Temp: getTemperature(text),
						Hum: getHumidity(text),
					};
				}

				return result;
			}

			function getTemperature(text) {
				var temp = text.substring(text.indexOf("Temp") + 6);

				return temp.substring(0, temp.indexOf("C"));
			}

			function getHumidity(text) {
				var hum = text.substring(text.indexOf("Humidity") + 10);

				return hum.substring(0, hum.indexOf("%") + 1);
			}

			function compareTyresWithWeather() {
				var weather = $("table:eq(3) img:first").attr("title");
				var tyres = $("#Tyres").val();

				if (
					tyres &&
					((weather === "Rain" && tyres !== "6") ||
						(weather !== "Rain" && tyres === "6"))
				) {
					$("#Tyres").parent().css("background-color", "red");
				}
			}

			this.addFunctionality = function () {
				$("#Tyres").on("change", compareTyresWithWeather);
				compareTyresWithWeather();

				if (window.trackCoefs) {
					$("table:eq(6) th:first").append(
						'<br><a class="lime" href="#" onclick="window.apples.forum.calcQ1Setup()">Calculate setup</a>'
					);
				}
			};

			function getSetup(isRain, part) {
				return window.preferences.Setup[isRain ? "Wet" : "Dry"][part];
			}

			function getSetupOffset(isRain, part) {
				return window.preferences.SetupOffset[isRain ? "Wet" : "Dry"][part];
			}

			function prepareSetup(setup) {
				return Math.min(Math.max(Math.round(setup), 0), 999);
			}

			this.calcSetup = function (driverData) {
				if (driverData && window.trackCoefs) {
					var raceID = $("div.thirtyseven a:first").attr("href").split("=")[1];
					var raceCoefs = window.trackCoefs[raceID];
					if (raceCoefs) {
						var wing, engine, brakes, gear, susp;
						var tempData = $("table:eq(3) img:first");
						var isRain = tempData.attr("title") === "Rain";
						var temp = getTemperature(tempData.parent().text()).replace(
							"°",
							""
						);
						var partsData = $("table:eq(6)");

						wing = prepareSetup(
							((raceCoefs[0] +
								temp * getSetup(isRain, "wing") +
								getSetupOffset(isRain, "wing")) *
								(765 - driverData.Talent)) /
								765 -
								partsData.find("tr:eq(2) td:eq(5)").text() * 10 +
								partsData.find("tr:eq(2) td:eq(1)").text() * 15 +
								partsData.find("tr:eq(3) td:eq(1)").text() * 15 -
								partsData.find("tr:eq(3) td:eq(5)").text() * 8 +
								(partsData.find("tr:eq(2) td:eq(6)").text().replace("%", "") *
									25) /
									100 -
								(partsData.find("tr:eq(2) td:eq(2)").text().replace("%", "") *
									28) /
									100 -
								(partsData.find("tr:eq(3) td:eq(2)").text().replace("%", "") *
									28) /
									100 +
								(partsData.find("tr:eq(3) td:eq(6)").text().replace("%", "") *
									15) /
									100
						);
						engine = prepareSetup(
							((raceCoefs[2] +
								temp * getSetup(isRain, "engine") +
								getSetupOffset(isRain, "engine")) *
								(605 - driverData.Exp)) /
								605 -
								30 +
								driverData.Agr * 0.3 +
								partsData.find("tr:eq(4) td:eq(1)").text() * 16 +
								partsData.find("tr:eq(5) td:eq(5)").text() * 5 +
								partsData.find("tr:eq(6) td:eq(5)").text() * 3 -
								(partsData.find("tr:eq(4) td:eq(2)").text().replace("%", "") *
									50) /
									100 -
								(partsData.find("tr:eq(5) td:eq(6)").text().replace("%", "") *
									7) /
									100 +
								(partsData.find("tr:eq(6) td:eq(6)").text().replace("%", "") *
									5) /
									100
						);
						brakes = prepareSetup(
							raceCoefs[3] +
								temp * getSetup(isRain, "brakes") +
								getSetupOffset(isRain, "brakes") -
								driverData.Talent * 0.5 +
								partsData.find("tr:eq(2) td:eq(5)").text() * 6 -
								partsData.find("tr:eq(5) td:eq(1)").text() * 29 +
								partsData.find("tr:eq(6) td:eq(5)").text() * 6 -
								(partsData.find("tr:eq(2) td:eq(6)").text().replace("%", "") *
									14) /
									100 +
								(partsData.find("tr:eq(5) td:eq(2)").text().replace("%", "") *
									71) /
									100 -
								(partsData.find("tr:eq(6) td:eq(6)").text().replace("%", "") *
									9) /
									100
						);
						gear = prepareSetup(
							raceCoefs[4] +
								temp * getSetup(isRain, "gear") +
								getSetupOffset(isRain, "gear") +
								driverData.Conc * 0.5 -
								partsData.find("tr:eq(6) td:eq(1)").text() * 41 +
								partsData.find("tr:eq(6) td:eq(5)").text() * 9 +
								(partsData.find("tr:eq(6) td:eq(2)").text().replace("%", "") *
									108) /
									100 -
								(partsData.find("tr:eq(6) td:eq(6)").text().replace("%", "") *
									14) /
									100
						);
						susp = prepareSetup(
							raceCoefs[5] +
								temp * getSetup(isRain, "suspension") +
								getSetupOffset(isRain, "suspension") +
								driverData.Exp * 0.75 +
								driverData.Weight * 2 +
								(isRain ? driverData.TI * 0.11 : 0) -
								partsData.find("tr:eq(2) td:eq(5)").text() * 14 -
								partsData.find("tr:eq(3) td:eq(5)").text() * 12 +
								partsData.find("tr:eq(4) td:eq(5)").text() * 6 +
								partsData.find("tr:eq(7) td:eq(1)").text() * 31 +
								(partsData.find("tr:eq(2) td:eq(6)").text().replace("%", "") *
									36) /
									100 +
								(partsData.find("tr:eq(3) td:eq(6)").text().replace("%", "") *
									22) /
									100 -
								(partsData.find("tr:eq(4) td:eq(6)").text().replace("%", "") *
									11) /
									100 -
								(partsData.find("tr:eq(7) td:eq(2)").text().replace("%", "") *
									69) /
									100
						);

						window.FillSetup(wing, wing, engine, brakes, gear, susp);
					}
				}

				$(".overlay, .overlay-message").hide();
			};
		};

		return new Qualify();
	})(jQuery);
