(function(DriversMarket, TechnicalDirectorsMarket, RaceAnalysis, Qualify1, Qualify2, UpdateCar, RaceSetup, StaffAndFacilities) {
	'use strict';

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

		// add functionality
		switch (pageType) {
			case 1: {
				Qualify2.addFunctionality();
				break;
			}
			case 2: {
				RaceAnalysis.addFunctionality();
				break;
			}
			case 3: {
				Qualify1.addFunctionality();
				break;
			}
			case 4: {
				TechnicalDirectorsMarket.addFunctionality();
				break;
			}
			case 5: {
				DriversMarket.addFunctionality();
				break;
			}
			case 6: {
				UpdateCar.addFunctionality();
				break;
			}
			case 7: {
				RaceSetup.addFunctionality();
				break;
			}
			case 8: {
				StaffAndFacilities.addFunctionality();
				break;
			}
			default:
				break;
		}

		function checkPage(url) {
			var retval = 0;
			
			if (~url.indexOf('Qualify2')) {
				retval = 1;
			} else if (~url.indexOf('RaceAnalysis')) {
				retval = 2;
			} else if (~url.indexOf('Qualify')) {
				retval = 3;
			} else if (~url.indexOf('AvailTechDirectors')) {
				retval = 4;
			} else if (~url.indexOf('AvailDrivers')) {
				retval = 5;
			} else if (~url.indexOf('UpdateCar')) {
				retval = 6;
			} else if (~url.indexOf('RaceSetup')) {
				retval = 7;
			} else if (~url.indexOf('StaffAndFacilities')) {
				retval = 8;
			}

			return retval;
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
