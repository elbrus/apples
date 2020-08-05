window.apples.setup =
	window.apples.setup ||
	(function ($) {
		"use strict";

		var Setup = function () {
			function getSetup(isRain, part) {
				return window.preferences.Setup[isRain ? "Wet" : "Dry"][part];
			}

			function getSetupOffset(isRain, part) {
				return window.preferences.SetupOffset[isRain ? "Wet" : "Dry"][part];
			}

			function prepareSetup(setup) {
				return Math.min(Math.max(Math.round(setup), 0), 999);
			}

			this.calc = function (driverData, raceID, isRain, temp, partsData) {
				if (driverData) {
					var raceCoefs = window.trackCoefs[raceID];
					if (raceCoefs) {
						var wing, engine, brakes, gear, susp;

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
								30 +
								temp * getSetup(isRain, "engine") +
								getSetupOffset(isRain, "engine")) *
								(-605 - driverData.Exp)) /
								-605 -
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
									100 -
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

						if (window.FillSetup) {
							window.FillSetup(wing, wing, engine, brakes, gear, susp, "1");
						} else {
							window.QuickLink(wing, wing, engine, brakes, gear, susp);
						}
					}
				}
			};
		};

		return new Setup();
	})(jQuery);
