window.apples.staff = window.apples.staff || (function($) {
	'use strict';

	var StaffAndFacilities = function() {
		this.addFunctionality = function() {
			$('.orange.center').append('<p>Average: ' + countAverageStaffLevel() + '</p>');
		};

		this.getInfo = function(success, error) {
			$.ajax({
				type: 'GET',
				url: '/StaffAndFacilities.asp',
				success: function(data) {
					if (data && success) success(prepareInfo(data));
				},
				error: function() {
					if (error) error();
				}
			});
		};
	
		function prepareInfo(data) {
			return {
				OA: getDataFromTable(data, 0)[0],
				Skills: getDataFromTable(data, 1),
				Levels: getDataFromTable(data, 2)
			};
		}

		function getDataFromTable(data, table) {
			return $('.squashed:eq(' + table + ') > tbody > tr', data).map(function() {
				return parseInt($(this).children('td:first').text().trim(), 10);
			}).toArray().filter(function(item) {
				return !isNaN(item);
			});
		}

		function countAverageStaffLevel() {
			var rows = $('.squashed:last > tbody > tr'),
				data = 0;

			rows.each(function() {
				data += parseInt($(this).children('td:first').text().trim(), 10);
			});

			return +(Math.round(data / rows.length + 'e+2') + 'e-2');
		}
	};

	return new StaffAndFacilities();
})(jQuery);
