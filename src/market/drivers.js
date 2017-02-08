window.apples.drivers = window.apples.drivers || (function($, Driver) {
	'use strict';

	var DriversMarket = function() {
		var _this = this;

		this.addFunctionality = function() {
			var driversTable = $('table:eq(3)');

			if (preferences.SettingsSetup.DL.Sort) {
				var popupStyle = { border: 'none', background: 'rgb(52,84,127)', color:'#ccc' };

				driversTable.find('tr:first th').each(function(column) {
					var header = $(this),
						headerText = header.text().trim().toLowerCase();

					if (headerText === 'minimal salary' || headerText === 'minimal signing fee' || headerText === 'rank') {
						header.click(function() {
							$('.driverPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = driversTable.find('tr').get();

							rows.sort(function(a, b) {
								return _this.parseCell(a, column).replace(/\$|\./g, '') - _this.parseCell(b, column).replace(/\$|\./g, '');
							});

							driversTable.append(rows);
						}).css('cursor', 'pointer');
					}

					if (headerText === 'overall' || headerText === 'age' || headerText === 'offers') {
						header.click( function() {
							$('.driverPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = driversTable.find('tr').get();

							rows.sort(function(a, b) {
								return _this.parseCell(a, column) - _this.parseCell(b, column);
							});

							driversTable.append(rows);
						}).css('cursor', 'pointer');
					}

					if (headerText === 'driver name') {
						header.click( function() {
							$('.driverPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = driversTable.find('tr').get();

							rows.sort(function(a, b) {
								var valueA = _this.parseCell(a, column),
									valueB = _this.parseCell(b, column);

								if (valueA === 'NAME') return -1;
								if (valueB === 'NAME') return 1;
								if (valueA < valueB) return -1;
								if (valueA > valueB) return 1;
								
								return 0;
							});

							driversTable.append(rows);
						}).css('cursor', 'pointer');
					}
				});
			}

			driversTable.find('tr').each(function(index) {
				var row = $(this);

				if (!index) {
					row.append('<th></th>');
				} else {
					if (preferences.SettingsSetup.DL.Skills) {
						row.append('<td id="' + $("td a:first", this).attr('href') + '" class="fastView" style="cursor: pointer">[+]</td>');
					}
				}
			});

			if (preferences.SettingsSetup.DL.Skills) {
				$('.fastView').on('click', function(event) {
					var popup = $(this);

					$('.driverPopup').remove();

					popup.mouseout(function() {
						$('.driverPopup').remove();
					});

					Driver.getSkills(popup.attr('id'), function(skills) {
						$('body').append(skills);
						$('.driverPopup').css({ top: event.pageY, left: event.pageX - 160 }).show();
					});
				});
			}
		};

		this.parseCell = function(elem, column) {
			return $(elem).children('td:eq(' + column + ')').text().toUpperCase();
		};
	};

	return new DriversMarket();
})(jQuery, window.apples.driver);