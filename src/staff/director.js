window.apples.director = window.apples.director || (function($) {
	'use strict';

	var TechnicalDirector = function() {
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

		function prepareInfo(tdLink, data) {
			var tdTable = $('table:eq(2) td', data);

			return {
				ID: tdLink.split('=')[1],
				Overall: $.trim(tdTable.eq(0).text()),
				Leader: $.trim(tdTable.eq(2).text()),
				RDM: $.trim(tdTable.eq(4).text()),
				RDE: $.trim(tdTable.eq(6).text()), 
				RDA: $.trim(tdTable.eq(8).text()),
				Exp: $.trim(tdTable.eq(10).text()),
				Pits: $.trim(tdTable.eq(12).text()),
				Motivation: $.trim(tdTable.eq(14).text()),
				Age: $.trim(tdTable.eq(17).text())
			};
		}

		function prepareSkillsTable(data) {
			var skillsTable = $('table:eq(2)', data),
				headers = skillsTable.find('th'),
				columns = skillsTable.find('td');

			return [
				'<table class="directorPopup" style="width: 150px; font: 10px Arial; position: absolute; border: 1px solid #333; background: #f7f5d1; padding: 2px 5px; color: darkblue; display: none;"><tr><td>',
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
				columns.eq(17).text(),
				'</td></tr></table>'
			].join('');
		}
	};

	return new TechnicalDirector();
})(jQuery);