window.apples.qualify1 =
	window.apples.qualify1 ||
	(function ($, Setup) {
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
				compareTyresWithWeather();
				$("#Tyres").on("change", compareTyresWithWeather);

				if (window.trackCoefs) {
					$("table:eq(6) th:first").append(
						'<br><a class="lime" href="#" onclick="window.apples.forum.calcQ1Setup()">Calculate setup</a>'
					);
				}
			};

			this.calcSetup = function (driverData) {
				var raceID = $("div.thirtyseven a:first").attr("href").split("=")[1];
				var tempData = $("table:eq(3) img:first");
				var isRain = tempData.attr("title") === "Rain";
				var temp = getTemperature(tempData.parent().text()).replace("°", "");

				Setup.calc(driverData, raceID, isRain, temp, $("table:eq(6)"));

				$(".overlay, .overlay-message").hide();
			};
		};

		return new Qualify();
	})(jQuery, window.apples.setup);
