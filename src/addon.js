(function(DriversMarket, TechnicalDirectorsMarket, RaceAnalysis, Qualify1, Qualify2, UpdateCar, RaceSetup, StaffAndFacilities) {
	'use strict';

	var URL = ['Qualify2', 'RaceAnalysis', 'Qualify', 'AvailTechDirectors', 'AvailDrivers', 'UpdateCar', 'RaceSetup', 'StaffAndFacilities'];
	var ACTION = {
		1: Qualify2.addFunctionality,
		2: RaceAnalysis.addFunctionality,
		3: Qualify1.addFunctionality,
		4: TechnicalDirectorsMarket.addFunctionality,
		5: DriversMarket.addFunctionality,
		6: UpdateCar.addFunctionality,
		7: RaceSetup.addFunctionality,
		8: StaffAndFacilities.addFunctionality
	};

	var applesAddon = function() {
		var pageType = checkPage(location.href);

		// hideAdBlock();

		// add send data link
		if ($('a[href*="UpdateProfile.asp"]').length) {
			var onlineInfo = $('#managersonline');

			if (onlineInfo) {
				onlineInfo.prepend('<li><a href="#" onclick="window.apples.forum.sendData()">Send data</a></li>');
				$('body').append('<div style="position:absolute;top:0;bottom:0;left:0;right:0;display:none;z-index:9998;background-color:rgba(190,190,190,0.4);" class="overlay"></div><div style="position:absolute;left:45%;top:25%;display:none;z-index:9999;font-weight:bold;font-size:35px;color:#0f0;" class="overlay-message">Sending data...</div>');
			}
		}

		if (pageType) {
			ACTION[pageType]();
		}

		function checkPage(url) {
			var result = 0;

			URL.some(function(item, index) {
				if (~url.indexOf(item)) {
					result = index + 1;
					return true;
				}

				return false;
			});

			return result;
		}

		function hideAdBlock() {
			$('#blockblockA').each(function() {
				var inner = $(this).parent();

				if (inner.siblings().length) {
					inner.remove();
				} else {
					inner.parent().remove();
				}
			});
			$('.adsbygoogle').parent().remove();
		}
	};

	$(document).ready(function() {
		applesAddon();
	});
})(window.apples.drivers, window.apples.directors, window.apples.analysis, window.apples.qualify1, window.apples.qualify2, window.apples.update, window.apples.setup, window.apples.staff);
