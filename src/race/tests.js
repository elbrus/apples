window.apples.tests =
	window.apples.tests ||
	(function ($, Setup) {
		"use strict";

		var Testing = function () {
			function getTemperature(text) {
				var temp = text.substring(text.indexOf("Temp") + 6);

				return temp.substring(0, temp.indexOf("C"));
			}

			function getHumidity(text) {
				var hum = text.substring(text.indexOf("Humidity") + 10);

				return hum.substring(0, hum.indexOf("%") + 1);
			}

			function prepareInfo(data) {
				var tempData = $("table:eq(3) img:first", data),
					text = tempData.parent().text(),
					pointsData = $.map($("table:eq(4) tr:gt(0):lt(4)", data), function (
						row
					) {
						var children = $(row).children("td");

						return [
							$.trim(children.eq(0).text()),
							$.trim(children.eq(1).text()),
							$.trim(children.eq(2).text()),
						];
					});

				$("table:eq(6) tr:gt(7):lt(3)", data).each(function () {
					pointsData.push($.trim($(this).children("td:last").text()));
				});

				return {
					Laps: $.map($('table:eq(5) tr[class="pointerhand"]', data), function (
						row
					) {
						var children = $(row).children("td");

						return {
							Lap: $.trim(children.eq(0).text()),
							Done: $.trim(children.eq(1).text()),
							BTime: $.trim(children.eq(2).text()),
							MTime: $.trim(children.eq(3).text()),
							FWing: $.trim(children.eq(4).text()),
							RWing: $.trim(children.eq(5).text()),
							Engine: $.trim(children.eq(6).text()),
							Brakes: $.trim(children.eq(7).text()),
							Gear: $.trim(children.eq(8).text()),
							Susp: $.trim(children.eq(9).text()),
							Tyres: $.trim(children.eq(10).text()),
							Fuel: $.trim(children.eq(11).text()),
							TyresC: $.trim(children.eq(12).text()),
							FuelL: $.trim(children.eq(13).text()),
							TType: children.eq(14).children("img").attr("title"),
						};
					}),
					Points: pointsData,
					Weather: tempData.attr("title"),
					Temp: getTemperature(text),
					Hum: getHumidity(text),
				};
			}

			this.getInfo = function (success, error) {
				$.ajax({
					type: "GET",
					url: "/Testing.asp",
					success: function (data) {
						if (data && success) success(prepareInfo(data));
					},
					error: function () {
						if (error) error();
					},
				});
			};

			this.addFunctionality = function () {
				if (window.trackCoefs) {
					$("table:eq(6) th:first").append(
						'<br><a class="lime" href="#" onclick="window.apples.forum.calcTestsSetup()">Calculate setup</a>'
					);
				}
			};

			this.calcSetup = function (driverData) {
				var raceID = $("div.thirtyfive a:first").attr("href").split("=")[1];
				var tempData = $("table:eq(3) img:first");
				var isRain = tempData.attr("title") === "Rain";
				var temp = getTemperature(tempData.parent().text()).replace("°", "");
				var setup = Setup.calc(
					driverData,
					raceID,
					isRain,
					temp,
					$("table:eq(6)")
				);

				if (setup)
					window.FillSetup(
						setup.wing,
						setup.wing,
						setup.engine,
						setup.brakes,
						setup.gear,
						setup.susp,
						"1",
						"0"
					);
				$(".overlay, .overlay-message").hide();
			};
		};

		return new Testing();
	})(jQuery, window.apples.setup);
