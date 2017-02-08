window.apples.update = window.apples.update || (function($) {
	'use strict';

	var UpdateCar = function() {
		this.addFunctionality = function() {
			$('table:eq(1) tr:gt(0):not(:last)').each(function() {
				var col = $(this).children('td:eq(3)'),
					val = parseInt(col.text().trim(), 10);

				if (val >= 80) col.css({ background: '#f00', fontWeight: 'bold' });
			});
		};
	};

	return new UpdateCar();
})(jQuery);
