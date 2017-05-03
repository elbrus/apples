window.apples.forum = window.apples.forum || (function(Driver, Director, RaceAnalysis, Qualify1, Qualify2, Testing, StaffAndFacilities) {
	'use strict';

	var ApplesForum = function() {
		var params;

		window.addEventListener('message', function(event) {
			if (event.source !== window) {
				return;
			}

			if (event.data.type && event.data.type === 'DATA_DONE') {
				hideOverlay();
			}
		}, false);

		this.sendData = function() {
			$('.overlay, .overlay-message').show();

			resetParams();

			fillInfo();
		};

		function resetParams() {
			params = { ID: null, Q1: null, Q2: null, Practice: [], Driver: null, TD: null, Test: null, Race: null, NextRace: null, Staff: null };
		}

		function hideOverlay() {
			$('.overlay, .overlay-message').hide();
		}

		function postData() {
			var data = JSON.stringify(params);

			window.postMessage({
				type: 'DATA_POST',
				text: JSON.stringify(params)
			}, '*');
		}

		function fillInfo() {
			$.ajax({
				type: 'GET',
				url: '/gpro.asp',
				success: function(data) {
		            if (data) {
		            	var promises = [];

		            	params.ID = $('#managerinformation, .xmanagerinfo', data).find('a[href^="Manager"]').attr('href').split('=')[1];

		            	var link = $('#racebar a[href^="TrackDetails"]', data);

		            	if (link.length) params.NextRace = link.attr('href').split('=')[1];

						if ($('a[href^="Qualify.asp"]', data).length) {
							promises.push($.Deferred(function(defer) {
								fillQ1Info(defer);
							}).promise());
						}

						if ($('a[href^="Qualify2.asp"]', data).length) {
							promises.push($.Deferred(function(defer) {
								fillQ2Info(defer);
							}).promise());
						}

						if ($('a[href^="RaceAnalysis.asp"]', data).length) {
							promises.push($.Deferred(function(defer) {
								fillRaceInfo(defer);
							}).promise());
						}

						link = $('a[href^="DriverProfile"]', data);

						if (link.length) {
							promises.push($.Deferred(function(defer) {
								fillDriverInfo(defer, link.attr('href'));
							}).promise());
						}

						link = $('a[href^="TechDProfile"]', data);

						if (link.length) {
							promises.push($.Deferred(function(defer) {
								fillTechnicalDirectorInfo(defer, link.attr('href'));
							}).promise());
						}

						if ($('a[href^="Testing.asp"]', data).length) {
							promises.push($.Deferred(function(defer) {
								fillTestingInfo(defer);
							}).promise());
						}

						promises.push($.Deferred(function(defer) {
							checkTestingPracticeOccurrence(defer);
						}).promise());

						promises.push($.Deferred(function(defer) {
							fillStaffInfo(defer);
						}).promise());

						$.when.apply(null, promises).done(function() {
							postData();
						});
		            }
		        }
			});
		}

		function fillDriverInfo(defer, driverLink) {
			Driver.getInfo(driverLink, function(data) {
				params.Driver = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function fillTechnicalDirectorInfo(defer, tdLink) {
			Director.getInfo(tdLink, function(data) {
				params.TD = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function fillQ1Info(defer) {
			Qualify1.getInfo(function(data) {
				params.Practice = data.Practice;
				if (data.Q1) params.Q1 = data.Q1;

				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function fillQ2Info(defer) {
			Qualify2.getInfo(function(data) {
				params.Q2 = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function fillTestingInfo(defer) {
			Testing.getInfo(function(data) {
				params.Test = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function fillRaceInfo(defer) {
			RaceAnalysis.getInfo(function(data) {
				params.Race = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}

		function checkTestingPracticeOccurrence(defer) {
			$.ajax({
				type: 'GET',
				url: '/EconomyHistory.asp',
				success: function(data) {
					var messages = $.map($('table tr:gt(1)', data), function(row) {
						return $.trim($(row).children('td:eq(1)').text());
					});
					params.TestsBeforePractice = messages.indexOf('Testing session costs') < messages.indexOf('Qualify 2 lap costs');
					defer.resolve();
				},
				error: function() {
					defer.resolve();
				}
			});
		}

		function fillStaffInfo(defer) {
			StaffAndFacilities.getInfo(function(data) {
				params.Staff = data;
				defer.resolve();
			}, function() {
				defer.resolve();
			});
		}
	};

	return new ApplesForum();
})(window.apples.driver, window.apples.director, window.apples.analysis, window.apples.qualify1, window.apples.qualify2, window.apples.tests, window.apples.staff);
