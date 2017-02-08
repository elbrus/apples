window.apples.directors = window.apples.directors || (function($, Director) {
	'use strict';

	var TechnicalDirectorsMarket = function() {
		var _this = this;

		this.addFunctionality = function() {
			var directorsTable = $('table:eq(1)');

			if (preferences.SettingsSetup.TDL.Sort) {
				var popupStyle = { border: 'none', background: 'rgb(52,84,127)', color:'#ccc' };

				directorsTable.find('tr:first th').each(function(column) {
					var header = $(this),
						headerText = header.text().trim().toLowerCase();

					if (headerText === 'minimal salary' || headerText === 'minimal signing fee' || headerText === 'rank') {
						header.click( function() {
							$('.directorPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = directorsTable.find('tr').get();

							rows.sort(function(a, b) {
								return _this.parseCell(a, column).replace(/\$|\./g, '') - _this.parseCell(b, column).replace(/\$|\./g, '');
							});

							directorsTable.append(rows);
						}).css('cursor', 'pointer');
					}

					if (headerText === 'overall' || headerText === 'age' || headerText === 'offers') {
						header.click( function() {
							$('.directorPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = directorsTable.find('tr').get();

							rows.sort(function(a, b) {
								return _this.parseCell(a, column) - _this.parseCell(b, column);
							});

							directorsTable.append(rows);
						}).css('cursor', 'pointer');
					}

					if (headerText === 'technical director name') {
						header.click( function() {
							$('.directorPopup').remove();
							$('.fastView').css(popupStyle);

							var rows = directorsTable.find('tr').get();

							rows.sort(function(a, b) {
								var valueA = _this.parseCell(a, column),
									valueB = _this.parseCell(b, column);

								if (valueA === 'NAME') return -1;
								if (valueB === 'NAME') return 1;
								if (valueA < valueB) return -1;
								if (valueA > valueB) return 1;

								return 0;
							});

							directorsTable.append(rows);
						}).css('cursor', 'pointer');
					}
				});
			}
			
			directorsTable.find('tr').each(function(index) {
				var row = $(this);

				if (!index) {
					row.append('<th></th>');
				} else {
					if (preferences.SettingsSetup.DL.Skills) {
						row.append('<td id="' + $('td a:first', this).attr('href') + '" class="fastView" style="cursor: pointer">[+]</td>');
					}
				}
			});

			if (preferences.SettingsSetup.DL.Skills) {
				$('.fastView').on('click', function(event) {
					var popup = $(this);

					$('.directorPopup').remove();

					popup.mouseout(function() {
						$('.directorPopup').remove();
					});

					Director.getSkills(popup.attr('id'), function(skills) {
						$('body').append(skills);
						$('.directorPopup').css({ top: event.pageY, left: event.pageX - 160 }).show();
					});
				});
			}
		};

		this.parseCell = function(elem, column) {
			return $(elem).children('td:eq(' + column + ')').text().toUpperCase();
		};
	};

	return new TechnicalDirectorsMarket();
})(jQuery, window.apples.director);