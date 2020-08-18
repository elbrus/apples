window.apples.qualify2 =
	window.apples.qualify2 ||
	(function ($, Setup) {
		"use strict";

		var Qualify = function () {
			function getTemperature(text) {
				var temp = text.substring(text.indexOf("Temp") + 6);

				return temp.substring(0, temp.indexOf("C"));
			}

			function getHumidity(text) {
				var hum = text.substring(text.indexOf("Humidity") + 10);

				return hum.substring(0, hum.indexOf("%") + 1);
			}

			function prepareInfo(data) {
				var qData = $("table:eq(5) tr:last > td", data);

				if (qData.length > 2) {
					var tempData = $("table:eq(3) img:eq(1)", data),
						text = tempData.parent().text();

					return {
						Data: {
							Time: $.trim(qData.eq(0).text()),
							FWing: $.trim(qData.eq(1).text()),
							RWing: $.trim(qData.eq(2).text()),
							Engine: $.trim(qData.eq(3).text()),
							Brakes: $.trim(qData.eq(4).text()),
							Gear: $.trim(qData.eq(5).text()),
							Susp: $.trim(qData.eq(6).text()),
							Fuel: $.trim(qData.eq(7).text()),
							TType: qData.eq(8).children("img").attr("title"),
							Tyres: $.trim(qData.eq(9).text()),
							Risk: $.trim(qData.eq(10).text()),
						},
						Weather: tempData.attr("title"),
						Temp: getTemperature(text),
						Hum: getHumidity(text),
					};
				}

				return null;
			}

			function compareTyresWithWeather() {
				var weather = $("table:eq(3) img:eq(1)").attr("title");
				var tyres = $("#Tyres").val();

				if (
					tyres &&
					((weather === "Rain" && tyres !== "6") ||
						(weather !== "Rain" && tyres === "6"))
				) {
					$("#Tyres").parent().css("background-color", "red");
				}
			}

			function getQNumbers() {
				var result = $("table:eq(10) a").attr("href");

				result = result.substring(result.indexOf("(") + 1);
				result = result.substring(0, result.indexOf(")"));

				return result.split(",");
			}

			this.addFunctionality = function () {
				if ($('input[type="submit"]:not(:disabled)').length) {
					compareTyresWithWeather();
					$("#Tyres").on("change", compareTyresWithWeather);

					if (window.trackCoefs) {
						$("table:eq(10) th:first").append(
							'<br><a class="lime" href="#" onclick="window.apples.forum.calcQ2Setup()">Calculate setup</a>'
						);
					}
				}
			};

			this.calcSetup = function (driverData) {
				var raceID = $("div.thirtyseven a:first").attr("href").split("=")[1];
				var tempData = $("table:eq(3) img:eq(1)");
				var isRain = tempData.attr("title") === "Rain";
				var temp = getTemperature(tempData.parent().text()).replace("°", "");
				var setup = Setup.calc(
					driverData,
					raceID,
					isRain,
					temp,
					$("table:eq(10)")
				);

				if (setup) {
					var q1Numbers = getQNumbers();
					var wingDiff = (q1Numbers[0] - q1Numbers[1]) / 2;

					window.QuickLink(
						Math.max(Math.min(setup.wing + wingDiff, 999), 0),
						Math.max(Math.min(setup.wing - wingDiff, 999), 0),
						setup.engine,
						setup.brakes,
						setup.gear,
						setup.susp
					);
				}

				$(".overlay, .overlay-message").hide();
			};

			this.getInfo = function (success, error) {
				$.ajax({
					type: "GET",
					url: "/Qualify2.asp",
					success: function (data) {
						if (data && success) success(prepareInfo(data));
					},
					error: function () {
						if (error) error();
					},
				});
			};
		};

		return new Qualify();
	})(jQuery, window.apples.setup);
