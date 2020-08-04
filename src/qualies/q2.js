window.apples.qualify2 =
	window.apples.qualify2 ||
	(function ($) {
		"use strict";

		var Qualify = function () {
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

			this.addFunctionality = function () {
				if ($('input[type="submit"]:not(:disabled)').length) {
					$("table:eq(10) th:first").append("<br>" + getTemperatureChange());

					$("#Tyres").on("change", compareTyresWithWeather);
					compareTyresWithWeather();
				}
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

			function getTemperature(text) {
				var temp = text.substring(text.indexOf("Temp") + 6);

				return temp.substring(0, temp.indexOf("C"));
			}

			function getHumidity(text) {
				var hum = text.substring(text.indexOf("Humidity") + 10);

				return hum.substring(0, hum.indexOf("%") + 1);
			}

			function getTemperatureChange() {
				var result,
					temp,
					i,
					iLen,
					temperatureDifference,
					href = [],
					title = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					weather = getWeather(),
					rainCoef = [
						preferences.WetSetup.C.fWing,
						preferences.WetSetup.C.rWing,
						preferences.WetSetup.C.engine,
						preferences.WetSetup.C.brakes,
						preferences.WetSetup.C.gear,
						preferences.WetSetup.C.suspension,
					],
					rainCoef2 = [
						preferences.WetSetup.C2.fWing,
						preferences.WetSetup.C2.rWing,
						preferences.WetSetup.C2.engine,
						preferences.WetSetup.C2.brakes,
						preferences.WetSetup.C2.gear,
						preferences.WetSetup.C2.suspension,
					],
					v1 = [
						preferences.WetSetup.V1.fWing,
						preferences.WetSetup.V1.rWing,
						preferences.WetSetup.V1.engine,
						preferences.WetSetup.V1.brakes,
						preferences.WetSetup.V1.gear,
						preferences.WetSetup.V1.suspension,
					],
					v2 = [
						preferences.WetSetup.V2.fWing,
						preferences.WetSetup.V2.rWing,
						preferences.WetSetup.V2.engine,
						preferences.WetSetup.V2.brakes,
						preferences.WetSetup.V2.gear,
						preferences.WetSetup.V2.suspension,
					],
					v3 = [
						preferences.WetSetup.V3.fWing,
						preferences.WetSetup.V3.rWing,
						preferences.WetSetup.V3.engine,
						preferences.WetSetup.V3.brakes,
						preferences.WetSetup.V3.gear,
						preferences.WetSetup.V3.suspension,
					],
					q1Numbers = getQNumbers(),
					tempCoef;

				if (weather[0] === 1 && weather[2] === 1) {
					tempCoef = [
						preferences.TemperatureSetup.Wet.fWing,
						preferences.TemperatureSetup.Wet.rWing,
						preferences.TemperatureSetup.Wet.engine,
						preferences.TemperatureSetup.Wet.brakes,
						preferences.TemperatureSetup.Wet.gear,
						preferences.TemperatureSetup.Wet.suspension,
					];
				} else {
					tempCoef = [
						preferences.TemperatureSetup.Dry.fWing,
						preferences.TemperatureSetup.Dry.rWing,
						preferences.TemperatureSetup.Dry.engine,
						preferences.TemperatureSetup.Dry.brakes,
						preferences.TemperatureSetup.Dry.gear,
						preferences.TemperatureSetup.Dry.suspension,
					];
				}

				if (weather[1] !== weather[3]) {
					temperatureDifference = weather[3] - weather[1];

					for (i = 0, iLen = tempCoef.length; i < iLen; i++) {
						title[i] = title[i + rainCoef.length] = title[
							i + rainCoef.length * 2
						] = countTemperateChangeTitle(tempCoef[i], temperatureDifference);
						q1Numbers[i] = countTemperateChangeHref(
							tempCoef[i],
							temperatureDifference,
							q1Numbers[i]
						);
					}
				}

				href = q1Numbers.slice(0);

				if (weather[0] === 0 && weather[2] === 1) {
					for (i = 0, iLen = rainCoef.length; i < iLen; i++) {
						title[i] =
							title[i] + countDryWetChangeTitle(rainCoef[i], v1[i], weather[3]);
						href[i] = countDryWetChangeHref(
							rainCoef[i],
							v1[i],
							weather[3],
							q1Numbers[i]
						);
						title[i + rainCoef.length] =
							title[i + rainCoef.length] +
							countDryWetChangeTitle(rainCoef[i], v2[i], weather[3]);
						href[i + rainCoef.length] = countDryWetChangeHref(
							rainCoef[i],
							v2[i],
							weather[3],
							q1Numbers[i]
						);
						title[i + rainCoef.length * 2] =
							title[i + rainCoef.length * 2] +
							countDryWetChangeTitle(rainCoef2[i], v3[i], weather[3]);
						href[i + rainCoef.length * 2] = countDryWetChangeHref(
							rainCoef2[i],
							v3[i],
							weather[3],
							q1Numbers[i]
						);
					}
				} else if (weather[0] === 1 && weather[2] === 0) {
					for (i = 0, iLen = rainCoef.length; i < iLen; i++) {
						title[i] =
							title[i] + countWetDryChangeTitle(rainCoef[i], v1[i], weather[3]);
						href[i] = countWetDryChangeHref(
							rainCoef[i],
							v1[i],
							weather[3],
							q1Numbers[i]
						);
						title[i + rainCoef.length] =
							title[i + rainCoef.length] +
							countWetDryChangeTitle(rainCoef[i], v2[i], weather[3]);
						href[i + rainCoef.length] = countWetDryChangeHref(
							rainCoef[i],
							v2[i],
							weather[3],
							q1Numbers[i]
						);
						title[i + rainCoef.length * 2] =
							title[i + rainCoef.length * 2] +
							countWetDryChangeTitle(rainCoef2[i], v3[i], weather[3]);
						href[i + rainCoef.length * 2] = countWetDryChangeHref(
							rainCoef2[i],
							v3[i],
							weather[3],
							q1Numbers[i]
						);
					}
				}

				if (weather[1] !== weather[3]) {
					temperatureDifference = weather[3] - weather[1];

					for (i = 0, iLen = href.length; i < iLen; i++) {
						title[i] =
							title[i] +
							countTemperateChangeTitle(tempCoef[i % 6], temperatureDifference);
						href[i] = countTemperateChangeHref(
							tempCoef[i % 6],
							temperatureDifference,
							href[i]
						);
					}
				}

				href = setWings(href);

				for (i = 0, iLen = href.length; i < iLen; i++) {
					if (href[i] > 999) href[i] = 999;
					if (href[i] < 0) href[i] = 0;
				}

				if (href.length === 6) {
					result =
						'<a class="lime" href="javascript: QuickLink({href})" title="Change: {title}">Temperature change</a>';

					if (title.length) {
						temp =
							title[0] +
							", " +
							title[1] +
							", " +
							title[2] +
							", " +
							title[3] +
							", " +
							title[4] +
							", " +
							title[5];
						result = result.replace(/{title}/g, temp);
					} else {
						result = result.replace(/{title}/g, "-");
					}

					temp =
						href[0] +
						"," +
						href[1] +
						"," +
						href[2] +
						"," +
						href[3] +
						"," +
						href[4] +
						"," +
						href[5];

					result = result.replace(/{href}/g, temp);
				} else {
					result =
						'<a class="lime" href="javascript: QuickLink({href1})" title="Change: {title1}">Version 1</a>&nbsp;<a class="lime" href="javascript: QuickLink({href2})" title="Change: {title2}">Version 2</a>&nbsp;<a class="lime" href="javascript: QuickLink({href3})" title="Change: {title3}">Version 3</a>';

					if (title.length) {
						temp =
							title[0] +
							", " +
							title[1] +
							", " +
							title[2] +
							", " +
							title[3] +
							", " +
							title[4] +
							", " +
							title[5];
						result = result.replace(/{title1}/g, temp);
					} else {
						result = result.replace(/{title1}/g, "-");
					}

					temp =
						href[0] +
						"," +
						href[1] +
						"," +
						href[2] +
						"," +
						href[3] +
						"," +
						href[4] +
						"," +
						href[5];

					result = result.replace(/{href1}/g, temp);

					if (title.length) {
						temp =
							title[6] +
							", " +
							title[7] +
							", " +
							title[8] +
							", " +
							title[9] +
							", " +
							title[10] +
							", " +
							title[11];
						result = result.replace(/{title2}/g, temp);
					} else {
						result = result.replace(/{title2}/g, "-");
					}

					temp =
						href[6] +
						"," +
						href[7] +
						"," +
						href[8] +
						"," +
						href[9] +
						"," +
						href[10] +
						"," +
						href[11];

					result = result.replace(/{href2}/g, temp);

					if (title.length) {
						temp =
							title[12] +
							", " +
							title[13] +
							", " +
							title[14] +
							", " +
							title[15] +
							", " +
							title[16] +
							", " +
							title[17];
						result = result.replace(/{title3}/g, temp);
					} else {
						result = result.replace(/{title3}/g, "-");
					}

					temp =
						href[12] +
						"," +
						href[13] +
						"," +
						href[14] +
						"," +
						href[15] +
						"," +
						href[16] +
						"," +
						href[17];

					result = result.replace(/{href3}/g, temp);
				}

				return result;
			}

			function getWeather() {
				var result = [],
					table = $("table:eq(3)"),
					text;

				result.push(table.find("img:first").attr("title") === "Rain" ? 1 : 0);

				text = table.find("img:first").parent().text();
				text = text.substring(text.indexOf("Temp") + 6);
				result.push(text.substring(0, text.indexOf("C") - 1));

				result.push(table.find("img:eq(1)").attr("title") === "Rain" ? 1 : 0);

				text = table.find("img:eq(1)").parent().text();
				text = text.substring(text.indexOf("Temp") + 6);
				result.push(text.substring(0, text.indexOf("C") - 1));

				return result;
			}

			function getQNumbers() {
				var result = $("table:eq(10) a").attr("href");

				result = result.substring(result.indexOf("(") + 1);
				result = result.substring(0, result.indexOf(")"));

				return result.split(",");
			}

			function countTemperateChangeTitle(coef, temp) {
				return Math.round(coef * temp);
			}

			function countTemperateChangeHref(coef, temp, q1) {
				return Math.round(coef * temp) + parseInt(q1, 10);
			}

			function countDryWetChangeTitle(coef, v, temp) {
				return Math.round((43 - temp) * coef + v);
			}

			function countDryWetChangeHref(coef, v, temp, q1) {
				return Math.round(parseInt(q1, 10) + (43 - temp) * coef + v);
			}

			function countWetDryChangeTitle(coef, v, temp) {
				return Math.round((43 - temp) * coef + v) * -1;
			}

			function countWetDryChangeHref(coef, v, temp, q1) {
				return Math.round(parseInt(q1, 10) - (43 - temp) * coef - v);
			}

			function setWings(href) {
				if (href[0] > 999 && href[1] < 999) {
					href[1] += href[0] - 999;
					href[0] = 999;
				} else if (href[0] < 999 && href[1] > 999) {
					href[0] += href[1] - 999;
					href[1] = 999;
				}

				if (href.length > 6) {
					if (href[6] > 999 && href[7] < 999) {
						href[7] += href[6] - 999;
						href[6] = 999;
					} else if (href[6] < 999 && href[7] > 999) {
						href[6] += href[7] - 999;
						href[7] = 999;
					}
				}

				if (href.length > 12) {
					if (href[12] > 999 && href[13] < 999) {
						href[13] += href[12] - 999;
						href[12] = 999;
					} else if (href[12] < 999 && href[13] > 999) {
						href[12] += href[13] - 999;
						href[13] = 999;
					}
				}

				return href;
			}
		};

		return new Qualify();
	})(jQuery);
