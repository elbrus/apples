window.apples.driver = window.apples.driver || (function($) {
	'use strict';

	var Driver = function() {
		this.getSkills = function(id, callback) {
			$.ajax({
				type: 'GET',
				url: id,
				success: function(data) {
					if (data && callback) callback(prepareSkillsTable(data));
				}
			});
		};

		this.getInfo = function(link, success, error) {
			$.ajax({
				type: 'GET',
				url: link,
				success: function(data) {
					if (data && success) success(prepareInfo(link, data));
				},
				error: function() {
					if (error) error();
				}
			});
		};

		function prepareInfo(driverLink, data) {
			var driverTable = $('table:eq(3) td', data);

			return { 
				ID: driverLink.split('=')[1],
				Overall: $.trim(driverTable.eq(1).text()),
				Conc: $.trim(driverTable.eq(3).text()),
				Talent: $.trim(driverTable.eq(5).text()),
				Agr: $.trim(driverTable.eq(7).text()), 
				Exp: $.trim(driverTable.eq(9).text()),
				TI: $.trim(driverTable.eq(11).text()), 
				Stamina: $.trim(driverTable.eq(13).text()),
				Charisma: $.trim(driverTable.eq(15).text()), 
				Motivation: $.trim(driverTable.eq(17).text()),
				Reputation: $.trim(driverTable.eq(20).text()), 
				Weight: $.trim(driverTable.eq(23).text()), 
				Age: $.trim(driverTable.eq(26).text()),
				Fav: $.map($('a[href^="TrackDetails"]', data), function(item) {
					return item.href.split('id=')[1];
				})
			};
		}

		function prepareSkillsTable(data) {
			var skillsTable = $('table:eq(3)', data),
				headers = skillsTable.find('th'),
				columns = skillsTable.find('td');

			return [
				'<table class="driverPopup" style="width: 150px; font: 10px Arial; position: absolute; border: 1px solid #333; background: #f7f5d1; padding: 2px 5px; color: darkblue; display: none;"><tr><td>',
				headers.first().text(),
				'</td><td>',
				columns.first().text(),
				'</td></tr><tr><td>',
				headers.eq(1).text(),
				'</td><td>',
				columns.eq(2).text(),
				'</td></tr><tr><td>',
				headers.eq(2).text(),
				'</td><td>',
				columns.eq(4).text(),
				'</td></tr><tr><td>',
				headers.eq(3).text(),
				'</td><td>',
				columns.eq(6).text(),
				'</td></tr><tr><td>',
				headers.eq(4).text(),
				'</td><td>',
				columns.eq(8).text(),
				'</td></tr><tr><td>',
				headers.eq(5).text(),
				'</td><td>',
				columns.eq(10).text(),
				'</td></tr><tr><td>',
				headers.eq(6).text(),
				'</td><td>',
				columns.eq(12).text(),
				'</td></tr><tr><td>',
				headers.eq(7).text(),
				'</td><td>',
				columns.eq(14).text(),
				'</td></tr><tr><td>',
				headers.eq(8).text(),
				'</td><td>',
				columns.eq(16).text(),
				'</td></tr><tr><td>',
				headers.eq(9).text(),
				'</td><td>',
				columns.eq(19).text(),
				'</td></tr><tr><td>',
				headers.eq(10).text(),
				'</td><td>',
				columns.eq(22).text(),
				'</td></tr><tr><td>',
				headers.eq(11).text(),
				'</td><td>',
				columns.eq(25).text(),
				'</td></tr></table>'
			].join('');
		}
	};

	return new Driver();
})(jQuery);