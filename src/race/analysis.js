window.apples.analysis =
	window.apples.analysis ||
	(function ($) {
		"use strict";

		var RaceAnalysis = function () {
			this.getInfo = function (success, error) {
				$.ajax({
					type: "GET",
					url: "/RaceAnalysis.asp",
					success: function (data) {
						if (data && success) success(prepareInfo(data));
					},
					error: function () {
						if (error) error();
					},
				});
			};

			function prepareInfo(data) {
				var isPracticeSet = $("#PracticeData", data).length ? 0 : -2,
					setupData = $(
						"table:eq(" + (5 + isPracticeSet) + ") tr:last > td:gt(0)",
						data
					),
					risksData = $(
						"table:eq(" + (6 + isPracticeSet) + ") tr:last > td",
						data
					),
					positionData = $(
						"table:eq(" +
							(10 + isPracticeSet) +
							") tr:first table:first tr:last > td",
						data
					),
					carPointsData = $(
						"table:eq(" + (10 + isPracticeSet) + ") tr:last > td",
						data
					),
					rlData = getRaceLapsData(
						$("table:eq(" + (3 + isPracticeSet) + ") tr:gt(0)", data)
					),
					lap = 1,
					pitsData = [],
					tpData = [],
					pitsTable = $("table:eq(" + (19 + isPracticeSet) + ")", data);

				if (
					pitsTable.parent().attr("id") !== "dvFinAnalisysTable" &&
					pitsTable.text().indexOf("Technical problems") === -1
				) {
					pitsData = $.map(pitsTable.find("tr:gt(0)"), function (row) {
						var pit = $(row).children("td"),
							pitLap = parseInt(pit.eq(0).text().match(/\d+/g)[1], 10),
							avg = countAverage(rlData, lap, pitLap);

						lap = pitLap + 1;

						return {
							Lap: pitLap,
							Reason: $.trim(pit.eq(1).text()),
							Tyres: $.trim(pit.eq(2).text()),
							Fuel: $.trim(pit.eq(3).text()),
							Refill: $.trim(pit.eq(4).text()),
							Time: $.trim(pit.eq(5).text()),
							Temp: avg[0],
							Hum: avg[1],
						};
					});

					var finishData = pitsTable.siblings("p");

					if (finishData.length) {
						var last = countLast(rlData, lap);

						pitsData.push({
							Lap: "Last",
							Tyres: finishData.eq(0).text().match(/\d+/)[0] + "%",
							Fuel: finishData.eq(1).text().match(/\d+/)[0] + "l",
							Temp: last[0],
							Hum: last[1],
						});
					}
				}

				if (pitsTable.text().indexOf("Technical problems") !== -1) {
					tpData = getTechnicalProblems(pitsTable);
				} else {
					pitsTable = $("table:eq(" + (20 + isPracticeSet) + ")", data);

					if (pitsTable.text().indexOf("Technical problems") !== -1) {
						tpData = getTechnicalProblems(pitsTable);
					}
				}

				return {
					ID: $('a[href^="TrackDetails"]', data).attr("href").split("=")[1],
					Setup: {
						FWing: $.trim(setupData.eq(0).text()),
						RWing: $.trim(setupData.eq(1).text()),
						Engine: $.trim(setupData.eq(2).text()),
						Brakes: $.trim(setupData.eq(3).text()),
						Gear: $.trim(setupData.eq(4).text()),
						Susp: $.trim(setupData.eq(5).text()),
					},
					Risks: {
						Start: $.trim(
							$("table:eq(" + (6 + isPracticeSet) + ") tr:eq(5)", data).text()
						),
						Overtake: $.trim(risksData.eq(0).text()),
						Defend: $.trim(risksData.eq(1).text()),
						DryClear: $.trim(risksData.eq(2).text()),
						WetClear: $.trim(risksData.eq(3).text()),
						Malf: $.trim(risksData.eq(4).text()),
					},
					Pits: pitsData,
					CarParts: $.map(
						$("table:eq(" + (2 + isPracticeSet) + ") tr:gt(1)", data).filter(
							function (index) {
								return index % 2 === 0;
							}
						),
						function (row) {
							var children = $(row).children("td");
							return {
								Cha: $.trim(children.eq(0).text()),
								Eng: $.trim(children.eq(1).text()),
								FWing: $.trim(children.eq(2).text()),
								RWing: $.trim(children.eq(3).text()),
								Underb: $.trim(children.eq(4).text()),
								Sidep: $.trim(children.eq(5).text()),
								Cool: $.trim(children.eq(6).text()),
								Gear: $.trim(children.eq(7).text()),
								Bra: $.trim(children.eq(8).text()),
								Susp: $.trim(children.eq(9).text()),
								Elec: $.trim(children.eq(10).text()),
							};
						}
					),
					Position: [
						$.trim(positionData.eq(0).text()),
						$.trim(positionData.eq(1).text()),
					],
					CarPoints: [
						$.trim(carPointsData.eq(0).text()),
						$.trim(carPointsData.eq(1).text()),
						$.trim(carPointsData.eq(2).text()),
					],
					Boost: $('a[style="color:lime;font-weight:bold;"]', data)
						.map(function () {
							return parseInt($(this).text(), 10);
						})
						.toArray(),
					CarProblem: $('font[color="orange"]', data)
						.filter(function () {
							return $(this).text().trim() === "Car problem";
						})
						.first()
						.parents("tr:first")
						.find("a")
						.text(),
					StartAccident:
						$('font[color="orange"]', data).filter(function () {
							return $(this).text().trim() === "Start accident";
						}).length === 1,
					TechnicalProblems: tpData,
					Energy: $(".barLabel", data)
						.map(function () {
							return parseInt($(this).text(), 10);
						})
						.toArray(),
				};
			}

			function getTechnicalProblems(tpTable) {
				var result = [];

				tpTable.find("tr:gt(0)").each(function () {
					var cols = $(this).find("td");

					result.push({
						Lap: parseInt(cols.first().text().replace("Lap", ""), 10),
						Problem: cols.last().text().trim(),
					});
				});

				return result;
			}

			function getRaceLapsData(laps) {
				var lapTimes = [],
					temp = [],
					hum = [];

				laps.each(function (index) {
					var column = $(this).find("td");

					temp[index] = parseInt(column.eq(5).text(), 10);
					hum[index] = parseInt(column.eq(6).text(), 10);

					if (index) lapTimes[index - 1] = column.eq(1).text();
				});

				return {
					lapTimes: lapTimes,
					temp: temp,
					hum: hum,
				};
			}

			function countAverage(data, lap, pitLap) {
				var sum = [0, 0];

				for (var i = lap; i <= pitLap; i++) {
					sum[0] += data.temp[i];
					sum[1] += data.hum[i];
				}

				sum[0] = roundNumber(sum[0] / (pitLap - lap + 1), 2);
				sum[1] = roundNumber(sum[1] / (pitLap - lap + 1), 2);

				return sum;
			}

			function countLast(data, lap) {
				var sum = [0, 0];

				for (var i = lap, iLen = data.temp.length; i < iLen; i++) {
					sum[0] += data.temp[i];
					sum[1] += data.hum[i];
				}

				sum[0] = roundNumber(sum[0] / (iLen - lap), 2);
				sum[1] = roundNumber(sum[1] / (iLen - lap), 2);

				return sum;
			}

			function roundNumber(number, digits) {
				var multiple = Math.pow(10, digits);

				return Math.round(number * multiple) / multiple;
			}

			this.addFunctionality = function () {
				var i,
					iLen,
					isPracticeSet = $("#PracticeData").length ? 0 : -2,
					season = $("h1.block").text().split("Season ")[1].split(" -")[0],
					isOldSeason = parseInt(season, 10) < 55 ? -1 : 0,
					data = getRaceLapsData(
						$("table:eq(" + (3 + isPracticeSet) + ") tr:gt(0)")
					);
				var avg = [0, 0];

				for (i = 1, iLen = data.temp.length; i < iLen; i++) {
					avg[0] += data.temp[i];
					avg[1] += data.hum[i];
				}

				avg[0] /= data.temp.length - 1;
				avg[1] /= data.hum.length - 1;

				$("table:eq(" + (3 + isPracticeSet) + ") > *").append(
					'<tr style="" onmouseover="this.style.backgroundColor=\'#3B2D47\';" onmouseout="this.style.backgroundColor=\'\';"><td bgcolor="#1b2d47" align="center" class="speccell" colspan="2"><b>Total</b></td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">&nbsp;</td><td align="center" class="speccell">' +
						roundNumber(avg[0], 2) +
						'&deg;</td><td align="center" class="speccell">' +
						roundNumber(avg[1], 2) +
						'%</td><td nowrap="" align="center" class="speccell">&nbsp;</td></tr>'
				);

				var lap = 1,
					tableElem = $("table:eq(" + (19 + isPracticeSet + isOldSeason) + ")");

				if (
					tableElem.parent().attr("id") !== "dvFinAnalisysTable" &&
					tableElem.text().indexOf("Technical problems") === -1
				) {
					var rows = tableElem.find("tr");

					rows.each(function (index) {
						var row = $(this);

						if (!index) {
							row.append(
								'<th class="center">Avg.<br>temp.</th><th class="center">Avg.<br>hum.</th>'
							);
						} else {
							var pitLap = parseInt(
									row.find("td:first").text().match(/\d+/g)[1],
									10
								),
								sum = countAverage(data, lap, pitLap);

							row.append(
								'<td class="center"><b>' +
									sum[0] +
									'&deg;</b></td><td class="center"><b>' +
									sum[1] +
									"%</b></td>"
							);

							lap = pitLap + 1;
						}
					});

					tableElem.css("width", "100%");

					var finishData = tableElem.siblings("p");

					if (finishData.length) {
						var sum = countLast(data, lap),
							tyres = finishData.eq(0).text().match(/\d+/)[0],
							fuel = finishData.eq(1).text().match(/\d+/)[0];

						tableElem.append(
							'<tr><td nowrap="" class="center">Last<br>Stint</td><td class="center">&nbsp;</td><td class="center"><font color="#00ddff"><b>' +
								tyres +
								'%</b></font></td><td class="center"><b>' +
								fuel +
								'l</b></td><td class="center">&nbsp;</td><td class="center">&nbsp;</td><td class="center"><b>' +
								sum[0] +
								'&deg;</b></td><td class="center"><b>' +
								sum[1] +
								"%</b></td></tr>"
						);
					}
				}
			};
		};

		return new RaceAnalysis();
	})(jQuery);
