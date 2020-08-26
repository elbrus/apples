window.apples.sponsor =
	window.apples.sponsor ||
	(function ($) {
		"use strict";

		var CarArea = {
			1: 4,
			2: 3,
			3: 2,
			4: 1,
			5: 1,
			6: 0,
			7: 0,
		};
		var PopularDriver = {
			1: 4,
			2: 4,
			3: 3,
			4: 3,
			5: 2,
			6: 1,
			7: 0,
		};
		var NextSeasonExpectations = {
			1: 4,
			2: 4,
			3: 3,
			4: 3,
			5: 2,
			6: 1,
			7: 0,
		};
		var AmountPerRace = {
			1: 0,
			2: 0,
			3: 1,
			4: 1,
			5: 2,
			6: 2,
			7: 3,
		};
		var ContractDuration = {
			1: 2,
			2: 2,
			3: 2,
			4: 2,
			5: 3,
			6: 3,
			7: 4,
		};

		var Sponsor = function () {
			function getSponsorSkills() {
				var rows = $("tr[data-intro]");

				return {
					Finances: parseInt(rows.eq(0).find(".flag").attr("title"), 10),
					Expectations: parseInt(rows.eq(1).find(".flag").attr("title"), 10),
					Patience: parseInt(rows.eq(2).find(".flag").attr("title"), 10),
					Reputation: parseInt(rows.eq(3).find(".flag").attr("title"), 10),
					Image: parseInt(rows.eq(4).find(".flag").attr("title"), 10),
					Negotiation: parseInt(rows.eq(5).find(".flag").attr("title"), 10),
				};
			}

			this.addFunctionality = function () {
				var radioButtons = $('input[type="radio"]');

				if (radioButtons.length) {
					var question = $.trim($('font[color="yellow"]').text());

					if (question) {
						var skills = getSponsorSkills();

						if (
							question ===
							"Which area of the car would our advertisement be placed on?"
						) {
							radioButtons.eq(CarArea[skills.Image]).click();
						}
						if (question === "How popular is your driver with the fans?") {
							radioButtons.eq(PopularDriver[skills.Image]).click();
						}
						if (question === "What are you expecting to achieve next season?") {
							radioButtons
								.eq(NextSeasonExpectations[skills.Expectations])
								.click();
						}
						if (
							question ===
							"What do you think of the amount per race we proposed?"
						) {
							radioButtons.eq(AmountPerRace[skills.Patience]).click();
						}
						if (
							question ===
							"What do you think of the contract duration we proposed?"
						) {
							radioButtons.eq(ContractDuration[skills.Patience]).click();
						}
					}
				}
			};
		};

		return new Sponsor();
	})(jQuery);
