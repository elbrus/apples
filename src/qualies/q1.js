window.apples.qualify1 = window.apples.qualify1 || (function($) {
	'use strict';

	var Qualify = function() {
		this.getInfo = function(success, error) {
			$.ajax({
				type: 'GET',
				url: '/Qualify.asp',
				success: function(data) {
					if (data && success) success(prepareInfo(data));
				},
				error: function() {
					if (error) error();
				}
			});
		};

		function prepareInfo(data) {
			var result = {
				Practice: $.map($('table:eq(5) tr[class="pointerhand"]', data), function(row) {
					var children = $(row).children('td[onclick]');

					return {
						Lap: $.trim(children.eq(0).text()), 
						LTime: $.trim(children.eq(1).text()), 
						Mistake: $.trim(children.eq(2).text()), 
						NTime: $.trim(children.eq(3).text()), 
						FWing: $.trim(children.eq(4).text()), 
						RWing: $.trim(children.eq(5).text()), 
						Engine: $.trim(children.eq(6).text()), 
						Brakes: $.trim(children.eq(7).text()), 
						Gear: $.trim(children.eq(8).text()), 
						Susp: $.trim(children.eq(9).text()), 
						Tyres: $.trim(children.eq(10).text())
					};
				})
			};

			if (~$('table:eq(6)', data).text().indexOf('Qualify 1 lap data')) {
				var qData = $('table:eq(6) tr:last > td', data),
					tempData = $('table:eq(3) img:first', data),
					text = tempData.parent().text();

				result.Q1 = {
					Data: {
						Time: $.trim(qData.eq(0).text()),
						FWing: $.trim(qData.eq(1).text()),
						RWing: $.trim(qData.eq(2).text()),
						Engine: $.trim(qData.eq(3).text()),
						Brakes: $.trim(qData.eq(4).text()),
						Gear: $.trim(qData.eq(5).text()),
						Susp: $.trim(qData.eq(6).text()),
						TType: qData.eq(7).children('img').attr('title'),
						Tyres: $.trim(qData.eq(8).text()),
						Risk: $.trim(qData.eq(9).text())
					},
					Weather: tempData.attr('title'),
					Temp: getTemperature(text),
					Hum: getHumidity(text)
				};
			}

			return result;
		}

		function getTemperature(text) {
			var temp = text.substring(text.indexOf('Temp') + 6);

			return temp.substring(0, temp.indexOf('C'));
		}

		function getHumidity(text) {
			var hum = text.substring(text.indexOf('Humidity') + 10);

			return hum.substring(0, hum.indexOf('%') + 1);
		}

		function compareTyresWithWeather() {
			var weather = $('table:eq(3) img:first').attr('title');
			var tyres = $('#Tyres').val();

			if (tyres && ((weather === 'Rain' && tyres !== '6') || (weather !== 'Rain' && tyres === '6'))) {
				$('#Tyres').parent().css('background-color', 'red');
			}
		}

		this.addFunctionality = function() {
			if (preferences.SettingsSetup.Q1) {
				if (window.getLapComment) {
					var lapComment, 
						parts, 
						message;
	
					$('.pointerhand td').css('text-align', 'left');
	
					for (var lapIndex = 1; lapIndex <= 8; lapIndex++) {
						lapComment = window.getLapComment(lapIndex);
	
						if (typeof lapComment !== 'undefined' && lapComment.indexOf('<font') === -1) {
							parts = lapComment.split('<br><b>');
	
							for (var i = 1, cLen = parts.length - 1; i <= cLen; i++) {
								message = parts[i].split('</b>');
	
								switch (message[1]) {
									//ENGINE
									case '  Try to favor a bit more the low revs': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(6)').append('-');
										break;
									}
									case '  I feel that I do not have enough engine power in the straights': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(6)').append('+');
										break;
									}
									case '  The engine revs are too high': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(6)').append('-');
										break;
									}
									case '  The engine power on the straights is not sufficient': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(6)').append('+');
										break;
									}
									case '  You should try to favor a lot more the high revs': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(6)').append('+');
										break;
									}
									//BRAKES
									case '  I would like to have the balance a bit more to the front': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(7)').append('+');
										break;
									}
									case '  Put the balance a bit more to the back': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(7)').append('-');
										break;
									}
									case '  I think the brakes effectiveness could be higher if we move the balance to the back': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(7)').append('-');
										break;
									}
									case '  I think the brakes effectiveness could be higher if we move the balance to the front': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(7)').append('+');
										break;
									}
									case '  I would feel a lot more comfortable to move the balance to the front': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(7)').append('+');
										break;
									}
									//GEAR	
									case '  I am very often in the red. Put the gear ratio a bit higher': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(8)').append('+');
										break;
									}
									case '  The gear ratio is too low': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(8)').append('+');
										break;
									}
									case '  I cannot take advantage of the power of the engine. Put the gear ratio a bit lower': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(8)').append('-');
										break;
									}
									case '  The gear ratio is too high': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(8)').append('-');
										break;
									}
									//SUSPENSION
									case '  I think with a bit more rigid suspension I will be able to go faster': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(9)').append('+');
										break;
									}
									case '  The suspension rigidity is too high': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(9)').append('-');
										break;
									}
									case '  The car is too rigid. Lower a bit the rigidity': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(9)').append('-');
										break;
									}
									case '  The suspension rigidity is too low': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(9)').append('+');
										break;
									}
									case '  The car is far too rigid. Lower a lot the rigidity': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(9)').append('-');
										break;
									}
									//WINGS
									case '  I am missing a bit of grip in the curves': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(4)').append('+');
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(5)').append('+');
										break;
									}
									case '  The car could have a bit more speed in the straights': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(4)').append('-');
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(5)').append('-');
										break;
									}
									case '  The car is very unstable in many corners': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(4)').append('+');
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(5)').append('+');
										break;
									}
									case '  The car is lacking some speed in the straights': {
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(4)').append('-');
										$('.pointerhand:eq(' + (lapIndex - 1) + ') > td:eq(5)').append('-');
										break;
									}
								}
							}
						}
					}
				}

				$('#Tyres').on('change', compareTyresWithWeather);
				compareTyresWithWeather();
			}
		};
	};

	return new Qualify();
})(jQuery);